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

Composition! Use a dedicated box layout and give it padding. Within that use a dedicated center layout for your wrappers. You get the best of all worlds.

Flow/stack layouts are generally best _within_ those boxes rather than at the top level.

## Should lists of articles be a bunch of sibling `article`s? Should they be in a list elememt?

Different switched-on developers tackle this differently, so it’s hard to say definitively. Sometimes they even do it differently across different pages on their own site!

- https://tink.uk/ (`article`, no list)
- https://www.matuzo.at/ (`article`, no list)
- https://adrianroselli.com/posts vs https://adrianroselli.com/
- https://tetralogical.com/news/ vs https://tetralogical.com/blog/
- https://ethanmarcotte.com/wrote/ has nested lists to handle years then months, with each post teaser marked up as an `article` inside an `li`

I currently use sibling `article`s, no wrapping list.
