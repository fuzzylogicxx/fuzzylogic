---
date: 2021-10-23T18:53:41.000+00:00
title: 'Buttons and links: definitions, differences and tips'
description: How buttons and links work, the differences between them, and when to
  use each.
tags:
- development
- web
- design
- javascript
- css
- html
- entry
- anchor
- link
- button
- a11y
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
Some of the web’s design and development practices have led to buttons and links becoming conceptually bundled together, confused and misunderstood. Practitioners can be guilty of seeing the surface-level commonality that “you click the thing, then something happens” and mistakenly thinking that they are interchangeable. Some might even regard the two as the same “component”. However this is wrong, harmful for effective web development; and causes our users problems. In this post I’ll address why buttons and links are different and exist separately, and when to use each.

## Problematic patterns

Designers often like to apply the appearance of a button to a link. For some calls to action this can make sense however as a pattern it is often overused and under-designed, and can lead to uncertainty and bad decision-making by developers implementing designs.

Relatedly, it’s now common for Design Systems to have a _Button_ component which includes button-styled links that are referred to as buttons, while not including a corresponding _Link_ (or _Anchor_) component. Unless documented carefully this can lead to internal language and comprehension issues.

Meanwhile developers have historically used [faux links](https://www.htmhell.dev/8-anchor-tag-used-as-button/) (`<a href="#">`) or worse, a DIY clickable `div`, as a trigger for JavaScript-powered functionality where they should instead use native buttons.

These patterns in combination have given rise to a collective muddle over buttons and links. We need to get back to basics and talk about foundational HTML.

## Buttons and anchors in HTML

There are two HTML elements of interest here.

What we refer to as a link is implemented using the HTML _anchor_ element (`<a>`).

Meanwhile buttons (by which I mean real buttons rather than links styled to appear as buttons) are implemented with the HTML _button_ element (`<button>`).

A link…

* _goes somewhere_
* normally links to another document (i.e. page) on the current website or on another website
* can alternatively link to a different section of the same page
* offers specific right-click options to mouse users (open in new tab, copy linked URL and more)
* is announced by screen readers as “Link”

A button…

* _does something_
* can be used to submit forms as a replacement for `<input type=submit />` and is the more modern and superior approach since it is easier to style, allows nested HTML and supports CSS pseudo-elements. 
* can also—with assistance from JavaScript—be used for any type of functionality that happens in-place rather than leading a user somewhere else, for example revealing hidden content or performing a calculation 
* is announced by screen readers as “Button” (no need to explicitly apply the [ARIA button role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role))

Tip

* For triggering JavaScript-powered interactions I’ll typically use a `button`. However in disclosure patterns where the trigger and target element are far apart in the DOM [it can make sense to use a link as the trigger](https://fuzzylogic.me/posts/2021-01-24-adactio-journalaccessible-interactions/).
* For buttons which are reliant on JavaScript, it’s best to use them within a strategy of progressive enhancement and render them with JavaScript. That way, if JavaScript fails or is unsupported, the user won’t be presented with a broken button.

References

* [Buttons vs. Links](https://yatil.net/blog/buttons-vs-links), by Eric Eggert
* [https://www.buttoncheatsheet.com/](https://www.buttoncheatsheet.com/)

\-

On the modern web, links are often designed to look like buttons. That’s not necessarily a crime however the lack of visual distinction encourages people to simply see “a button”. For practitioners this can lead to forgetting that each has different use cases and different effects. 

which always works the same way and does the same things, and that‘s not true. There’s also been a historic pattern of 

This lack of visual distinction can lead to people failing to appreciate the difference.

 same, some designers and developers don’t appreciate the difference between the elements.

\-

It seems that at least once a month there’s a new article about buttons and links, and it gets a bit tedious. However understanding them is important and I often see them misunderstood. So I’ve collected my thoughts here.

In short:

* they do different things
* they offer different options
* they are interacted with differently. 
* they have different accessibility features