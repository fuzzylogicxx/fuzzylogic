---
title: 'Relearn CSS layout: Every Layout'
description: Heydon Pickering and Andy Bell’s new project is seriously good
date: 2019-08-05T23:00:00Z
mainImage.isAnchor: false
tags: []
draft: true
linkTarget: ''

---
Every now and then something comes along in the world of web design that feels like a substantial shift. This project from Heydon Pickering and Andy Bell feels to me like one of those moments.
---

primitives Self-governing No media queries Composition

Geared toward design systems therefore modularity.

More geared toward supporting the browser making decisions based on its algorithms.

Goes deeper in its use of flexbox, especially into concepts of “ideal” widths, available space, and using flexbox for component self-governance.

> *+* for adding space between relationships not to elements is great.

Use of universal selector makes rules less specific and more reusable.

Layouts that are: focused, responsive based on content, responsive based on container rather than viewport, non-reliant on media queries; modular and composable, well-crafted to handle eventualities (i.e. they are resilient). 

Components that handle their own layouts without the need for manual intervention through media queries.

Still gathering my thoughts:

\-ve: a few extra divs, a tendency to focus solely on flexbox, a bit more presentational, 

\+ve: more reusability, more convention and repeatability, less reinventing the wheel for simple things; write less code

Another consideration (e.g. when eschewing e.g. CSS Grid based techniques because they’d require media queries) is that that approach might be OK, because I’m building a one-off campaign site, or some other small site which doesn’t need to involve building a design system with context-independent components.

However I’ve tended to be a fan of honing techniques for bigger sites even when developing smaller sites (so long as they doesn’t negatively impact users).

Check out [https://every-layout.dev/](https://every-layout.dev/ "https://every-layout.dev/")