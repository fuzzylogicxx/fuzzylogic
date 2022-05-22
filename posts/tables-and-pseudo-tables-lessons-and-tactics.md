---
date: 2022-05-21T13:55:51Z
title: 'Tables and pseudo-tables: lessons and tactics'
description: Things I’ve learned about building complex tables
tags:
- entry
- a11y
- css
- html
- tables
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
At work I have to think about complex HTML tables a lot. The challenge with doing tables well is that 99% of online table tutorials use fairly simple examples… whereas in reality design and product teams often want to squeeze in lots more. It’s really hard to balance those needs against accessibility, systemisation, styling and responsiveness. 

Heads up: I’ve published this post early while it’s still a work in progress because it’s better for me to have it available for reference than languishing in drafts and forgotten. Apologies if you read it in a temporarily rough state.
---

Following a lot of work on tables I’ve recently gained additional insight into the possibilities and constraints, thanks to an accessibility review by [Tetralogical](https://tetralogical.com/) and some great articles by [Adrian Roselli](https://adrianroselli.com/). 

Here are my new rules of thumb.

## Avoid complex recreations of tables with alternate elements

In addition to developing a component wrapping the HTML `table` element to handle simple data tables, I recently created an alternate component for “tables with bells and whistles”. It used a combination of the HTML [description list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl) element plus CSS Grid plus some `display: contents` in lieu of the currently poorly supported subgrid. This approach allowed recreating a table-like appearance but facilitating much more responsive layout flexibility, amongst other benefits.

Unfortunately this resulted in an accessibiliy fail around using the description list in this way. Popular combinations of browsers and assistive technologies do not support description lists sufficiently to convey the intended crucial relationships between the faux table headers and faux table cells.

Note: I think [it’s OK to use the description list element](https://tetralogical.com/blog/2022/04/29/lists/) in general – just not for such an unconventional and complex use case. 

## ARIA Grid role: an alternative in theory (if not in practice)

I noted that Github handle their “repository directory indexes” using the [ARIA grid role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/grid_role). Their HTML is like this (I’ve abbreviated it a touch):

``` html
<div role="grid" aria-labelledby="files" class="…">
  <div class="sr-only" role="row">
    <div role="columnheader">Type</div>
    <div role="columnheader">Name</div>
    <div role="columnheader" class="d-none d-md-block">Latest commit message</div>
    <div role="columnheader">Commit time</div>
  </div>
  <!-- interesting 'fake' row here -->
  <div role="row" class="…">
    <div role="rowheader" class="…">
      <a rel="nofollow" title="Go to parent directory" class="…" href="…"><span class="…" style="…">.&hairsp;.</span></a>
    </div>
    <div role="gridcell" class="…"></div>
    <div role="gridcell"></div>
  </div>
  <!-- first real row -->
  <div role="row" class="Box-row Box-row--focus-gray py-2 d-flex position-relative js-navigation-item navigation-focus">
    <div role="gridcell" class="…"><svg …></svg></div>
    <div role="rowheader" class="…">
      <span class="…"><a class="…" href="…">my-file-name.md</a></span>
    </div>
    <div role="gridcell" class="…">
      <span class="…"><a href="…">The commit message</a></span>
    </div>
    <div role="gridcell" class="…">
      <time-ago datetime="2021-06-17T16:45:42Z">11 months ago</time-ago>
    </div>
  </div>
  <!-- more rows go here -->
</div>
```

I like the idea of looking at alternatives to tables but don’t think I’d take this approach right now. Where there are lots of focusable elements it turns those multiple tab-stops into _one_ (the grid is a single _widget_) which is perhaps useful for some cases, but I’ve yet to encounter them. It’d also require you to do manual focus management within the widget. 

It’s an interesting approach though, and one I’ll keep in the back of my mind.

## You can achieve “bells and whistles” within a table accessibly

Here are some handy techniques – done accesibly – courtesy of Adrian Roselli:

- [Accessibly including inputs in tables](https://adrianroselli.com/2019/05/uniquely-labeling-fields-in-a-table.html)
- [Responsive accessible tables](https://adrianroselli.com/2017/11/a-responsive-accessible-table.html) and simpler [Under-engineered responsive tables](https://adrianroselli.com/2020/11/under-engineered-responsive-tables.html)
- [Clip long, overflowing content](https://adrianroselli.com/2016/02/keyboard-and-overflow.html)
- [Expandable rows](https://adrianroselli.com/2019/09/table-with-expando-rows.html)
- [Fixed headers](https://adrianroselli.com/2020/01/fixed-table-headers.html)

## References

- [Grids pt1: To grid or not to grid](https://sarahmhigley.com/writing/grids-part1/) by Sarah Higley
- [ARIA Grid as an anti-pattern](https://adrianroselli.com/2020/07/aria-grid-as-an-anti-pattern.html) by Adrian Roselli
