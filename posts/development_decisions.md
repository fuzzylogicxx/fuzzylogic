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

## Where should landmark-related HTML elements be in the source?

I set one `header`, one `main` and one `footer` element as _direct children_ of the body element. 

<figure>

``` html
<body>
  <header>…</header>
  <main>…</main>
  <footer>…</footer>
</body>
```
  
</figure>

This isn’t arbitrary. A `header` at this level will be treated as a `banner` landmark. A `footer` is regarded as the page’s `contentinfo` landmark. Whereas when they are nested more deeply such as within a “wrapper” div they are not automatically given landmark status. You’d have to bolt-on ARIA attributes. My understanding is that it’s better to use elements with implicit semantics than to bolt on semantics manually.

## How should I centre the main content in a way that’s responsive and supports full-width backgrounds?

My hard-learned approach is to use composition rather than try to do everything with “god” layouts. 

I mentally break the page up from top to bottom into slices that correspond to logical groups of content and/or parts that need a dedicated full-width background. I give each slice `padding` on all sides. The lateral padding handily gives you the gutters you need on narrow screens. (You _could_ use a [Box](https://every-layout.dev/layouts/box/) layout for these sections. I tend not to consider them to be “true boxes” because usually their lateral padding differs from their vertical padding. So I just apply their styles on a case by case basis.)

Within each section, nest a dedicated [Center](https://every-layout.dev/layouts/center/) layout to handle your fluid width-constraining wrappers.

This approach offers the best of all worlds. It doesn’t constrain your markup, which I find useful for achieving appropriate semantics and accessibility. You don’t need to put a “wrapper div” around everything. Instead you can have landmark-related elements as direct children of `body`, applying padding to those and nesting centred wrappers inside them.

By making proper use of `padding`, this approach also avoids problems of “collapsing margins” and other margin weirdness that make life difficult when you have sections with background colours. You don’t want to be using vertical margins in situations where “boxes with padding” would be more appropriate. Relatedly, I find that flow (or [stack](https://every-layout.dev/layouts/stack/)) layouts generally work best _within_ each of your nested wrappers rather than at the top level.

## How should I mark up lists of articles?

Should they be a bunch of sibling `article`s? Should they be in a list element like a `ul`?

Different switched-on developers tackle this differently, so it’s hard to offer a definitive best approach. Some developers even do it differently across different pages on their own site! Here are some examples in the wild:

- [Leonie Watson’s homepage](https://tink.uk/) employs a list of `article` elements with no wrapping list
- [Manuel Matuzovic’s homepage](https://www.matuzo.at/) does the same as Léonie’s
- [Adrian Roselli’s posts page](https://adrianroselli.com/posts) uses the same structure as above whereas [Adrian’s homepage](https://adrianroselli.com/) uses a `ul` with no `article` elements!
- [Tetralogical’s blog section](https://tetralogical.com/blog/) employs sibling `section` elements whereas [their news section](https://tetralogical.com/news/) uses an `ol` but with nothing special nested inside
- [Ethan Marcotte’s journal](https://ethanmarcotte.com/wrote/) uses nested lists to group by years then months, with each teaser marked up as an `article` inside an `li`

So, clear as mud! 

I currently use sibling `article`s with no wrapping list. Using `article` elements feel right because each (per [MDN’s definition of article](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article)) “represents a self-contained composition… intended to be independently distributable or reusable (e.g., in syndication)”. I could be persuaded to wrap these in a list because that would announce to screen reader users upfront that it’s a list of articles and say how many there are. (It tends to make your CSS a tad gnarlier but that’s not the end of the world.)

## Should a blog post page be marked up as an article or just using main?

I mark it up as an `article` for the same reasons as above. That article is nested inside a `main` because all of my pages have one `main` element wrapping around the primary, non-repeated content of the page.

## To be continued

I’ll add more to this article over time.
