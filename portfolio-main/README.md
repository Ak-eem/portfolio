# Akeem Ganikale — Portfolio

A polished, mobile-first single-page portfolio for **Akeem Ganikale**, a Lagos-based computer engineer. The site is intentionally framework-free so it can render immediately on GitHub Pages, Vercel, or any static host.

## Included

- Responsive, mobile-first layout with desktop enhancements
- Accessible semantic HTML and keyboard-friendly links
- CSS-only project visuals with a subtle grain treatment
- Lightweight pointer interaction with reduced-motion support
- Selected projects: Mira, Vanta, Sentinel, and MB Luxe
- Contact links for WhatsApp, email, and GitHub

## Run locally

Open `index.html` directly in a browser, or serve the directory with any static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

This repository has no build step. For GitHub Pages, set the Pages source to the `main` branch and root folder. For Vercel, import the repository and use the default static configuration.

## Files

- `index.html` — page structure, copy, metadata, and project content
- `styles.css` — responsive visual system and layout
- `script.js` — year label and a small progressive-enhancement interaction
- `.nojekyll` — keeps GitHub Pages from running Jekyll processing
