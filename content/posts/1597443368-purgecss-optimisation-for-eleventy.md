---
description: Daniel Post’s cool PurgeCSS trick for Eleventy
date: 2020-08-14T22:15:21+00:00
tags: [note, frontend, development, twitter, css, performance, 11ty, inline, head]
location: Glasgow
noteTitle: 1597443368
---

[Daniel Post shared](https://twitter.com/danielpost/status/1293286796604956673) a really cool performance-optimisation trick for Eleventy on Twitter the other day. When statically generating your site you can loop through your pages and, for each, use PurgeCSS to find the required CSS, then inline that into the `<head>`. This way, each page contains only the CSS it needs and no more!

[Check out the code.](https://t.co/LaF3ACB07n)

I’ve just installed this on my personal site. I was already inlining my CSS into the `<head>` but the promise of only including the minimum CSS that each specific page needs was too good to resist.

Turned out it was a breeze to get working, a nice introduction to Eleventy transforms, and so far it’s working great!
