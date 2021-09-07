---
date: 2021-09-07T10:38:35Z
title: 'Doppler: Type scale with dynamic line-height'
description: line-height on the web is a tricky thing, but this tool offers a clever
  solution.
tags:
- design
- development
- web
- responsive
- typography
- line-height
- leading
noteWithTitle: false
linkTarget: https://hihayk.github.io/doppler/
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
`line-height` on the web is a tricky thing, but this tool offers a clever solution.
---

It’s relatively easy to set a sensible unit-less default ratio for body text (say `1.5`), but that tends to need tweaked and tested for headings (where spacious line-height doesn’t quite work; but tight line-height is nice until the heading wraps, etc). 

Even for body text it’s a not a one-size-fits-all where a line-height like `1.5` is appropriate for all fonts.

Then you’ve got different devices to consider. For confined spaces, tighter line-height works better. But this can mean you might want one line-height for narrow viewports and another for wide. 

Then, factor in vertical rhythm based on your modular type and spacing scales if you really want to blow your mind. 

It can quickly get really complicated! 

Doppler is an interesting idea and tool that I saw in CSS-Tricks’ newsletter this morning. It lets you apply `line-height` using `calc()` based on one `em`-relative value (for example `1em`) and one `rem`-relative value (for example `0.25rem`). 

In effect you’ll get something like:

> set line-height to the font-size of the current element plus a quarter of the user’s preferred font-size

The examples look pretty promising and seem to work well across different elements. I think I’ll give it a spin.