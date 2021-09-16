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
I’ve been really interested in the subject of Web Performance since I read Steve Souders’ book _High Performance Websites_ back in 2007. Although some of the principles in that book are still relevant, it’s also fair to say that a lot has changed in the world of web development. So I’ve decided to pull together some current tips. Disclaimer: I’m a performance _enthusiast_ but not an expert. If I have anything wrong, please let me know.
---

## Inlining CSS and or JavaScript

The first thing to know is that both CSS and JavaScript are (by default) render-blocking, meaning that when a browser encounters a standard `.css` or `.js` file in the HTML, it waits until that file has finished downloading before rendering anything else.

The second thing to know is that there is a “magic file size” when it comes to HTTP requests. The data for any particular file is transferred in small chunks of about 14 kb. So if a file is larger than 14 kb, it requires multiple roundtrips.

If you have a lean page and minimal CSS and or JavaScript to the extent that the page in combination with the CSS/JS content would weigh 14 kb or less after minifying and gzipping, you can achieve better performance by embedding (inlining) your CSS and or JavaScript into the HTML. This is because there’s only one request, so allows the browser to get everything it needs to start rendering the page from a single request. So if your page (including its CSS and or JS) is 14 kb or under it’s gonna be _fast_.

If your page including CSS/JS is _over_ 14 kb after minifying and gzipping then you’d be better off not inlining those assets. This is because it’d be better for performance to separate them and let them be _cached_ rather than having a bloated HTML file that requires multiple roundtrips and doesn’t get the benefit of static asset caching.

## References

- [Inlining literally everything](https://gomakethings.com/inlining-literally-everything-for-better-performance/) on Go Make Things
