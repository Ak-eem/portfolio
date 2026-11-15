# Akeem Ganikale — Portfolio

A polished, mobile-first single-page portfolio for **Akeem Ganikale**, a Lagos-based computer engineer. The site is intentionally framework-free so it can render immediately on GitHub Pages, Vercel, or any static host.

## Included

- Responsive, mobile-first layout with desktop enhancements
- Accessible semantic HTML and keyboard-friendly links
- CSS-only project visuals with a subtle grain treatment
- Scroll-expanding intro, animated technology loop, cursor-tracking robot backdrop, and section transitions
- Selected projects: Mira, Vanta, Sentinel, and MB Luxe
- Contact links for WhatsApp, email, and GitHub

## Run locally

Open `index.html` directly in a browser, or serve the directory with any static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Smoke-test

Start the documented server from the repository root and open the homepage. Using only the keyboard, press `Tab` through the visible links, confirm the focus indicator stays visible as it moves, and press `Enter` on a link to check that it works.

For a not-found check, request a nonexistent path such as `/this-route-should-not-exist` on a server that supports custom static 404 pages. Confirm it displays the repository's `404.html`, then activate **Return to the portfolio** and confirm it opens the intended homepage. The documented Python server does not automatically route missing paths to `404.html`; perform this check on a suitably configured server or deployment. Confirm the actual custom-404 behavior on each deployment—GitHub Pages and Vercel can differ by configuration.

## Deploy

This repository has no build step. For GitHub Pages, set the Pages source to the `main` branch and root folder. For Vercel, import the repository and use the default static configuration.

## Files

- `index.html` — page structure, copy, metadata, and project content
- `styles.css` — responsive visual system and layout
- `scroll-expand.css` — visual treatment for the scroll-expanding intro
- `stack-loop.css` — animated horizontal technology loop
- `robot-background.css` — decorative robot backdrop
- `immersive-sections.css` — per-section scene styling and scroll reveals
- `script.js` — current year label and intro, stack, cursor, and scene interactions
- `404.html` — custom not-found page with a route back to the portfolio
- `ACCESSIBILITY.md` — accessibility review checklist and references
- `favicon.svg` — browser tab icon
- `og-image.svg` — social sharing image
- `robots.txt` — crawler directives
- `sitemap.xml` — sitemap entry for the portfolio
- `.nojekyll` — keeps GitHub Pages from running Jekyll processing
