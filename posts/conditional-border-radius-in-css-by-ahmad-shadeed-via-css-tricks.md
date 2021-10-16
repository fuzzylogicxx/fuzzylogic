---
date: 2021-10-16T14:05:05Z
title: Conditional border-radius in CSS (by Ahmad Shadeed via CSS-Tricks)
description: A CSS media query free one-liner which lets you set an element to have
  no border-radius when an element is the full width of the viewport, but otherwise
  to have a border-radius
tags:
- layout
- quantum
- card
- responsive
- css
- link
noteWithTitle: false
linkTarget: https://css-tricks.com/conditional-border-radius-in-css/
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
Here’s a “media query free” CSS one-liner which lets you set an element to have no border-radius when it is the full width of the viewport, but otherwise to have a border-radius.
---

It uses the same 9999 multiplication technique as [Every Layout](https://every-layout.dev/) do to create a toggle.

Great for _Card_ components which need to be full-width and non-rounded only on narrow viewports.