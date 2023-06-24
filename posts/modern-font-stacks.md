---
date: 2023-03-26T16:07:46Z
title: Modern Font Stacks
description: System font stack CSS organised by typeface classification for every modern OS
tags:
- link
- typography
- fonts
noteWithTitle: false
linkTarget: https://modernfontstacks.com/
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
> System font stack CSS organized by typeface classification for every modern OS. The fastest fonts available. No downloading, no layout shifts, no flashes — just instant renders.
---

This is a great resource for when you want a particular style of font (workhorse sans-serif, grotesque, monospace, display slab serif etc) and to favour a system font rather than a custom font to get performance and simplicity benefits allied to having many weights and characters natively available.

To grab a stack, just copy the `font-family` declaration from its card then paste that into your CSS.

To easily preview how custom text of your choice would look in each stack, use the handy form at the top of the page.

Aside from its utility I also love this page as a learning resource. For each font category, the font and weight your browsing context is currently using is highlighted in blue with a solid underline, while those available but not currently in use and those unavailable are also separately highlighted. This gives you even more information than Firefox’s font panel or the [WhatFont](https://chrome.google.com/webstore/detail/whatfont/jabopobgcpjmedljpbcaablpmlmfcogm) extension for Chrome.

Notes: 
- if you notice support for a font when you wouldn’t expect it (because your OS doesn’t include it), it’s worth remembering that you may have previously installed it locally. This was the case for me with _Inter_ in the [Neo-Grotesque](https://modernfontstacks.com/?stack=neo-grotesque) stack. You can click the little “info” icon links beside each stack’s title for [detailed info on that stack including which OSs use which font](https://github.com/system-fonts/modern-font-stacks#neo-grotesque)
- the declaration `font-family: system-ui, sans-serif` as a means of serving the Operating System’s default sans-serif seemed suspiciously simple given the complicated iterations I’ve seen previously. However after some digging I confirmed that [Firefox added support for `system-ui` a few years ago](https://caniuse.com/font-family-system-ui) so [previous, verbose alternatives](https://bugzilla.mozilla.org/show_bug.cgi?id=1226042#c15) are no longer necessary.
