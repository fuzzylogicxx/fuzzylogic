---
date: 2022-05-15T11:42:39Z
title: Layering elements with Grid rather than positioning
description: Thoughts on Stephanie Eckles’ brilliant grid-based layering utilities
tags:
- css
- positioning
- cssgrid
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
A while back I bookmarked Michelle Barker’s [CSS Grid based overlay technique](https://fuzzylogic.me/posts/2021-01-06-a-utility-class-for-covering-elements-on-css-in-real-life/) which neatly allows layering one element atop another using CSS Grid rather than absolute positioning. Now, Stephanie Eckles has taken the idea a step further with her [Smol Stack Layout](https://smolcss.dev/#smol-stack-layout) which offers a more flexible markup structure, some intuitive grid area naming and a neat `aspect-ratio` API.

Stephanie’s component is feature-packed and opinionated to the extent that it took me a while to understand all the moving parts. So for simplicity I’ve created a pared-back version on CodePen: see [Layering utility with CSS Grid](https://codepen.io/fuzzylogicx/pen/XWZNqqo).

While Michelle’s utility kept the markup really simple with the container doubling-up as the first visual “layer in the cake”, I think for flexibility and robustness I prefer Stephanie’s approach where the container only serves to set the aspect ratio, with the _layers_ represented by two or more child elements.

## Layering text upon images

In [Smol background picture](https://smolcss.dev/#smol-background-picture), Stephanie goes further, leaning on her layering utility to cleverly layer text upon images. This is a modern alternative to the type of effect we previously achieved with background images. It uses a content image marked up using `<picture>` to progressively enhance the format (heavier-weight `jpg` for old browsers, lightweight `webp` for new browsers) and is styled with `object-fit: cover` in order to perfectly span its container.

This modern approach is great because often from an accessibility perspective our background images should really be _content_, described properly with `alt`, to provide equivalent visual and non-visual experiences. Furthermore using a content image tends to be better for performance with there now being so many new image techniques and attributes at our disposal when compared to background images. Lastly, handling the image as content makes it more flexible for styling.

## Using Grid for a “Hero” Banner

Another noteworthy member of this family of techniques from Stephanie is her [Hero with CSS Grid](https://moderncss.dev/3-popular-website-heroes-created-with-css-grid-layout/). Here she uses the same idea of a single grid-template-area with child _content_ and _image_ stacked up in layers, alongside some nifty use of grid positioning properties to align elements within that. This one is very flexible, very responsive, and super-useful.

## Summing up

I really like this move from absolute positioning because it always felt brittle. It doesn’t play well with responsive layouts, and isn’t resilient to cases where adjacent elements could overlap. Furthermore you often see absolute positioning used in conjunction with pseudo elements and while I’ve occasionally taken this approach (and appreciate the creativity behind these techniques) I’ll admit I find it much easier to read and maintain CSS that relates to actual structural elements rather than “magical” CSS elements. I much prefer these simple, modern and fit-for-purpose CSS Grid based approaches.
