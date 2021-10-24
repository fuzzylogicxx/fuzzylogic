---
date: 2021-10-23T18:53:41.000+00:00
title: 'Buttons and links: definitions, differences and tips'
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
Designers like to design _call to action_ links to look like buttons. And developers have historically used faux links (y’know, `<a href="#">` or some other element made clickable) as a trigger for JavaScript-powered functionality when they should be using buttons. Together these patterns have fostered a collective confusion about how buttons and links work, how they differ, and when to use each.

Let’s start with the basics: there are two HTML elements of interest here. 

What we refer to as a link is implemented using the HTML _anchor_ element (`<a>`).

Meanwhile buttons—real buttons rather than links styled to appear as buttons—are implemented with the HTML _button_ element (`<button>`).

These HTML elements may share the surface-level commonality that “you click it, then something happens” but that‘s where the similarity ends.

A link:

* _goes somewhere_
* normally links to another document (i.e. page) on the current website or an another website
* can alternatively link to a

A button:

* _does something_
* can be used to submit forms as a replacement for `<input type=submit />` and is the more modern and superior approach since it is easier to style, allows nested HTML and supports CSS pseudo-elements. 
* can also—with assistance from JavaScript—…

Experiential differences

* announced differently
* users have different expectations of the two—not only that “links go somewhere” and “buttons do something” but also in terms of their accessibility and interactivity.
* asd
* asd
* asd

Tips

* I’ll normally use a `button` for JavaScript-powered interactions. However in disclosure patterns where the trigger and target element are far apart in the DOM [it can make sense to use a link as the trigger](https://fuzzylogic.me/posts/2021-01-24-adactio-journalaccessible-interactions/).

References

* [Buttons vs. Links](https://yatil.net/blog/buttons-vs-links), by Eric Eggert

\-

On the modern web, links are often designed to look like buttons. That’s not necessarily a crime however the lack of visual distinction encourages people to simply see “a button”. For practitioners this can lead to forgetting that each has different use cases and different effects. 

which always works the same way and does the same things, and that‘s not true. There’s also been a historic pattern of 

This lack of visual distinction can lead to people failing to appreciate the difference.

 same, some designers and developers don’t appreciate the difference between the elements.

\-

It seems that at least once a month there’s a new article about buttons and links, and it gets a bit tedious. However understanding them is important and I often see them misunderstood. So I’ve collected my thoughts here.