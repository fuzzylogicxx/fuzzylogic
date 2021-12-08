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
At work, I’m sometimes asked accessibility questions or to provide guidelines. I’m with Anna Cook in describing myself as an [accessibility advocate rather than an expert](https://twitter.com/annaecook/status/1468602342639431682) however I have picked up lots of tips and knowledge over many years of developing websites. So I thought it’d be useful to gather some general web accessibility tips and tests in one place as a useful reference.

Caveats: i) this is a living document which I’ll flesh out over time; and ii) if I’ve got anything wrong, please let me know!
---

## Table of contents

* [Ensure keyboard support](#ensure-keyboard-support)
* [Content resizing](#content-resizing)
* [Content structure](#content-structure)
* [Navigation and menus](#navigation-and-menus)

## Ensure keyboard support

Web pages need to support those who access and navigate by keyboard. 

Use the tab key to navigate your page and ensure that you can reach all actionable controls such as links, buttons and form controls. Press the enter key or space bar to activate each control. 

If during your test any actionable control is skipped, receives focus in an illogical order, or you cannot see where the focus is at any time, then keyboard support is not properly implemented.

## Content resizing

Try zooming your page up to 400%. In Chrome, Zoom is available from the kebab menu at the top-right, or by holding down command with plus or minus. 

Content must resize and be available and legible. Everything should reflow.

Relative font settings and responsive design techniques are helpful in effectively handling this requirement. 

Relatedly, setting font-sizes in `px` should be avoided because although a user can override the “fixed-ness” with zoom, it breaks the user’s ability to choose a larger or smaller _default font size_ (which users often prefer over having to zoom every single page).

## Content structure

The page’s content should be well-structured as this makes it easier to understand for all, especially people with reading and cognitive disabilities. It should consist of short sections of content preceded by clear headings. It should employ lists where appropriate. It should place the most important content at the beginning of the page or section to give it prominence.

Check your page for any long passages of text with no structure. Ensure that sufficient prominence is given to the most important information and calls to action.

## Navigation and menus

When creating a collapsible menu, place your menu button _within_ your `<nav>` element and hide the inner list rather than hiding the `nav` element itself. That way, we are not obscuring from Assistive Technologies the fact that a navigation still exists. ATs can still access the nav via landmark navigation. This is important because landmark discovery is one of the fundamental ways AT users scan, determine and navigate a site’s structure.

## References

* Tetralogical’s [Quick Accessibility Tests](https://www.youtube.com/playlist?list=PLTqm2yVMMUKWTr9XWdW5hJ9tk512Ow0SE) YouTube playlist
* Sara Soueidan’s video tutorial [Practical tips for building more accessible front-ends](https://aneventapart.com/news/post/practical-tips-for-building-more-accessible-front-ends)
* Adrian Roselli’s [Responsive type and zoom](https://adrianroselli.com/2019/12/responsive-type-and-zoom.html)
* Heydon Pickering’s tweet about [buttons in navs](https://twitter.com/heydonworks/status/766948134169620480) and Scott O’Hara’s follow up article [Landmark Discoverability](https://www.scottohara.me/blog/2016/08/10/discovering-landmarks.html)
