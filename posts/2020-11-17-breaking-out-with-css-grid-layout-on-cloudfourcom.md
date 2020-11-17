---
date: "2020-11-17T21:21:00.629Z"
title: "Breaking Out With CSS Grid Layout (on cloudfour.com)"
description: "The original and best CSS Grid âarticle with full-width imagesâ layout"
tags: [link, cssgrid, breakout, image, responsive, layout]
linkTarget: "https://cloudfour.com/thinks/breaking-out-with-css-grid-layout/"
---
As I was bookmarking the mastery.games article yesterday, I started getting the feeling that something was awfully familiar. It was! Iâve seen this layout before, from Tyler Stickler back in 2017, but failed to bookmark it at the time.
---

Here, then, is the original and still the best CSS Grid âarticle with full-width imagesâ layout! I love the way that, by naming the lines and appending `-start` and `-end` as appropriate you can then target the area between the lines using its short name.

.Prose {
  display: grid;
  grid-template-columns: 
    [full-start] minmax(1em, 1fr) 
    [main-start] minmax(0, 40em) [main-end]
    minmax(1em, 1fr) [full-end];
}