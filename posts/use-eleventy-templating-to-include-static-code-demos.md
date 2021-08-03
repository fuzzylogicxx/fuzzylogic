---
date: 2021-08-03T16:02:03Z
title: Use Eleventy templating to include static code demos
description: Stephanie Eckles explains how to use Eleventy to create a page that displays
  multiple code demos
tags:
- demo
- code
- designsystems
- shortcode
- include
- 11ty
noteWithTitle: false
linkTarget: https://11ty.rocks/posts/eleventy-templating-static-code-demos/
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
Here’s a great tutorial from Eleventy guru [Stephanie Eckles](https://twitter.com/5t3ph) in which she explains how to create a page that displays multiple code demos, similar to [SmolCSS.dev](https://smolcss.dev/).
---

It’s interesting that Stephanie uses 11ty shortcodes over [other 11ty templating options]( https://fuzzylogic.me/posts/reusable-code-snippets-and-components-in-eleventy/) and that she sometimes declares a variable (via Nunjucks’s `set`) at the top of the page then intentionally _reuses it unchanged_ in repeated shortcode instances… the example being times where you want to illustrate the same HTML code (variable) being styled differently in progressive demos.

I also like the _Open in CodePen_ feature and section on scoped styling.
