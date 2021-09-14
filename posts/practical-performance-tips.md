---
date: 2021-09-14T12:53:18Z
title: Practical Performance Tips
description: Practical Performance Tips
tags:
- entry
- javascript
- css
- development
- web
- tip
- performance
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: true

---
I’ve been really interested in the subject of Web Performance since I read Steve Souders’ book _High Performance Websites_ back in 2007. Although some of the principles in that book are still relevant, it’s also fair to say that a lot has changed in the world of web development. So I’ve decided to pull together some current tips. Disclaimer: I’m a performance _enthusiast_ but not an expert. If I have anything wrong, please feel free to let me know.
---

## Inlining CSS and or JavaScript

Both CSS and JavaScript are (by default) render-blocking, meaning that when a browser encounters a `.css` or `.js` file in the HTML, it waits until it’s finished downloading before rendering anything else.

Data for any particular file is transferred in small chunks of about 14 kb.

If you have a lean page and minimal CSS and or JavaScript to the extent that in combination they would weigh 14 kb or less after minifying and gzipping, you can achieve better performance by embedding (inlining) your CSS and or JavaScript into the HTML. This is because it saves request round-trips and allows the browser to get everything it needs to start rendering the page from a single request.

## References

- [Inlining literally everything](https://gomakethings.com/inlining-literally-everything-for-better-performance/) on Go Make Things
