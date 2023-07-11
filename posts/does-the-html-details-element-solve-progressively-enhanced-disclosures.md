---
date: 2022-05-29T08:54:32Z
title: Does the HTML details element solve progressively-enhanced disclosures?
description: Using the details element to show and hide is getting wider and more
  interesting usage
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
draft: false

---
The HTML `details` element continues to gain fans and get developers’ juices flowing. [Scott Jehl recently tweeted:](https://twitter.com/scottjehl/status/1524746181271863296)

> I love the details/summary HTML elements. So versatile. My favorite part is being able to show a collapsed state from the start without worrying about potential operability issues if JavaScript fails to run (since its behavior doesn't need it).

Scott goes on to describe how creating disclosure widgets (controls that hide and show stuff) with resilience in mind is so much more difficult when not using `<details>` since it can require complex progressive enhancement techniques. At the very least these involve making content available by default in case JavaScript fails, then hiding it when the disclosure widget script loads successfully, ideally without a jarring flash of content in between.
---

Like Scott says, the `<details>` element is different because you can have the content collapsed (hidden) by default without worrying about JavaScript and workarounds since the hidden content can be toggled open natively. That‘s a real superpower… and also makes you wonder: how many different places and different ways might we use this super-element?

## My latest thinking

Before we go any further, I’m going to say that 

## GitHub’s use of details

Back in 2019, GitHub caused a flutter by [going all-in on `<details>`](https://twitter.com/muanchiou/status/1091331877636661249) to make various interesting UI elements interactive without JS. [Muan](https://twitter.com/muanchiou) has co-created a number of components for Github where `<details>` is used to, for example, open menus. They also [shared notes from a talk on this subject](https://github.com/muan/details-on-details). And [Chris Coyier for one was impressed and intrigued](https://css-tricks.com/using-details-for-menus-and-dialogs-is-an-interesting-idea/).

## Zach Leatherman’s details-utils

I’ve [previously noted](https://fuzzylogic.me/posts/web-components-as-progressive-enhancement-by-cloud-four/) Zach Leatherman’s [details-utils](https://www.zachleat.com/web/details-utils/) – a great example of using a web component to enhance an existing HTML element, in this case `<details>`. The enhancements include:

- animated open/close
- a quantum aspect ideal for responsive design – closed by default on narrow screens, open by default on wide
- and more

And Zach has already used it on the navigation menus on [jamstack.org](https://jamstack.org/) and [netlify.com](https://www.netlify.com/), amongst other use cases.

## Notes of caution

* [The details element and in-page search](https://www.matuzo.at/blog/2023/details-find-in-page/) by Manuel Matuzovic
- [A details element as a burger menu is not accessible](https://cloudfour.com/thinks/a-details-element-as-a-burger-menu-is-not-accessible/) on Cloud Four’s blog
- [The details and summary elements, again](https://www.scottohara.me//blog/2022/09/12/details-summary.html) by Scott O’Hara
* [Disclosure widgets by Adrian Roselli](https://adrianroselli.com/2020/05/disclosure-widgets.html)
* [Details and summary are not…](https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html)
* [Details content showing up in find (Ctrl+F)](https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html#comment-208747)

## Alternative approaches

Using a custom disclosure widget put together with JavaScript and ARIA is not the end of the world. In fact I recently tried my hand at a [disclosure widget web component](https://fuzzylogic.me/posts/my-first-web-component-a-disclosure-widget/) and early impressions are that the combination of fast, async ES modules plus native DOM discovery (which you get with web components) might alleviate the “flicker of content” issue I mentioned at the start.

## Summing up

I’ve been cautious about using `details` for more than cases matching its intended usage but had started to think the time was right to take it further – possibly using Zach’s web component. My thinking was that perhaps a “hamburger” menu pattern might be a safe place to start. However based on the findings shared in the above _Notes of caution_ section I’ve decided to stay safe and accessible. The behaviour when the user does an in-page search, and the current browser inconsistencies in announcing the `summary` as an expand/collapse button tell me that a custom JS and ARIA disclosure widget is better for the custom UI cases.
