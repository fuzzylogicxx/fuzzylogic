---
title: Developer considerations relating to user font size preferences
description: When to use which CSS units to work with rather than against with user preferences and browser behaviour.
date: 2021-03-18T16:14:27.659Z
tags:
  - fonts
  - a11y
  - accessibility
  - css
  - mediaqueries
  - preferences
 draft: true
---
My notes on which CSS units to use when in order to work with user preferences and browser behaviours, and how to test your efforts are working correctly.
---

## Testing

### Update browser’s default font-size

Chrome > Kebab icon (top-right) > Settings > Appearance > Font size > Medium (Recommended) or one of various options
chrome://settings/appearance

Does all of the text change or does some obstinately stay at the same size? It’s probably using `px` or some other absolute value.

### Zoom the page

Cmd and plus or minus icon. Try going up to 200%. Is everything OK? It probably will be, however the previous item (browser’s default font-size and whether that has been blocked) has an impact here on _how_ it works.

## Developing 

### Absolute vs Relative Units

Pixels vs. Relative Units in CSS: why it’s still a big deal](https://www.24a11y.com/2019/pixels-vs-relative-units-in-css-why-its-still-a-big-deal/) by Kathleen McMahon explains why using relative values for font-sizes and unitless values for line-heights really gives control back to the user for the experience they want in terms of their zooming and font-size preferences.

### Dial `em` for media queries

For media query values it’s best to set values in `em` rather than `px` or `rem`. This gives results which are i) flexible; and ii) work best across browsers.

For a deeper dive on this, see [Media Query Units](https://zellwk.com/blog/media-query-units/) by Zell Liew.
