---
date: 2022-10-17T13:31:09Z
title: inline-block versus flexbox for horizontal arrangements
description: 'Gathering my thoughts on what feels like an outdated approach'
tags:
- entry
- responsive
- flexbox
- css
- layout
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
Something I’ve found interesting while reviewing recent code test submissions (within job applications) at work is that more developers than I’d expect still use `display: inline-block` when they need to lay out multiple elements horizontally such as the items in a navigation menu. It’s interesting because Flexbox – which has now been around for almost 10 years – gives you a modern, purpose-built solution to that.
---

Of course, there is no _crime_ in taking the `inline-block` approach. It’s an option. And I did take a moment just to challenge my assumptions. But having given it a little thought, I am pretty convinced that Flexbox is the better approach and so I think their choice is worth a query. 

Here’s why I think Flexbox is much better:

1. Modern CSS layout is _purpose-built_ for constructing multi-element layouts. Older methods were lacking, quirky and slightly hacky. Using (and knowing to use) purpose-built tools is generally a good thing for reliability, predictability and scalability.
1. Modern CSS layout provides more _control_, because it’s fundamentally different. You get a parent context (the flex container or grid) that lets you style the _context_ (with `gap`, for example). We didn’t have this before.
1. Styling a context rather than individual items plays better with modern component-oriented organisation and ideas. It‘s good to keep components [encapsulated and context-agnostic](https://mxstbr.com/thoughts/margin/), [handing off layout to separate, fit-for-purpose tools](https://every-layout.dev/).
1. Flexbox is built for _responsiveness_, i.e. built for the modern era. `inline-block` was not.
1. the default `align-items:stretch` means that items laid out in a row are automatically full parent-height which is often desirable for larger touch targets and achieving hover styles.
1. `inline-block` retains some of the properties of `inline` that are undesirable for this type of use-case. Who can be bothered with whitespace in the code appearing on the screen, or having to work with `vertical-align` when you don’t need to.

I also don’t see any reason to _not_ use Flexbox. It’s conventional (see for example navigation menus on [BBC](https://www.bbc.co.uk/), [Tetralogical](https://tetralogical.com/)), recommended by CSS experts (Rachel Andrew, Jen Simmons etc), performant and well-supported by browsers. You are not going “fancy”, “cutting edge” or “overkill” by using Flexbox. For the “horizontal menu” use case, it’s simply a more suitable choice than the older alternatives. 

Related: Chris Coyier’s article [When do you use inline block](https://css-tricks.com/when-do-you-use-inline-block/) is an excellent investigation into whether any necessary uses for `inline-block` remain. I reserve the right to change my mind on this, but aside from the “apply `transform` to an inline element” use case I can’t really see any that have not now been superseded.
