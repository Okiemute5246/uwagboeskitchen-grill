# Uwagboe's Kitchen & Grill: Website Concept

A light, Nigerian-themed one-page website concept for **Uwagboe's Kitchen & Grill**, Edinburgh's first Nigerian restaurant. It uses plain HTML, CSS and JavaScript, so there's no build step.

## Files

```
index.html    → the whole site: homepage + full menu & prices (one page, two views)
styles.css    → all styles: theme, Ankara pattern, layout, menu page
script.js     → scroll animations, menu tabs, mobile nav, menu search/filters, view router
images/       → stock photos (Pexels)
```

## How it fits together
It's one page with two views:
- **Home:** `index.html` and its anchors `#story`, `#catering`, `#gallery`, `#visit`
- **Full menu:** `index.html#/menu`. Each section has its own link too, e.g. `#/menu/soups` or `#/menu/drinks`.

The browser's back/forward buttons work, and you can share links to any section directly. Everything runs from the one file, so it works the same on GitHub Pages or opened straight from a folder.

## Run locally
Open `index.html` in a browser.

## Deploy on GitHub Pages
1. Create a new repo, e.g. `uwagboes-kitchen`.
2. Upload `index.html`, `styles.css`, `script.js` and the `images/` folder.
3. Go to **Settings → Pages**, then under **Build and deployment** pick *Deploy from a branch* → `main` / `root`.
4. The site will be live at `https://<your-username>.github.io/uwagboes-kitchen/`.

## Photos
All photos are free stock images from [Pexels](https://www.pexels.com/license/). They're free for commercial use and need no attribution. They're saved in `/images`, so the site doesn't depend on any outside image host.

To use the restaurant's own photos later, replace a file in `/images` with a new one of the same name.

| File | Source |
|---|---|
| `hero-jollof.jpg` | https://www.pexels.com/photo/17952746/ |
| `story-interior.jpg` | https://www.pexels.com/photo/32477666/ |
| `catering-buffet.jpg` | https://www.pexels.com/photo/28736731/ |
| `suya.jpg` | https://www.pexels.com/photo/11112700/ |
| `asun.jpg` | https://www.pexels.com/photo/37080255/ |
| `tilapia.jpg` | https://www.pexels.com/photo/13915043/ |
| `grilled-chicken.jpg` | https://www.pexels.com/photo/40262791/ |
| `jollof-plantain.jpg` | https://www.pexels.com/photo/17952748/ |
| `fried-rice.jpg` | https://www.pexels.com/photo/18805640/ |
| `jollof-chicken.jpg` | https://www.pexels.com/photo/37538487/ |
| `rice-box-combo.jpg` | https://www.pexels.com/photo/13994299/ |
| `platter-share.jpg` | https://www.pexels.com/photo/36458103/ |
| `platter-one.jpg` | https://www.pexels.com/photo/37324427/ |
| `dodo.jpg` | https://www.pexels.com/photo/27556971/ |
| `gizdodo.jpg` | https://www.pexels.com/photo/6210449/ |
| `egusi.jpg` | https://www.pexels.com/photo/35490114/ |
| `efo-riro.jpg` | https://www.pexels.com/photo/37648018/ |
| `poundo-soup.jpg` | https://www.pexels.com/photo/633627/ |
| `assorted-meat.jpg` | https://www.pexels.com/photo/37648014/ |
| `g-chef.jpg` | https://www.pexels.com/photo/28074289/ |
| `g-dining.jpg` | https://www.pexels.com/photo/37394262/ |
| `g-suya-vendor.jpg` | https://www.pexels.com/photo/31120524/ |
| `g-jollof-pot.jpg` | https://www.pexels.com/photo/36707708/ |
| `g-feast.jpg` | https://www.pexels.com/photo/6192003/ |
| `g-akara.jpg` | https://www.pexels.com/photo/31233606/ |
| `g-akara-pap.jpg` | https://www.pexels.com/photo/37624176/ |
| `g-vendor.jpg` | https://www.pexels.com/photo/32475477/ |

## Updating prices
All prices on the full menu were copied from the restaurant's online ordering page in November 2026. To change a price, search `index.html` for the dish name and edit the price next to it, inside `<span class="mitem__price">`. Dishes priced by protein list each option and its price under the description.

## Content to confirm with the restaurant
- **Menu items:** the dish names and descriptions are based on their online ordering page. The photos are stock images chosen to match each dish, not their actual food. Prices are left out, so the button links to the full menu.
- **Locations:** public listings show Leith Walk and Gorgie Road. The current site also lists 57A Frederick Street. Confirm which branches are open.
- **Hours:** taken from the live site. Some listings show different hours per branch, for example Monday closed at Leith Walk.
- **Stats:** the stats (15+ staff, 4.5★) come from public listings. Update them as needed.
- **Order / Book buttons:** they currently link to the existing site. Point them at the real ordering and booking URLs.

## Accessibility & performance
- Respects `prefers-reduced-motion`, which turns off all animation.
- Semantic sections, ARIA on the tabs and mobile menu.
- No frameworks. Only Google Fonts loads from outside the repo.
