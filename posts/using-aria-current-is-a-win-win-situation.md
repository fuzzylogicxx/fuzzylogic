---
date: 2019-07-03T13:30:04Z
title: Using `aria-current` is a win-win situation
description: Using aria-current helps us create navigation experiences which work
  both visually and for screen readers.
tags:
- tip
- development
- web
- css
- a11y
- aria
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
The HTML attribute `aria-current` allows us to indicate the currently active element in a sequence. It’s not only great for accessibility but also doubles as a hook to style that element individually.
---

By using `[aria-current]` as your CSS selector (rather than a `.current` class) this also neatly binds and syncs the way you cater to the visual experience and the screen reader experience, reducing the ability for the latter to be forgotten about.

[As Léonie Watson explains](https://tink.uk/using-the-aria-current-attribute/), according to [WAI-ARIA 1.1](https://www.w3.org/TR/wai-aria-1.1/#aria-current) there are a number of useful values that the `aria-current` attribute can take:

* `page` for the link to the current page in a navigation menu or pagination section; 
* `step` for a step-based process; 
* `date` for a current date.
* `time` for a current time.

I’ve been using the `aria-current="page"` technique on a couple of navigation menus recently and it’s working well. 

Also: my thanks go to Ethan Marcotte, David Kennedy and [Lindsey](https://twitter.com/LittleKope/). Ethan recently suggested that [the industry should try harder regarding accessibility](https://ethanmarcotte.com/wrote/the-web-we-broke/) and recommended subscribing to David Kennedy’s [a11y Weekly newsletter](https://a11yweekly.com/). I duly subscribed (it’s great!) and one of the issues linked to Lindsey’s article [An Introduction to ARIA states](https://www.a11ywithlindsey.com/blog/introduction-aria-states/) in which I learned about `aria-current`.