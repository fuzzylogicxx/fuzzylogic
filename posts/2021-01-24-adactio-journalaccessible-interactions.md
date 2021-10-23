---
date: "2021-01-24T13:12:43.921Z"
title: "Accessible interactions (on Adactio)"
description: "Jeremy Keith takes us through his thought process regarding the choice of link or button when considering accessible interactive disclosure elements"
tags: [link, web, development, modal, javascript, a11y, accessibility, aria, fragment, anchor, button, disclosure]
linkTarget: "https://adactio.com/journal/17546"
---
Jeremy Keith takes us through his thought process regarding the choice of link or `button` when planning accessible interactive disclosure elements.
---

A `button` is generally a solid choice as it’s built for general interactivity and carries the expectation that when activated, something somewhere happens. However in some cases a link might be appropriate, for example: 

- when the trigger and target content are relatively far apart in the DOM; and/or 
- when the target should _automatically_ (i.e. without JS) receive focus; and/or
- when the revealed content feels like a “new page”.

For a typical disclosure pattern where some content is shown/hidden by an adjacent trigger, the above criteria do not apply and a `button` suits perfectly.  

However in the case of a log-in link in a navigation menu which—when enhanced by JavaScript—opens a log-in form inside a modal dialogue, all of the aforementioned criteria might be true. In this case you might choose to use an anchor with a fragment identifier (`<a href="#login-modal">Log in</a>`) pointing to a login-form at the bottom of the page. This simple baseline will work if JavaScript is unavailable or fails, however when JavaScript _is_ available we can intercept the link’s default behaviour and enhance things.

While not explicit in the article, another thing I take from this is that by structuring your no-JavaScript experience well, this will help you make appropriate decisions when considering the with-JavaScript experience. There’s a kind of virtuous circle there.
