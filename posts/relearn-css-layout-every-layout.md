---
title: 'Relearn CSS layout: Every Layout'
description: Heydon Pickering and Andy Bell’s new project is a game-changer
date: 2019-09-05T23:00:00Z
mainImage.isAnchor: false
tags: []
draft: true
linkTarget: ''

---
Every now and then something comes along in the world of web design that represents a substantial shift. The launch of [Every Layout](https://every-layout.dev/), a new project from Heydon Pickering and Andy Bell, feels like one such moment.
---

In simple terms, we get a bunch of responsive layout utilities: a Box, a Stack, a Sidebar layout and so on. However Every Layout offers so much more—in fact for me it has provided whole new ways of thinking and talking about modern web development. In that sense I’m starting to regard it in terms of classic, game-changing books like [Responsive Web Design](https://abookapart.com/products/responsive-web-design) and [Mobile First](https://abookapart.com/products/mobile-first).

Every Layout’s components, or _primitives_, are self-governing and free from media queries. This is a great step forward because media queries tie layout changes to the viewport, and that’s suboptimal when our goal is to create modular components for Design Systems which should adapt to variously-sized containers. Every Layout describe their components as existing in a _quantum state_: simultaneously offering both narrow and wide configurations. Importantly, the way their layouts adapt is also linked to the dynamic _available space_ in the container and the intrinsic width of its contents, which leads to more fluid, organic responsiveness.

Every Layout’s approach feels perfect for the new era of CSS layout where we have CSS Grid and Flexbox at our disposal. They use these tools to _suggest_ rather than dictate, letting the browser make appropriate choices based on its native algorithms.