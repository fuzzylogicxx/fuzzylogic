---
date: "2020-01-14T09:09:08.918Z"
title: "Not every Design System Pattern should be represented by a component (CSS-Tricks)"
description: "Thoughts from Robin Rendle of Gousto on Design System maintainability"
tags: [link, designsystems, component, pattern]
linkTarget: "https://css-tricks.com/newsletter/181/"
---
> My point with all this is that it’s easy to see every problem or design as a new component or a mix of currently existing components. But instead, we should make components that can slot into each other neatly, rather just continue to make more components.
---

An interesting observation from Robin Rendle who leads Gousto’s design system.

> Not every design pattern in a Design System should be represented by a code-based component. 

His example is of the common link-with-icon pattern (but the theory could be applied elsewhere).

Gousto already had `<Link />` and `<Icon />` components, each with their own relevant props (e.g `name` etc) but because the designs often featured links-with-icons they decided to build an `<IconLink />` component too.

This new component introduced new, repetitious but slightly divergent prop/attribute names.

Robin’s point is that the new component essentially:

- just duplicated what the existing components did, and thus
- created margin for divergence and error, and
- added additional maintenance overhead.

So Gousto eventually realised that an additional coded component didn’t make sense. Instead, just combine the existing components by nesting an `<Icon />` inside a `<Link />`, e.g.:

```
<Link>
    <Icon />
<Link>
```

I like his thinking!

Basically there doesn’t need to be (and shouldn’t be, to avoid coding error and UX inconsistency) a 1:1 relationship between design patterns and coded components, so long as the pattern can be created by composition using existing components.

Note that I think it’s still key to document how to recreate the design pattern in code – for example we could have a section at the bottom of the component docs for the `Icon` component detailing how to create a link-with-icon by combining it with a `Link` component.

Basically I like the idea of reducing the amount of 
1. “which component do I use?” head-scratching; and 
2. margin for divergence/inconsistency

…by having less components.
Food for thought anyway. 
