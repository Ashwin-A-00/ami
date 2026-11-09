# Contributing
- Branches: `main` (stable) · `feat/<topic>` · `fix/<topic>` · `assets/<topic>`.
- Commits: conventional style, e.g. `feat(product-intro): add Arabic RTL`, `assets: regenerate banners`.
- Don't hand-edit files in `design-handoff/brand-assets` or `wireframes/*.png` — edit `tools/*.py` and rebuild.

## First commit
```bash
git init -b main
git add .
git commit -m "chore: initial Ami repo (product-intro, servicenow-demo, design-handoff)"
git remote add origin <your-repo-url> && git push -u origin main
```
