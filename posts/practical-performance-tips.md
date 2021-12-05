---
date: 2021-09-14T12:53:18Z
title: Practical front-end performance tips
description: Practical front-end performance tips
tags:
- entry
- javascript
- css
- development
- web
- tip
- performance
---
I’ve been really interested in the subject of Web Performance since I read Steve Souders’ book _High Performance Websites_ back in 2007. Although some of the principles in that book are still relevant, it’s also fair to say that a lot has changed since then so I decided to pull together some current tips. Disclaimer: This is a living document which I’ll expand over time. Also: I’m a performance _enthusiast_ but not an expert. If I have anything wrong, please let me know.
---

## Inlining CSS and or JavaScript

The first thing to know is that both CSS and JavaScript are (by default) render-blocking, meaning that when a browser encounters a standard `.css` or `.js` file in the HTML, it waits until that file has finished downloading before rendering anything else.

The second thing to know is that there is a “magic file size” when it comes to HTTP requests. File data is transferred in small chunks of about 14 kb. So if a file is larger than 14 kb, it requires multiple roundtrips.

If you have a lean page and minimal CSS and or JavaScript to the extent that the page in combination with the (minified) CSS/JS content would weigh 14 kb or less after minifying and gzipping, you can achieve better performance by inlining your CSS and or JavaScript into the HTML. This is because there’d be only one request, thereby allowing the browser to get everything it needs to start rendering the page from that single request. So your page is gonna be _fast_.

If your page including CSS/JS is _over_ 14 kb after minifying and gzipping then you’d be better off not inlining those assets. It’d be better for performance to link to external assets and let them be _cached_ rather than having a bloated HTML file that requires multiple roundtrips and doesn’t get the benefit of static asset caching.

## Avoid CSS `@import`

[CSS @import is really slow!](https://csswizardry.com/2018/11/css-and-network-performance/#avoid-import-in-css-files)

## JavaScript modules in the head

Native JavaScript modules are included on a page using the following:

``` html
<script type="module" src="main.js"></script>
```

Unlike standard `<script>` elements, module scripts are deferred (non render-blocking) by default. Rather than placing them before the closing `</body>` tag I place them in the `<head>` so as to allow the script to be downloaded _early_ and in parallel with the DOM being processed. That way, the JavaScript is already available as soon as the DOM is ready.

## Background images

Sometimes developers implement an image as a CSS background image rather than a “content image”, either because they feel it’ll be easier to manipulate that way—a typical example being a responsive hero banner with overlaid text—or simply because it’s decorative rather than meaningful. However it’s worth being aware of how that impacts the way that image loads.

Outgoing requests for images defined in CSS rather than HTML won’t start until the browser has created the [Render Tree](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction). The browser must first download and parse the CSS then construct the CSSOM before it knows that “Element X” should be visible and has a background image specified, in order to then decide to download that image. For important images, that might feel too late. 

[As Harry Roberts explains](https://csswizardry.com/2018/06/image-inconsistencies-how-and-when-browsers-download-images/#0) it’s worth considering whether the need might be served as well or better by a content image, since by comparison that allows the browser to discover and request the image nice and early.

> By moving the images to <img /> elements… the browser can discover them far sooner—as they become exposed to the browser’s preload scanner—and dispatch their requests before (or in parallel to) CSSOM completion

However if still makes sense to use a background image and performance is important [Harry recommends including an accompanying hidden image](https://twitter.com/csswizardry/status/1276854595382325248) either inline or via `link rel=preload`.





<!--
Other stuff to add:
- optimise font loading (WOFF2, …, …) ref https://www.zachleat.com/web/font-checklist/
- Use HTTP2 which is now supported by all major browsers to optimise asset delivery to users’ devices
-->

## References

- [Inlining literally everything](https://gomakethings.com/inlining-literally-everything-for-better-performance/) on Go Make Things
- [MDN’s guide to native JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [How and when browsers download images](https://csswizardry.com/2018/06/image-inconsistencies-how-and-when-browsers-download-images/#0) by Harry Roberts
