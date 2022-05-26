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
draft: false

---
I love hearing about clever front-end solutions which combine technologies and achieve multiple goals. In Zach’s post we hear how Netlify’s website suffered from layout shift when conditionally rendering dismissible promo banners, and how he addressed this by rethinking the problem and shifting responsibilities around the stack.

Here’s my summary of the smart ideas covered in the post:

* decide on the appropriate server-rendered content… in this case showing rather than hiding the banner, making the most common use case faster to load
* have the banner “dismiss” button’s event handling script store the banner’s `href` in the user’s localStorage as an identifier accessible on return visits
* process lightweight but critical JavaScript logic _early_ in the `<head>`… in this case a check for this banner’s identifier existing in localStorage
* under certain conditions – in this case when the banner was previously seen and dismissed – set a “state” class (`banner--hide`) on the `<html>` element, leading to the component being hidden seamlessly by CSS
* build the banner as a web component, the first layer of which being a custom element `<announcement-banner>` and the second a JavaScript class to enhance it
* delegate responsibility for presenting the banner’s “dismiss” button to the same script responsible for the component’s enhancements, meaning that a broken button won’t be presented if that script were to break.

So much to like in there! 

Here are some further thoughts the article provoked.

## Web components FTW

It feels like creating a component such as this one as a _web component_ leads to a real convergence of benefits:

* tool-free, async loading of the component JS as an ES module
* fast, native element discovery (no need for a `document.querySelector`)
* enforces using a nice, idiomatic class providing encapsulation and high-performing native callbacks
* resilience and progressive enhancement by putting all your JS-dependent stuff into the JS class and having that enhance your basic custom element. If that JS breaks, you still have the basic element and won’t present any broken elements.

Even better, you end up with framework-independent, standards-based component that you could share with others for reuse elsewhere, just like Zach did.

## Multiple banners

I could see there being a case where there are multiple banners during the same time period. I guess in that situation the localStorage `banner` value could be a stringified object rather than a simple, single-URL string.

## Setting context on the root

It’s really handy to have a way to exert just-in-time control over the display of a server-rendered element in a way that avoids flashes of content… and adding a class to the `<html>` element offers that. In this approach, we run the small amount of JavaScript required to test a local condition (e.g. checking for a value in localStorage) _really early_. That lets us process our conditional logic before the element is rendered… although this also means that it’s not yet available in the DOM for direct manipulation. But adding a class to the HTML element means that we can pre-prepare CSS to use that class as a contextual selector for hiding the element.

We’re already familiar with the technique of placing classes on the root element from libraries like [modernizr](https://modernizr.com/) and some font-loading approaches, but this article serves as a reminder that we can employ it whenever we need it.

## Handling the close button

…

> We use opacity to toggle the close button so that it doesn’t reflow the component when it’s enabled via JavaScript.

I think what Zach’s saying is that the alternatives – inserting the button with JS, or toggling the `hidden` attribute or its CSS counterpart `display:none` - would affect geometry causing a reflow whereas contrast does not. 

I love that level of diligence!

If I were going down Zach’s route I think I’d replace `opacity` with `visibility` since the latter removes the element from the document which feels more accessible, but still without triggering reflow (like `display` would).

## References

* Zach’s [Herald of the dog](https://github.com/zachleat/herald-of-the-dog) web component
* [CSS Triggers](https://csstriggers.com/) of reflow and repaint
* [Minimising layout thrashing](https://www.harrytheo.com/blog/2021/09/dom-reflow-and-layout-thrashing/)