---
date: 2022-05-26T20:26:33Z
title: Implementing custom list item bullets
description: ''
tags: []
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---

It’s likely to be one of our icons. Our icons are likely to be SVG.

We don’t need to use SVG for our bullet but I don’t think any of the problems we’re about to encounter are fixed if we switch format (and SVG is otherwise great)

This is one of the rare cases where it’s preferential to set the icon as a background image rather than using inline SVG.

We’d ideally have the icon colour change automatically to the current colour of its parent context.

We’d ideally have the icon colour change on hover. 

We can use filters but it’s a bit gnarly.

[https://css-tricks.com/change-color-of-svg-on-hover/](https://css-tricks.com/change-color-of-svg-on-hover/ "https://css-tricks.com/change-color-of-svg-on-hover/")

We might use `::marker`

[https://web.dev/css-marker-pseudo-element/](https://web.dev/css-marker-pseudo-element/ "https://web.dev/css-marker-pseudo-element/")

We should use custom properties to avoid bloat and improve maintainability:

[https://adactio.com/journal/15075](https://adactio.com/journal/15075 "https://adactio.com/journal/15075")

Incidentally, [we can do a lot more with lists than I knew!](https://css-tricks.com/list-style-recipes/)