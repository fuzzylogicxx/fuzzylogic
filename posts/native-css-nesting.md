---
date: 2023-02-18T10:33:25Z
title: Native CSS Nesting
description: CSS nesting is here and looks pretty straightforward
tags:
- sass
- nesting
- web
- css
- browsers
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
## I’ve started reading some entries from Manuel Matuzovic’s [100 days of (more or less) modern CSS](https://www.matuzo.at/blog/2022/100-days-of-more-or-less-modern-css/) series, and began with the excellent [Day 99: Native Nesting](https://www.matuzo.at/blog/2023/100daysof-day99/). It clearly explains how to use the [now-agreed syntax](https://webkit.org/blog/13813/try-css-nesting-today-in-safari-technology-preview/) for various common scenarios.

The syntax is pretty close to what we’re used to doing with Sass, which is great! I’m now also clear that nested selectors must always start with a symbol rather than a letter. Often they would naturally do so anyway. But in cases where they wouldn’t – essentially only when nesting an “element selector” – we start it with an “&”. So:

    main {
      & article { ... }
    }

Straightforward enough!

Regarding [browser support for CSS nesting](https://caniuse.com/css-nesting), at the time of writing it is available in Chrome and Safari Technology Preview only.

I would therefore only use it for demos and for the most non-essential enhancements. We’ll need to hold off any _full-scale switch_ from Sass nesting to CSS nesting for large and important production websites until this is in Firefox and standard Safari, and most people have those versions. So a little while away yet, but given the current rate of browser updates, likely sooner than we might think!   