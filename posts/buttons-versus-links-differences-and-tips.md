---
date: 2021-10-23T18:53:41.000+00:00
title: 'Buttons and links: definitions, differences and tips'
description: How buttons and links work, the differences between them, and when to
  use each.
tags:
- entry
- development
- web
- design
- javascript
- css
- html
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
draft: false

---
On the web buttons and links are fundamentally different materials. However some design and development practices have led to them becoming conceptually “bundled together” and misunderstood. Practitioners can fall into the trap of seeing the surface-level commonality that “you click the thing, then something happens” and mistakenly thinking the two elements are interchangeable. Some might even consider them as a single “button component” without considering the distinctions underneath. However this mentality causes our users problems _and_ is harmful for effective web development. In this post I’ll address why buttons and links are different and exist separately, and when to use each.
---

## Problematic patterns

Modern website designs commonly apply the appearance of a button to a link. For isolated calls to action this can make sense however as a design pattern it is often overused and under-cooked, which can cause confusion to developers implementing the designs.

Relatedly, it’s now common for Design Systems to have a _Button_ component which includes button-styled links that are referred to simply as buttons. Unless documented carefully this can lead to internal language and comprehension issues.

Meanwhile developers have historically used [faux links](https://www.htmhell.dev/8-anchor-tag-used-as-button/) (`<a href="#">`) or worse, a DIY clickable `div`, as a trigger for JavaScript-powered functionality where they should instead use native buttons.

These patterns in combination have given rise to a collective _muddle_ over buttons and links. We need to get back to basics and talk about foundational HTML.

## Buttons and anchors in HTML

There are two HTML elements of interest here.

Hyperlinks are created using the HTML _anchor_ element (`<a>`). Buttons (by which I mean real buttons rather than links styled to appear as buttons) are implemented with the HTML _button_ element (`<button>`).

Although a slight oversimplification, I think [David MacDonald’s heuristic](https://twitter.com/davidmacd/status/1309954746602713098) works well:

If it GOES someWHERE use a link
<span style="display:block;">If it DOES someTHING use a button</span>

A link…

* _goes somewhere_ (i.e. navigates to another place)
* normally links to another document (i.e. page) on the current website or on another website
* can alternatively link to a different section of the same page
* historically and by default appears underlined
* when hovered or focused offers visual feedback from the browser’s status bar
* uses the “pointing hand” mouse pointer
* results in browser making an HTTP `GET` request by default. It’s intended to _get_ a page or resource rather than to _change_ something
* offers specific right-click options to mouse users (open in new tab, copy URL, etc)
* typically results in an address which can be bookmarked
* can be activated by pressing the return key
* is announced by screen readers as “Link”
* is available to screen reader users within an overall _Links_ list

A button…

* _does something_ (i.e. performs an action, such as “Add”, “Update” or "Show")
* can be used as `<button type=submit>` within a form to submit the form. This is a modern replacement for `<input type=submit />` and much better as it’s easier to style, allows nested HTML and supports CSS pseudo-elements
* can be used as `<button type=button>` to trigger JavaScript. This type of button is different to the one used for submitting a `<form>`. It can be used for any type of functionality that happens in-place rather than taking the user somewhere, such as expanding and collapsing content, or performing a calculation.
* historically and by default appears in a pill or rounded rectangle
* uses the normal mouse pointer arrow
* can be activated by pressing return _or space._
* implictly gets the [ARIA button role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role). 
* can be extended with further ARIA button-related states like `aria-pressed`
* is announced by screen readers as “Button”
* unlike a link is not available to screen reader users within a dedicated list

## Our responsibilities

It’s our job as designers and developers to use the appropriate purpose-built element for each situation, to present it in a way that respects conventions so that users know what it is, and to then meet their expectations of it.

## Tips

* Visually distinguish button-styled call-to-action links from regular buttons, perhaps with a more pill-like appearance and a right-pointing arrow
* Avoid a proliferation of call-to-action links by linking _content itself_ (for example a news teaser’s headline). Not only does this reduce “link or button?” confusion but it also saves space, and provides more accessible link text.
* Consider having separate Design System components for Button and [ButtonLink](https://seek-oss.github.io/braid-design-system/components/ButtonLink/) to reinforce important differences.
* For triggering JavaScript-powered interactions I’ll typically use a `button`. However in disclosure patterns where the trigger and target element are far apart in the DOM [it can make sense to use a link as the trigger](https://fuzzylogic.me/posts/2021-01-24-adactio-journalaccessible-interactions/).
* For buttons which are reliant on JavaScript, it’s best to use them within a strategy of progressive enhancement and not render them on the server but rather with client-side JavaScript. That way, if the client-side JavaScript is unsupported or fails, the user won’t be presented with a broken button.

## References

* [Get safe](https://adactio.com/journal/17768), by Jeremy Keith
* [Buttons vs. Links](https://yatil.net/blog/buttons-vs-links), by Eric Eggert
* [The Button Cheat Sheet](https://www.buttoncheatsheet.com/), by Manuel Matuzović
* [A complete guide to links and buttons](https://css-tricks.com/a-complete-guide-to-links-and-buttons/) on CSS-Tricks
* [The Links vs Buttons Showdown](https://speakerdeck.com/marcysutton/the-links-vs-buttons-showdown), by Marcy Sutton
