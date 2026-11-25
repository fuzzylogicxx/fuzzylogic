# fuzzylogic image spec (draft, 2026-11-21)

Status: **untested draft**. Agreed in principle in a design session on branch `image-rail`; to be tried in the real layout before it goes into the repo docs. Mockups showing each case: `mockups-1/` and `mockups-2/`.

## Rules

| Image type | Article page | List page |
|---|---|---|
| Landscape photo (4:3, 16:9, anything wider than tall) | Cropped to **3:2**, runs wider than the text (the "wide" tier) | Cropped to **3:2**, at the text width |
| Square that is a real record cover | **Uncropped** square, capped (about 500px) | **Uncropped** square, capped (smaller than in articles) |
| Square that is not a cover (e.g. Henke photo) | Opt in to the 3:2 crop with a class | Same |
| Portrait | **Uncropped**, in the right-hand column beside the text, top-aligned with the first paragraph | **Uncropped**, stacked narrow, left-aligned, above the text |
| Screenshot or diagram | Opt out of the crop with a class | Same |

- Crop is CSS only (`object-fit: cover`, centred). No build-time crops. A `--focus` custom property can nudge the crop vertically when a centred crop cuts off the subject.
- Two class escapes, nothing more: one to opt a non-cover square **in** to the 3:2 crop, one to opt a screenshot/diagram **out**. Applied in markdown, e.g. `![alt](src){.img-3x2}`. Names are placeholders.
- Phone: no special rule. Elements keep source order; portraits are width-capped so they are not full-bleed.
- In lists, the image goes **above** the excerpt text. In articles, source order is kept.
- Why 3:2 everywhere: the image looks the same in the list and on the article page, and it is one rule, not two.

## Uploading source images

- Upload at the **original ratio**. Do not pre-crop to 3:2.
- At least **1728px wide** for sharp retina display at the 864px wide tier (current median upload is 1400px, so it's soft on retina at that size).
- Keep the subject near the centre of the frame, because the list/article crop is centred.
- Real record covers: upload the square as is.

## Audit behind this (content/img/uploads, 28 images)

13 are 4:3 (phone default), 5 are 1:1, 3 are 16:9, 1 is 5:4, 1 is 3:4 portrait, 1 is 9:16, and 4 are oddballs (a 1200x630 OG image, screenshots). None is 3:2. Median width 1400px.

At the 864px wide tier, native ratios run from 486px tall (16:9) to 648px tall (4:3); 3:2 gives 576px.

## Not decided / not tested

- Whether the 3:2 crop feels right on articles (proposal agreed to try, not yet seen in a real layout).
- Exact image sizes and the rail/column widths: these come from throwaway mockup CSS and are not decisions.
- Mixes section: a cover grid (every post has a cover) was liked in theory but not designed in detail.
- Crop prior art: `stash@{0}` and commit `7959fd93` (`.img-4x3`, `.img-16x9`, `--focus`); the markdown-it-attrs plugin-order fix is in `eleventy.config.js` on `image-rail`.
