---
name: design-typography-redesign
description: "Where the site redesign/typography work lives (unmerged branches), the image-sizing prototype (now stashed), centring fix done, decisions so far"
metadata:
  node_type: memory
  type: project
  originSessionId: c89f2206-c430-407d-bed8-76339b587da2
  modified: 2026-11-16T21:45:24.149Z
---

Redesign is in progress, split across unmerged branches. Treat all as rough direction, not done/ready. Full notes: ~/code/claude-notes/fuzzylogic-image-sizing-2026-11-14.md (read it first in a new session).

- `new-article-layout-and-image-system` (LOCAL ONLY, never pushed; last amended 2026-09-08, 96 commits behind main): typography half. Source Sans 3 variable fonts in public/fonts/sans/vf/, new Utopia type scale, `l-center--wide`/`--prose-col` renames. Has bugs (upright VF src listed twice, `SSP` family naming).
- `redesign-v1-editorial` (2026-08-04): layout half (single centred column, homepage hero/featured). User says its Copilot-written code is throwaway; only the direction matters (Copilot session export: ~/Desktop/chat-export-2026-08-02.html).
- `image-sizing-and-aspect-ratios` (off main): full prototype is now in `stash@{0}` (as of 2026-11-15), current approach:
  - PostHTML plugin in eleventy.config.js (priority -2, after the image plugin's -1) tags each img `data-shape="landscape|square|portrait"` from width/height.
  - `figure` capped at the text measure (40.5rem) with `container-type: inline-size`, so image and caption match the prose width.
  - landscape cropped via object-fit: cover if taller than `--landscape-max-ratio` (1.5 = 3:2); squares are covers (uncropped); square photos opt in to a crop with a markdown class like `{.img-4x3}` (Henke post).
  - Also fixed plugin order (markdown-it-attrs before implicit-figures) so captions survive a class on an image.

**Decisions/leanings:** CSS cropping, not build-time crops, unless list pages get heavy. User's 16:9 question was about rectangular *landscape* images only. Open: Henke ratio (4:3/3:2/16:9; revisit after typography tweaks), portraits, list pages, mobile.

**Caveats the user raised:** happy with the design direction but wants to scrutinise the technical implementation later (is the PostHTML workaround standard/efficient? alternatives: shortcode, markdown-it rule). That's why the prototype stays stashed.

**Done 2026-11-15:** centring fix committed on branch `narrow-centred-column` (3efbb504, from main): `.l-center--wrapper-narrow` now = `--measure`, plus image `sizes` set to `(max-width: 684px) 100vw, 648px`. `--h1-measure` removal is in the same commit. User chose the simple short-term fix over a general solution, expecting wider images to return later. Open: excerpt order convention (text before vs after image, Dilla vs Henke post), which the user hasn't decided, so don't change Henke yet.

**PR status (2026-11-15):** `narrow-centred-column` is pushed and has an open PR to main, NOT to be merged yet. Next session builds on it in a separate stacked branch (branch from `narrow-centred-column`, not main; target the PR base accordingly). Prototype still in `stash@{0}`.

**Typography cherry-pick (2026-11-15/16):** audited `new-article-layout-and-image-system` (single WIP commit d0473032; its css/index.css has ~500 lines stripped, so never take it wholesale; header is `hidden`). Working on branch `utopia-type-scale` (off `image-shape-prototype`, which is clean at 3efbb504; both stacked on `narrow-centred-column`), UNCOMMITTED in css/index.css. Variable Source Sans 3 font deferred (keep main's static fonts). Decisions so far:
- Utopia type scale: viewports 357→1240, base 18→22px, ratio 1.067→1.125, steps -3..7 (link in the css comment). Space scale unchanged (follows the base, not the ratio). User dislikes magic-number font sizes: everything must sit on the scale.
- Mapping: body/logo text step-0; nav, post meta, footer step--1; captions step--3; h1 step-7; h2 step-3; h3 step-1; h4 body size + all-small-caps (Antonia has real smcp) with user-tuned line-height.
- `.l-center--wrapper` now 75rem (was 60em, which followed font size and made the header wider); logo 1.5em.
- Committed as 7fe665c5 on `utopia-type-scale` (not pushed, no PR yet). Open: homepage "doesn't look right" (parked). User doesn't want external typography-theory references raised as a matter of course, only when a specific problem needs them. Half-step idea was rejected in favour of a tighter ratio.
- Side finding: cold build is 95% the image plugin's PostHTML transform (avif encodes); OG shortcode is negligible. Idea parked: drop avif when `ELEVENTY_RUN_MODE === "serve"`.

**Reverted 2026-11-16:** user was least happy with the modular type scale; reverted to production's via a revert commit on `utopia-type-scale` (original commits f4c4b0f9, ea34fc11 kept in history to cherry-pick from, e.g. h4 small caps). Column capped at the text measure is kept (happy, at least temporarily: aligned not ragged). Still wanted later: typographic refinements (hyphens, small caps, quotes, fractions).

**2026-11-16/17 session:** `utopia-type-scale` now ends with: revert to production scale (e1206725), a 17-21px experiment (b5b0eb34; measure = 32.4 x --step-0), then its revert (06b2baba). User is "betwixt": fine with slightly larger type but may prefer main's; column felt too narrow. Body line-height 1.4 kept (old branch uses 1.35, tried, reverted). Decided to judge things on main's sizes.
- NEW branch `image-breakout` (from utopia-type-scale; UNCOMMITTED): stash@{0} applied (still kept) + landscape-figure breakout: `figure:has(img[data-shape="landscape"])` = min(--measure-wide, 100vw - 2*space-s), centred via negative auto margins; `--measure-wide` = 1.3 x measure defined in base.njk; image sizes "(max-width: 879px) 100vw, 843px". Squares/portraits stay at measure. Next: user restarts dev server (it died on branch switch) and judges; open: h1 breakout, square treatment, multi-image rows later.
- Tip: dev server runs with --ignore-initial, so a rebuild may need `touch css/index.css`. One-off build into scratchpad: `npx @11ty/eleventy --quiet --output=<dir>`.

**Parked at end of 2026-11-17 session (user stopped, "losing objectivity"):** on `image-breakout` (uncommitted): `.img-4x3`/`.img-16x9` also trigger the breakout, breakout scoped to `.post` (article pages only, not lists). User prefers text-before-image by default (my recommendation, undecided for sure). User wants to compare layout patterns for "articles with images" and "lists of articles with images". Possible replacement for the `:has()` breakout: a named-line CSS grid with per-image tiers like `{.wide}`, `{.pair}`.

**2026-11-19 hypothesis for next design:** drop the centred-axis approach for a left-aligned rail+content grid where images vary width to the right of one shared left edge; squares get a fixed/capped width; lists = rail | content, and possibly a cover grid for record posts. User asked whether to start a fresh session; I advised yes (notes saved; model not the bottleneck, direction is). `image-breakout` branch likely superseded.

**Why:** user is a record collector who needs square sleeves shown well; wants text/image/code cohesion on one axis.
**How to apply:** don't commit/merge/push without being asked; user runs the dev server on :8080 themselves; I screenshot via headless Chrome into the scratchpad (CLI has no browser tools). Related: [[post-capture-tooling]].
