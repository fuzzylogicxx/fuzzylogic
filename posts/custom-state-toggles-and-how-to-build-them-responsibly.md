---
date: 2022-06-18T16:06:43Z
title: Custom “state toggles” and how to build them responsibly
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
I was recently presented a design which featured a pair of conjoined, button-like controls arranged side-by-side in a “pill” shape.

Saw the potential for use in different contexts: 

1. might be the one and only control that changes/filters an adjacent element.
2. might be part of a “filter form” in which there are _many_ filters for another content element
3. might be part of a “data submission form”, e.g. “add a new invoice”.

Identifying which of those it is affects your choice of technical approach. Relatedly it might affect whether you need (or can avoid) a PE approach that is tricky due to potential layout shift.

Possible baselines for progressive enhancement:

1. links styled as buttons
2. radio buttons styled as buttons

Possible enhanced versions:

1. links remain as links but with default behaviour prevented and hijacked, perhaps URL changed using History API, content retrieved with fetch (like [Turbo does](https://turbo.hotwired.dev/handbook/introduction#turbo-drive%3A-navigate-within-a-persistent-process))
2. links changed to buttons
3. 

[https://scottaohara.github.io/a11y_styled_form_controls/src/radio-button--pill/](https://scottaohara.github.io/a11y_styled_form_controls/src/radio-button--pill/ "https://scottaohara.github.io/a11y_styled_form_controls/src/radio-button--pill/")

> Radio buttons are … typically part of a larger form area of a document. It may be acceptable to use a pattern like this outside of the context of a form…
>
> Alternatively, a grouping of `button` elements that are aware of each other's state, and utilize `aria-pressed="true/false"` to indicate their own state, may be more appropriate and understandable to users.

How to implement a `<button>` with `aria-pressed` solution.

[https://adrianroselli.com/2019/08/under-engineered-toggles-too.html](https://adrianroselli.com/2019/08/under-engineered-toggles-too.html "https://adrianroselli.com/2019/08/under-engineered-toggles-too.html")

Avoid a solution using the ARIA `switch` role:

[https://adrianroselli.com/2019/08/under-engineered-toggles-too.html#Post](https://adrianroselli.com/2019/08/under-engineered-toggles-too.html#Post "https://adrianroselli.com/2019/08/under-engineered-toggles-too.html#Post")

> Generally I recommend against a control with a `switch` role. Scott O’Hara has tracked a bunch of [issues with screen readers](https://scottaohara.github.io/a11y_styled_form_controls/src/checkbox--switch/#affects_on_sr), so you can see that the experience is sub-par overall.