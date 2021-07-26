---
date: 2019-03-28T00:31:37Z
title: "$$ in the DevTools Console"
description: Shortcuts for DOM element queries you can use in your browser’s Devtools
  console
tags:
- dom
- firefox
- chrome
- javascript
- howto
- devtools
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
I learned something new today when developing in the Firefox Dev Tools console (although this applies to Chrome too)—something which was really useful and which I thought I’d share.

Basically, type `$$('selector')` into the console (replacing _selector_ as desired) and it’ll give you back all matching elements on the page.
---

So for example, `$$('script')` or `$$('li')`.

Similarly you can select a single element by instead using one dollar sign (`$`).

These seem to be console shortcuts for `document.querySelector()` (in the case of `$`) and `document.querySelectorAll()` (in the case of `$$`).

The other really cool thing is that the resultant `nodeList` is returned as an array, so you could do e.g. `$$('li').forEach(…)` or similar.

via [@rem](https://twitter.com/rem) (Remy Sharp)