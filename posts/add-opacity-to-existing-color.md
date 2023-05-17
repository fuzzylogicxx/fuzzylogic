---
date: 2023-05-17T16:34:01Z
title: Add Opacity to an Existing Color (by Chris Coyier)
description: 'Chris presents five different CSS colour techniques to add opacity to a colour'
tags:
- link
- design
- colour
- css
noteWithTitle: false
linkTarget: https://chriscoyier.net/2023/05/12/add-opacity-to-an-existing-color/
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
Applying opacity to an existing colour value is a pretty common design requirement, and here Chris presents five ways to achieve it.
---

I’ll admit that the explosion of colour models is one aspect of CSS that leaves me dizzy, so this explanation framed around a practical requirement really helps. The main approaches presented by Chris are:

- [8 digit hex code](https://codepen.io/chriscoyier/pen/bGmKMGV)
- [relative colour syntax](https://codepen.io/chriscoyier/pen/eYPKVYb) (currently [only supported in Safari](https://caniuse.com/css-relative-colors))
- using a format other than hex such as HSL since it’s easier to apply transparency
- using (in a progressively enanced approach) HDR-display-friendly colours, via [a new colour format](https://css-tricks.com/the-expanding-gamut-of-color-on-the-web/) such as `oklch`
