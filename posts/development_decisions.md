---
date: 2023-12-04T09:14:53.000+00:00
title: Development decisions
description: Decisions I regularly make when maintaining my blog-style personal website
tags:
- entry
- web
- development
draft: true
---
Here are some recurring development decisions I make when maintaining my personal website/blog, with some accompanying rationale.
---

## Where should I put the main semantic landmark HTML elements in the source?

I make `header`, `main` and `footer` direct children of the body element. This isn’t arbitrary. A `header` at this level will be treated as a `banner` landmark and a `footer` as the page’s `contentinfo` landmark. If they were nested more deeply they would not, by default.  

## How should I centre the content? Use an overall page wrapper? What about when sections have a full-width background?

Composition! 

Slice page up into vertical sections (based on logical groups and/or full-width backgrounds) and give them padding on all sides. The lateral padding will give you your gutters on narrow screens. You might use a box layout but more likely might not consider them true boxes if the lateral padding is different from the vertical padding so you might just DIY them. 

Within each section, nest a dedicated center layout for your width-constraining wrappers. 

This approach offers the best of all worlds semantically (landmark elements at the top level) and stylistically versus the “wrapper div around everything” approach. 

It also avoids problems such as collapsing margins that would be caused by trying to use vertical margins in situations where “boxes with padding” is more appropriate. Relatedly, flow/stack layouts are generally best _within_ your wrappers rather than at the top level.

## Should lists of articles be a bunch of sibling `article`s? Should they be in a list elememt?

Different switched-on developers tackle this differently, so it’s hard to say definitively. Sometimes they even do it differently across different pages on their own site!

- https://tink.uk/ (`article`, no list)
- https://www.matuzo.at/ (`article`, no list)
- https://adrianroselli.com/posts vs https://adrianroselli.com/
- https://tetralogical.com/news/ vs https://tetralogical.com/blog/
- https://ethanmarcotte.com/wrote/ has nested lists to handle years then months, with each post teaser marked up as an `article` inside an `li`

I currently use sibling `article`s, no wrapping list. Article feels right becauase each is discreet and could be (in fact are) syndicated. Could be persuaded to do list because it tells SR users how many there are. 

## Should a blog post page be marked up as an article or just using main?

I mark it up as an `article` for same reasons discreet/syndicated. It’s inside a `main` because I have one main on every page.
