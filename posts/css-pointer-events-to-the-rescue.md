---
date: 2019-07-13T08:48:00
title: CSS pointer-events to the rescue
description: When clicking or tapping your button or anchor doesn’t work, this may be the solution you need.
tags: [entry, web, development, css, solution]
---
Sometimes, for reasons unknown, we find that clicking or tapping an element just isn’t working. Here’s a CSS-based approach that might help.
---

I’ve recently encountered the scenario – usually in reasonably complex user interfaces – where I have an anchor (or ocassionally, a button) on which clicks or taps just aren’t working, i.e. they don’t trigger the event I was expecting. 

On further investigation I found that this is often due to having an absolutely positioned element which is to some extent overlaying (or otherwise interfering with) our target clickable element. Alternatively, it may be because we needed a child/nested element inside our anchor or button and it is this element that the browser perceives as being the clicked or tapped element.

I’ve found that setting `.my-elem { pointer-events: none; }` on the obscuring element resolves the problem and get you back on track.

[Here’s some more information on CSS pointer events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events).
