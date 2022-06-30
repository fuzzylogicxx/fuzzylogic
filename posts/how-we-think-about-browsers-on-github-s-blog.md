---
date: 2022-06-30T09:50:00Z
title: How we think about browsers, on GitHub’s blog
description: Keith Cirkel of Github has written about how they think about browsers
  and it’s interesting
tags:
- link
- javascript
- progressiveenhancement
noteWithTitle: false
linkTarget: https://github.blog/2022-06-10-how-we-think-about-browsers/
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
Keith Cirkel of Github has written about how they think about browsers and it’s interesting. In summary Github achieve:

* improved performance;
* exploiting new native technologies; and
* universal user access/inclusion

…via a progressive enhancement strategy that ensures a basic experience for all but delivers an enhanced experience to most. Their tooling gets a bit deep/exotic in places  but I think the basic premise is:

1. decide on what our basic experience is, then use native HTML combined with a bare minimum of other stuff to help old browsers deliver that; and 
2. exploit new JS features in our enhanced experience (the one most people will get) to make it super lean and fast

Pretty cool.