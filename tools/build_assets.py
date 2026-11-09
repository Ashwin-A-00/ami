#!/usr/bin/env python3
"""
Ami brand-asset builder.

Generates every deliverable in design-handoff/brand-assets/ from ONE vector
source (the Ami drawing below), at the exact sizes in design-handoff/SPEC.md.

    python3 tools/build_assets.py

Needs:  pip install fonttools      and      rsvg-convert (librsvg) on PATH
The wordmark text is outlined to vector paths from tools/fonts (Nunito Black, OFL),
so the SVGs have no font dependency.
"""
from __future__ import annotations

import json
import random
import shutil
import subprocess
import sys
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "design-handoff" / "brand-assets"
FONT = ROOT / "tools" / "fonts" / "nunito-latin-900-normal.woff"

C = dict(blue="#4A6BFF", midnight="#0A0E2A", mint="#7DF9E3", coral="#FF9A76", gold="#FFD166", white="#FFFFFF")

# artwork box of Ami without sparks / shadow (design space is 400 x 420)
BBOX = (48, 56, 352, 376)


# ----------------------------------------------------------------------------
# Cell 1 · the Ami drawing  (expr = happy | wink | joy,  flat = simplified icon)
# ----------------------------------------------------------------------------
def ami(uid: str, expr: str = "happy", sparks: bool = True, shadow: bool = True, flat: bool = False):
    """Return (defs, body) for Ami in the 400x420 design space."""
    k = 1.7 if flat else 1.0  # thicker strokes for the 56 px topic icon
    mint = C["mint"]

    if flat:
        defs = ""
        body_fill, visor_fill, glow = C["blue"], "#10163a", ""
    else:
        body_fill, visor_fill, glow = f"url(#b{uid})", f"url(#v{uid})", f' filter="url(#g{uid})"'
        defs = (
            f'<linearGradient id="b{uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a9bff"/>'
            f'<stop offset=".5" stop-color="#4A6BFF"/><stop offset="1" stop-color="#3347d9"/></linearGradient>'
            f'<linearGradient id="v{uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2560"/>'
            f'<stop offset="1" stop-color="#0c1030"/></linearGradient>'
            f'<filter id="g{uid}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="6" result="b"/>'
            f'<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
        )

    def eye(cx):
        rx, ry = (20, 28) if flat else (16, 22)
        e = f'<ellipse cx="{cx}" cy="192" rx="{rx}" ry="{ry}" fill="{mint}"/>'
        return e if flat else e + f'<circle cx="{cx + 5}" cy="183" r="5" fill="#fff"/>'

    def arc(x):
        return f'<path d="M{x} 198 Q{x + 18} 176 {x + 36} 198" stroke="{mint}" stroke-width="{7 * k}" stroke-linecap="round" fill="none"/>'

    smile = f'<path d="M168 232 Q200 262 232 232" stroke="{mint}" stroke-width="{7 * k}" stroke-linecap="round" fill="none"/>'
    joy_mouth = f'<path d="M166 226 Q200 278 234 226 Z" fill="{mint}" stroke="{mint}" stroke-width="5" stroke-linejoin="round"/>'

    if expr == "happy":
        face = eye(156) + eye(244) + smile
    elif expr == "wink":
        face = eye(156) + arc(226) + smile
    elif expr == "joy":
        face = arc(138) + arc(226) + joy_mouth
    else:
        raise ValueError(expr)

    parts = []
    if shadow:
        parts.append('<ellipse cx="200" cy="402" rx="105" ry="10" fill="#000" opacity=".22"/>')
    parts.append(f'<path d="M85 300 L62 374 L162 322 Z" fill="{"#2b3fd6" if not flat else "#3347d9"}"/>')
    parts.append(f'<rect x="48" y="58" width="304" height="262" rx="120" fill="{body_fill}"/>')
    if not flat:
        parts.append('<path d="M88 122 Q110 84 190 80" stroke="#fff" stroke-opacity=".35" stroke-width="10" stroke-linecap="round" fill="none"/>')
    parts.append(f'<rect x="88" y="122" width="224" height="146" rx="68" fill="{visor_fill}"' + ('' if flat else ' stroke="#5a6cd0" stroke-opacity=".5" stroke-width="2"') + "/>")
    parts.append(f"<g{glow}>{face}</g>")
    if not flat:
        parts.append('<circle cx="116" cy="244" r="12" fill="#b0608a" opacity=".65"/><circle cx="284" cy="244" r="12" fill="#b0608a" opacity=".65"/>')
    coral, gold = C["coral"], C["gold"]
    parts.append(
        f'<path d="M70 178 C 70 28, 330 28, 330 178" stroke="{coral}" stroke-width="{15 * k}" stroke-linecap="round" fill="none"/>'
        f'<rect x="50" y="148" width="40" height="88" rx="20" fill="{coral}"/><rect x="310" y="148" width="40" height="88" rx="20" fill="{coral}"/>'
        f'<circle cx="70" cy="190" r="7" fill="{gold}"/><circle cx="330" cy="190" r="7" fill="{gold}"/>'
    )
    if not flat:
        parts.append(
            f'<path d="M330 232 C 330 292, 292 300, 248 292" stroke="{coral}" stroke-width="9" stroke-linecap="round" fill="none"/>'
            f'<ellipse cx="236" cy="292" rx="18" ry="11" fill="{gold}"/>'
        )
    if sparks:
        parts.append(
            f'<path d="M352 26 Q356 48 378 52 Q356 56 352 78 Q348 56 326 52 Q348 48 352 26Z" fill="{gold}"/>'
            f'<path d="M386 102 Q388 110 397 112 Q388 114 386 123 Q384 114 375 112 Q384 110 386 102Z" fill="{gold}"/>'
            f'<circle cx="322" cy="26" r="4.5" fill="{gold}"/>'
        )
    return defs, "".join(parts)


# ----------------------------------------------------------------------------
# Cell 2 · helpers: svg document, placement, text outlines, png export
# ----------------------------------------------------------------------------
def doc(w, h, viewbox, inner, title, defs=""):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="{viewbox}" role="img" aria-label="{title}">'
        f"<title>{title}</title>" + (f"<defs>{defs}</defs>" if defs else "") + f"{inner}</svg>\n"
    )


def place(inner, cx, cy, height, bbox=BBOX):
    """Scale the 400x420 drawing so its `bbox` is `height` tall, centred on (cx, cy)."""
    x0, y0, x1, y1 = bbox
    s = height / (y1 - y0)
    tx, ty = cx - (x0 + x1) / 2 * s, cy - (y0 + y1) / 2 * s
    return f'<g transform="translate({tx:.3f} {ty:.3f}) scale({s:.5f})">{inner}</g>'


class Outliner:
    """Turns text into SVG paths using the bundled Nunito Black."""

    def __init__(self, path: Path):
        self.font = TTFont(path)
        self.gs = self.font.getGlyphSet()
        self.cmap = self.font.getBestCmap()
        self.upem = self.font["head"].unitsPerEm
        self.hmtx = self.font["hmtx"]

    def width(self, text, size):
        return sum(self.hmtx[self.cmap[ord(c)]][0] for c in text) * size / self.upem

    def ink(self, text, size):
        lo, hi = 1e9, -1e9
        for c in text:
            bp = BoundsPen(self.gs)
            self.gs[self.cmap[ord(c)]].draw(bp)
            if bp.bounds:
                lo, hi = min(lo, bp.bounds[1]), max(hi, bp.bounds[3])
        return lo * size / self.upem, hi * size / self.upem  # (below baseline, above baseline)

    def paths(self, text, size, x, baseline):
        """One path string per character (so each can be coloured)."""
        s, out, cur = size / self.upem, [], x
        for c in text:
            g = self.cmap[ord(c)]
            pen = SVGPathPen(self.gs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
            self.gs[g].draw(TransformPen(pen, (s, 0, 0, -s, cur, baseline)))
            out.append(pen.getCommands())
            cur += self.hmtx[g][0] * s
        return out


def write(path: Path, text: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def png(svg: Path, w: int, h: int):
    out = svg.with_suffix(".png")
    subprocess.run(["rsvg-convert", "-w", str(w), "-h", str(h), "-o", str(out), str(svg)], check=True)
    return out


def stars(w, h, n, seed, only_right_of=0):
    rnd = random.Random(seed)
    dots = []
    for _ in range(n):
        x, y = rnd.uniform(only_right_of, w), rnd.uniform(0, h)
        dots.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{rnd.uniform(.8, 2.1):.1f}" fill="#fff" opacity="{rnd.uniform(.25, .7):.2f}"/>')
    return "".join(dots)


# ----------------------------------------------------------------------------
# Cell 3 · banner background (Employee Center palette from the portal mock-up)
# ----------------------------------------------------------------------------
def banner(w, h, uid, mascot=False, soft=False):
    ring_op = ".05" if not soft else ".04"
    bg = (
        f'<linearGradient id="bg{uid}" x1="0" y1="0" x2="1" y2="{.35 if h < 350 else .45}">'
        f'<stop offset="0" stop-color="#06466f"/><stop offset=".55" stop-color="#006f98"/><stop offset="1" stop-color="#2457aa"/></linearGradient>'
        f'<radialGradient id="gl{uid}" cx=".87" cy=".66" r=".28"><stop offset="0" stop-color="#8cc63e" stop-opacity=".42"/>'
        f'<stop offset="1" stop-color="#8cc63e" stop-opacity="0"/></radialGradient>'
    )
    body = f'<rect width="{w}" height="{h}" fill="url(#bg{uid})"/>'
    body += f'<rect width="{w}" height="{h}" fill="url(#gl{uid})"/>'
    body += (
        f'<circle cx="{w * .65:.0f}" cy="{-h * .3:.0f}" r="{h * .55:.0f}" fill="none" stroke="#fff" stroke-opacity="{ring_op}" stroke-width="{h * .2:.0f}"/>'
        f'<circle cx="{w * .56:.0f}" cy="{h * 1.65:.0f}" r="{h * .72:.0f}" fill="none" stroke="#fff" stroke-opacity="{ring_op}" stroke-width="{h * .2:.0f}"/>'
    )
    defs = bg
    if mascot:
        body += stars(w, h, 22, 11, only_right_of=w * .55)
        d, a = ami(f"hb{uid}", "happy", sparks=True, shadow=False)
        defs += d
        # important content stays in the central safe zone (x 120 .. w-120), right of the greeting area
        body += place(a, cx=w * .80, cy=h * .53, height=h * .74)
    return doc(w, h, f"0 0 {w} {h}", body, "Ami banner", defs)


# ----------------------------------------------------------------------------
# Cell 4 · build everything
# ----------------------------------------------------------------------------
def main():
    if not shutil.which("rsvg-convert"):
        sys.exit("rsvg-convert (librsvg) not found: install librsvg first")
    if OUT.exists():
        for p in OUT.iterdir():
            shutil.rmtree(p) if p.is_dir() else p.unlink()
    logos, banners, expr_dir, icon_dir, colors = (OUT / d for d in ("logos", "banners", "expressions", "app-icon", "colors"))
    manifest = []

    def add(file, size, use, field, fmt):
        manifest.append(dict(file=str(file.relative_to(OUT)), size=size, used_for=use, servicenow_field=field, format=fmt))

    # --- 1 · Otto chat logo  144x144 (svg + png) -----------------------------
    d, a = ami("cl", "happy", sparks=False, shadow=False)
    f = logos / "allnow_otto_chat_logo.svg"
    write(f, doc(144, 144, "0 0 144 144", place(a, 72, 72, 130), "Ami chat logo", d))
    add(f, "144 x 144 px (viewBox)", "Otto premium-chat header", "Assistant Designer > Assistants > Branding > Premium chat > Chat logo", "SVG")
    p = png(f, 144, 144)
    add(p, "144 x 144 px", "PNG fallback for the Otto chat header", "same field, PNG fallback", "PNG (transparent)")

    # --- 2 · Bot avatar  512x512, critical content inside the central 80% ----
    d, a = ami("av", "happy", sparks=False, shadow=False)
    f = logos / "_avatar_src.svg"
    write(f, doc(512, 512, "0 0 512 512", place(a, 256, 256, 512 * 0.80), "Ami bot avatar", d))
    p = png(f, 512, 512)
    p.rename(logos / "allnow_otto_avatar.png")
    f.unlink()
    add(logos / "allnow_otto_avatar.png", "512 x 512 px", "Bot profile / live profile picture", "Branding configuration > Bot Profile > Live Profile > Picture", "PNG (transparent, artwork inside central 80%)")

    # --- 3 · Portal logo lock-up  max 200x46 (light + dark header variants) ---
    ol = Outliner(FONT)
    word, split = "allNow", 3
    avail = 200 - 50 - 3
    size = avail / ol.width(word, 1.0)
    lo, hi = ol.ink(word, size)
    baseline = 23 + (hi + lo) / 2
    paths = ol.paths(word, size, 50, baseline)
    d, a = ami("pl", "happy", sparks=False, shadow=False)
    icon = place(a, 3 + 20, 23, 40)
    for name, c1, c2 in (("allnow_portal_logo.svg", C["midnight"], C["blue"]), ("allnow_portal_logo_on_dark.svg", C["white"], C["mint"])):
        txt = f'<path fill="{c1}" d="{"".join(paths[:split])}"/><path fill="{c2}" d="{"".join(paths[split:])}"/>'
        f = logos / name
        write(f, doc(200, 46, "0 0 200 46", icon + txt, "allNow", d))
    add(logos / "allnow_portal_logo.svg", "designed for max 200 x 46 px", "Employee Center header (light header)", "Service Portal > Service Portal Configuration > Branding Editor > Logo", "SVG (text outlined)")
    add(logos / "allnow_portal_logo_on_dark.svg", "designed for max 200 x 46 px", "Employee Center header (dark header)", "Branding Editor > Logo", "SVG (text outlined)")

    # --- 4 · Topic icon 56x56 (simplified, NOT the detailed Otto character) ---
    d, a = ami("ti", "happy", sparks=False, shadow=False, flat=True)
    f = logos / "allnow_topic_icon.svg"
    write(f, doc(56, 56, "0 0 56 56", place(a, 28, 28, 50), "Ami topic icon", d))
    p = png(f, 56, 56)
    add(p, "56 x 56 px", "Employee Center topic tile", "Employee Center topic configuration > Icon", "PNG (transparent)")
    add(f, "56 x 56 px (source)", "Editable source of the topic icon", "-", "SVG")

    # --- 5 · Banners ---------------------------------------------------------
    f = banners / "allnow_home_banner.svg"
    write(f, banner(1440, 400, "h", mascot=True))
    p = png(f, 1440, 400)
    add(p, "1440 x 400 px", "Employee Center home page (height fixed 400, width responsive; content kept central)", "Homepage / background image configuration", "PNG")
    f.rename(banners / "src_allnow_home_banner.svg")

    f = banners / "allnow_home_banner_background_only.svg"
    write(f, banner(1440, 400, "hb", mascot=False))
    p = png(f, 1440, 400)
    add(p, "1440 x 400 px", "Optional: home banner without the mascot", "Homepage / background image configuration", "PNG")
    f.rename(banners / "src_allnow_home_banner_background_only.svg")

    f = banners / "allnow_topic_banner.svg"
    write(f, banner(1258, 300, "t", mascot=False, soft=True))
    p = png(f, 1258, 300)
    add(p, "1258 x 300 px", "Employee Center topic pages (height fixed 300, width responsive; wide, low detail)", "Topic background image", "PNG")
    f.rename(banners / "src_allnow_topic_banner.svg")

    # --- 6 · Expressions (brand sheet: happy / wink / joy) -------------------
    for expr in ("happy", "wink", "joy"):
        d, a = ami(f"e{expr}", expr, sparks=True, shadow=True)
        f = expr_dir / f"ami_{expr}.svg"
        write(f, doc(512, 512, "22 19 400 400", a, f"Ami {expr}", d))
        add(png(f, 512, 512), "512 x 512 px", f"Expression: {expr}", "-", "PNG (transparent)")
        add(f, "vector", f"Expression: {expr}", "-", "SVG")

    # --- 7 · App icon (brand sheet: rounded square, Midnight gradient) -------
    d, a = ami("ap", "happy", sparks=True, shadow=False)
    grad = '<linearGradient id="apbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2a8a"/><stop offset="1" stop-color="#0A0E2A"/></linearGradient>'
    inner = '<rect width="1024" height="1024" rx="230" fill="url(#apbg)"/>' + place(a, 512, 540, 600)
    f = icon_dir / "ami_app_icon.svg"
    write(f, doc(1024, 1024, "0 0 1024 1024", inner, "Ami app icon", d + grad))
    add(png(f, 1024, 1024), "1024 x 1024 px", "App / bot icon for other platforms (Teams, Slack, mobile)", "-", "PNG")
    add(f, "vector", "App / bot icon source", "-", "SVG")

    # --- 8 · Colour tokens ---------------------------------------------------
    names = {"blue": "Ami Blue", "midnight": "Midnight", "mint": "Signal Mint", "coral": "Headset Coral", "gold": "Spark Gold"}
    write(colors / "ami_colors.json", json.dumps({n: {"name": names[k], "hex": C[k]} for n, k in zip(("ami-blue", "midnight", "signal-mint", "headset-coral", "spark-gold"), names)}, indent=2) + "\n")
    write(colors / "ami_colors.css", ":root{\n" + "".join(f"  --ami-{k.replace('blue','blue')}: {C[k]}; /* {names[k]} */\n" for k in names) + "}\n")

    write(OUT / "manifest.json", json.dumps(manifest, indent=2) + "\n")
    print(f"built {len(manifest)} files -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
