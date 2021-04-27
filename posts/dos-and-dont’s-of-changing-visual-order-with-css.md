---
title: Dos and dont’s of changing visual order with CSS
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
draft: true
---
When considering using Flexbox or CSS Grid to change the visual order of elements, remember that “with great power comes great responsibility”.
---

Don’t Fix Source problems with grid or flexbox.

https://noti.st/rachelandrew/Mny9Vg/grid-content-re-ordering-and-accessibility#sd6FiEH 

---

This much we know: our web pages might be navigated by 
- a thumb and fingers, or 
- by a mouse, or 
- by a keyboard.

(Maybe update previous article, removing the following stuff and linking to this new article?) 

For the navigation by keyboard case, we need to consider tabbing and tab order. [I’ve posted about tabindex and tabbing order before](https://fuzzylogic.me/posts/using-the-tabindex-attribute/). In some cases we might want to make a normally non-focusable element focusable, thus giving it a keyboard tab-stop. However we shouldn’t otherwise be messing with tabbing order.

Relatedly, it’s not a great idea to use our new CSS superpowers to move focusable elements around visually such that their visual order is different from their source order, because this creates a disconnect between tabbing order and visual order. This could be confusing for a sighted person who navigates by keyboard. CSS Grid and Flexbox offer this ability through properties such as order, flex-direction and grid-auto-flow however as Rachel Andrew and others have suggested, [creating this kind of disconnect is to be avoided](https://rachelandrew.co.uk/archives/2019/06/04/grid-content-re-ordering-and-accessibility/). It might be OK when the elements (and their children) are non-focusable (for example re-ordering two divs) but avoid applying it to focusable elements like navigation links.

---


`order: -1`

I’m not sure this is a good idea. It’s a lovely solution in theory but in practice I think it might be one of those “with great power comes great responsibility” situations. It disconnects the visual order from the keyboard tabbing order, creating a potential accessibility issue.

https://noti.st/rachelandrew/Mny9Vg/grid-content-re-ordering-and-accessibility#sd6FiEH

James reply

I think it might be okay in this case as there isn't anything in the chart or meta panels that you can navigate to with the keyboard so there's no disconnect?

It could be done without order though by setting `flex-direction: column` in the parent style so the meta panel is shown first.