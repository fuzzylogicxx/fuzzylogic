---
date: 2021-10-02T21:28:21Z
title: 'Motion One: The Web Animations API for everyone'
description: Motion One claims to be the smallest fully-featured animation library
  for the web
tags:
- link
- css
- svg
- tool
- library
- javascript
- animation
- development
- web
noteWithTitle: false
linkTarget: https://motion.dev/
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
> A new animation library, built on the Web Animations API for the smallest filesize and the fastest performance.
---

This JavaScript-based animation library—which can be installed via npm—leans on [an existing web API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) to keep its file size low and uses hardware accelerated animations where possible to achieve impressively smooth results.

For fairly basic animations, this might provide an attractive alternative to the heavier Greensock. The Motion docs do however flag the limitation that it can only animate “CSS styles”. They also say “SVG styles work fine”. I hope by this they mean SVG presentation attributes rather than inline CSS on an SVG, although it’s hard to tell. However [their examples look promising](https://motion.dev/examples/path-drawing).

The docs website also contains some really great background information regarding [animation performance](https://motion.dev/guides/performance).
