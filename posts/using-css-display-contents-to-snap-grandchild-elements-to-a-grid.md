---
title: "Using CSS display: contents to snap grandchild elements to a grid"
description: A nice way (in theory) to streamline CSS Grid layouts.
date: 2019-04-05T11:14:27.659Z
mainImage.isAnchor: false
tags:
  - entry
  - css
  - cssgrid
  - layout
  - development
---
I realised last night while watching a presentation by Lea Verou that I could streamline my CSS Grid layouts.
---

I’d been creating an overall page grid by setting `body { display: grid; }` then some grid areas but realised that this only worked for direct children and didn’t help with aligning more deeply nested elements to that outer grid.

For example in the case of the main `header` if I wanted its child logo, `nav` and search elements to snap to the `body` grid then I found myself having to duplicate the `display: grid` and `grid-template-areas` again on the `header`.

It didn’t feel very <abbr title="Don’t Repeat Yourself">DRY</abbr> but my understanding was that while we await `subgrid`, it was a necessary evil.

What I should have been using is `display: contents`.

If you set your `header` to `display: contents` then the parent (`body`) grid layout will apply to the header’s contents (logo, `nav`, etc) as if the `header` element (the “real” direct child of the grid) wasn’t there. This gives us good semantics without the need to redefine the grid on the `header`.

[Here’s a codepen to illustrate.](https://codepen.io/fuzzylogicx/pen/WWwPrm)

I was aware of the existence of `display: contents` but somehow it hadn’t sunk in because I’d only read about it in the abstract. [Lea Verou’s explanation](https://www.youtube.com/watch?v=8BXQ3zCihYM&t=3536s) made all the difference. Cheers, Lea!

## Update 4/5/2019

Frustratingly, I’ve learned that although we _can_ apply this technique, we shouldn’t… or at least not for a while. 

Due to a bug in all supporting browsers the property will currently also remove the element (`header` in our case) from the accessibility tree meaning that its semantics will be lost.

For reference, see:
- [https://github.com/w3c/csswg-drafts/issues/3040](https://github.com/w3c/csswg-drafts/issues/3040)
- [MDN’s `display` property docs](https://developer.mozilla.org/en-US/docs/Web/CSS/display)

## Update 11/4/2021

Thanks to Rachel Andrew for the heads-up that [this issue is now fixed in both Firefox and Chrome](https://rachelandrew.co.uk/archives/2021/03/11/good-news-about-display-contents-and-chrome/).

We’re now just waiting for Edge and Safari to roll out fixes before we can regard this as a safe option.
