---
date: 2022-01-18T16:05:04Z
title: 'My first Web Component: a disclosure widget'
description: A simple web component just so I can get used to the technologies
tags:
- entry
- template
- shadowdom
- css
- html
- javascript
- webcomponents
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
After a couple of years of reading about web components (and a lot of head-scratching), I’ve finally got around to properly creating one… or at least a rough first draft!
---

[Check out disclosure-widget on codepen.](https://codepen.io/fuzzylogicx/pen/MWERKQo/left/?editors=1111)

Caveats and to-dos:
- I haven’t yet tried writing tests for a web component
- I should find out how to refer to the custom element name in JavaScript without repeating it
- I should look into whether `observedAttributes` and `attributeChangedCallback` are more appropriate than typical event listeners