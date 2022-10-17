---
date: 2022-10-16T13:16:06Z
title: Thoughts on HTML over the wire solutions
description: ''
tags: []
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: true

---
Max Böck just tweeted about htmx [https://twitter.com/mxbck/status/1581595524180094977](https://twitter.com/mxbck/status/1581595524180094977 "https://twitter.com/mxbck/status/1581595524180094977")

It seems pretty similar to a technology used at my work called Turbo: “the speed of an SPA without having to write any JS“

Good

* replacing SPAs as an approach
* declarative method

Bad

I have kinda similar accessibility questions as this Reddit post [https://www.reddit.com/r/rails/comments/tx8lj7/does_hotwire_have_an_a11y_commitment/](https://www.reddit.com/r/rails/comments/tx8lj7/does_hotwire_have_an_a11y_commitment/ "https://www.reddit.com/r/rails/comments/tx8lj7/does_hotwire_have_an_a11y_commitment/")

> The reason is the pragmatic reality of what Hotwire is: a JavaScript library in the client's browser that manipulates the DOM.

I have a problem with the “no javascript” language being used around these. [https://evilmartians.com/chronicles/hotwire-reactive-rails-with-no-javascript](https://evilmartians.com/chronicles/hotwire-reactive-rails-with-no-javascript "https://evilmartians.com/chronicles/hotwire-reactive-rails-with-no-javascript")

I feel it’s all oriented toward DX rather than UX, but doesn’t make that clear.

* without having to write any JS is misleading. It’s still dependent on JS (you need the library JS) so requires same resilience considerations but you might forget that due to the potentially misleading hype. 
* It’s still based on client-side JS that changes content and state so that carries responsibilities
* does it cover the requirements of accessible JS components or let you customise? Is it more likely to make them ignored because people just rely on the library?

Not convinced about [https://htmx.org/docs/#progressive_enhancement](https://htmx.org/docs/#progressive_enhancement "https://htmx.org/docs/#progressive_enhancement")

Questions/Notes:

What about conveying state?

When you replace some HTML: need to add aria-live=polite [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions") [https://tink.uk/accessible-forms-with-aria-live-regions/](https://tink.uk/accessible-forms-with-aria-live-regions/ "https://tink.uk/accessible-forms-with-aria-live-regions/")

Links should not be used as a button. If you do, they need role=button, but even still you’ll need to [recreate and likely miss the other features of a button](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role#description), and confuse with perceived affordance and functionality mismatches

_Links_ should not delete things https://adactio.com/journal/17768

[https://github.com/bigskysoftware/htmx/issues/731](https://github.com/bigskysoftware/htmx/issues/731 "https://github.com/bigskysoftware/htmx/issues/731")