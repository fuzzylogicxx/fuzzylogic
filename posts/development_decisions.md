---
date: 2023-12-04T09:14:53.000+00:00
title: Blog development decisions
description: Decisions I regularly make when maintaining my blog-style personal website
tags:
- entry
- web
- development
---
Here are some recurring development decisions I make when maintaining my personal website/blog, with some accompanying rationale.
---

## Where should I put the landmark-related HTML elements in the source?

I have one `header`, one `main` and one `footer` element as _direct children_ of the body element. This isn’t arbitrary. A `header` at this level will be treated as a `banner` landmark and a `footer` as the page’s `contentinfo` landmark. When they are nested more deeply (for example within a “wrapper” div) they are not automatically given landmark status. You’d have to bolt-on aria attributes. My understanding is that it’s better to exploit elements with built-in semantics than to bolt them on.

## How should I centre main content in a way that works well with responsiveness, full-width section backgrounds etc?

My hard-learned approach is to use composition rather than try to do everything with “god” layouts. 

I mentally break the page up from top to bottom into slices that correspond to logical groups of content and/or parts that need a dedicated full-width background. Each section is represented by a `div` and I give it `padding` on all sides. The lateral padding handily gives you the gutters you need on narrow screens. (You _could_ use a [Box](https://every-layout.dev/layouts/box/) layout for these sections. I tend not to consider them to be “true boxes” because usually their lateral padding differs from their vertical padding. So I just apply their styles on a case by case basis.)

Within each section, nest a dedicated [Center](https://every-layout.dev/layouts/center/) layout for your width-constraining wrappers.

This approach offers the best of all worlds semantically. It doesn’t constrain your markup which I find preferential for setting appropriate semantics and accessibility. You don’t need to put a “wrapper div” around everything. Instewd you can have landmark-related elements as direct children of `body`, applying padding to those and nesting centred wrappers inside them.

This approach also avoids problems such as unwanted collapsing margins and general margin weirdness. You often encounter that problem when using vertical margins in situations where “boxes with padding” would be more appropriate. Relatedly, I find that flow (or [stack](https://every-layout.dev/layouts/stack/)) layouts are generally best used _within_ each of your nested wrappers rather than at the top level.

## How should I mark up lists of articles?

Should they be a bunch of sibling `article`s? Should they be in a list element?

Different switched-on developers tackle this differently, so it’s hard to say the definitive best approach. Sometimes developers even do it differently across different pages on their own site!

- https://tink.uk/ (`article`, no list)
- https://www.matuzo.at/ (`article`, no list)
- https://adrianroselli.com/posts vs https://adrianroselli.com/
- https://tetralogical.com/news/ vs https://tetralogical.com/blog/
- https://ethanmarcotte.com/wrote/ has nested lists to handle years then months, with each post teaser marked up as an `article` inside an `li`

I currently use sibling `article`s, no wrapping list. Article feels right becauase each is discreet and could be (in fact are) syndicated. Could be persuaded to do list because it tells SR users how many there are. 

## Should a blog post page be marked up as an article or just using main?

I mark it up as an `article` for same reasons discreet/syndicated. It’s inside a `main` because I have one main on every page.



I’ll add more to this article over time.
