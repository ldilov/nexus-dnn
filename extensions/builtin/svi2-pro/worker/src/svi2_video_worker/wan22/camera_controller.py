from typing import Tuple

import torch
import torch.nn as nn


class ResidualBlock(nn.Module):
    def __init__(self, dim: int) -> None:
        super().__init__()
        self.conv1 = nn.Conv2d(dim, dim, kernel_size=3, padding=1)
        self.relu = nn.ReLU(inplace=True)
        self.conv2 = nn.Conv2d(dim, dim, kernel_size=3, padding=1)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        residual = x
        out = self.relu(self.conv1(x))
        out = self.conv2(out)
        out += residual
        return out


class SimpleAdapter(nn.Module):
    def __init__(
        self,
        in_dim: int,
        out_dim: int,
        kernel_size: Tuple[int, int],
        stride: Tuple[int, int],
        num_residual_blocks: int = 1,
    ) -> None:
        super().__init__()
        self.pixel_unshuffle = nn.PixelUnshuffle(downscale_factor=8)
        self.conv = nn.Conv2d(
            in_dim * 64, out_dim, kernel_size=kernel_size, stride=stride, padding=0
        )
        self.residual_blocks = nn.Sequential(
            *[ResidualBlock(out_dim) for _ in range(num_residual_blocks)]
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        bs, c, f, h, w = x.size()
        x = x.permute(0, 2, 1, 3, 4).contiguous().view(bs * f, c, h, w)
        x_unshuffled = self.pixel_unshuffle(x)
        x_conv = self.conv(x_unshuffled)
        out = self.residual_blocks(x_conv)
        out = out.view(bs, f, out.size(1), out.size(2), out.size(3))
        out = out.permute(0, 2, 1, 3, 4)
        return out
