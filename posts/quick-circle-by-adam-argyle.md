---
date: 2023-03-01T17:15:00Z
title: Quick circle (by Adam Argyle)
description: A modern and minimal way to create a circle in CSS
tags:
- aspect-ratio
- circle
- css
- link
linkTarget: https://codepen.io/web-dot-dev/pen/rNZdPBK
draft: false

---
I’m wary of list-based clickbait – and Adam’s recent [6 CSS snippets every front-end developer should know in 2023](https://web.dev/6-css-snippets-every-front-end-developer-should-know-in-2023) feels like that – however I like this modern and minimal approach to creating a circle. I’ve previously seen `aspect-ratio: 1` used to create a square box and it’s a lovely shorthand for “make width and height equal”. It makes sense that you can use it for a circle too, just by adding some `border-radius`.
---

    .circle {
      inline-size: 25ch;
      aspect-ratio: 1;
      border-radius: 50%;
    }