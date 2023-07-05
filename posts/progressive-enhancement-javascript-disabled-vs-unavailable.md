---
date: 2022-07-05T20:17:15Z
title: Progressive enhancement is still relevant in sites that require JavaScript
description: 'JavaScript disabled' and 'JavaScript unavailable' are separate possibilities, both requiring resilient solutions
tags:
- note
- progressiveenhancement
- javascript
location: Edinburgh
noteWithTitle: true
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

At work I and our team just had an interesting realisation about a recent meeting. We had been discussing progressive enhancement for custom toggles/switches and my colleague mentioned that
the application in question breaks at a fundamental level if the user has disabled JavaScript, displaying a message telling the user to enable JS. 
This was used as an argument that any efforts to provide a no-JavaScript experience would be pointless. This pretty absolute statement caught me off-guard and sent me, and everyone else, down a blind alley.

I remember replying “yes, but we should still try to improve things by introducing good practises” and that feeling a little box-ticky. However in retrospect I realise that for a minute the group made the mistake of thinking “if this
web app doesn’t work when JS is disabled, then applying progressive enhancement is pointless”.

We were conflating “JavaScript disabled” with “JavaScript available”… but they are _not the same thing_ and this is a key message of resilient web design.

When considering resilience with regard to JavaScript, you can think of the “factors required for JS to work” in terms of layers:

- is JavaScript enabled in the user’s browser?
- is the JavaScript getting through firewalls? (it recently didn’t for one of our customers on the NHS’s network)
- has the JavaScript finished loading?
- does the user’s browser support the JavaScript features the devs have used (i.e. does it “cut the mustard”?)
- is the JavaScript error-free? It’s easy for some malformed JSON to creep in and break it…

So the thing my colleague flagged in relation to the app’s behaviour only relates to Layer 1. And JS being disabled is actually probably the least likely factor to cause JS not to work.

So it's really important to remember that when we build things with progressive enhancement, we are not just addressing Layer 1, but Layers 2—5 too (as well as other layers I’ve probably forgotten!
