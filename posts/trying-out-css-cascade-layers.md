---
date: 2022-07-29T15:53:31Z
title: Experimenting with CSS cascade layers
description: 'After enjoying Bramus van Damme’s talk at CSS Day I’ve been trying CSS cascade layers on my personal site'
tags: [entry, css, cascade]
noteWithTitle: false
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
In early June I attended CSS Day in Amsterdam and one of my favourite talks was Bramus van Damme’s [foo](https://www.youtube.com/watch?v=zEPXyqj7pEA).

Miriam Suzanne’s guide [https://css-tricks.com/css-cascade-layers/](https://css-tricks.com/css-cascade-layers/ "https://css-tricks.com/css-cascade-layers/")
Mention that it’s safe to do it on my personal site



Link to my existing bookmark (Steph Eckles)

Mention ITCSS



Working already! And without the need for hard-to-read [specificity hacks](https://css-tricks.com/using-the-specificity-of-where-as-a-css-reset/) in your reset like setting `:where(h1)`. If you set disable margins on your `h2` in your reset styles at the top but then have an h2 in a low-specificity layout like a flow utility and _want_ there to be a margin, normally the reset style would win which would be frustrating. But if you put your reset styles in a `reset` layer and your layout styles in a `layouts` layer and set the layers order as `reset, layouts` then the layout styles win! Really cool.
