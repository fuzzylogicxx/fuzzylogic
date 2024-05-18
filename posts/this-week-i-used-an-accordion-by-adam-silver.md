---
title: This week I used an accordion (by Adam Silver)
date: 2024-05-18
description: Martin introduces the “Now” page concept and explains how he
  approached it using Eleventy
tags:
  - link
  - ux
  - testing
  - evidence
  - pragmatism
  - search
  - accessibility
linkTarget: https://www.martingunnarsson.com/posts/right-here-right-now/
---
I loved this insight into Adam Silver’s thought process. And it came at a timely moment since at work I’m currently trying to promote evidence-based, considered choices regarding user interface patterns.
---

My summary of Adam’s key points is:

- he found a UI pattern (let’s call it _pattern x_) in his project and flagged that while it’s not always bad it risks numerous usability problems. He lists these problems.
- he advises that _pattern x_ is beneficial only in very specific _situation y_
- and that otherwise, pattern x is unnecessary and a more basic solution would not only require less work but provide a better user experience
- given this context, he asks others working on the project the following: 
  - can they explain why _pattern x_ was used?
  - did research (really) indicate a need? (this implicitly also asks if evidence or research was considered _at all_)
  - what else was tried beforehand? (this also subtly checks for awareness of the risks of _pattern x_ and whether other options were even considered)
  - even if the use case was appropriate, given the downsides of pattern x were you comfortable the benefits outweigh those?

Adam also mentions how on this occasion, in the end, he had to grudgingly stick with _pattern x_ because even though there were possible alternatives, his team didn’t have time to research or implement them. A familiar dose of real life, there. It’s worth being clear, though, that their implementation of pattern x (an accordion) is at least accessible, since as far as I can tell it uses their modern [accordion design system component](https://design-system.service.gov.uk/components/accordion/). If that were not the case, I imagine it’d be even less viable to leave it in place.
