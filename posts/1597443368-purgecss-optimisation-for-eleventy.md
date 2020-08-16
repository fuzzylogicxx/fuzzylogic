---
description: Daniel Post’s cool PurgeCSS trick for Eleventy
date: 2020-08-14T22:15:21+00:00
tags: [note, frontend, development, twitter, css, performance, 11ty, inline, head]
location: Glasgow
noteTitle: 1597443368
---

Daniel Post shared a really cool performance-optimisation trick for Eleventy on Twitter the other day. You can use PurgeCSS to minimize and inline the CSS of each individual page, so that each page’s `<head>` contains only the CSS it needs and no more.

Here‘s a gist: [https://t.co/LaF3ACB07n](https://t.co/LaF3ACB07n)

I’ve just installed this on my personal site. I was already inlining my CSS into the `<head>` but the promise of only including the minimum CSS that each specific page needs was too good to resist.

Turned out it was a breeze to get working, a nice introduction to Eleventy transforms, and so far it’s working great!
