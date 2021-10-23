---
date: 2021-10-23T18:53:41.000+00:00
title: 'Buttons and links: their differences and how to use them'
description: 'Buttons versus links: differences and tips'
tags:
- entry
- anchor
- link
- button
- a11y
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
It seems that at least once a month there’s a new article about buttons and links, which gets a bit tedious. However understanding them is important and I often see them misunderstood. So I’ve collected my thoughts here.

On the modern web, links are often styled to look like buttons, making the two visually indistinct. At the same time, some devel;

This lack of visual distinction can lead to people failing to appreciate the difference.

 same, some designers and developers don’t appreciate the difference between the elements.

Links and buttons are created from two entirely different HTML elements—the _anchor_ and the _button_—which do different things and serve different purposes.

Link characteristics

* they _go somewhere_
* normally link to another document (i.e. page) on the current website or an another website
* can alternatively link to a

Button characteristics

* they _do something_
* can be used to natively submit forms as a replacement for `<input type=submit />` and are more flexible than the latter because they can [include HTML content](https://www.buttoncheatsheet.com/)
* can also—with assistance from JavaScript—…

Experiential differences

* announced differently
* users have different expectations of the two. By this I don’t only mean the general “links go somewhere” and “buttons do something” expectations but also in terms of their accessibility and interactivity.
* asd
* asd
* asd

Additional notes

* I’ll normally use a `button` for JavaScript-powered interactions such as disclosure widgets. However in cases where the trigger and target element are far apart in the DOM [it can make sense to use a link as the trigger](https://fuzzylogic.me/posts/2021-01-24-adactio-journalaccessible-interactions/).

References

* [Buttons vs. Links](https://yatil.net/blog/buttons-vs-links), by Eric Eggert