---
date: "2021-01-24T13:12:43.921Z"
title: "Accessible interactions (on Adactio)"
description: "Jeremy Keith takes us through his thought process regarding the choice of link or button when considering accessible interactive disclosure elements"
tags: [link, web, development, modal, javascript, a11y, accessibility, aria, fragment, anchor, button, disclosure]
linkTarget: "https://adactio.com/journal/17546"
---
Jeremy Keith takes us through his thought process regarding the choice of link or `button` when planning accessible interactive disclosure elements.
---

A `button` is generally a solid choice as it’s built for general interactivity and carries the expectation that when activated, something somewhere happens. However in some cases a link might be appropriate, for example when the _trigger_ and _target content_ are relatively far apart in the DOM and we feel the need move the user to the target / give it focus.

For a typical disclosure pattern where some content is shown/hidden by an adjacent trigger, a `button` suits perfectly. The DOM elements are right next to each other and flow into each other so there’s no need to move or focus anything.

However in the case of a log-in link in a navigation menu which—when enhanced by JavaScript—opens a log-in form inside a modal dialogue, a link might be better. In this case you might use an anchor with a fragment identifier (`<a href="#login-modal">Log in</a>`) pointing to a login-form far away at the bottom of the page. This simple baseline will work if JavaScript is unavailable or fails, however when JavaScript _is_ available we can intercept the link’s default behaviour and enhance things. Furthermore because the expectation with links is that you’ll _go somewhere_ and modal dialogues are kinda like faux pages, the link feels appropriate. 

While not explicit in the article, another thing I take from this is that by structuring your no-JavaScript experience well, this will help you make appropriate decisions when considering the with-JavaScript experience. There’s a kind of virtuous circle there.
