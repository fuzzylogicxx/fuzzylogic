---
date: 2024-04-08T20:17:15Z
title: The reliability of HTML number and date inputs
description: When asking users for numbers and dates, which HTML form elements should we use?
tags:
- post
- html
- input
- form
- dates
- accessibility
noteWithTitle: true
draft: false
---
When asking users for numbers and dates, which HTML form elements should we use?
---

When asking the user for numeric information it might feel obvious to use the HTML input type meant for that purpose, namely [number](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number). 

However the UK GDS wrote in 2020 that they had switched to using [inputs of type `text`, with inputmode set to `numeric`](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/). This was after conducting tests which had revealed a variety of usability and accessibility issues.

In the same article a reader questioned why GDS’s use of text inputs also extended to gathering _dates_ (a subset of numbers) when there is a dedicated input type date for that purpose. GDS answered that there are accessibility and usability problems with browser implementations of `<input type"date">` and linked to [Hassell Inclusion’s 2019 article on date inputs as evidence](https://www.hassellinclusion.com/blog/input-type-date-ready-for-use/).

I love the level of research and detail that the GDS and Hassell articles provide. But the notion of not using the HTML elements meant for the job annoys me. I’m also aware that smart developers like Jeremy Keith note that [input type `date` now has wide browser support and are using it](https://adactio.com/journal/21045).

It’s also worth reiterating that the Hassell article is from 2019 and the GDS one from 2020, and four or five years is a long time in browser support.

So what should we do, and how should we make the decision? I’m gonna circle back to this and update it with some answers soon, once I’ve worked them out.
