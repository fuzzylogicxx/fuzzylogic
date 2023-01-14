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
Anda asked for some thoughts regarding a “copy to clipboard” component. After the copy event, a message appears saying “Copied”.

output is the native HTML element

ARIA role=status

aria-live=polite

I _think_ output is safe to use, perhaps with the addition of role=status (for a while).

For accessibility does the element need to be ever present rather than either toggled hidden/visible or injected?

Yes, the element should be ever present; only its content should change. Whether using a container set as a live region (meaning inner content will change and we want that communicated) or an `output` element, you update the contents but don’t show/hide or add/delete the element.

I think per [Scott’s toast example](https://scottaohara.github.io/tests/html-output/toastput-aria.html) we want a container div wrapping the <output> and this container handles styling, then the <output> should be empty but populated with the text “Copied” by the click event handler, then after a few seconds the output’s textContent should be set to empty again.