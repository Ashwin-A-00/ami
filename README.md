**Live:** [Landing](https://ashwin-a-00.github.io/ami/) · [Product Intro](https://ashwin-a-00.github.io/ami/apps/product-intro/) · [ServiceNow Demo](https://ashwin-a-00.github.io/ami/apps/servicenow-demo/)
# Ami Â· allnex Employee Center mascot

Ami is the digital service-desk colleague for allnex's ServiceNow Employee Center ("allNow").
This repo keeps the three deliverables **separate**, so each can be handed to a different team.

```
ami/
â”œâ”€ apps/
â”‚  â”œâ”€ product-intro/      Standalone brochure site (loader, localised text, chat demo)
â”‚  â””â”€ servicenow-demo/    Employee Center wireframe with Ami embedded (hero, navbar, chat)
â”œâ”€ design-handoff/        Hand this folder to the design / ServiceNow config team
â”‚  â”œâ”€ brand-assets/       Logos, avatar, icons, banners to spec  (+ manifest.json)
â”‚  â”œâ”€ wireframes/         4 annotated wireframes (HTML + PNG) mapping assets to fields
â”‚  â”œâ”€ reference/          Original files as received (brand sheet, mock-up, wireframe v4)
â”‚  â””â”€ SPEC.md             The dimension table with delivery status
â”œâ”€ tools/                 Generators: build_assets.py, build_wireframes.py (+ font)
â””â”€ dist/                  Zips for sharing (git-ignored)
```

## Run the apps
Static HTML, no build step. In VS Code open a folder under `apps/` and use **Live Server** (Go Live) on `index.html`.

## Rebuild the design assets
```bash
pip install -r tools/requirements.txt && playwright install chromium   # librsvg (rsvg-convert) also required
python3 tools/build_assets.py        # -> design-handoff/brand-assets
python3 tools/build_wireframes.py    # -> design-handoff/wireframes
```
Everything is generated from one vector drawing of Ami, so a change in `build_assets.py` updates every size.

## Known caveats
- The SVG Ami is a **redraw** approximating the official 960Ã—960 raster master. Ask the designer for the official vector and swap it in `ami()`.
- The "allNow" wordmark is outlined from Nunito Black (no kerning) â€” treat as a placeholder lockup until brand approves.
- The launcher bubble is not in the ServiceNow spec; it reuses the chat logo (assumption).
- Translations in the product brochure (nl de fr es it hi ja ar) are unreviewed.
- Animations exist only in the HTML prototypes; ServiceNow itself takes the static assets.

See `CONTRIBUTING.md` for branching and first-commit commands.

