# Thailander — Bilingual (EN/PT) Code

This package contains only code files to enable a language switcher without re-uploading heavy images.

## Files
- `index.html` — includes a language toggle button (EN/PT).
- `styles.css` — minor styles (tabs scroll + toggle button).
- `script.js` — switches labels and swaps image sources between EN and PT.
- `sw.js` — caches both EN and PT images; versioned to avoid old cache.

## How to use
1. Upload these code files to the **root** of your `thailanderporto` repo (replace existing ones).
2. Make sure you have **both** sets of images in `/images`:
   - English: `01.png ... 08.png`
   - Portuguese: `01-pt.png ... 08-pt.png`
3. Enable/confirm GitHub Pages (Settings → Pages → Deploy from branch → `main`).
4. Hard refresh on the phone after publishing.

The chosen language is remembered with `localStorage`. Default is EN.
