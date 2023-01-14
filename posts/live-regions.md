---
date: 2023-01-14T19:33:42Z
title: Live regions
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
Anda asked for some thoughts regarding a “copy to clipboard” component. It set my mind racing. A good example of where a “physically small” component might lead folks to think it’d be quick and easy to create but which actually requires – at least to build responsibly – a disproportionate amount of thinking!

After the copy event, a message appears saying “Copied”. 

(I _think_ GitHub get around the accessible announcement issue by making the trigger (button) and the “Copied” announcement _the same element_. Focus is already on the element that changes therefore the change is announced. Their approach is to change the value of the already-present `aria-label` attribute.)

I went looking at Adam Silver’s book and Scott O’s [Are we live?](https://www.scottohara.me/blog/2022/02/05/are-we-live.html)

I _think_ one option is to _send focus_ to the content that changes, and that will cause it to be announced accessibly too. That’s not always a suitable option – you may not want to switch focus from the element currently in use.

Other options:

output is the native HTML element ([Scott O article](https://www.scottohara.me/blog/2019/07/10/the-output-element.html))

ARIA role=status (equivalent to `polite`)

aria-live=polite

I _think_ output is safe to use, perhaps with the addition of role=status (for a while).

For accessibility does the element need to be ever present rather than either toggled hidden/visible or injected?

Yes, the element should be ever present; only its content should change. Whether using a container set as a live region (meaning inner content will change and we want that communicated) or an `output` element, you update the contents but don’t show/hide or add/delete the element. I guess in some cases you might make an announcement element _visually hidden_ when it’s for screen readers only, but that’s different from “hidden from everyone” which causes problems.

I think per [Scott’s toast example](https://scottaohara.github.io/tests/html-output/toastput-aria.html) we want a container div wrapping the <output> and this container handles styling, then the <output> should be empty but populated with the text “Copied” by the click event handler, then after a few seconds the output’s textContent should be set to empty again.

Misc references:

* [Marcy Sutton course section on aria live regions](https://frontendmasters.com/courses/javascript-accessibility/announcements-with-aria-live-regions/) 