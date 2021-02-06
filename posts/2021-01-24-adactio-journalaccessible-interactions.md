---
date: "2021-01-24T13:12:43.921Z"
title: "Accessible interactions (on Adactio)"
description: "Jeremy Keith takes us through his thought process regarding the choice of link or button when considering accessible interactive disclosure elements"
tags: [link, web, development, modal, javascript, a11y, accessibility, aria, fragment, anchor, button, disclosure]
linkTarget: "https://adactio.com/journal/17546"
---
Jeremy Keith takes us through his thought process regarding the choice of link or `button` when planning accessible interactive disclosure elements.
---

A `button` is generally a solid choice as it’s built for general interactivity and carries the expectation that when activated, something happens. However in some cases a link might be appropriate, for example: 

- when the target should automatically receive focus; 
- when the trigger and target content are relatively far apart in the DOM; and/or 
- when the revealed content feels like a “new page”.

In the case of a progressively-enhanced modal dialogue, for example, all of the above might be true.

In such cases you might choose to use a link with a fragment identifier (`<a href="#login-modal">Log in</a>`) so that it works well via old-school page anchors without JavaScript, then when JavaScript is available we can intercept the link’s default behaviour and enhance things with a fancier disclosure pattern.

While not explicit in the article, another thing I take from this is that by structuring your no-JavaScript experience well, this will help you make appropriate decisions when considering the with-JavaScript experience. There’s a kind of virtuous circle there.
