---
title: Definitive web font @font-face syntax
description: How to use custom web fonts in a way that works across different browsers
date: 2018-11-27T13:14:00.000Z
mainImage.isAnchor: false
tags:
  - fonts
  - webfonts
  - typography
  - howto
draft: false
---
These days, whenever I’m about to use a web font on a new site I generally find myself running a google search for the latest “definitive `@font-face` syntax” that covers all modern browser/device needs.
---

For a long time I headed straight for [Paul Irish’s Bulletproof @font-face Syntax](https://www.paulirish.com/2009/bulletproof-font-face-implementation-syntax/) but I noted a few years back that he’d stopped updating it.

When buying web fonts from type foundries such as [Fontsmith](https://www.fontsmith.com/) the foundries do tend to provide their own guidelines. However, I’m not convinced that these are sufficiently cross-platform compatible.

Recently I’ve been reading [Flexible Typesetting](https://abookapart.com/products/flexible-typesetting) by Tim Brown and in it he recommends [Webfont Handbook](https://abookapart.com/products/webfont-handbook) by Bram Stein. That’s now next on my reading list, however in the meantime I found [an excerpt on *A List Apart*](https://alistapart.com/article/using-webfonts/) which specifically covers the best modern `@font-face` syntax.

Based on Stein’s advice, here’s what I’m now using.

<figure>

```
@font-face {
    font-family: Elena;
    src: url(elena.woff2) format("woff2"),
         url(elena.woff) format("woff"),
         url(elena.otf) format("opentype");
}
```

</figure>

Soon, when all browsers support the `woff` format we’ll be able to reduce this to simply:

<figure>

```
@font-face {
    font-family: Elena;
    src: url(elena.woff2) format("woff2"),
         url(elena.woff) format("woff");
}
```

</figure>
