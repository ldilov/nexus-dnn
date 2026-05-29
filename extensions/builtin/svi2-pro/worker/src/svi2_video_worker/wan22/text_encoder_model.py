from __future__ import annotations

import math
import html
import string

import ftfy
import regex as re
import torch
import torch.nn as nn
import torch.nn.functional as F
from transformers import AutoTokenizer


def _fp16_clamp(x: torch.Tensor) -> torch.Tensor:
    if x.dtype == torch.float16 and torch.isinf(x).any():
        clamp = torch.finfo(x.dtype).max - 1000
        x = torch.clamp(x, min=-clamp, max=clamp)
    return x


class _GELU(nn.Module):
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return 0.5 * x * (1.0 + torch.tanh(
            math.sqrt(2.0 / math.pi) * (x + 0.044715 * torch.pow(x, 3.0))
        ))


class _T5LayerNorm(nn.Module):
    def __init__(self, dim: int, eps: float = 1e-6) -> None:
        super().__init__()
        self.dim = dim
        self.eps = eps
        self.weight = nn.Parameter(torch.ones(dim))

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = x * torch.rsqrt(x.float().pow(2).mean(dim=-1, keepdim=True) + self.eps)
        if self.weight.dtype in (torch.float16, torch.bfloat16):
            x = x.type_as(self.weight)
        return self.weight * x


class _T5Attention(nn.Module):
    def __init__(self, dim: int, dim_attn: int, num_heads: int, dropout: float = 0.1) -> None:
        assert dim_attn % num_heads == 0
        super().__init__()
        self.dim = dim
        self.dim_attn = dim_attn
        self.num_heads = num_heads
        self.head_dim = dim_attn // num_heads
        self.q = nn.Linear(dim, dim_attn, bias=False)
        self.k = nn.Linear(dim, dim_attn, bias=False)
        self.v = nn.Linear(dim, dim_attn, bias=False)
        self.o = nn.Linear(dim_attn, dim, bias=False)
        self.dropout = nn.Dropout(dropout)

    def forward(
        self,
        x: torch.Tensor,
        context: torch.Tensor | None = None,
        mask: torch.Tensor | None = None,
        pos_bias: torch.Tensor | None = None,
    ) -> torch.Tensor:
        context = x if context is None else context
        b, n, c = x.size(0), self.num_heads, self.head_dim
        q = self.q(x).view(b, -1, n, c)
        k = self.k(context).view(b, -1, n, c)
        v = self.v(context).view(b, -1, n, c)
        attn_bias = x.new_zeros(b, n, q.size(1), k.size(1))
        if pos_bias is not None:
            attn_bias = attn_bias + pos_bias
        if mask is not None:
            assert mask.ndim in (2, 3)
            mask = mask.view(b, 1, 1, -1) if mask.ndim == 2 else mask.unsqueeze(1)
            attn_bias = attn_bias.masked_fill(mask == 0, torch.finfo(x.dtype).min)
        attn = torch.einsum("binc,bjnc->bnij", q, k) + attn_bias
        attn = F.softmax(attn.float(), dim=-1).type_as(attn)
        x = torch.einsum("bnij,bjnc->binc", attn, v)
        x = x.reshape(b, -1, n * c)
        x = self.o(x)
        x = self.dropout(x)
        return x


class _T5FeedForward(nn.Module):
    def __init__(self, dim: int, dim_ffn: int, dropout: float = 0.1) -> None:
        super().__init__()
        self.dim = dim
        self.dim_ffn = dim_ffn
        self.gate = nn.Sequential(nn.Linear(dim, dim_ffn, bias=False), _GELU())
        self.fc1 = nn.Linear(dim, dim_ffn, bias=False)
        self.fc2 = nn.Linear(dim_ffn, dim, bias=False)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.fc1(x) * self.gate(x)
        x = self.dropout(x)
        x = self.fc2(x)
        x = self.dropout(x)
        return x


class _T5RelativeEmbedding(nn.Module):
    def __init__(self, num_buckets: int, num_heads: int, bidirectional: bool, max_dist: int = 128) -> None:
        super().__init__()
        self.num_buckets = num_buckets
        self.num_heads = num_heads
        self.bidirectional = bidirectional
        self.max_dist = max_dist
        self.embedding = nn.Embedding(num_buckets, num_heads)

    def forward(self, lq: int, lk: int) -> torch.Tensor:
        device = self.embedding.weight.device
        rel_pos = torch.arange(lk, device=device).unsqueeze(0) - torch.arange(lq, device=device).unsqueeze(1)
        rel_pos = self._relative_position_bucket(rel_pos)
        rel_pos_embeds = self.embedding(rel_pos)
        return rel_pos_embeds.permute(2, 0, 1).unsqueeze(0).contiguous()

    def _relative_position_bucket(self, rel_pos: torch.Tensor) -> torch.Tensor:
        if self.bidirectional:
            num_buckets = self.num_buckets // 2
            rel_buckets = (rel_pos > 0).long() * num_buckets
            rel_pos = torch.abs(rel_pos)
        else:
            num_buckets = self.num_buckets
            rel_buckets = torch.zeros_like(rel_pos)
            rel_pos = -torch.min(rel_pos, torch.zeros_like(rel_pos))
        max_exact = num_buckets // 2
        rel_pos_large = max_exact + (
            torch.log(rel_pos.float() / max_exact)
            / math.log(self.max_dist / max_exact)
            * (num_buckets - max_exact)
        ).long()
        rel_pos_large = torch.min(rel_pos_large, torch.full_like(rel_pos_large, num_buckets - 1))
        rel_buckets = rel_buckets + torch.where(rel_pos < max_exact, rel_pos, rel_pos_large)
        return rel_buckets


class _T5SelfAttention(nn.Module):
    def __init__(
        self,
        dim: int,
        dim_attn: int,
        dim_ffn: int,
        num_heads: int,
        num_buckets: int,
        shared_pos: bool = True,
        dropout: float = 0.1,
    ) -> None:
        super().__init__()
        self.dim = dim
        self.dim_attn = dim_attn
        self.dim_ffn = dim_ffn
        self.num_heads = num_heads
        self.num_buckets = num_buckets
        self.shared_pos = shared_pos
        self.norm1 = _T5LayerNorm(dim)
        self.attn = _T5Attention(dim, dim_attn, num_heads, dropout)
        self.norm2 = _T5LayerNorm(dim)
        self.ffn = _T5FeedForward(dim, dim_ffn, dropout)
        self.pos_embedding: _T5RelativeEmbedding | None = (
            None if shared_pos else _T5RelativeEmbedding(num_buckets, num_heads, bidirectional=True)
        )

    def forward(
        self,
        x: torch.Tensor,
        mask: torch.Tensor | None = None,
        pos_bias: torch.Tensor | None = None,
    ) -> torch.Tensor:
        e = pos_bias if self.shared_pos else self.pos_embedding(x.size(1), x.size(1))
        x = _fp16_clamp(x + self.attn(self.norm1(x), mask=mask, pos_bias=e))
        x = _fp16_clamp(x + self.ffn(self.norm2(x)))
        return x


def _init_weights(m: nn.Module) -> None:
    if isinstance(m, _T5LayerNorm):
        nn.init.ones_(m.weight)
    elif isinstance(m, _T5FeedForward):
        nn.init.normal_(m.gate[0].weight, std=m.dim**-0.5)
        nn.init.normal_(m.fc1.weight, std=m.dim**-0.5)
        nn.init.normal_(m.fc2.weight, std=m.dim_ffn**-0.5)
    elif isinstance(m, _T5Attention):
        nn.init.normal_(m.q.weight, std=(m.dim * m.dim_attn) ** -0.5)
        nn.init.normal_(m.k.weight, std=m.dim**-0.5)
        nn.init.normal_(m.v.weight, std=m.dim**-0.5)
        nn.init.normal_(m.o.weight, std=(m.num_heads * m.dim_attn) ** -0.5)
    elif isinstance(m, _T5RelativeEmbedding):
        nn.init.normal_(m.embedding.weight, std=(2 * m.num_buckets * m.num_heads) ** -0.5)


class WanTextEncoder(nn.Module):
    def __init__(
        self,
        vocab: int = 256384,
        dim: int = 4096,
        dim_attn: int = 4096,
        dim_ffn: int = 10240,
        num_heads: int = 64,
        num_layers: int = 24,
        num_buckets: int = 32,
        shared_pos: bool = False,
        dropout: float = 0.1,
    ) -> None:
        super().__init__()
        self.dim = dim
        self.dim_attn = dim_attn
        self.dim_ffn = dim_ffn
        self.num_heads = num_heads
        self.num_layers = num_layers
        self.num_buckets = num_buckets
        self.shared_pos = shared_pos
        self.token_embedding = nn.Embedding(vocab, dim)
        self.pos_embedding: _T5RelativeEmbedding | None = (
            _T5RelativeEmbedding(num_buckets, num_heads, bidirectional=True) if shared_pos else None
        )
        self.dropout = nn.Dropout(dropout)
        self.blocks = nn.ModuleList([
            _T5SelfAttention(dim, dim_attn, dim_ffn, num_heads, num_buckets, shared_pos, dropout)
            for _ in range(num_layers)
        ])
        self.norm = _T5LayerNorm(dim)
        self.apply(_init_weights)

    def forward(self, ids: torch.Tensor, mask: torch.Tensor | None = None) -> torch.Tensor:
        x = self.token_embedding(ids)
        x = self.dropout(x)
        e = self.pos_embedding(x.size(1), x.size(1)) if self.shared_pos else None
        for block in self.blocks:
            x = block(x, mask, pos_bias=e)
        x = self.norm(x)
        x = self.dropout(x)
        return x


def _basic_clean(text: str) -> str:
    text = ftfy.fix_text(text)
    text = html.unescape(html.unescape(text))
    return text.strip()


def _whitespace_clean(text: str) -> str:
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def _canonicalize(text: str, keep_punctuation_exact_string: str | None = None) -> str:
    text = text.replace("_", " ")
    if keep_punctuation_exact_string:
        text = keep_punctuation_exact_string.join(
            part.translate(str.maketrans("", "", string.punctuation))
            for part in text.split(keep_punctuation_exact_string)
        )
    else:
        text = text.translate(str.maketrans("", "", string.punctuation))
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    return text.strip()


class HuggingfaceTokenizer:
    def __init__(self, name: str, seq_len: int | None = None, clean: str | None = None, **kwargs) -> None:
        assert clean in (None, "whitespace", "lower", "canonicalize")
        self.name = name
        self.seq_len = seq_len
        self.clean = clean
        self.tokenizer = AutoTokenizer.from_pretrained(name, **kwargs)
        self.vocab_size: int = self.tokenizer.vocab_size

    def __call__(self, sequence: str | list[str], **kwargs) -> torch.Tensor | tuple[torch.Tensor, torch.Tensor]:
        return_mask: bool = kwargs.pop("return_mask", False)
        _kwargs: dict = {"return_tensors": "pt"}
        if self.seq_len is not None:
            _kwargs.update({"padding": "max_length", "truncation": True, "max_length": self.seq_len})
        _kwargs.update(**kwargs)
        if isinstance(sequence, str):
            sequence = [sequence]
        if self.clean:
            sequence = [self._clean(u) for u in sequence]
        ids = self.tokenizer(sequence, **_kwargs)
        if return_mask:
            return ids.input_ids, ids.attention_mask
        return ids.input_ids

    def _clean(self, text: str) -> str:
        if self.clean == "whitespace":
            return _whitespace_clean(_basic_clean(text))
        if self.clean == "lower":
            return _whitespace_clean(_basic_clean(text)).lower()
        if self.clean == "canonicalize":
            return _canonicalize(_basic_clean(text))
        return text
