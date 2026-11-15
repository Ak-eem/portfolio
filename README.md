# Akeem Ganikale — Portfolio

A polished, mobile-first single-page portfolio for **Akeem Ganikale**, a Lagos-based computer engineer. The site is framework-free and served as static files. The live homepage is `index.html`, which loads `styles.css`; no build step is required.

## Included

- Responsive, mobile-first layout with desktop enhancements
- Semantic HTML, a skip-to-main-content link, and visible keyboard-focus styles
- Four project case studies: Mira, Vanta, Sentinel, and MB Luxe
- Contact links for WhatsApp, email, and GitHub
- Static HTML and CSS; the root homepage currently loads no JavaScript

Some additional CSS and JavaScript files are present in the repository but are not linked by the root homepage. They do not provide active page interactions unless they are explicitly connected in `index.html`.

## Run locally

Open `index.html` directly in a browser, or serve the repository root with any static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Smoke-test

Start the documented server from the repository root and open the homepage. Using only the keyboard, press `Tab` through the visible links, confirm the focus indicator stays visible as it moves, and press `Enter` on a link to check that it works.

For a not-found check, request a nonexistent path such as `/this-route-should-not-exist` on a server that supports custom static 404 pages. Confirm it displays the repository's `404.html`, then activate **Return to the portfolio** and confirm it opens the intended homepage. The documented Python server does not automatically route missing paths to `404.html`; perform this check on a suitably configured server or deployment. GitHub Pages and Vercel can differ by configuration, so verify the deployed behavior.

## Deploy

This repository has no build step. For GitHub Pages, set the Pages source to the `main` branch and root folder. For Vercel, import the repository and use its default static configuration.

The root HTML uses origin-root asset paths such as `/styles.css` and `/favicon.svg`. These work when the site is served from the domain root; a GitHub Pages project URL under `/portfolio/` needs adjusted asset paths or a root/custom domain.

## Files

- `index.html` — homepage structure, copy, metadata, and project content
- `styles.css` — linked responsive layout and visual styling
- `404.html` — custom not-found page with a route back to the portfolio
- `ACCESSIBILITY.md` — accessibility review checklist and references
- `favicon.svg` — browser tab icon
- `og-image.svg` — social sharing image
- `robots.txt` — crawler directives
- `sitemap.xml` — portfolio sitemap entry
- `.nojekyll` — prevents GitHub Pages from running Jekyll processing

The following files are also in the repository but are not linked by the root `index.html`; `styles.css` does not import the extra stylesheets. They are not part of the live homepage's current styling or behavior:

- `scroll-expand.css`
- `stack-loop.css`
- `robot-background.css`
- `immersive-sections.css`
- `script.js`
