---
date: "2021-01-26T22:35:54.406Z"
title: "Use CSS Clamp to create a more flexible wrapper utility (on Piccalilli)"
description: "Andy Bell recommends using CSS clamp() to control your wrapper/container width because it supports setting multiple tolerances using different units simultaneously rather than in a more convoluted way."
tags: [link, css, web, development, tip, layout, width, constraints, responsive, clamp]
linkTarget: "https://piccalil.li/quick-tip/use-css-clamp-to-create-a-more-flexible-wrapper-utility"
---
Here’s Andy Bell recommending using CSS `clamp()` to control your wrapper/container `width` because it supports setting a preferred value in `vw` to ensure sensible gutters combined with a maximum tolerance in `rem`—all in a single line of code.

> If we use clamp() to use a viewport unit as the ideal and use what we would previously use as the max-width as the clamp’s maximum value, we get a much more flexible setup.
---

The code looks like this:

<figure>

``` css
.container {
  width: clamp(16rem, 90vw, 70rem);
  margin-left: auto;
  margin-right: auto;
}
```

</figure>

This is pretty cool because I know from experience that coding responsive solutions for wrappers can be tricky and you can end up with a complex arrangement of max-width and media queries whilst still—as Andy highlights—not providing optimal readability for medium-sized viewports. 

[Using CSS Grid with minmax()](https://fuzzylogic.me/posts/2020-11-17-breaking-out-with-css-grid-layout-on-cloudfourcom/) is one possible approach to controlling wrappers however this article offers another (potentially better) tool for your kit.

It’s worth noting that Andy could probably have just used `width: min(90vw, 70rem)` here ([as Christopher suggested](https://twitter.com/c__beck/status/1351515957034889219)) because setting the _lower bound_ provided by `clamp()` is only necessary if your element is likely to shrink unexpectedly and a regular block-level element wouldn’t do that. The `clamp` approach might be handy for flex items, though. 

(via [@piccalilli_](https://twitter.com/piccalilli_))
