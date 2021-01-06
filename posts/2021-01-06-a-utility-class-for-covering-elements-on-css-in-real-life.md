---
date: "2021-01-06T15:25:29.773Z"
title: "A Utility Class for Covering Elements (on CSS { In Real Life })"
description: "A utility for overlaying one element on top (and fully covering) another from Michelle Barker"
tags: [link, css, development, cssgrid, logicalproperties, inset, positioning, utility, layout]
linkTarget: "https://css-irl.info/a-utility-class-for-covering-elements/"
---
Need to overlay one HTML element on top of and fully covering another, such as a heading with translucent background on top of an image? Michelle Barker has us covered with this blog post in which she creates an `overlay` utility to handle this. She firstly shows how it can be accomplished with positioning, then modernises her code using the `inset` CSS logical property, before finally demonstrating a neat CSS Grid based approach.
---

I like this and can see myself using it – especially the Grid-based version because these days I try to avoid absolute positioning and use modern layout tools instead where possible. 

I’ve [mocked up a modified version on Codepen](https://codepen.io/fuzzylogicx/pen/XWjYmyZ), sticking with CSS Grid for simplicity. I was going to also wrap it in an `@supports (display:grid)` however the styles are all grid-based so in the case of no grid support they simply wouldn’t run, rather than causing any problems.
