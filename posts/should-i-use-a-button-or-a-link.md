---
date: 2022-10-10T13:41:12Z
title: Should I use a button or a link?
description: A decision-tree to make better decisions regarding buttons and links
tags:
- entry
- link
- button
- development
- design
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
I’ve written previously about the [important differences between buttons and links](https://fuzzylogic.me/posts/buttons-versus-links-differences-and-tips/). While reviewing some “component refresh” design mocks at work yesterday I noticed the designs were a bit unclear in this regard so I sent the designers a little decision-tree, which I’m noting for future reference.
---

It’s important both for our users and for us as practitioners to distinguish between links (the `<a>` element) and the `<button>` element. The reason I push this is because they’re fundamentally different functionally, which has important usability implications. Users expect to use mouse, keyboard, browser back-button and assistive tech differently for links than they do for `<button>`s. And if they can’t visually distinguish one from the other, they’ll try things they expect to work then get confused when they don’t work.

I think this is an area where _design_ and _materials_ can’t be considered separately and need a joined-up approach.

Here’s a flow I hope is helpful.

Ask: does it…

1. _take the user to another page_? Then it’ll be a link – the `<a>` (anchor) element.
2. _cause something to change on the current page_, or _submit a form_? Then it’ll be a button – i.e. the `<button>` element.

If it’s a link (`<a`):

* it should be underlined so people know it’s a link
* it should have a hover state, for example stay underlined but change colour
* in cases where it’s a CTA you might _choose_ to design it to look button-like and remove some standard link affordances. Just be aware you’re only “calling” it a button. In real user-experienced terms, it’s still a link.
* it does not natively have a disabled state. We shouldn’t be disabling links.

If it’s a button (`<button>`):

* it should look like a button, i.e. like a pill or rectangle
* It should _not look like a link_ – that’d confuse users into thinking it takes them to another page.
* So it shouldn’t be underlined by default or on hover. It should have some other hover state.
