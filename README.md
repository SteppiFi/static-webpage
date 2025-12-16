# SteppiFi Finance — Static Landing Site

SteppiFi Finance (steppifi.finance) — a mobile-first, SEO-friendly single-page landing site for an Indian goal-based financial planning platform. Built with HTML, CSS and vanilla JavaScript.

Target audience: Young professionals in India, first-time investors, salaried individuals, and people who want structured financial planning.


Files created:
- `index.html` — Main page with Hero, About, Features, How it works, Contact, Footer
- `styles.css` — Mobile-first CSS styles (no frameworks)
- `script.js` — Minimal JavaScript for smooth scrolling and small UI interactions

How it works

- This repository contains a static landing page only. There is no waitlist form, analytics collection, or server-side delivery in this branch. If you need a waitlist or server-side delivery, implement it in a separate, access-controlled service.

How to run locally

Option 1 (quick):
- Open `index.html` in your browser (double-click or use the browser File -> Open).

Option 2 (recommended for best behavior):
- From the project root run a small local server. For macOS / zsh you can run:

```bash
# Python 3
python3 -m http.server 8000
# Then open http://localhost:8000 in your browser
```

Deploying the site

- GitHub Pages: Commit the repository and enable GitHub Pages on the `main` branch (or `gh-pages` branch). The site will be served as static files. A `CNAME` file has been added with `steppifi.finance` to help with a custom domain setup.
- To publish the primary domain (`steppifi.finance`), add the appropriate A/ALIAS records or an `ALIAS`/`ANAME` at your DNS provider pointing your apex to GitHub Pages or follow GitHub's custom domain docs.
- Redirect for `steppifyfinance.com`: A small static redirect site is included in `redirect-steppify/` (an `index.html` that redirects to `https://steppifi.finance` and a `CNAME` with `steppifyfinance.com`). To use it, deploy that folder as a separate GitHub Pages site (new repository or `gh-pages` branch) for the `steppifyfinance.com` domain, or alternatively configure registrar-level domain forwarding to point to `https://steppifi.finance`.

Serverless function (automatic delivery)

- The serverless/email helper and local server were removed from this branch to keep it static-only. If you need automated delivery, reintroduce a serverless function or a small API in a separate, secure service and set any necessary endpoints there.

Quick local test

- GitHub Pages: Commit the repository and enable GitHub Pages on the `main` branch (or `gh-pages` branch). The site will be served as static files.
- Vercel: Install Vercel CLI or connect the repo in the Vercel dashboard — Vercel will detect a static site and publish it.

Serverless and local helpers removed

- The serverless/email helper and local test server have been removed from this branch to keep the repository strictly static. If you require automated waitlist delivery or analytics, implement those components in a separate, access-controlled service and do not commit secrets to this repo.

Privacy & consent

- This static landing page does not collect emails or analytics by itself. If you later add a waitlist, ensure you obtain explicit consent and comply with applicable privacy laws.

Notes
- No external assets are required; icons use emoji placeholders.
- The repo includes a `CNAME` with `steppifi.finance` for easy GitHub Pages deployment and a helper folder `redirect-steppify/` to host a small redirect for `steppifyfinance.com` if you prefer to host the redirect as a separate Pages site.


Deploy notes
- Serverless function examples were removed from this branch; implement server-side endpoints in a dedicated, secure project if needed.
- For AWS Lambda / other providers: adapt the handler or wrap the logic similarly; the core `sendWithSendGrid`/`sendWithSMTP` functions can be reused.
Design/Tech decisions
- Vanilla HTML/CSS/JS for small footprint and portability.
- Mobile-first responsive layout with an accent color for CTAs.

License
- Free to use and adapt.