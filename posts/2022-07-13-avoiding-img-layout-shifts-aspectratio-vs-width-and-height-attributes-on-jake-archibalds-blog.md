---
date: "2022-07-13T19:44:49.564Z"
title: "Avoiding img layout shifts: aspect-ratio vs width & height attributes (on Jake Archibald's blog)"
description: "Jake helpfully explains the inner workings of presentation hints and the best approach to take for each situation"
tags: [link, performance, images, aspectratio]
linkTarget: "https://jakearchibald.com/2022/img-aspect-ratio/"
---
> If I'm adding an image to an article on my blog, that's content. I want the reserved space to be the aspect ratio of the content. If I get the width and height attributes wrong, I'd rather the correct values were used from the content image. Therefore, width and height attributes feel like the best fit. This means I can just author content, I don't need to dip into inline styles.

If it's a design requirement that the layout of an image is a particular aspect ratio, enforcing that with aspect-ratio in CSS can be appropriate. For example, a hero image that must be 16 / 9 â if the image isn't quite 16 / 9 I don't want it messing up my design, I want the design to take priority. Although, if the image isn't actually that aspect ratio, it'll either end up stretched (object-fit: fill), letter-boxed (object-fit: contain), or cropped (object-fit: cover). None of which are ideal.
---

Jake helpfully explains the inner workings of presentation hints and the best approach to take for each situation.