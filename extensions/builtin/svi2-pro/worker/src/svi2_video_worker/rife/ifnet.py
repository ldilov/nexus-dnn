from __future__ import annotations

import torch
import torch.nn as nn
import torch.nn.functional as F

# RIFE IFNet (HDv3) — vendored from hzwer/Practical-RIFE / ECCV2022-RIFE
# (MIT licensed). Matches the 160-key `flownet.pkl` used by the Wan i2v
# ecosystem (DeepBeepMeep/Wan2.1). Inference-only: produces the middle frame
# (t=0.5); higher factors come from recursive doubling in rife_torch.

_backwarp_grid: dict[tuple[str, str], torch.Tensor] = {}


def warp(tenInput: torch.Tensor, tenFlow: torch.Tensor, device) -> torch.Tensor:
    key = (str(tenFlow.device), str(tenFlow.size()))
    if key not in _backwarp_grid:
        h = torch.linspace(-1.0, 1.0, tenFlow.shape[3], device=device).view(
            1, 1, 1, tenFlow.shape[3]).expand(tenFlow.shape[0], -1, tenFlow.shape[2], -1)
        v = torch.linspace(-1.0, 1.0, tenFlow.shape[2], device=device).view(
            1, 1, tenFlow.shape[2], 1).expand(tenFlow.shape[0], -1, -1, tenFlow.shape[3])
        _backwarp_grid[key] = torch.cat([h, v], 1).to(device)
    tenFlow = torch.cat(
        [tenFlow[:, 0:1, :, :] / ((tenInput.shape[3] - 1.0) / 2.0),
         tenFlow[:, 1:2, :, :] / ((tenInput.shape[2] - 1.0) / 2.0)], 1)
    g = (_backwarp_grid[key] + tenFlow).permute(0, 2, 3, 1)
    return F.grid_sample(tenInput, g, mode="bilinear", padding_mode="border", align_corners=True)


def _conv(in_planes: int, out_planes: int, kernel_size: int = 3, stride: int = 1,
          padding: int = 1, dilation: int = 1) -> nn.Sequential:
    return nn.Sequential(
        nn.Conv2d(in_planes, out_planes, kernel_size, stride, padding, dilation, bias=True),
        nn.PReLU(out_planes),
    )


class IFBlock(nn.Module):
    def __init__(self, in_planes: int, c: int = 64) -> None:
        super().__init__()
        self.conv0 = nn.Sequential(_conv(in_planes, c // 2, 3, 2, 1), _conv(c // 2, c, 3, 2, 1))
        self.convblock0 = nn.Sequential(_conv(c, c), _conv(c, c))
        self.convblock1 = nn.Sequential(_conv(c, c), _conv(c, c))
        self.convblock2 = nn.Sequential(_conv(c, c), _conv(c, c))
        self.convblock3 = nn.Sequential(_conv(c, c), _conv(c, c))
        self.conv1 = nn.Sequential(
            nn.ConvTranspose2d(c, c // 2, 4, 2, 1), nn.PReLU(c // 2),
            nn.ConvTranspose2d(c // 2, 4, 4, 2, 1),
        )
        self.conv2 = nn.Sequential(
            nn.ConvTranspose2d(c, c // 2, 4, 2, 1), nn.PReLU(c // 2),
            nn.ConvTranspose2d(c // 2, 1, 4, 2, 1),
        )

    def forward(self, x: torch.Tensor, flow: torch.Tensor, scale: float = 1):
        x = F.interpolate(x, scale_factor=1.0 / scale, mode="bilinear", align_corners=False, recompute_scale_factor=False)
        flow = F.interpolate(flow, scale_factor=1.0 / scale, mode="bilinear", align_corners=False, recompute_scale_factor=False) * (1.0 / scale)
        feat = self.conv0(torch.cat((x, flow), 1))
        feat = self.convblock0(feat) + feat
        feat = self.convblock1(feat) + feat
        feat = self.convblock2(feat) + feat
        feat = self.convblock3(feat) + feat
        flow = self.conv1(feat)
        mask = self.conv2(feat)
        flow = F.interpolate(flow, scale_factor=scale, mode="bilinear", align_corners=False, recompute_scale_factor=False) * scale
        mask = F.interpolate(mask, scale_factor=scale, mode="bilinear", align_corners=False, recompute_scale_factor=False)
        return flow, mask


class IFNet(nn.Module):
    def __init__(self) -> None:
        super().__init__()
        self.block0 = IFBlock(7 + 4, c=90)
        self.block1 = IFBlock(7 + 4, c=90)
        self.block2 = IFBlock(7 + 4, c=90)
        self.block_tea = IFBlock(10 + 4, c=90)

    def forward(self, x: torch.Tensor, scale_list=(4, 2, 1)):
        channel = x.shape[1] // 2
        img0 = x[:, :channel]
        img1 = x[:, channel:]
        flow = (x[:, :4]).detach() * 0
        mask = (x[:, :1]).detach() * 0
        warped_img0, warped_img1 = img0, img1
        merged = []
        block = [self.block0, self.block1, self.block2]
        for i in range(3):
            f0, m0 = block[i](torch.cat((warped_img0[:, :3], warped_img1[:, :3], mask), 1), flow, scale=scale_list[i])
            f1, m1 = block[i](torch.cat((warped_img1[:, :3], warped_img0[:, :3], -mask), 1),
                              torch.cat((flow[:, 2:4], flow[:, :2]), 1), scale=scale_list[i])
            flow = flow + (f0 + torch.cat((f1[:, 2:4], f1[:, :2]), 1)) / 2
            mask = mask + (m0 + (-m1)) / 2
            warped_img0 = warp(img0, flow[:, :2], device=flow.device)
            warped_img1 = warp(img1, flow[:, 2:4], device=flow.device)
            merged.append((warped_img0, warped_img1))
        mask = torch.sigmoid(mask)
        out = merged[2][0] * mask + merged[2][1] * (1 - mask)
        return out
