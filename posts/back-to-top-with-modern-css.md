---
date: 2024-01-01T22:50:01Z
title: Revealing back to top link, by David Darnes
description: 'David uses CSS to show the link only when it makes sense, and to pin its position'
tags:
- link
- css
- positioning
linkTarget: https://codepen.io/daviddarnes/pen/JjxmLpb?editors=0100
---
David cleverly uses CSS alone (and only a few lines) to show a “back to top” link only after the user has started scrolling, then pin its position to the bottom-left of the screen.
---

The clever `margin-top: 110vh` combined with `position: sticky` – since `110vh` is slightly more than 100% of the page’s height – gives the link a _starting position_ that is not initially visible but becomes visible once the user starts scrolling. The `bottom: 0` then ensures that when the user continues scrolling vertically the link “sticks” to the bottom-left of the page.

So little code and so clever!

PS if you’re wondering why you’d want a “back to top” link in the first place, it’s to let a user who has scrolled far down a long page to easily get back to options located at the top. See [NN Group’s Back-to-Top Button Design Guidelines](https://www.nngroup.com/articles/back-to-top/).
