# -*- coding: utf-8 -*-
"""Generate branded Spectra Studio cover images (1600x900) for zh/en guide articles.
Renders at 2x then downscales for antialiasing."""
import math
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1600, 900
SS = 2  # supersample
W2, H2 = W * SS, H * SS

BG_TOP = (8, 9, 12)
BG_BOT = (13, 19, 31)
ACCENT = (91, 141, 239)
ACCENT_DIM = (63, 114, 208)
TEXT = (230, 232, 236)
SECONDARY = (124, 130, 144)
SPOT = (207, 224, 255)

FONT_TITLE = r"C:\Windows\Fonts\bahnschrift.ttf"
FONT_CJK = r"C:\Windows\Fonts\msjhbd.ttc"
FONT_LATIN_SEMI = r"C:\Windows\Fonts\seguisb.ttf"


def load_font(path, size, bold=False):
    f = ImageFont.truetype(path, size * SS)
    try:
        if "bahnschrift" in path:
            f.set_variation_by_axes([700])
    except Exception:
        pass
    return f


def gradient_bg():
    img = Image.new("RGB", (W2, H2))
    d = ImageDraw.Draw(img)
    for y in range(H2):
        t = y / H2
        r = int(BG_TOP[0] + (BG_BOT[0] - BG_TOP[0]) * t)
        g = int(BG_TOP[1] + (BG_BOT[1] - BG_TOP[1]) * t)
        b = int(BG_TOP[2] + (BG_BOT[2] - BG_TOP[2]) * t)
        d.line([(0, y), (W2, y)], fill=(r, g, b))
    # radial glow behind spectrum area
    glow = Image.new("L", (W2, H2), 0)
    gd = ImageDraw.Draw(glow)
    cx, cy, rad = int(W2 * 0.72), int(H2 * 0.55), int(W2 * 0.42)
    gd.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=90)
    glow = glow.filter(ImageFilter.GaussianBlur(220))
    accent_layer = Image.new("RGB", (W2, H2), ACCENT)
    img = Image.composite(accent_layer, img, glow)
    return img


def spectrum_curves(img):
    """Stacked XRD-like curves across the lower band."""
    d = ImageDraw.Draw(img)
    band_top = int(H2 * 0.56)
    band_bot = int(H2 * 0.97)
    band_h = band_bot - band_top
    x0, x1 = int(W2 * 0.06), int(W2 * 0.94)

    def gauss(x, mu, sigma, amp):
        return amp * math.exp(-0.5 * ((x - mu) / sigma) ** 2)

    def curve(peaks, offset, color, width):
        pts = []
        n = 400
        for i in range(n + 1):
            x = x0 + (x1 - x0) * i / n
            y = 0
            for mu, sigma, amp in peaks:
                y += gauss(x, mu, sigma, amp)
            y = band_bot - offset - y * (band_h * 0.55)
            pts.append((x, y))
        d.line(pts, fill=color, width=width)

    span = x1 - x0
    # back curve (dim)
    curve([(0.20, 0.025, 1.0), (0.34, 0.012, 0.6), (0.52, 0.03, 0.9)],
          band_h * 0.42, (ACCENT_DIM[0], ACCENT_DIM[1], ACCENT_DIM[2], 130), 5 * SS)
    # mid curve
    curve([(0.30, 0.02, 1.0), (0.47, 0.008, 0.5), (0.63, 0.025, 0.85), (0.78, 0.012, 0.45)],
          band_h * 0.26, (ACCENT[0], ACCENT[1], ACCENT[2], 200), 6 * SS)
    # front curve (bright, XRD-like sharp peaks)
    front = [(0.16, 0.012, 1.0), (0.245, 0.008, 0.62), (0.33, 0.006, 0.40),
             (0.42, 0.014, 0.88), (0.515, 0.007, 0.50), (0.60, 0.012, 1.0),
             (0.70, 0.009, 0.55), (0.82, 0.016, 0.95)]
    curve(front, band_h * 0.10, (SPOT[0], SPOT[1], SPOT[2]), 7 * SS)
    # faint baseline grid ticks
    for i in range(9):
        gx = x0 + span * i / 8
        d.line([(gx, band_bot), (gx, band_bot - band_h * 0.04)], fill=(58, 66, 82), width=2 * SS)


def draw_texts(img, subtitle):
    d = ImageDraw.Draw(img)
    margin = int(110 * SS)

    # wordmark
    f_word = load_font(FONT_LATIN_SEMI, 30)
    d.text((margin, int(64 * SS)), "H U   L A B", font=f_word, fill=SECONDARY)

    # title
    f_title = load_font(FONT_TITLE, 108)
    d.text((margin, int(150 * SS)), "Spectra Studio", font=f_title, fill=TEXT)

    # subtitle
    f_sub = load_font(FONT_CJK, 42)
    d.text((margin, int(310 * SS)), subtitle, font=f_sub, fill=ACCENT)

    # divider
    d.line([(margin, int(430 * SS)), (margin + int(560 * SS), int(430 * SS))],
           fill=ACCENT_DIM, width=2 * SS)

    # bottom-left tag
    f_tag = load_font(FONT_LATIN_SEMI, 26)
    d.text((margin, int(H2 - 90 * SS)), "Free forever  ·  Pro unlock with a key",
           font=f_tag, fill=SECONDARY)

    # v2.0 pill bottom-right
    pill_w, pill_h = int(150 * SS), int(56 * SS)
    px = W2 - margin - pill_w
    py = H2 - 90 * SS - pill_h // 2 + 12
    d.rounded_rectangle([px, py, px + pill_w, py + pill_h], radius=pill_h // 2,
                        outline=ACCENT_DIM, width=2 * SS)
    f_pill = load_font(FONT_LATIN_SEMI, 26)
    d.text((px + pill_w // 2, py + pill_h // 2), "v2.0.0", font=f_pill,
           fill=ACCENT, anchor="mm")


def make(subtitle, out):
    img = gradient_bg()
    spectrum_curves(img)
    draw_texts(img, subtitle)
    img = img.resize((W, H), Image.LANCZOS)
    img.save(out, "PNG")
    print("saved", out, img.size)


if __name__ == "__main__":
    zh_dir = r"C:\Users\hujerry\Desktop\網站\src\content\zh\guides\spectra-studio-guide"
    en_dir = r"C:\Users\hujerry\Desktop\網站\src\content\en\guides\spectra-studio-guide-en"
    make("XRD · FTIR · RAMAN · DSC  一體化光譜分析繪圖工具", os.path.join(zh_dir, "spectra-studio-cover.png"))
    make("XRD · FTIR · RAMAN · DSC   Spectral Plotting Tool", os.path.join(en_dir, "spectra-studio-cover.png"))
