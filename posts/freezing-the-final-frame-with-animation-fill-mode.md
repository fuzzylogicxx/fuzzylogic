---
date: 2019-07-13T08:50:56Z
title: Freezing the final frame with animation-fill-mode
description: ''
tags:
- TIL
- note
- animation
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
This week... coded an alert

Keyframes define the starting point at opacity 1, animates to second keyframe of opacity 0.

With default animation-fill-mode it would jump back to original state. 

With animation-fill-mode: forwards it stays on the state of the final frame i.e. faded out without jumping back.

I coded some experiments on Codepen recently to build up an arsenal of framework-free animations but sometimes found myself reaching for javascript when I was 99% there with CSS. This was the missing link!