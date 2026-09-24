"""One-off helper: generate public/images/profile.jpg placeholder.

Usage:
    python3 scripts/generate-profile-placeholder.py

Creates a 4:5 charcoal placeholder image that the Hero displays as
/images/profile.jpg. Replace that file with your own photo (same name)
whenever you're ready — no code changes needed.
"""

import os
import struct
import zlib

W, H = 1200, 1500  # 4:5 portrait, matches the hero's aspect ratio

CHARCOAL = (18, 18, 20)      # #121214 — matches --background
CARD = (26, 26, 28)          # subtle vertical gradient end
EDGE = (8, 8, 9)             # vignette edges
ACCENT = (201, 108, 51)      # ember orange, echoing --primary


def lerp(a, b, t):
    return int(a + (b - a) * t)


def clamp(x, lo, hi):
    return max(lo, min(hi, x))


def pixel_color(x, y):
    # Vertical gradient charcoal -> card
    ty = y / (H - 1)
    r, g, b = (lerp(CHARCOAL[i], CARD[i], ty) for i in range(3))

    # Soft vignette darkening toward edges
    tx = x / (W - 1)
    ex = min(tx, 1 - tx) * 2  # 0 at edges, 1 in center
    ey = min(ty, 1 - ty) * 2
    v = clamp(1.0 - (1 - min(ex, ey)) * 0.35, 0, 1)
    r, g, b = (int(c * v) for c in (r, g, b))

    # Thin ember accent frame (12px) inset 36px from the edge
    m, t = 36, 12
    if (m <= x < m + t or W - m - t <= x < W - m) and (
        m <= y < m + t or H - m - t <= y < H - m
    ):
        # Slightly dimmer toward the bottom so it blends with the gradient
        fade = 0.55 + 0.45 * (1 - ty)
        r, g, b = (int(c * fade) for c in ACCENT)

    return (r, g, b)


def build():
    # Raw RGB rows with filter byte 0 (PNG requires a filter per scanline)
    raw = bytearray()
    for y in range(H):
        raw.append(0)
        for x in range(W):
            raw.extend(pixel_color(x, y))

    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", W, H, 8, 2, 0, 0, 0)  # 8-bit RGB
    png = (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", ihdr)
        + chunk(b"IDAT", zlib.compress(bytes(raw), 9))
        + chunk(b"IEND", b"")
    )

    out = os.path.join("public", "images")
    os.makedirs(out, exist_ok=True)
    with open(os.path.join(out, "profile.jpg"), "wb") as f:
        f.write(png)
    print(f"Wrote public/images/profile.jpg ({W}x{H} placeholder)")


if __name__ == "__main__":
    build()
