---
date: 2019-07-13T20:48:24Z
title: CSS pointer-events to the rescue
description: Something to try when click or tap fails due to elements positioned on
  top of elements
tags:
- troubleshooting
noteWithTitle: true
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
Sometimes a click or tap doesn’t work, i.e. doesn’t trigger the event you were expecting. 

This is often because you have an absolutely positioned element which is to some extent overlaying (or somehow interfering with) your target clickable element. Or perhaps you needed a child/nested element inside your anchor or button and it is this element that the browser perceives as being the clicked or tapped element.

I’ve found that setting \`.elem { \[ pointer-events: none; }\` on the obscuring element resolves the problem and get you back on track.