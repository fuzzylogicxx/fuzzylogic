---
date: "2021-01-24T13:12:43.921Z"
title: "Adactio: Journal-Accessible interactions"
description: "Jeremy Keith takes us through his thought process regarding the choice of link or button when considering accessible interactive disclosure elements"
tags: [link, web, development, modal, javascript, a11y, accessibility, aria, fragment, anchor, button, disclosure]
linkTarget: "https://adactio.com/journal/17546"
---
Jeremy Keith takes us through his thought process regarding the choice of link or button when considering accessible interactive disclosure elements.

A button is generally a solid choice as itâs an element for general interactivity that carries the expectation that when activated, something happens. However in some cases a link can also be appropriate, for example when the target needs to receive focus, and when the trigger and target content are relatively far apart from each other in the DOM and/or the revealed content feels like âa new pageâ all of which are the case with progressively enhanced modal dialogues. In those cases you might choose to use a link with a fragment identifier which will work well without JavaScript, then intercept and enhance when JavaScript is available.


---
