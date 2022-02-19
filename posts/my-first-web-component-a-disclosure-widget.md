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

[Check out disclosure-widget on codepen.](https://codepen.io/fuzzylogicx/pen/MWERKQo/?editors=1010)

See also [my pen which imports and consumes the component.](https://codepen.io/fuzzylogicx/pen/MWERbPZ)

Caveats and to-dos:
- I haven’t yet tried writing tests for a web component
- I should find out how to refer to the custom element name in JavaScript without repeating it
- I should look into whether `observedAttributes` and `attributeChangedCallback` are more appropriate than the more typical event listeners I used

## References

I found Eric Bidelman’s article [Custom Elements v1: Reusable Web Components](https://developers.google.com/web/fundamentals/web-components/customelements) pretty handy. In particular it taught me how to create a `<template>` including a `<slot>` to automatically ringfence the Light DOM content, and then to attach that template to the Shadow DOM to achieve my enhanced component.
