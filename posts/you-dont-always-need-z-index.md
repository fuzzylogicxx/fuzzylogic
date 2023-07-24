---
date: 2023-07-24T13:17:15Z
title: Use z-index only when necessary
description: 
tags:
- note
- web
- development
- css
- positioning
location: Glasgow
noteWithTitle: true
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

There’s a great section on [Source order and layers](https://every-layout.dev/layouts/imposter/) in Every Layout’s _Impostor_ layout. It’s a reminder that when needing to layer one element on top of the other you should:

1. favour a modern layout approach such as CSS Grid over absolute positioning; and
2. not apply `z-index` unless it’s necessary.

> which elements appear over which is, by default, a question of source order. That is: if two elements share the same space, the one that appears above the other will be the one that comes last in the source.

> `z-index` is only necessary where you want to layer positioned elements irrespective of their source order. It’s another kind of override, and should be avoided wherever possible.

> An arms race of escalating z-index values is often cited as one of those irritating but necessary things you have to deal with using CSS. I rarely have z-index problems, because I rarely use positioning, and I’m mindful of source order when I do.
