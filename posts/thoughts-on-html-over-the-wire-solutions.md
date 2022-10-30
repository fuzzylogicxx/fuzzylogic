---
date: 2022-10-22T09:16:06Z
title: Thoughts on HTML over the wire solutions
description: The DX seems great, but what about accessibility and resilience?
tags:
- entry
- turbo
- javascript
- progressiveenhancement
- a11y
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
[Max Böck just tweeted his excitement about htmx](https://twitter.com/mxbck/status/1581595524180094977):

> htmx (and similar "HTML over the wire" approaches) could someday replace Javascript SPAs. Cool to see a real-world case study on that, and with promising results

---

There’s similar excitement at my place of work (and among the Rails community in general) about [Turbo](https://turbo.hotwired.dev/). It promises:

> the speed of an SPA without having to write any JS

These new approaches are attractive because they let us create user interfaces that update the current page _sans reload_ – usually communicating with the server to get swap-in content or update the database –  but by writing HTML rather than JavaScript. Developers have long wished for HTML alone to handle common interactive patterns so a set of simple, declarative conventions really appeals. Writing less JavaScript feels good for performance and lightening maintenance burden. Furthermore the Single Page App (SPA) approach via JS frameworks like React and Vue is heavier and more complicated than most situations call for.

However I have some concerns.

I’m concerned about the “no javascript” language being used, for example in articles titled [Hotwire: reactive Rails with no JavaScript](https://evilmartians.com/chronicles/hotwire-reactive-rails-with-no-javascript). Let’s be clear about what Turbo and htmx are in simple material terms. As Reddit user nnuri puts it in [do Hotwire and htmx have a commitment to accessibility?](https://www.reddit.com/r/rails/comments/tx8lj7/does_hotwire_have_an_a11y_commitment/) the approach is based on:

> a JavaScript library in the client's browser that manipulates the DOM.

Your UI that uses htmx or Turbo is dependent on that JS library. And JS is the most brittle part of the stack. So you need to think about resilience and access. The [htmx docs has a section on progressive enhancement](https://htmx.org/docs/#progressive_enhancement) but it doesn’t convince. 

Secondly if you have client-side JS that changes content and state, that brings added accessibility responsibilities. When the content or state of a page is changed, you need to convey this programatically. We normally need to handle this in JavaScript. Do these solutions cover the requirements of accessible JS components, or even let you customise them to do add the necessary state changes yourself? For example [when replacing HTML you need to add aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) (see also [Léonie Watson on accessible forms with ARIA live regions](https://tink.uk/accessible-forms-with-aria-live-regions/)).

Another concern relates to user expectations. Just because you _can_ do something doesn’t mean you should. For example, links should not be used to do the job of a `button`. If you do, they need `role=button` however this is inadvisable because you then need to [recreate (and will likely miss) the other features of a button](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role#description), and will also likely confuse people due to mismatches between perceived affordance and actual functionality. Additionally, as Jeremy Keith has written, [links should not delete things](https://adactio.com/journal/17768).

In general I feel the message of the new _HTML over the wire_ solutions is very weighted toward _developer experience_ but doesn’t make _user experience_ considerations and implications clear. Due to [unanswered questions regarding accessibility](https://github.com/bigskysoftware/htmx/issues/731) I worry that firstly they’re not natively mature in their understanding and approach on that front, and secondly that their framing of benefits is likely to make accessibility ignored due to engineers thinking that they can totally rely on the library.

I’d be really pleased if my concerns could be allayed because in general I like the approach.

## Update 30/1//22

I decided to revisit a book I read back in 2007 – [Jeremy Keith’s _Bulletproof Ajax_](https://bulletproofajax.com/). I had forgotten this, but it actually contains a section titled “Ajax and accessibility”. In admitted that reconciling the two is challenging and despite listing approaches to mitigating issues acknowledged that the situation was not great. However since 2007 – specifically since around 2014 – WAI-ARIA has been a completed W3C recommendation and provides means of making web pages more accessible, particularly when dealing with dynamic content. 

I don’t often have cause to use more than a few go-to ARIA attributes, but I wanted to brush up on my knowledge and will list my learnings here when I’m done. 
