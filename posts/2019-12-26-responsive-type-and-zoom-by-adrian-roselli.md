---
date: "2019-12-26T17:30:24.049Z"
title: "Responsive Type and Zoom (by Adrian Roselli)"
description: "The responsive typography technique which calculates font size based on viewport width can pose accessibility problems."
tags: [link, a11y, typography, responsive, zoom, viewport]
linkTarget: "https://adrianroselli.com/2019/12/responsive-type-and-zoom.html"
---
> When people zoom a page, it is typically because they want the text to be bigger. When we anchor the text to the viewport size, even with a (fractional) multiplier, we can take away their ability to do that. It can be as much a barrier as disabling zoom. If a user cannot get the text to 200% of the original size, you may also be looking at a WCAG 1.4.4 Resize text (AA) problem.
---

I already tended to avoid viewport-width based [fluid typography](https://css-tricks.com/snippets/css/fluid-typography/) techniques because the premise is not in line with typographic theory which suggests that we should size type according to reading distance. (I first learned this theory in Richard Rutterâs excellent book [Web Typography](http://book.webtypography.net/).)

While the ideas and code behind the fluid typography technique are nice, Adrianâs discoveries that it causes accessibility issues only strengthens my feeling that itâs not the best way to handle responsive type.