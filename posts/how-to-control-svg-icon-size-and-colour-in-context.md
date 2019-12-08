---
title: How to control SVG icon size and colour in context
description: Setting an SVG’s icon size relative to the font-size of its adjacent text label
date: 2019-04-01 13:25:00
tags: [development,svg,css,viewbox,currentColor,aria]
---
A while back I read [a great SVG icon tip from Andy Bell] (https://twitter.com/andybelldesign/status/1098915626050117633) which I’d been meaning to try and finally did so today. Andy recommended for icons with text that we set the `width` and `height` of the icons to `1em` since that sizes them relevant to the adjacent text and _additionally_ lets us use `font-size` to make any further sizing tweaks.
---

As [previously mentioned](https://fuzzylogic.me/thoughts/grey-scales-something-fishy-with-svg], I’ve recently been working on my SVG skills.

Andy Bell’s SVG icon-sizing technique is really clever and feels like it adds of lots of flexibility and future-friendliness so I was keen to try it out.</p>

Here’s a pen I created this morning to test-drive the technique.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="html,result" data-user="fuzzylogicx" data-slug-hash="QPwjyZ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Control SVG icon size with font-size and match colour to parent text">
  <span>See the Pen <a href="https://codepen.io/fuzzylogicx/pen/QPwjyZ">
  Control SVG icon size with font-size and match colour to parent text</a> by Laurence Hughes (<a href="https://codepen.io/fuzzylogicx">@fuzzylogicx</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

And here’s some key points I’ve noted:

- By applying width and height of 1em to our icon it is predictably sized by default.
- It can now have its size further tweaked in CSS using font-size, for example with ems (where 1em = the font-size of the parent anchor element).
- This technique requires the “viewbox” attribute being present on the svg.
- Apply the width and height =1em as inline attributes on the svg. We <em>could</em> apply them using CSS, however the inline approach avoids potentially massive icons showing in cases where CSS doesn’t load.
- To get the colour matching, apply fill="currentColor" as an inline attribute on the svg’s path.
- Now, when you apply a hover colour to the anchor in CSS, the icon will just pick that up. Nice!
- Applying inline-flex to the anchor makes the vertical-alignment of text and icon easier.
- Add aria-hidden on the icon because it’s mainly decorative so we don’t want it read out by screen readers.
