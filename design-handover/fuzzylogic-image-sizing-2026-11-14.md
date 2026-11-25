# Fuzzy Logic: image sizing and article layout (notes, 2026-11-14)

Status (updated 2026-11-15): nothing pushed. Work is split in two:

- **Small, committed:** branch `narrow-centred-column` (from `main`), commit `3efbb504`. It narrows `.l-center--wrapper-narrow` to `--measure`, updates the image plugin's `sizes` and removes `--h1-measure` (see below).
- **Full prototype, stashed:** `stash@{0}` ("image-sizing prototype: full change"), taken on branch `image-sizing-and-aspect-ratios`. It holds the shape-tagging PostHTML plugin, the figure/img CSS, the markdown-it plugin reorder and the Henke `{.img-4x3}`. Restore with `git checkout image-sizing-and-aspect-ratios && git stash pop`. The pop may conflict on the two lines now in the small commit (the CSS value is identical; the `sizes` comment text differs, so keep either) and on the `h1` rule if `--h1-measure` has been removed.

`narrow-centred-column` was pushed on 2026-11-15 and has an open PR to `main`, not merged yet. Next session works on top of it in a separate stacked branch (branch from `narrow-centred-column`, not `main`).

The image processing is to be scrutinised later, which is why it stays out of the small commit.

## Original goals (from the 2026-08-02 Copilot session export)

- Gather redesign inspiration for the homepage and article pages.
- Prioritise article page design over the homepage.
- Improve cohesion between body text, images and code snippets.
- Evaluate side-rail versus single-column article patterns (outcome: single column preferred; the boxed side rail was disliked).
- Prototype routes, then apply a chosen direction to the real template.

Direction captured at the end of that session:

- One master text axis: text, images and code all centre on the same axis.
- Control image width separately from aspect ratio, using explicit media variants (cover 1:1, standard 4:3 or 3:2, hero 16:9, code in the same width family).
- Square record covers must stay supported and uncropped.
- Differentiate widths by viewport: everything container width on small screens, more differentiation on medium and large.
- Set spacing around figures and captions in line-height-relative units.
- The "mat/stage" around covers was judged probably unnecessary.

The Copilot-written code on `redesign-v1-editorial` is throwaway. Only its direction matters.

## Current approach

- **Tagging at build time:** a PostHTML step in `eleventy.config.js` reads each image's width and height and adds `data-shape="landscape|square|portrait"`.
- **One shared width:** every `<figure>`, and so its image and caption, is capped at the text measure (`40.5rem`).
- **Landscape:** cropped, never squashed, if it's taller than 3:2. Wider images are left alone. The cap is `--landscape-max-ratio: 1.5`.
- **Square:** treated as a cover, uncropped, at the shared width.
- **Opt-in crop:** a square photo can be cropped with a class in the markdown, e.g. `{.img-4x3}` (the Robert Henke post uses this).
- **Pure CSS cropping:** `object-fit: cover` on the full-size image. There are no extra build-time crops.
- **Not covered yet:** portraits, list pages, mobile.
- **Also fixed:** the `markdown-it-attrs` and `implicit-figures` plugin order, so captions survive a class on an image.

**Caveat on the implementation:** the user is happy with the direction in terms of design and appearance, but wants to dig into whether the technical implementation is the best one. In particular, it's not yet known whether the Eleventy workaround (the PostHTML plugin at priority -2, running after the image plugin) is a standard or efficient way to do this. Alternatives to evaluate: a custom image shortcode, a markdown-it renderer rule, or reading the image dimensions another way. Also check that `figure { container-type: inline-size }` has no layout side effects.

## Findings and decisions so far

- The Henke photo (1512×1512) and the May radio cover (1400×1400) were about 840px tall on desktop and dominated the page. Capping them at the text measure fixed this.
- Aspect ratio alone can't tell a cover from a square photo, so a square is a cover by default and a photo opts in to a crop.
- Of 16 images under `/img/uploads` referenced by posts: 8 are about 4:3, 3 are 16:9, 3 are square, 1 is 3:2 and 1 is portrait. A forced 16:9 would crop half of them for little gain. A maximum-height rule works better than a fixed ratio.
- CSS cropping first. Build-time list thumbnails only if list pages turn out heavy.
- The user was always talking about rectangular landscape images when asking about 16:9, not squares or portraits. For landscape only, a uniform 16:9 is more defensible (4:3 loses 25%, 3:2 loses 16%) but still not forced.
- Set `--landscape-max-ratio: 1.78` to compare a uniform 16:9.

## Open questions

- Henke: 4:3, 3:2 or 16:9? Revisit after the typography tweaks, since larger type and looser prose spacing change the rhythm.
- **Centring and the "hidden gutter": DONE as a short-term fix (commit `3efbb504`).** The narrow column (`l-center--wrapper-narrow`, 42em, about 840px) was wider than the measure (40.5rem, 648px), leaving about 190px of empty column on the right, so the text looked off-centre against the header and footer. It is now `--center-max-inline-size: var(--measure)`. `l-center` is the only centring mechanism in the site (the only `margin-inline: auto`), so this applies to posts, `page.njk` pages and the second block on the home page at once. The 60em wrapper (header, footer, home banner) is unchanged. A side effect: the home banner text is left-aligned at the header's edge while the posts below are centred. Left as is. Still open for later:
  - Whether the column should be able to be wider than the measure. The user expects wider images to return, so the fix is deliberately the simple one, not a general solution.
  - The "T" effect: featured images slightly wider than the text, with the text centred underneath.
  - Re-check after the typography tweaks (larger font size, more prose spacing).
- **`sizes` attribute: DONE (same commit).** `(max-width: 860px) 100vw, 840px` became `(max-width: 684px) 100vw, 648px` (648px plus roughly 18px gutters on each side). If `--measure` changes, or images are allowed to be wider than the text, update it. `widths: [800, "auto"]` left alone (1400px originals cover a 2x screen at 648px).
- **`--h1-measure` removed (same commit).** With the column at the measure, the h1's 43rem cap never applied on posts or `page.njk` pages. It was removed from `_data/tokens.json` (`h1Measure`), `_includes/layouts/base.njk` and the `h1` rule in `css/index.css`. The home banner h1 is unaffected (its content is short). Only the `container_width` and `full_width` layouts (labs and typetest pages) are wider and could notice. Titles on posts wrap up to 40px earlier than before the column change.
- **Square-image overflow bug (fixed in the stash only).** `img[data-shape="square"]` set `max-inline-size: var(--measure)`, which replaced the base `max-width: min(60rem, 100%)` cap, so a 1400px square cover overflowed the column on narrow viewports (seen on the "Fuzzy Logic show, 2/5/2026 on Radio Buena Vida" post, in the article and in lists). Fix: `max-inline-size: min(var(--measure), 100%)`. The bug only exists in the prototype CSS, so the small commit isn't affected.
- **Excerpt order convention (a thought to log, not decided).** The user wants to settle whether, for posts with images, the excerpt's text comes before or after the image. In the Dilla post it comes after the image, which works well at least on list pages. It may be a bit better than the Henke post (text excerpt before the image). Not all angles have been considered, so the Henke post is **not** to be changed until the user has. Things to consider when revisiting: list pages versus the article page, posts without images, where the `<!-- excerpt -->` marker sits, and RSS and Open Graph output.
- Whether to allow deliberate wider "breakout" images later, as an opt-in.
- A rule for portraits, and a check of list pages and mobile.
- How this fits with the typography work (`new-article-layout-and-image-system`, local only, unpushed) and the layout direction in `redesign-v1-editorial`. Both are rough direction, not ready.

## Dev notes

- Dev server: `npm start` on port 8080, run by the user. It uses `--ignore-initial`.
- Screenshots: headless Chrome from the command line, since this CLI session has no browser tools. Use `--user-data-dir=<scratch dir> --virtual-time-budget=8000`, or it can hang. Headless Chrome has a minimum window width of about 500px, so a 390px screenshot is a cropped 500px layout; test narrow widths in the browser's responsive mode.
- With `--ignore-initial`, a page is only rebuilt when requested, so request it and wait a few seconds before taking a screenshot after a CSS change (CSS is inlined into each page). A change to `eleventy.config.js` may need a restart of `npm start` before it shows (the `sizes` change didn't appear in the served HTML on its own).
- The image plugin's HTML transform runs at priority -1 (higher runs first). Anything that needs the final `width` and `height` must use a lower priority.
