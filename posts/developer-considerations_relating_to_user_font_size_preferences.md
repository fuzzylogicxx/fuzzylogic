---
title: Developer considerations relating to user font size preferences
description: When to use which CSS units to work with rather than against with user preferences and browser behaviour.
date: 2021-03-18T16:14:27.659Z
draft: true
tags:
  - fonts
  - a11y
  - accessibility
  - css
  - mediaqueries
  - preferences
---
As a front-end developer I’m called upon both to test that web pages support user font-size preferences, and to build pages which offer that support. Here are my notes on how to do both.
---

## Testing

### Update browser’s default font-size

Chrome > Kebab icon (top-right) > Settings > [Appearance](chrome://settings/appearance) > Font size > Medium (Recommended) or one of various options.

Does all of the text change or does some obstinately stay at the same size? It’s probably using `px` or some other absolute value.

### Zoom the page

Cmd and plus or minus icon. Try going up to 200%. Is everything OK? It probably will be, however the previous item (browser’s default font-size and whether that has been blocked) has an impact here on _how_ it works.

## Developing 

### Absolute vs Relative Units

[Pixels vs. Relative Units in CSS: why it’s still a big deal](https://www.24a11y.com/2019/pixels-vs-relative-units-in-css-why-its-still-a-big-deal/) by Kathleen McMahon explains why using relative values for font-sizes and unitless values for line-heights gives control back to the user. It lets them choose the experience they want in terms of zoom-level and text size.

### Dial `em` for media queries

For media query values it’s best to set values in `em` rather than `px` or `rem`. This gives results which are i) flexible; and ii) work best across browsers.

For a deeper dive on this, see [Media Query Units](https://zellwk.com/blog/media-query-units/) by Zell Liew.
