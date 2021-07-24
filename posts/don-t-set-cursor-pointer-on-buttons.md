---
date: 2019-04-08T14:55:29Z
title: 'Don’t set cursor: pointer on buttons'
description: 'It’s best to reserve cursor: pointer for links'
tags:
- pointer
- cursor
- links
- buttons
- howto
- a11y
- note
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
I have, I’m afraid to say, for many years been setting buttons to `cursor: pointer` because it felt right and a better user experience.
---

[As Florens Verschelde explains](https://github.com/necolas/normalize.css/issues/371#issuecomment-60072171), that approach is probably best avoided. I was going against the W3C’s spec that `cursor: pointer` should be reserved for links, and was adding to the usability _antipattern_ where “everything resembles a link”.

I’ll leave buttons as they are from here on in.