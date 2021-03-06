---
date: "2019-12-26T17:30:24.049Z"
title: "Responsive Type and Zoom (by Adrian Roselli)"
description: "The responsive typography technique which calculates font size based on viewport width can pose accessibility problems."
tags: [link, a11y, typography, responsive, zoom, viewport]
linkTarget: "https://adrianroselli.com/2019/12/responsive-type-and-zoom.html"
---
> When people zoom a page, it is typically because they want the text to be bigger. When we anchor the text to the viewport size, even with a (fractional) multiplier, we can take away their ability to do that. It can be as much a barrier as disabling zoom. If a user cannot get the text to 200% of the original size, you may also be looking at a WCAG 1.4.4 Resize text (AA) problem.
---

I already tend to avoid dynamic, viewport-width-based [fluid typography](https://css-tricks.com/snippets/css/fluid-typography/) techniques in favour of making just one font-size adjustment – at a _desktop_ breakpoint – based on the typographic theory that suggests we adjust type size according to _reading distance_. I learned this in Richard Rutter’s excellent book [Web Typography](http://book.webtypography.net/).

While the ideas and code behind the _fluid typography_ approach are nice, Adrian’s discovery that it can hinder users who need to zoom text only strengthens my feeling that it’s not the best way to handle responsive type.
