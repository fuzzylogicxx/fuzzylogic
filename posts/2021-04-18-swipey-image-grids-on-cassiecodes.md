---
date: "2021-04-18T09:46:45.462Z"
title: "Swipey image grids (on cassie.codes)"
description: "Cassie Evans explains that SVG is not just icons and illustrations but can also be used to create animated grids"
tags: [link, svg, responsive, animation, image, shapes, tutorial]
linkTarget: "https://www.cassie.codes/posts/swipey-image-grids/"
---
A lovely post by Cassie Evans in which she demonstrates that SVG is not just for icons and illustrations. You might also reach for it to create a responsive, animated grid of images.

> we have another grid at our disposal. SVG has its own internal coordinate system and it's responsive by design.
---

There are lots of interesting techniques in here such as:

- layering an `<image>` on top of a shape such as a `<rect>`; 
- using `preserveAspectRatio` to make the image fully cover and _fit_ the shape when their aspect ratios differ;
- using `<clipPath>` as a custom-shaped window to an image (for example a `<circle>`); 
- giving the `<clipPath>`’s nested shape a solid `fill` to _hide_ the `<image>` to which it’s applied; 
- animating a rectangular `<clipPath>` applied to an image to give the effect of the image “sliding into view”; and
- using Greensock to make sequencing multiple animations easy and to ensure they work consistently across browsers. 

However I also loved this simple piece of practical advice to help picture the SVG’s `viewbox` and plot shapes on top:

> I usually get a pen and paper out at this point and doodle it out.
