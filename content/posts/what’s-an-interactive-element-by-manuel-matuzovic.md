---
title: What’s an interactive element? by Manuel Matuzovic
description: Manuel senses a general misunderstanding of what an interactive
  element is and what focusable really means so did some research.
noteWithTitle: false
linkTarget: https://www.matuzo.at/blog/2025/whats-an-interactive-element
date: 2025-12-14T18:05
tags:
  - link
  - html
  - a11y
  - accessibility
  - dialog
---
Manuel sensed a general misunderstanding of what an interactive element is and what *focusable* really means. He wasn’t totally sure himself either, so did some research. It’s a long post but the summary is that:

- an important characteristic of all interactive elements is they are natively focusable;
- focusable doesn't necessarily mean sequentially focusable (_tabbable_). Some interactive elements including `dialog` are click-focusable, and these are not tabbable but can be focused programmatically or via click.
- it’s also worth knowing that it's perfectly acceptable to place `tabindex` on a non-interactive element [to aid with accessibility](https://fuzzylogic.me/posts/using-the-tabindex-attribute/). But prefer applying it to semantic elements rather than `div`s.

<!-- excerpt -->

## Aside: is `dialog` an interactive element?

Interestingly, Manuel was motivated to do this research after feeling confused when reading some guidance on [MDN’s Dialog element docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog). He refers to the following note: “Do not add the `tabindex` property to the `<dialog>` element as it is not interactive and does not receive focus.” He takes issue with the second part of that sentence, saying that the `dialog` element _does_ receive focus because _it is_ an interactive element.

Here’s how he goes about proving his assertion.

Firstly he points to [the HTML Spec’s section on *Focus* which specifically includes “dialog boxes” within a list of “interactive widgets”](https://html.spec.whatwg.org/multipage/interaction.html#focus). 

Secondly he describes how interactive elements can be focused which makes them _focusable areas_. (To put it another way: _interactive elements are focusable_.) He explains what qualifies as a _focusable area_ and that `dialog` meets the qualifying criteria. Specifically this criterion: “the user agent determines the element to be focusable”.

He continues by explaining what _focusable_ means:

> An element is focusable when it can be focused programmatically, e.g. via the `focus()` method or the `autofocus` attribute.
>
> Focusable elements can either be _sequentially focusable_, _click focusable_, both, or none of them.
> 
> Users can reach sequentially focusable elements by pressing the Tab key.

And Manuel provides practical proof of the browser regarding `dialog` as being focusable via two demos.

His first demo shows that when you launch a `dialog` via a `button` that fires `myDialog.showModal()` and that `dialog` contains no interactive elements, the `dialog` element itself has focus. He outputs the value of `document.activeElement.tagName` to the screen and it is `DIALOG`. 

His second demo shows that an open dialog element (`<dialog open>`) is _click focusable_ (or _sequentially focusable_ depending on your choice of browser).

All of which backs up Manuel’s assertion that _dialog is an interactive element_.
