---
date: 2019-07-31 18:14:00.00
pageTitle: Intrinsically Responsive CSS Grid with minmax and min
tags: ['web', 'grid', 'cssgrid', 'css', layout']
title: Intrinsically Responsive CSS Grid with minmax and min
permalink: /links/intrinsically-responsive-css-grid-with-minmax-and-min/index.html
linkTarget: http://evanminto.com/blog/intrinsically-responsive-css-grid-minmax-min/
metaDescription: Evan Minto discusses the new CSS Math functions and how they will help us create intrinsically responsive CSS grids.
---

Evan Minto notes that flexible grids created with CSS Grid’s `repeat`, `auto-fill`, and `minmax` are only intrinsically responsive (responsive to their _container_ rather than the viewport) up to a point, because when the container width is narrower than the minimum width specified in `minmax` the grid children overflow.

Applying media queries to the grid is not a satisfactory solution because they relate to the the viewport (hence why [Every Layout](https://every-layout.dev/) often prefer Flexbox to CSS Grid because it allows them to achieve intrinsic responsiveness).

However we’ll soon be able to suggest grid item width as a percentage of the parent container, avoiding the overflow problem. The new “CSS Math functions” to help us achieve this are `min()`, `max()` and `clamp()`. At the time of writing, these are [only supported in Safari](https://caniuse.com/#feat=css-math-functions) however Chrome support is in the pipeline.
