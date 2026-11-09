# Product Intro (brochure)
Standalone one-page brochure for Ami. Open `index.html` with VS Code Live Server.

- **Loader**: midnight screen, floating Ami, localised status text, 0–100% bar, joy burst, then page reveal.
- **Language**: order is saved choice → `navigator.languages` → `navigator.language` → `Intl.DateTimeFormat().resolvedOptions().locale` → English. Both values are logged to the console (`Browser Language:`, `Resolved Locale:`). Switcher in the header; Arabic flips to RTL.
- **Languages**: en nl de fr es it hi ja ar (unreviewed translations in `i18n.js`).
- **Motion rule**: only the hero Ami reacts (cursor follow, hover wink, click joy). All others are calm.

Files: `index.html` markup · `styles.css` · `i18n.js` strings + detection · `app.js` mascot, loader, chat demo.
