---
title: How to control SVG icon size and colour in context
description: Setting an SVG’s icon size relative to the font-size of its adjacent text label
date: 2019-04-01 13:25:00
tags: [development,svg,css,viewbox,currentColor,aria]
---
A while back I read [a great SVG icon tip from Andy Bell](https://twitter.com/andybelldesign/status/1098915626050117633) which I’d been meaning to try and finally did so today. Andy recommended that for icons with text labels we set the `width` and `height` of the icons to `1em` since that will size them proportionately to the adjacent text and additionally lets us use `font-size` to make any further sizing tweaks.
---

As [previously mentioned](https://fuzzylogic.me/thoughts/grey-scales-something-fishy-with-svg), I’ve recently been working on my SVG skills.

Andy Bell’s SVG icon-sizing technique is really clever and feels like it adds lots of flexibility and future-friendliness so I was keen to try it out.

Here’s how it works.

The HTML:

``` html
<a class="call-to-action" href="/">
  <span>I’m a link</span>
    <svg 
    class="cta-icon" 
    aria-hidden="true" 
    width="1em" 
    height="1em" 
    viewBox="0 0 14 13" 
      xmlns="http://www.w3.org/2000/svg">
      <path 
      fill="currentColor" 
      fill-rule="evenodd" 
      d="M3.49.868l7.683 3.634a2 2 0 0 1 .052 3.59l-7.682 3.913a2 2 0 0 1-2.908-1.782V2.676A2 2 0 0 1 3.49.868z">
    </path>
  </svg>
</a>

<a class="call-to-action call-to-action-alt" href="/">
  <span>I’m a large link</span>
    <svg 
    class="cta-icon" aria-hidden="true" 
    width="1em" height="1em" 
    viewBox="0 0 14 13" 
      xmlns="http://www.w3.org/2000/svg">
      <path 
      fill="currentColor" fill-rule="evenodd" 
      d="M3.49.868l7.683 3.634a2 2 0 0 1 .052 3.59l-7.682 3.913a2 2 0 0 1-2.908-1.782V2.676A2 2 0 0 1 3.49.868z">
    </path>
  </svg>
</a>
```

The CSS:

``` css
a { color: rgb(183, 65, 14); }

a:hover { color: #6A2000; }

.call-to-action {
  display: inline-flex;
  align-items: center;
  font-weight: bold;
}

.call-to-action-alt {
  font-size: 2rem; 
}

.cta-icon {
  margin-left: .5em;
  font-size: .8em;
}
```

Here are my key takeaways:

- By applying `width` and `height` of `1em` to our icon it is predictably sized by default.
- It can now have its size further tweaked in CSS using `font-size`, for example with ems (where `1em` = the font-size of the parent anchor element).
- This technique requires the `viewbox` attribute being present on the svg.
- Apply the width and height =1em as inline attributes on the svg. We _could_ apply them using CSS, however the inline approach avoids potentially massive icons showing in cases where CSS doesn’t load.
- To get the colour matching, apply `fill="currentColor"` as an inline attribute on the svg’s path.
- Now, when you apply a hover colour to the anchor in CSS, the icon will just pick that up. Nice!
- Applying `inline-flex` to the anchor makes the vertical-alignment of text and icon easier.
- Apply `aria-hidden` to the icon because it’s mainly decorative so we don’t want it read out by screen readers.

[And here’s a demo I created to test-drive the technique](https://codepen.io/fuzzylogicx/pen/QPwjyZ).
