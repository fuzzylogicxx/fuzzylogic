---
date: 2022-05-15T11:42:39Z
title: Using CSS Grid instead of absolute positioning
description: ''
tags: []
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: true

---
My simple pen for parent with two children both taking up same space, one atop the other 

Layering elements with CSS Grid: [https://codepen.io/fuzzylogicx/pen/XWZNqqo](https://codepen.io/fuzzylogicx/pen/XWZNqqo "https://codepen.io/fuzzylogicx/pen/XWZNqqo")

based on [https://smolcss.dev/#smol-stack-layout](https://smolcss.dev/#smol-stack-layout "https://smolcss.dev/#smol-stack-layout")

Good because absolute positioning is brittle / for a bygone era. For example it doesn’t play well with responsiveness. Also, it’s often used in tandem with pseudo elements. I’ve done this myself (a little) and I loved the ingenuity of Lea Verou’s CSS Secrets book that brought a lot of these techniques to the table, but personally I find these solutions hard to reverse engineer and maintain. I find it easier to relate CSS boxes to real HTML elements rather than magical hidden ones.

Using grid-area is slightly neater than Michelle’s [https://fuzzylogic.me/posts/2021-01-06-a-utility-class-for-covering-elements-on-css-in-real-life/](https://fuzzylogic.me/posts/2021-01-06-a-utility-class-for-covering-elements-on-css-in-real-life/ "https://fuzzylogic.me/posts/2021-01-06-a-utility-class-for-covering-elements-on-css-in-real-life/") and I think I kinda prefer the idea of there being a container and the stacked items are children of that, rather than the parent being the first item in the “stack”.

Evolve to images with text [https://smolcss.dev/#smol-background-picture](https://smolcss.dev/#smol-background-picture "https://smolcss.dev/#smol-background-picture")

Good because this allows us to make the image content which can be good for accessibility and good for performance (due to all the new image loading stuff we can do versus bg images).

Note: `position: relative;` on the item we want on top is only needed because of the filter on the image. Remove the filter and you don’t need the `position` or any `z-index`