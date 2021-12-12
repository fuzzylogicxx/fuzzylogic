---
date: 2021-08-12T21:13:26Z
title: Progressively enhanced burger menu tutorial by Andy Bell
description: ''
tags:
- link
- progressiveenhancement
- proxy
- webcomponents
- javascript
- html
- css
- svg
- icon
- hamburger
- mobile
- narrow
- development
- web
noteWithTitle: false
linkTarget: https://piccalil.li/tutorial/build-a-fully-responsive-progressively-enhanced-burger-menu/#heading-javascript
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
Here’s a smart and comprehensive tutorial from Andy Bell on how to create a progressively enhanced narrow-screen navigation solution using a custom element. Andy also uses `Proxy` for “enabled” and “open” state management, `ResizeObserver` on the custom element’s containing `header` for a Container Query like solution, and puts some serious effort into accessible focus management. 
---

One thing I found really interesting was that Andy was able to style child elements of the custom element (as opposed to just elements which were present in the original unenhanced markup) from his global CSS. My understanding is that you can’t get styles other than inheritable properties through the _Shadow Boundary_ so this had me scratching my head. I think the explanation is that Andy is not attaching the elements he creates in JavaScript to the Shadow DOM but rather rewriting and re-rendering the element’s `innerHTML`. This is an interesting approach and solution for getting around web component styling issues. I see elsewhere online that [the `innerHTML` based approach is frowned upon](https://developers.google.com/web/fundamentals/web-components/customelements#addingmarkup) however Andy doesn’t “throw out” the original markup but instead augments it.
