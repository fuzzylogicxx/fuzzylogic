---
date: 2021-12-04T09:14:53.000+00:00
title: Collected web accessibility guidelines, tips and tests
description: Collected web accessibility nuggets
tags:
- web
- a11y
- howto
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
At work, I’m sometimes asked accessibility questions or even to provide guidelines. I am most definitely not an accessibility expert however I have picked up lots of tips and knowledge in nearly twenty years of developing websites. So I thought it’d be useful to collect some general web accessibility tips and tests in one place as a useful quick reference.

Caveats: i) this is a living document which I’ll flesh out over time; and ii) if I’ve got anything wrong, please let me know.
---

## Table of contents

* [Ensure keyboard support](#ensure-keyboard-support)
* Landmarks(#landmarks)

## Ensure keyboard support

Web pages need to support those who access and navigate by keyboard. 

Use the tab key to navigate your page and ensure that you can reach all actionable controls such as links, buttons and form controls. Press the enter key or space bar to activate each control. 

If during your test any actionable control is skipped, receives focus in an illogical order, or you cannot see where the focus is at any time, then keyboard support is not properly implemented.

## Landmarks

When creating a collapsible menu, your menu button should be placed _within_ your `<nav>` so that it’s still reachable by landmark navigation.

## References

* Tetralogical’s [Quick Accessibility Tests](https://www.youtube.com/playlist?list=PLTqm2yVMMUKWTr9XWdW5hJ9tk512Ow0SE) YouTube playlist
* Sara Soueidan’s video tutorial [Practical tips for building more accessible front-ends](https://aneventapart.com/news/post/practical-tips-for-building-more-accessible-front-ends)
* Heydon Pickering’s tweet about [buttons in navs](https://twitter.com/heydonworks/status/766948134169620480) and Scott O’Hara’s follow up article [Landmark Discoverability](https://www.scottohara.me/blog/2016/08/10/discovering-landmarks.html)
