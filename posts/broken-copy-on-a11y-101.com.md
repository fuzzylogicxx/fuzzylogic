---
date: 2021-10-03T19:06:35Z
title: Broken Copy, on a11y-101.com
description: Fixing the accessibility in VoiceOver of text content which contains
  inner chunks
tags:
- link
- a11y
- development
- web
- aria
noteWithTitle: false
linkTarget: https://a11y-101.com/development/broken-copy
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
Here’s an accessibility tip that’s new to me. When the content of a heading, anchor, or other semantic HTML element contains smaller “chunks” of `span` and `em` (etc), the _VoiceOver_ screen reader on Mac and iOS annoyingly fails to announce the content as a single phrase and instead repeats the parent element’s role for each inner element. We can fix that by adding an inner “wrapper” element inside our parent and giving it `role=text`.

Make sure not to add this role directly to your parent element since it will override its original role causing it to lose its intended semantics.

The `text` role is not yet in the official ARIA spec but is supported by Safari.

(via [@Seraphae and friends]() on Twitter)