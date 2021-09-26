---
date: 2021-09-26T15:03:28Z
title: gap versus margin in CSS
description: ''
tags:
- css
- margin
- gap
- development
- web
- entry
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
gaps (via `gap`) are defined at the container level. This means we define them once for the entire layout and they are applied consistently within it.

Advantages of gap:

* `gap` allows terser code, less duplication, reduced scope for error, more predictable regardless of the nature of the components within the layout. 
* Using margins would require a declaration on each and every item. This can get complicated when items are different in nature, or come from different reusable components.
* gap introduces space _in between_ items, not around them. `margin` would require special cases to remove extra margins before the first item and after the last one. With gaps, we don’t need to do this. It’s good to have enabling selectors rather than a combination of enabling then disabling selectors.

Interesting things to consider:

When working with reusable grid or flexbox components, it’s handy to use a custom property for setting the size of gaps because it’s highly flexible. Sometimes we may want to nest those components but this brings the risk of custom properties being unintentionally overridden.

Every Layout’s Stack opts for `margin` via a `--space` custom property. This custom property is set and overridden on the _children_ rather than on the parent (unlike most of their other layouts which set `gap` on the parent):

> **Custom property placement:** …we’re still setting the `--space` value on the children, not “hoisting” it up. If the parent is where the property is set, it will get overridden if the parent becomes a child in nesting (see Nested variants, above).

## References

* [https://css-tricks.com/minding-the-gap/](https://css-tricks.com/minding-the-gap/ "https://css-tricks.com/minding-the-gap/")