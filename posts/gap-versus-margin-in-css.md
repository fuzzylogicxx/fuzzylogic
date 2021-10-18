---
date: 2021-09-26T15:03:28Z
title: gap versus margin in CSS
description: gap is seriously handy but there are still cases where margin might be
  preferential
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
`gap` is great and in many ways feels _superior_ to margin. And now that all modern browsers support `gap` for both grid and flexbox it‘s tempting to want to use it on every multi-item layout that requires space between items, replacing our previous `margin`-based implementations. Adam Argyle in particular has popularised the concept of using CSS Grid [just for gap](https://web.dev/building-a-settings-component/#just-for-gap) and suggested that [gap will become the primary way we space elements on the web](https://dev.to/argyleink/5-css-predictions-for-2020-pl3).

But is `gap` _always_ the best choice?
---

## Why `gap` is so attractive

Spacing implemented via `gap` is defined at the _container_ level. This means we define spacing once for the entire layout and it is automatically applied consistently within.

This brings a number of advantages:

* by not requiring us to target every item, `gap` permits terser code and reduced scope for error;
* it’s generally slightly more reliable and agnostic to the nature of the components within the layout;
* styling the _context_ helps when considering a _system_ and how its parts interrelate better than working at item level. For example it lets us consider the “between” state, and also that this between state might not exist if there are insufficient items.
* `gap` introduces space _in between_ items, not around them. The `margin on items` alternative requires special cases to remove extra margins before the first item and after the last one whereas with `gap` this is not required. It’s good to have “enabling selectors” only;
* in responsive, [quantum layouts](https://codepen.io/fuzzylogicx/pen/qBOmWbJ) which need to appear in both vertical (stacked) and horizontal (linear) configurations, `gap` _just works._ By contrast if using margin you’d need to set it in all directions and supplement it with negative margin hacks then add an extra, insulating `div`;
* `gap` tends to preserve the symmetry of layouts better than `margin` and to not affect overall `width` and `height` in unpredictable ways.

## The interesting case of the Stack

Should Stack be flexbox-based and use `gap`? Or more generally, what should and shouldn’t use `gap` for spacing out its items?

`gap` isn’t the only way of putting space _between_ items. Can also use the owl selector. It has zero specificity other than the initial class (the universal selector `*` has zero specificity). This makes it easier to override with `.exception` later, at either the `.stack` component level _or_ for a specific item within a stack.

If we were to use `gap` there’d be no way of overriding the gap for one of the children in a stack; it isn’t possible. That’s why EL stuck with margin being set using the owl selector. 

Just because something new comes along doesn’t automatically invalidate an older technique.

The Stack is only for vertical layouts. It doesn’t _need_ flexbox unless you want to split the stack, for example to push the last item to the bottom of the container.  

When working with reusable grid or flexbox components, it’s handy to use `gap` for spacing between items (for all the reasons above) and to set that via a custom property because it makes it easy to set that to a range of values (via inline `style` a bit like a prop) without needing a separate class for each. (Because Custom Properties also participate in CSS’s cascade they are great for writing a base component then overriding to create exceptions.) Sometimes we might want to nest our component, however this brings the risk of custom properties being unintentionally overridden.

Every Layout’s Stack opts for `margin` via a `--space` custom property. This custom property is set and overridden on the _children_ rather than on the parent (unlike most of their other layouts which set `gap` on the parent):

> **Custom property placement:** …we’re still setting the `--space` value on the children, not “hoisting” it up. If the parent is where the property is set, it will get overridden if the parent becomes a child in nesting (see Nested variants, above).

Possible TL;DR:

* Does it have to use flexbox or grid or is standard flow layout sufficient?
* Perhaps it’s better to stick with flow (rule of least power) if possible? (I’ve previously ran into problems working with pages that over-use flexbox in column direction.)
* is it a quantum layout?
* is it using custom properties?
* might one be nested inside another?

## References

* [https://css-tricks.com/minding-the-gap/](https://css-tricks.com/minding-the-gap/ "https://css-tricks.com/minding-the-gap/")
* [Stack of Stacks](https://www.youtube.com/watch?v=HrkWtRqpUwg) presented at CSS Café by Heydon Pickering 
