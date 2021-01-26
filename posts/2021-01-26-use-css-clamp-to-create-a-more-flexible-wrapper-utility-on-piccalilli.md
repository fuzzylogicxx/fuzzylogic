---
date: "2021-01-26T22:35:54.406Z"
title: "Use CSS Clamp to create a more flexible wrapper utility (on Piccalilli)"
description: "Andy Bell recommends using CSS clamp() to control your wrapper/container width because it supports setting multiple tolerances simultaneously rather than via previous convoluted solutions."
tags: [link, css, web, development, tip, layout, width, constraints, responsive]
linkTarget: "https://piccalil.li/quick-tip/use-css-clamp-to-create-a-more-flexible-wrapper-utility"
---
Hereâs Andy Bell recommending using CSS `clamp()` to control your wrapper/container width because it supports setting multiple tolerances (including an âidealâ width) simultaneously rather than via previous convoluted solutions.

> If we use clamp() to use a viewport unit as the ideal and use what we would previously use as the max-width as the clampâs maximum value, we get a much more flexible setup.
---

This is pretty cool because I know from experience that coding responsive solutions for wrappers can be tricky and you can end up with a complex combination of padding, margin, max-width and media queries whileâlike Andy saysânot always hitting optimal readability for medium-sized viewports. [Using CSS Grid with minmax()](https://fuzzylogic.me/posts/2020-11-17-breaking-out-with-css-grid-layout-on-cloudfourcom/) is one possible approach to controlling wrappers however this is another (potentially better) tool for the arsenal.

Itâs also worth noting that Andy could probably have just used `min(90vw, 70rem)` here ([as Christopher suggests](https://twitter.com/c__beck/status/1351515957034889219), because the need for setting a lower bound like `clamp()` provides is only necessary if your element is likely to shrink to nothing (and a regular block-level element wouldnât do that). Handy for flex items, though. (via [@piccalilli_](https://twitter.com/piccalilli_))