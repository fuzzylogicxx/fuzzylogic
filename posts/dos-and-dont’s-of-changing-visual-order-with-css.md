---
title: Changing visual order with CSS
description: When considering using Flexbox or CSS Grid to change the visual
  order of elements, remember that “with great power comes great
  responsibility”.
date: 2021-04-27T08:21:10.275Z
mainImage.isAnchor: false
tags:
  - order
  - tab
  - cssgrid
  - flexbox
  - visualorder
  - a11y
  - focusable
  - interactive
draft: false
---
When considering using Flexbox or CSS Grid to change the visual order of elements, remember that “with great power comes great responsibility”.
---

Flexbox and CSS Grid have given us new powers to shuffle the visual order of elements on a web page such that it is different to the element order in the source code.

However many smart developers have rightly pointed out that although this is really convenient and can help in conquering gnarly design and responsive challenges, it’s often not a good idea. Rachel Andrew in particular has regularly offered the following advice:

> Don’t fix source problems with Grid or Flexbox.

See Rachel’s talk [Grid, content re-ordering and accessibility](https://noti.st/rachelandrew/Mny9Vg/grid-content-re-ordering-and-accessibility#sd6FiEH) for more detail.

So, what’s the problem?

Essentially we cause people problems when we create a disconnect between tabbing order and visual order. 

Let’s dig into the detail.

## People browse web pages in different ways

We know that a web page’s visitors are likely to have a range of different abilities. While some experience the full extent of our our visual design, others are visually-impaired or blind. Others still have motor impairments. The web was intended to be accessible and therefore web pages should cater appropriately to this range of user needs.

Relatedly we also know that people will use one or more of the following methods to move around a web page:

- a thumb and fingers; 
- a mouse (or trackpad) and keyboard; 
- a keyboard alone.

There are probably other methods I’m forgetting, but those are the most common.

In order to cater to people who navigate a web page using a keyboard without a mouse (a.k.a. _keyboard users_), we must ensure that the page is tab-friendly. We want the page’s interactive elements to be navigable and focusable by pressing the <kbd>Tab</kbd> key. They should be focusable one by one in the same order as they are defined in the HTML document. 

Often, achieving tab-friendliness requires little or no additional development effort because the browser gives us so much of the necessary behaviour natively. Interactive HTML elements like anchors (links) and form controls are focusable by default. And for any custom interactions where we want to make a normally non-focusable element (such as a `div`) focusable (thus giving it a keyboard tab-stop) we can apply [the tabindex attribute](https://fuzzylogic.me/posts/using-the-tabindex-attribute/).

A simple, well-formed web page will natively offer a natural and predictable tabbing order.

With CSS Grid and Flexbox we now have new CSS options such as `order`, `flex-direction: row-reverse` and `grid-auto-flow` which let us reorder elements on the page. This can be really handy for situations where a design spec calls for Element 1 to appear above Element 2 on narrow viewports but to its right on wider viewports. Using these new CSS properties we might let the elements follow the source order on narrow viewports but change their order within a media query for wider viewports.

However this means we are now messing with the natural order of things. And if we move _focusable_ elements around such that their visual order is different from their source order this creates a disconnect between tabbing order and visual order.

The disconnect is unlikely to be apparent to sighted people on a tablet/phone or on a desktop setup and navigating with their mouse, because they are not using tab to navigate. Blind users using a screen reader will be similarly unaffected because they don’t experience the visual order. 

We might assume that all keyboard (only) users are also blind, using a screen reader, and not perceiving visual order. However keyboard users also include sighted people who have trouble operating a pointing device such as a mouse or trackball, or whose mouse is currently not working, or who simply prefer to use a keyboard where possible. 

**For the sighted person who navigates by keyboard our change of order would be confusing.** When you use tab and expect that to follow convention and set focus on one element but it actually sets focus on another, you’ll likely assume that something is broken.

Rachel Andrew argues that [creating this kind of disconnect is to be avoided](https://rachelandrew.co.uk/archives/2019/06/04/grid-content-re-ordering-and-accessibility/). Léonie Watson suggests that in simple examples such a disconnect may only be mildly awkward, however in complex interfaces [it could make things horribly unusable](https://tink.uk/flexbox-the-keyboard-navigation-disconnect/).

## Is it ever OK to change visual order with CSS?

At work I recently reviewed a PR where the visual order of a Flexbox layout was being updated via `order: -1` in a media query for wide viewports. Although it was a really elegant solution on paper, I advised caution in light of the pitfalls mentioned above.

However a colleague rightly pointed out that the elements being reordered were two `div`s. In this case and any others where the elements (and their children) are non-focusable and we’re not messing with the likes of navigation links or form elements, I _think_ we are safe.

## The Future

We’ve recently been given a few new CSS layout powers only to subsequently be [advised not to use them](https://fuzzylogic.me/posts/using-css-display-contents-to-snap-grandchild-elements-to-a-grid/).

How do we move forward?

Rachel Andrew argues that this problem needs addressed at a CSS level; that developers should be able to set the tab and reading order to follow the visual rather than source order under certain circumstances.

Until that becomes a CSS reality we should continue to be judicious in our usage, to ensure we don’t break user expectations.
