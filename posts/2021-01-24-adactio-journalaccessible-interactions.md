---
date: "2021-01-24T13:12:43.921Z"
title: "Accessible interactions (on Adactio)"
description: "Jeremy Keith takes us through his thought process regarding the choice of link or button when considering accessible interactive disclosure elements"
tags: [link, web, development, modal, javascript, a11y, accessibility, aria, fragment, anchor, button, disclosure]
linkTarget: "https://adactio.com/journal/17546"
---
Jeremy Keith takes us through his thought process regarding the choice of link or `button` when considering accessible interactive disclosure elements.

A `button` is generally a solid choice as its built for general interactivity and carries the expectation that when activated, something happens. However in some cases a link might be appropriate, for example when the target should automatically receive focus; when the trigger and target content are relatively far apart in the DOM; and/or when the revealed content feels like a “new page”—all of which are true in the case of a progressively-enhanced modal dialogue.

In such cases you might choose to use a link with a fragment identifier so that it works well via old-school page anchors without JavaScript, then when JavaScript is available intercept and enhance into the fancier disclosure element.
