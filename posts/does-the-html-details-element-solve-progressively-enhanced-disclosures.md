---
date: 2022-05-29T08:54:32Z
title: Does the HTML details element solve progressively-enhanced disclosures?
description: ''
tags:
- entry
- progressiveenhancement
- disclosure
- details
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
[Scott Jehl recently tweeted:](https://twitter.com/scottjehl/status/1524746181271863296)

> I love the details/summary HTML elements. So versatile. My favorite part is being able to show a collapsed state from the start without worrying about potential operability issues if JavaScript fails to run (since its behavior doesn't need it).

Scott goes on to describe how creating disclosure widgets (controls that hide and show stuff) with resilience in mind is so much more difficult when not using `<details>` since it and can require complex progressive enhancement techniques. At the very least these involve making content available by default in case JavaScript fails, then hiding it when the disclosure widget script loads successfully, ideally without a jarring flash of content in between.

Like Scott says, the `<details>` element is different because you can have the content collapsed (hidden) by default without worrying about JavaScript and workarounds since the hidden content can be toggled open natively. That‘s a real superpower… and also makes you wonder: how many different places and different ways might we use this super-element?

## GitHub’s use of details

A while back, GitHub caused a flutter by using details in lots of interesting ways.

## Zach Leatherman’s details-utils

I’ve [previously noted](https://fuzzylogic.me/posts/web-components-as-progressive-enhancement-by-cloud-four/) Zach Leatherman’s [details-utils](https://www.zachleat.com/web/details-utils/) – a great example of using a web component to enhance an existing HTML element, in this case `<details>`. The enhancements include:

* to do: add enhancements

And Zach has already used it on …

## A note of caution

* [Disclosure widgets by Adrian Roselli](https://adrianroselli.com/2020/05/disclosure-widgets.html)
* [Details and summary are not…](https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html)
* [Showing up in find (Ctrl+F)](https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html#comment-208747)

## Summing up

So far I’ve been cautious but I’m starting to think that the time may have come to give it a spin. A “hamburger” menu pattern might be the place to start. I might not use it in situations where the “summary” (i.e. the toggle) needs to be more complex, for example on [a subnavigation trigger which includes both a link and a button](https://adrianroselli.com/2019/06/link-disclosure-widget-navigation.html#Pattern). When I do try it, it’d be great to employ some proper accessibility testing and get feedback.