---
title: Custom Properties
description: Custom Properties
date: 2021-01-24T15:53:42.364Z
mainImage.isAnchor: false
tags:
  - web
  - development
  - html
  - css
  - javascript
  - customproperties
draft: true
---
## Bridge / not just CSS vars / game-changer

https://adactio.com/journal/17106 A bridge between JavaScript and CSS, JK did some work where he updated a class name from JavaScript (el.classList.add). He automatically thought of updating a class name because, frankly, that’s how I’ve always done it. I’d say about 90% of the DOM scripting I’ve ever done involves toggling the presence of class values: accordions, fly-out menus, tool-tips, and other progressive disclosure patterns. But really, I should try to avoid touching the DOM at all. It can have performance implications, possibly triggering unnecessary repaints and reflows. Now with custom properties, there’s a direct line of communication between JavaScript and CSS. No need to use the HTML as a courier. A lot of CP’s potential comes from the fact that they’re not just confined to CSS.

## Setting on Selector vs root

- https://bathdigitalfestival.co.uk/events/tech:builders/custom-properties-the-secret-ingredients-for-css-magic.html MB says setting as close to where you need them (rather than blanket on `:root`) might 1) be better for performance, and 2) also setting on a selector makes them inherited by the descendents of the selectors
- EveryLayout says…?
- if we see a CP _locally_ (e.g. a `--rows` CP on a `.grid` class) then we can reuse it elsewhere too.
- So you’ll want to define _some_ CPs globally (but keep lean) and then specific CPs set _locally_.

## Support for CPs

- can feature test (see MB talk at 20 mins)
- But also heuristics: If you have X (e.g. grid), you have CPs

## They’re great for…

- animations
- …

## JS examples

- …
- also we can create custom properties in JS using `setProperty()`

## Also see
- https://increment.com/frontend/a-users-guide-to-css-variables/
- https://css-tricks.com/tag/custom-properties/
- https://codepen.io/michellebarker/pen/abdKLLz which uses Houdini (a set of APIs for extending CSS) to register properties that allow us to do things to gradients wuth JavaScript that we otherwise couldn’t do, by using custom properties

