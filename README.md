<!-- SPDX-License-Identifier: MIT -->
# Mitcad website

The source of [mitcad.org](https://mitcad.org/): a static page served by
GitHub Pages from the `main` branch of `mitcad/mitcad.github.io`.

- Plain HTML, CSS and a little JavaScript; no build step, no packages.
- `site.js` fills the download cards from the GitHub releases of
  `mitcad/Mitcad`; without it the cards link to the releases page.
- `CNAME` holds the custom domain; `.nojekyll` turns off Jekyll.
- Preview: serve the folder with any static file server and open it in a
  browser.

Licensed under the [MIT licence](LICENSE).
