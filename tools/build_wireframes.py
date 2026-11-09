#!/usr/bin/env python3
"""Builds 4 annotated lo-fi wireframes (HTML + PNG) in design-handoff/wireframes/.
Numbered pins map to the asset legend under each screen.   python3 tools/build_wireframes.py
Needs: pip install playwright (+ chromium)."""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
WF = ROOT / "design-handoff" / "wireframes"
ASSETS = "../brand-assets"

CSS = """
:root{--blue:#4A6BFF;--mid:#0A0E2A;--mint:#7DF9E3;--coral:#FF9A76;--gold:#FFD166;--line:#c9cfe0;--bg:#f4f6fb}
*{box-sizing:border-box}body{margin:0;background:var(--bg);font:14px/1.45 system-ui,Segoe UI,Arial,sans-serif;color:#1c2240;padding:28px}
h1{margin:0 0 4px;font-size:20px}.sub{color:#5b6488;margin:0 0 18px}
.screen{background:#fff;border:2px solid var(--line);border-radius:10px;position:relative;overflow:hidden}
.bar{height:46px;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:16px;padding:0 14px;position:relative}
.bar .nav{display:flex;gap:14px;margin-left:auto;color:#8a93b3}.bar .nav i{display:block;width:54px;height:8px;background:#e1e5f0;border-radius:4px}
.ph{background:repeating-linear-gradient(45deg,#eef1f8,#eef1f8 8px,#e6eaf4 8px,#e6eaf4 16px);border:1.5px dashed #9aa4c6;display:flex;align-items:center;justify-content:center;color:#5b6488;font-size:12px;text-align:center;position:relative}
.ph img{display:block}.ph.img{background:none;border:1.5px dashed var(--blue)}
.pin{position:absolute;z-index:5;width:22px;height:22px;border-radius:50%;background:var(--coral);color:#fff;font:700 12px/22px system-ui;text-align:center;box-shadow:0 0 0 3px #fff}
.line{height:10px;background:#e1e5f0;border-radius:5px;margin:8px 0}.w60{width:60%}.w40{width:40%}.w80{width:80%}
.grid{display:grid;gap:14px}.tile{border:1px solid var(--line);border-radius:8px;padding:12px;display:flex;flex-direction:column;align-items:center;gap:8px;position:relative}
.legend{margin-top:18px;background:#fff;border:1px solid var(--line);border-radius:10px;padding:14px 18px}
.legend h2{margin:0 0 8px;font-size:15px}.legend table{width:100%;border-collapse:collapse}
.legend td,.legend th{padding:7px 8px;border-bottom:1px solid #e8ebf4;text-align:left;vertical-align:top}.legend th{color:#5b6488;font-weight:600;font-size:12px}
.legend td:first-child{width:34px}.legend .pin{position:static;display:inline-block}.legend code{background:#eef1f8;padding:1px 5px;border-radius:4px;font-size:12px}
.note{background:#fff8e1;border:1px solid var(--gold);border-radius:8px;padding:10px 14px;margin-top:14px;font-size:13px}
.fab{position:absolute;right:22px;bottom:22px}
"""

def pin(n, style): return f'<span class="pin" style="{style}">{n}</span>'

def legend(rows, note=""):
    body = "".join(f'<tr><td><span class="pin">{n}</span></td><td><b>{a}</b></td><td><code>{f}</code></td><td>{s}</td><td>{fld}</td></tr>' for n, a, f, s, fld in rows)
    return (f'<div class="legend"><h2>Asset legend</h2><table><tr><th></th><th>Element</th><th>File</th><th>Size</th><th>ServiceNow field</th></tr>{body}</table></div>'
            + (f'<div class="note">{note}</div>' if note else ""))

def page(title, sub, screen, leg, width):
    return f'<!doctype html><html><head><meta charset="utf-8"><title>{title}</title><style>{CSS}body{{width:{width}px}}</style></head><body><h1>{title}</h1><p class="sub">{sub}</p>{screen}{leg}</body></html>'

def topbar(logo=True):
    lg = f'<div class="ph img" style="width:200px;height:46px;padding:0"><img src="{ASSETS}/logos/allnow_portal_logo.svg" width="200" height="46">{pin(1,"left:-8px;top:-8px")}</div>' if logo else ""
    return f'<div class="bar">{lg}<div class="nav"><i></i><i></i><i></i></div></div>'

def tiles(n=6, icon=True):
    t = "".join(f'<div class="tile"><div class="ph img" style="width:56px;height:56px"><img src="{ASSETS}/logos/allnow_topic_icon.png" width="56" height="56">{pin(3,"right:-8px;top:-8px") if i==0 else ""}</div><div class="line w60"></div></div>' for i in range(n))
    return f'<div class="grid" style="grid-template-columns:repeat(3,1fr);padding:18px 24px">{tiles_inner(t)}</div>'
def tiles_inner(t): return t

SCREENS = {}

# 01 home ---------------------------------------------------------------
home = f'''<div class="screen" style="height:860px">{topbar()}
<div style="position:relative;height:400px"><img src="{ASSETS}/banners/allnow_home_banner.png" style="width:100%;height:400px;object-fit:cover;display:block">
<div style="position:absolute;left:60px;top:120px;color:#fff;width:420px"><div class="line" style="background:#ffffff66;width:300px;height:18px"></div><div class="line" style="background:#ffffff44;width:380px"></div>
<div style="background:#fff;border-radius:8px;height:44px;margin-top:20px;opacity:.9;padding:12px;color:#8a93b3">Search allNow…</div></div>{pin(2,"left:8px;top:8px")}
<div style="position:absolute;left:120px;right:120px;top:0;bottom:0;border-left:1.5px dashed #ffffff99;border-right:1.5px dashed #ffffff99"></div>
<span style="position:absolute;left:128px;bottom:8px;color:#fff;font-size:11px">central safe zone: keep key content between the dashed lines</span></div>
{tiles()}
<div class="fab ph img" style="width:64px;height:64px;border-radius:50%;background:#fff"><img src="{ASSETS}/logos/allnow_otto_chat_logo.png" width="52" height="52">{pin(4,"left:-10px;top:-10px")}</div></div>'''
SCREENS["01-employee-center-home"] = ("Employee Center · Home", "Ami appears in four places: portal logo, home banner, topic tiles and the chat launcher.", home, legend([
 (1,"Portal logo","allnow_portal_logo.svg","max 200 × 46","Branding Editor › Logo"),
 (2,"Home banner (hero Ami is the only reactive one)","allnow_home_banner.png","1440 × 400","Homepage background image"),
 (3,"Topic icon (simplified, not the detailed mascot)","allnow_topic_icon.png","56 × 56","Topic configuration › Icon"),
 (4,"Chat launcher (reuses chat logo — assumption)","allnow_otto_chat_logo.png","144 × 144","Premium chat › Chat logo")],
 "Motion rule from the prototype: only the hero Ami follows the cursor and reacts on hover. Navbar, search and chat Ami stay calm (no blinking). Launcher blinks on click only. Animations live in the prototype (apps/servicenow-demo); ServiceNow itself takes static assets."), 1440)

# 02 chat ---------------------------------------------------------------
chat = f'''<div class="screen" style="height:700px;background:#e9edf7">
<div class="bar" style="background:#fff;height:40px;gap:8px"><span style="width:12px;height:12px;border-radius:50%;background:#ff6b6b"></span><span style="width:12px;height:12px;border-radius:50%;background:#ffd166"></span><span style="width:12px;height:12px;border-radius:50%;background:#7DF9E3"></span>
<div class="ph img" style="margin-left:14px;height:28px;width:230px;border-radius:14px;justify-content:flex-start;gap:8px;padding-left:8px;background:#f4f6fb"><img src="{ASSETS}/logos/allnow_otto_chat_logo.png" width="18" height="18"><span>allNow</span>{pin(3,"right:-8px;top:-10px")}</div></div>
<div style="position:absolute;right:30px;top:70px;width:360px;height:600px;background:#fff;border-radius:14px;border:1px solid var(--line);box-shadow:0 8px 30px #0002;overflow:hidden">
<div style="background:var(--mid);height:72px;display:flex;align-items:center;gap:12px;padding:0 14px;color:#fff;position:relative">
<div class="ph img" style="width:48px;height:48px;background:#fff;border-radius:50%"><img src="{ASSETS}/logos/allnow_otto_chat_logo.png" width="40" height="40">{pin(1,"left:-10px;top:-10px")}</div><b>Ami</b><span style="margin-left:auto;opacity:.6">–  ✕</span></div>
<div style="padding:16px"><div style="display:flex;gap:10px;align-items:flex-start"><div class="ph img" style="width:40px;height:40px;border-radius:50%"><img src="{ASSETS}/logos/allnow_otto_avatar.png" width="36" height="36">{pin(2,"right:-10px;top:-10px")}</div>
<div style="background:#eef1f8;border-radius:12px;padding:10px 12px;flex:1"><div class="line w80"></div><div class="line w60"></div></div></div>
<div style="background:var(--blue);border-radius:12px;padding:10px 12px;width:60%;margin:16px 0 0 auto"><div class="line" style="background:#ffffff88"></div></div></div></div></div>'''
SCREENS["02-otto-chat-window"] = ("Otto chat window", "Chat header logo, bot profile picture and browser-tab identity.", chat, legend([
 (1,"Chat header logo","allnow_otto_chat_logo.svg / .png","144 × 144","Assistant Designer › Branding › Premium chat › Chat logo"),
 (2,"Bot profile picture","allnow_otto_avatar.png","512 × 512, transparent, art inside central 80%","Branding configuration › Bot Profile › Live Profile › Picture"),
 (3,"Browser-tab identity (same asset as chat header logo)","allnow_otto_chat_logo.png","144 × 144 (scaled by browser)","Same as 1")],
 "The avatar is shown in a circle in ServiceNow, which is why the artwork stays inside the central 80%."), 1100)

# 03 topic ---------------------------------------------------------------
topic = f'''<div class="screen" style="height:620px">{topbar()}
<div style="position:relative;height:300px;background:#06466f"><img src="{ASSETS}/banners/allnow_topic_banner.png" style="width:100%;height:300px;object-fit:cover;display:block">
<div style="position:absolute;left:40px;top:110px;display:flex;gap:16px;align-items:center"><div class="ph img" style="width:56px;height:56px;background:#fff1"><img src="{ASSETS}/logos/allnow_topic_icon.png" width="56" height="56">{pin(2,"right:-10px;top:-10px")}</div><div style="color:#fff;font-size:26px;font-weight:700">Topic title</div></div>{pin(1,"left:8px;top:8px")}</div>
<div style="padding:20px 40px"><div class="line w80"></div><div class="line w60"></div><div class="line w40"></div></div></div>'''
SCREENS["03-topic-page"] = ("Employee Center · Topic page", "Wide, low-detail banner (no mascot) so text stays readable.", topic, legend([
 (1,"Topic banner (no mascot, low detail)","allnow_topic_banner.png","1258 × 300","Topic background image"),
 (2,"Topic icon","allnow_topic_icon.png","56 × 56","Topic configuration › Icon")]), 1258)

# 04 brochure ----------------------------------------------------------
bro = f'''<div class="screen" style="height:900px;background:var(--mid);color:#fff">
<div class="bar" style="background:#0f1438;border-color:#ffffff22"><b>Ami</b><span style="color:#7DF9E3">calm</span><div class="nav"><i style="background:#ffffff33"></i><i style="background:#ffffff33"></i><span style="color:#fff">🌐 EN ▾</span></div>{pin(3,"right:90px;top:12px")}</div>
<div style="display:flex;height:360px;align-items:center;gap:50px;padding:0 60px;position:relative">
<div class="ph img" style="width:260px;height:270px;background:none;border-color:#7DF9E3;color:#7DF9E3">hero Ami<br>REACTIVE<br>cursor follow + hover wink + click joy{pin(1,"left:-10px;top:-10px")}</div>
<div><div style="font-size:42px;font-weight:800">Ami ✦</div><div class="line" style="background:#ffffff44;width:320px"></div><div class="line" style="background:#ffffff33;width:240px"></div><div style="color:#7DF9E3;font-size:12px;margin-top:10px">locale chip: "Detected: nl-NL" {pin(4,"position:static;display:inline-block")}</div></div></div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;padding:0 40px">{"".join('<div style="background:#ffffff12;border-radius:10px;height:110px;padding:14px"><div class="line" style="background:#ffffff44"></div></div>' for _ in range(4))}</div>
<div style="display:flex;gap:14px;padding:20px 40px">{"".join('<div class="ph" style="flex:1;height:130px;background:#ffffff10;border-color:#ffffff55;color:#cfd6ff">Ami (calm)</div>' for _ in range(3))}<span class="pin" style="position:static;margin-top:-6px">2</span></div>
<div style="padding:0 40px;color:#cfd6ff">Chat demo · icon set · colours · file table (all localised)</div>
<div style="position:absolute;inset:0;background:#0A0E2Acc;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;top:0;height:0;overflow:hidden"></div></div>'''
SCREENS["04-product-intro-brochure"] = ("Product Intro brochure", "Standalone page (apps/product-intro). Loader first, then the page. Text follows the visitor's language.", bro, legend([
 (1,"Hero Ami — the only reactive mascot","(inline SVG, apps/product-intro/app.js)","≈ 260 px","—"),
 (2,"Expression cards / chat / icon set Ami — calm","(inline SVG)","—","—"),
 (3,"Language selector (auto-picked, user can override, remembered)","i18n.js","—","navigator.languages → navigator.language → Intl resolvedOptions().locale → English"),
 (4,"Locale chip showing the detected locale","i18n.js","—","—")],
 "Loader: full-screen midnight with starfield, Ami floating, a localised status line and a 0–100% bar; Ami switches to joy at 100% then the page reveals. Supported UI languages: en nl de fr es it hi ja ar (Arabic switches to RTL). Translations are unreviewed."), 1200)

def main():
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, (title, sub, screen, leg, width) in SCREENS.items():
            f = WF / f"{name}.html"
            f.write_text(page(title, sub, screen, leg, width), encoding="utf-8")
            pg = b.new_page(viewport={"width": width + 56, "height": 800}, device_scale_factor=1)
            pg.goto(f.as_uri()); pg.wait_for_timeout(300)
            pg.screenshot(path=str(WF / f"{name}.png"), full_page=True)
            pg.close(); print("built", name)
        b.close()

if __name__ == "__main__":
    main()
