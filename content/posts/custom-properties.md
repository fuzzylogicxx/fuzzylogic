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

## Using them responsibly

From something I posted in Slack at work (but note that personally I would probably do the progressive enhancement of adding a non-CP-based declaration before each CP-based-declaration because I want to support IE 11 whereas FA don’t.

- I totally agree with Stu that browser support makes CPs good to go, i.e. we can go all-in.
- that means we no longer need fallbacks e.g. we don’t need to declare background: red; before declaring a CP-based version on the next line. We can remove any existing fallbacks like this.
- In cases (probably fairly rare) when we are i) using a custom property in a different file than where the custom property was initially defined; and ii) it is a secondary/bespoke token rather than a foundational token, it’s probably a good idea to also declare a var() fallback, for example: var(--accent-color, red); or perhaps in our case, based on @james.mockett’s new tokens implementation, var(--accent-color, fe-color("red-dark")); . The reason for this is just as a fallback in case --accent-color has not been set.
- Lastly, and probably fairly importantly, we should ensure that for colour (and other token-based) modifiers in our components, our ViewComponents continue to only allow a predefined range (like in James’s PR) because this removes the ability for a custom property to be set to a non-sensical value, e.g. background being set to 42deg by a wrongly set custom property. The reason we need to guard against this is because if you wrongly set a background colour using a custom property, it will fall back to transparent (its initial value). So we need to put guardrails in our component API.

## They’re great for…

- animations
- …

## JS examples

- …
- also we can create custom properties in JS using `setProperty()`

## Also see
- Lea Verou article https://increment.com/frontend/a-users-guide-to-css-variables/ 
- https://css-tricks.com/tag/custom-properties/
- https://codepen.io/michellebarker/pen/abdKLLz which uses Houdini (a set of APIs for extending CSS) to register properties that allow us to do things to gradients with JavaScript that we otherwise couldn’t do, by using custom properties

