---
date: "2021-02-02T11:37:57.839Z"
title: "A First Look at aspect-ratio (on CSS-Tricks)"
description: "Chris Coyier takes the new CSS aspect-ratio property for a spin and tests how it works in different scenarios"
tags: [link, web, development, css, layout, aspectratio, box, images]
linkTarget: "https://css-tricks.com/a-first-look-at-aspect-ratio/"
---
Chris Coyier takes the new CSS `aspect-ratio` property for a spin and tests how it works in different scenarios.
---

Note that he’s applying it here to elements which do not have an intrinsic aspect-ratio. So, think a container element (`div` or whatever is appropriate) rather than an `img`. This is line with a [Jen’s Simmons’ recent replies to me](https://twitter.com/jensimmons/status/1347583682496892929) when I asked her [whether or not we should apply `aspect-ratio` to an `img`](https://twitter.com/fuzzylogicx/status/1347307685826469894) after she announced [support for `aspect-ratio` in Safari Technical Preview 118](https://twitter.com/jensimmons/status/1347287421633892356).

A couple of interesting points I took from Chris’s article:

- this simple new means of declaring aspect-ratio should soon hopefully supersede all the [previous DIY techniques](https://css-tricks.com/aspect-ratio-boxes/);
- if you apply a CSS aspect-ratio to an element which has no explicit `width` set, we still get the effect because the element’s `auto` (rendered) width is used, then by combining that with the CSS `aspect-ratio` the browser can calculate the required height, then apply that height;
- if the content would break out of the target aspect-ratio box, then the element will expand to accommodate the content (which is nice). If you ever need to override this you can by applying `min-height: 0`;
- if the element has either a height or a width set, the other of the two is calculated from the aspect ratio;
- if the element has _both_ a height and width set, `aspect-ratio` is ignored.

Regarding [browser support](https://caniuse.com/?search=aspect-ratio): at the time of writing `aspect-ratio` is supported in Chrome and Edge (but not IE), is coming in Firefox and Safari, but as yet there’s no word regarding mobile. So I’d want to use it as a progressive enhancement rather than for something mission critical.
