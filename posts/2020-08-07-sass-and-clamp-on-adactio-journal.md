---
date: "2020-08-07T16:47:58.866Z"
title: "Sass and clamp (on Adactio: Journal)"
description: "A post which starts talking about new CSS functions then veers into questioning whether we still need Sass"
tags: [link, development, css, sass, clamp, tools, customproperties]
linkTarget: "https://adactio.com/journal/16887"
---
Given what we can now do with CSS, do we still need Sass?

> Sass was the hare. CSS is the tortoise. Sass blazed the trail, but now native CSS can achieve much the same result.
---

Jeremy’s post starts by talking about the new CSS `clamp` function and how it can be used for scalable type, then veers into a question of whether we still need Sass or if modern CSS now covers our needs.

This is really interesting and definitely gives me pause to consider whether I can simplify my development stack by removing a tool.

I guess one additional reason (not mentioned in Jeremy’s post) you might want Sass is that many of the CSS functions which provide similar effects to mixins, variables etc are currently only supported in the most modern, standards-compliant browsers. Sass can pre-process its variables and mixins into older, more broadly-supported CSS. So choosing the pure CSS, processor-free option within a progressive enhancement oriented approach _might_ mean your broadly-supported baseline is more basic than it would be by using Sass. That’s the sort of decision I could take fairly lightly for my personal website, but I could see it being less palatable for stakeholders working on larger sites. 

For example, if your site needs to support IE11 and theming which includes custom colour schemes, unfortunately you don’t have the luxury of putting all your eggs in the [custom properties](https://caniuse.com/#search=custom%20properties) basket.
