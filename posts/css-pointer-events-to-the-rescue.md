---
date: 2019-07-13T08:48:00
title: CSS pointer-events to the rescue
description: When clicking or tapping your button or anchor doesn’t work, this may be the solution you need.
tags: [entry, web, development, css, solution]
---
Sometimes a click or tap doesn’t work, i.e. doesn’t trigger the event you were expecting. Here’s a CSS-based approach that might help.
---

I’ve recently come encountered the scenario, usually in reasonably complex user interfaces, where I have an anchor (or less often, a button) on which clicks (or taps) just aren’t work, i.e. they don’t trigger the event I was expecting. 

On further investigation I found that this is often due to having an absolutely positioned element which is to some extent overlaying (or somehow interfering with) our target clickable element. Or perhaps it’s because we needed a child/nested element inside our anchor or button and it is this element that the browser perceives as being the clicked or tapped element.

I’ve found that setting `.elem { [ pointer-events: none; }` on the obscuring element resolves the problem and get you back on track.

[Here’s some more information on CSS pointer events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events).
