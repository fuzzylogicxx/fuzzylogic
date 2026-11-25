---
name: image-rail-layout
description: "Design direction and image spec for the left-aligned metadata-rail layout (branch image-rail): decisions made, rejected options, image audit. Claude's CSS is throwaway."
metadata:
  node_type: memory
  type: project
  originSessionId: bc0790d5-f190-4b27-84e0-d766205f9859
  modified: 2026-11-21T15:31:32.159Z
---

Branch `image-rail` (off main). Nothing committed. Supersedes the centred-column and `image-breakout` approaches in [[design-typography-redesign]]. **Claude's CSS/templates on this branch are throwaway scaffolding; the user writes the real layout code themselves.** Claude's role here: visual design problem-solving and the image spec. See [[design-feedback-no-css-decisions]].

**Design direction (user-chosen, 2026-11-19/21):**
- Left-aligned layout with a metadata rail (short date + category chip) beside the content column; text at a comfortable measure, images vary in width from the same left edge. The rail makes pages feel "designed". Production type sizes for now.
- Articles: landscape images run wider than the text (hero); user slightly prefers this over landscape at text width. Squares are capped (full width far too big); about 500px felt right, ~350px too small.
- Lists use the same rail + content layout, keeping images large at the text width (option A). Rejected: B (small capped images with crop) and the no-rail article. Option C (thumbnail beside excerpt) is interesting and works okay, but not wanted now; maybe later.
- Cover grid only for sections where every post has a cover (e.g. Mixes), not Home/Journal, since half of posts have no image.
- Portraits (mockups round 4, using happyweddingtim.jpg, 3:4). DECIDED (user agreed 2026-11-21): portraits go in the RIGHT column on article pages (top-aligned with the first paragraph, text keeps its measure) and are STACKED NARROW, left-aligned, in list views. Phone: no special rule, keep source order (user agreed 2026-11-21; just cap portrait width). List portraits stay UNCROPPED (user agreed).
- Lists: image ABOVE the excerpt text (slight preference). Article pages: undecided, source order for now.
- Non-square images in lists share ONE aspect ratio, 3:2 (cropped, centred). User really likes this consistency.
- Opt-in 3:2 crop for "square but not a record cover" photos (e.g. Henke) via a markdown class on the image; real record covers stay uncropped squares. User really likes how the cropped Henke looks. Prior tool: stash@{0} / commit 7959fd93 (`.img-4x3`, `.img-16x9`, `--focus` var), markdown-it-attrs order fix already on image-rail.

**Image facts (audit 2026-11-21 of content/img/uploads, 28 files):** 13x 4:3 (phone default), 5x 1:1, 3x 16:9, 1x 5:4, 1x 3:4 portrait, 1x 9:16, 4 oddballs (OG 1200x630, screenshots); no 3:2 at all; median width 1400px.

**Provisional image spec:** articles show native ratio; lists crop non-squares to 3:2; squares only for real covers; upload original ratio, >=1728px wide, subject near centre (crop is centred). Portraits: right column in articles, narrow stacked in lists (decided). ACCEPTED to try (user, 2026-11-21): articles also use 3:2 for non-square photos: 3:2 everywhere for non-square photos for list-to-article continuity and one rule, plus two class escapes (opt a non-cover square in to the crop; opt a screenshot/diagram out). User wants a balanced, not over-engineered, decision.

**Mockups:** throwaway static pages in ~/code/claude-notes/image-rail-mockups/ (round 1) and image-rail-mockups-2/ (rounds 2-3, A1 chosen). Serve with `python3 -m http.server` in the folder; fonts/img are symlinks into the repo.

**Why:** user is a record collector who posts square sleeves; wants squares to look right and lists to feel designed.
**How to apply:** don't commit/push/merge unless asked. Show visual options before committing to a direction; don't treat the CSS values in the mockups or branch as decisions.

**Spec doc:** written to ~/code/claude-notes/fuzzylogic-image-spec-2026-11-21.md (user wants it there, NOT in repo docs, until tested).
