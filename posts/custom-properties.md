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
- https://adactio.com/journal/17106 A bridge between JavaScript and CSS, JK did some work where he updated a class name from JavaScript (el.classList.add). He automatically thought of updating a class name because, frankly, that’s how I’ve always done it. I’d say about 90% of the DOM scripting I’ve ever done involves toggling the presence of class values: accordions, fly-out menus, tool-tips, and other progressive disclosure patterns. But really, I should try to avoid touching the DOM at all. It can have performance implications, possibly triggering unnecessary repaints and reflows. Now with custom properties, there’s a direct line of communication between JavaScript and CSS. No need to use the HTML as a courier. A lot of CP’s potential comes from the fact that they’re not just confined to CSS.

