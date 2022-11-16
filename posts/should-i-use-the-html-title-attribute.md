---
date: 2022-11-16T10:43:06Z
title: Should I use the HTML title attribute?
description: My research suggests that the html title attribute is almost always to be avoided
tags:
- entry
- a11y
- html
- title
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
People have used the HTML title attribute to achieve a native “tooltip” effect for many years. However accessibility experts have recommended that we should avoid this practice, and here I summarise my research on the topic.
---

Renowned accessibility solutions provider [The Paciello Group recommend the title attribute should almost always be avoided.](https://www.tpgi.com/using-the-html-title-attribute/) It causes problems for lots of different usage contexts (keyboard, touch device, screen readers). The only place where I can see that it is still helpful is on `iframe`. It _was_ beneficial on form inputs in cases where a visible text label would be redundant and we want to provide our control with a programmatically associated label, however we now have `aria` attributes which do a better job.

So on anything other than `iframe` the `title` attribute is undesirable. To back this up, at work my team recently received the following accessibility feedback from [Tetralogical](https://tetralogical.com/) when they reviewed one of our `table`s.

> The Edit and Delete links use the `title` attribute to provide additional context for each link. The `title` attribute can be unreliable (for example, in testing VoiceOver announces the title in French). Provide additional context using the `aria-describedby` attribute to reference the name or reference value of the item.
