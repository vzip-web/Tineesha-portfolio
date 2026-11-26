# Tineesha Logeeth – Portfolio

A static portfolio prepared from the supplied HTML and Markdown. The black/red design, thirteen design works, brand logos and TIYO guide are retained. Images are forty separate WebP files. The browser needs no framework, API keys, database or paid hosting; the deployment build uses Terser to minify JavaScript.

Repository: https://github.com/vzip-web/Tineesha-portfolio

Expected Pages address after deployment: https://vzip-web.github.io/Tineesha-portfolio/

## GitHub Pages setup

1. Upload the contents of this folder into the repository root. `index.html`, `assets/`, `scripts/` and `.github/` must be at the top level, with no extra containing folder.
2. Open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow** if the initial push ran before Pages was configured.
4. Wait for the workflow to succeed, then open the deployment URL shown in the workflow or Pages settings.

The included workflow validates the files and publishes only the website files in `_site/`. Subsequent pushes to `main` deploy automatically. Use Git, GitHub Desktop or an upload method that preserves the `.github/` folder.

Alternative: this is also compatible with **Deploy from a branch → main → /(root)**. The `.nojekyll` file enables plain static hosting. Choose one publishing method.

Official documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Files

- `index.html`: portfolio markup, text and contact form.
- `assets/css/styles.css`: original styling and small accessibility additions.
- `assets/js/main.js`: galleries, animations, navigation, skills and email draft handling.
- `assets/js/tiyo.js`: browser-local keyword guide. It does not use an AI API.
- `assets/js/*.min.js`: generated scripts served to visitors; edit the readable source files and run the build to regenerate them.
- `assets/images/`: thirteen artworks, thirteen hero thumbnails, six client logos and eight software icons.
- `assets/favicon.svg`: favicon derived from the supplied logo.
- `404.html`, `robots.txt`, `.nojekyll`: static hosting support.
- `doc/cv.pdf`: resume downloaded from the original portfolio link and verified as a PDF.
- `.github/workflows/deploy-pages.yml`: validation and deployment workflow.
- `scripts/`: dependency-free Node.js validation, staging and local preview utilities.

## Local preview and validation

With Node.js 22 or newer installed, open this folder in a terminal:

```sh
npm run check
npm start
```

Open `http://127.0.0.1:4173/Tineesha-portfolio/`. Stop with Ctrl+C. Preview and validation use Node.js alone. For a fresh deployment build, run `npm ci --ignore-scripts`, then `npm run build`; this regenerates minified scripts, validates the site and copies public files into `_site/`. GitHub Actions does this automatically.

## Current content and integrations

- **Contact:** the form checks the first name and email, then opens a prefilled draft in the visitor’s configured email app. The visitor sends the message from that app. The site does not send or store messages itself. Email and WhatsApp links are available as alternatives.
- **Video Editing:** the supplied page contains four placeholders. Replace these with real video links or embeds when supplied; no videos were invented.
- **Resume:** downloaded from the supplied portfolio’s original URL `https://tineesha-logeeth.github.io/doc/cv.pdf` on 26 November 2026 (HTTP 200; PDF signature verified). The page and TIYO now link to the local `./doc/cv.pdf`, so the resume is hosted with this portfolio. Replace this file when the resume changes.
- **Fonts:** Google Fonts remains an external dependency; local system fonts are fallbacks.
- **Drive/social links:** original links are retained. The Drive collection must allow the intended visitors to view it.

Relative asset URLs support both this repository’s `/Tineesha-portfolio/` path and a domain root. Update the 404 return link and this README if the repository is renamed or a custom domain is added. No `CNAME`, sitemap or canonical URL is guessed for a different host.

## Updating the site

Edit text in `index.html`. For design gallery entries, search for `const G=` in `assets/js/main.js`; each item has image path `s`, title `t`, caption `g`, width `w` and height `h`. Hero images use `const P=`. TIYO has its own text in `assets/js/tiyo.js`, so update it when portfolio details change. Commit and push to `main` to publish updates; the workflow regenerates the minified scripts from these readable sources.

## Mobile layout and scrolling update — 26 November 2026

At widths up to 900px, the navbar uses equal logo/menu columns and a central Connect button. The name label is hidden consistently across mobile widths. The layout is based on viewport width, without browser or operating-system detection.

Scrolling uses native touch, wheel, keyboard and trackpad behavior. The home-to-about transition zooms and fades the artwork while the title recedes, with a lighter zoom on mobile. Supporting browsers use CSS view timelines; older browsers update only the two hero layers through the existing passive scroll frame. The hero background also slides continuously in three CSS transform tracks, with identical paired image groups for seamless loops and enough thumbnails to cover the viewport. These tracks pause offscreen or in hidden pages. Reduced-motion preferences are respected. Only width changes rebuild the image rows, so mobile browser toolbar height changes do not restart the slides. The earlier page-wide 3D effects and custom wheel/key interception are not used.

The forty WebP assets total 1,070,500 bytes, down from 1,257,750 bytes (14.9%). The main interaction script served to visitors is 11,816 bytes, down from 26,089 bytes. The gallery retains its original artwork dimensions and loads images lazily.

Local Chromium checks covered desktop 1440×900, Pixel 6-sized 412×915, iPhone-sized 390×844 and small Android 360×800 viewports. In all three mobile widths, the Connect button center matched the navbar center exactly (0px offset), with no horizontal overflow. Mobile menu, gallery navigation, lightbox controls, TIYO and invalid-email rejection were checked. Physical phones and mobile Safari were not available for testing. Background rendering throttled frame-timing probes, so no FPS or universal lag-free guarantee is claimed.
