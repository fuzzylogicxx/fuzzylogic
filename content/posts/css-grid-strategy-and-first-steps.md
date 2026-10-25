---
title: "CSS Grid: strategy and first steps"
description: How I got the hang of CSS Grid in 2018, and a rule of thumb for choosing between Grid and Flexbox.
date: 2018-11-20T10:00:00
tags:
  - entry
  - cssgrid
  - css
  - flexbox
---
Over the course of 2018 I’ve been trying to get the hang of [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout).

I’d already become fairly adept at using [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout) – a game-changing responsive layout technology which I love – but the prevailing wisdom suggested that I get with the program and learn this new system, too. At first I wondered whether I should even be using Flexbox at all any more; whether it was already old hat. After all, whereas Flexbox was essentially for laying out items in a single dimension, CSS Grid felt more _important_, being the web’s first ever purpose-built system for two-dimensional layout.

I have to admit that learning Grid did not come easy at first. Wrapped up in this new system is a whole load of new terminology, new units of measurement and new ways of thinking. Rachel Andrew’s book [_The New CSS Layout_](https://abookapart.com/products/the-new-css-layout) had been helpful but by autumn the concepts still weren’t fully clicking with me. Nor was I totally clear on the appropriate situations to use Grid. So I limited my first production forays to small components where I felt there was less risk of things going badly wrong.

A turning point came while attending Rachel Andrew’s talk [Graduating to Grid](https://aneventapart.com/news/post/graduating-to-grid-by-rachel-andrew-aea-video) in which she advised that when things start to feel complicated, remember that:

> “It’s all just _a grid of lines_.”

For me, concentrating primarily on the _grid-lines_ and not the stuff within and without helped simplify the overall concept and make all the supporting features click into place.

At the same conference, [Eric Meyer](https://meyerweb.com/) acknowledged that a given layout challenge might be accomplished using either Flexbox _or_ Grid, so in order to standardise your team’s approach it can be useful to set a rule such as:

> “Grid for general layout; Flexbox for components.”

[Jen Simmons](http://jensimmons.com/) also gave a presentation that included several code examples which used Grid at the layout level and Flexbox at the component level.

Now, I know that neither speaker was saying that it _has_ to be split that way, however I personally liked the idea of applying this rule as a means of avoiding choice paralysis.

I was reminded that Flexbox makes developing responsive _components_ such as navigation menus, fixed-height cards, lists of social icons etc much easier than they previously were with floats and absolute positioning. And for most of these components, because they are one-dimensional, CSS Grid would be overkill. So I realised: if it ain’t broke, don’t fix it. Don’t stop using Flexbox for things that it excels at.

I resolved to create a CSS Grid _page layout_ on [Fuzzy Logic](https://fuzzylogic.me/), sticking to Flexbox for the components.

My basic idea was to start with a single-column layout for mobile phones then for wider screens break into a two-column layout… but with the logo sitting off “in space” to the left. Pretty simple, but complex enough to get me into:

- using the `fr` unit for columns of whitespace;
- using [`grid-template-areas`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas) to specify named grid areas for positioning my content, sidebar and footer sections; and
- realising how useful [subgrid](https://www.smashingmagazine.com/2018/07/css-grid-2/) will be.

I started by knocking together [a rough prototype](/labs/grid-layout-1.html), before fleshing things out and applying the layout to the main site. Depending on when you read this, you’ll see that layout in place now. If you want to check out the grid lines and areas I recommend using the Firefox (or Firefox Nightly) [Grid Inspector](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Examine_grid_layouts).

Overall, it feels good to have taken the plunge into using CSS Grid for page layout, and it has given me confidence to explore further and try more interesting layouts. More to follow, I hope.
