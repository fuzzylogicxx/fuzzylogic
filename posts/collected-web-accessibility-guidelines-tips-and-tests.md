---
date: 2021-12-04T09:14:53.000+00:00
title: Collected web accessibility guidelines, tips and tests
description: Collected web accessibility nuggets
tags:
- web
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
## In work, I’m sometimes asked for accessibility guidelines or to help people who have less knowledge on the topic. I am most definitely not an accessibility expert however I try hard and have picked up lots of tips and knowledge since I began working on websites back in 2003. So for future reference I’m collecting here my general web accessibility guidelines, tips and tests.
---

## Table of contents

* [Keyboard support](#keyboard-support)
* Content resizing (zooming)
* High Contrast Mode
* Skip links
* Link text
* Visual presentation of links
* Page titles
* Content structure
* Typography
* Captions
* …
* Semantic HTML
* Hiding to aid accessibility
* Keyboard navigation and focus
* Misc

## Keyboard support

Blah

## Semantic HTML

HTML that is descriptive and provides meaning and supports navigation on AT

* Use HTML5 landmarks
* Provide headings where needed and follow order
* If a heading is not provided in the design, provide a visually hidden one for screen reader users
* Don’t skip headings (use CSS to make the right heading look different if necessary)
* A heading creates the expectation that content will follow

## Hiding to aid accessibility

When adding additional information to a visible label, it must come _after_ what’s visually present, otherwise you might break the UI for users using Voice Commands.

## Keyboard navigation and focus

Optimising keyboard navigation on duplicate links using tabindex and ARIA: see the last part of Sara’s video.

## Misc

> We’re all just temporarily abled

(Cindy Li)

Remember that some screen reader users are also keyboard users.

## References

* Tetralogical’s [Quick Accessibility Tests](https://www.youtube.com/playlist?list=PLTqm2yVMMUKWTr9XWdW5hJ9tk512Ow0SE) YouTube playlist
* [https://aneventapart.com/news/post/practical-tips-for-building-more-accessible-front-ends](https://aneventapart.com/news/post/practical-tips-for-building-more-accessible-front-ends "https://aneventapart.com/news/post/practical-tips-for-building-more-accessible-front-ends")