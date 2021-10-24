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
Some of the web’s design and development practices have led to buttons and links becoming bundled together, confused and misunderstood. Practitioners are perhaps guilty of seeing the surface-level commonality between buttons and links that “you click the thing, then something happens” and mistakenly thinking that they are interchangeable. However this is wrong; harmful for effective web development; and most importantly causes our users problems. In this post I’ll address how buttons and links work, the differences between them, and when to use each.

Designers often like to apply the appearance of a button to a link. 

Developers have historically used [faux links](https://www.htmhell.dev/8-anchor-tag-used-as-button/) (`<a href="#">`) or worse, a DIY clickable `div` masquerading as a button, as a trigger for JavaScript-powered functionality where they should use native buttons. 

I think those patterns in combination have given rise to a collective confusion over buttons and links. We need to get back to basics and talk about foundational HTML.

There are two HTML elements of interest here.

These patterns, perhaps allied to a lack of knowledge of the foundational HTML, have l

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
* [https://www.buttoncheatsheet.com/](https://www.buttoncheatsheet.com/)

\-

On the modern web, links are often designed to look like buttons. That’s not necessarily a crime however the lack of visual distinction encourages people to simply see “a button”. For practitioners this can lead to forgetting that each has different use cases and different effects. 

which always works the same way and does the same things, and that‘s not true. There’s also been a historic pattern of 

This lack of visual distinction can lead to people failing to appreciate the difference.

 same, some designers and developers don’t appreciate the difference between the elements.

\-

It seems that at least once a month there’s a new article about buttons and links, and it gets a bit tedious. However understanding them is important and I often see them misunderstood. So I’ve collected my thoughts here.