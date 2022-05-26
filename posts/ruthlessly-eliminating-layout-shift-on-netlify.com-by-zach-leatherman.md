---
date: 2021-05-12T17:02:07Z
title: Ruthlessly eliminating layout shift on netlify.com, by Zach Leatherman
description: ''
tags:
- link
- progressiveenhancement
- reflow
- webcomponents
- javascript
- css
- performance
- CLS
noteWithTitle: false
linkTarget: https://www.zachleat.com/web/layout-shift/
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: true

---
I love hearing about clever front-end solutions which combine technologies and straddle concerns! Zach’s post describes how Netlify’s website suffered from _layout shift_ when conditionally rendering dismissible promo banners and how, by reconsidering the problem and switching responsibilities around the stack, he addressed it.

Here’s my summary of smart ideas in the post:

* choosing the appropriate server-rendered content – in this case showing the banner
* having the banner “dismiss” button’s event handling script store the banner’s `href` URL in the user’s browser localStorage as an identifier that can be accessed on return visits
* processing lightweight but critical JavaScript logic _early_ in the <head>… in this case the check for this banner’s URL existing in localStorage
* handling the banner as a web component, firstly with a custom element `<announcement-banner>` and secondly with JavaScript to enhance it
* delegating responsibility for presenting the banner’s “dismiss” button to the same script responsible for the component’s enhanced functionality, meaning that if it breaks, a broken button isn’t presented.

## Web components FTW

convergence of virtues:

* async loading with ES modules
* native element discovery without the need for document.querySelector
* a nice class with encapsulation and performant callbacks
* resilience and progressive enhancement via enhancements only being applied if the component’s JavaScript class runs successfully, minimising the risk of presenting broken elements

And share it like Zach did.

## Multiple buttons

stringified object

## Setting context on the root 

We already know this technique from the likes of libraries like modernizr and performant font-loading approaches, but this article serves as a reminder

## Handling the close button 

I love that level of diligence!

## References

* [CSS Triggers](https://csstriggers.com/) of reflow and repaint