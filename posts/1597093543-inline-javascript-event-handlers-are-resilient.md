---
date: 2020-08-10T21:16:21+00:00
title: TIL about inline JavaScript event handlers in the `<head>`
description: Inline javascript event handlers
tags: [head, javascript, events, performance, resilience, development]
---
I’ve been thinking about [Scott Jehl’s simple way to load external CSS asynchronously technique](https://fuzzylogic.me/posts/2020-08-08-simplest-way-to-load-css-async/). I’m interested in its use of an inline event handler for running JavaScript-based enhancements in the `<head>`, as I mull over some broader thoughts on applying JavaScript-based UI enhancements in a way that’s both resilient and fast enough to avoid noticeable layout jank.
---
One really interesting aspect of using inline event handlers to apply enhancements was [highlighted by Chris Ferdinandi today](https://gomakethings.com/progressive-enhancement-graceful-degradation-and-asynchronously-loading-css/). Because we’re dealing with an HTML element directly in the document, and because the relevant JS is inline on that element and not dependent on any external files, the only case where the JS won’t run is if someone has JS completely turned off – a sub-1% proportion.

The other [typical JavaScript fragilities](https://kryogenix.org/code/browser/everyonehasjs.html) – such as network connections timing out, CDN failure and JS errors elsewhere – simply don’t apply here. 
