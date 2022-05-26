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
I love hearing about clever front-end solutions which combine technologies and achieve multiple goals. In Zach’s post we hear how Netlify’s website suffered from _layout shift_ when conditionally rendering dismissible promo banners and how he addressed this by reconsidering the problem and switching responsibilities around the stack.

Here’s my summary of smart ideas covered in the post:

* decide on the appropriate server-rendered content… in this case showing the banner, which made the most common use case faster-loading
* have the banner “dismiss” button’s event handling script store the banner’s `href` URL in the user’s browser localStorage as an identifier accessible on return visits
* process lightweight but critical JavaScript logic _early_ in the <head>… in this case a check for this banner’s identifier existing in localStorage
* under certain conditions – in this case when the banner was previously seen and dismissed – set a “state” class on the `<html>` element, such as `banner--hide`
* build the banner as a web component, the first layer of which being a custom element `<announcement-banner>` and the second a JavaScript class to enhance it
* delegate responsibility for presenting the banner’s “dismiss” button to the same script responsible for the component’s enhancements, meaning that if it breaks, a broken button isn’t presented.

So much to like in there. Here are some further thoughts the article raised.

## Web components FTW

It feels like creating a component like this as a web component leads to a real convergence of benefits:

* tool-free, async JS loading as an ES module
* fast, native element discovery (no need for a `document.querySelector`)
* enforces a nice, idiomatic class providing encapsulation and high-performing callbacks
* resilience and progressive enhancement by putting all your JS-dependent stuff into the JS class and having that enhance your more basic initial custom element. If that JS breaks, you still have the basic element and won’t present any broken elements.

And share it like Zach did.

## Multiple buttons

stringified object

## Setting context on the root

We already know this technique from the likes of libraries like modernizr and performant font-loading approaches, but this article serves as a reminder. Note: we apply the class to the HTML element because at this early stage we can’t manipulate the element itself because it’s not yet in the DOM.

…CSS already prepped to use this as a contextual selector for hiding the component.

## Handling the close button

…

> We use opacity to toggle the close button so that it doesn’t reflow the component when it’s enabled via JavaScript.

I think what Zach’s saying is that the alternatives – inserting the button with JS, or toggling the `hidden` attribute or its CSS counterpart `display:none` - would affect geometry causing a reflow whereas contrast does not.

I love that level of diligence!

## References

* [CSS Triggers](https://csstriggers.com/) of reflow and repaint