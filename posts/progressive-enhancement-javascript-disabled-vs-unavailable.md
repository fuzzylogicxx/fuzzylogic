---
date: 2022-07-05T17:20:01Z
title: Progressive enhancement is relevant in sites which require JavaScript too
description: Remember that JavaScript unavailable is a greater possibility than JavaScript disabled
tags:
- note
- progressiveenhancement
- javascript
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
At work I and our team just had an interesting realisation about a recent conversation. We had been discussing progressive enhancement for custom toggles and a colleague mentioned that the web app in question breaks at a fundamental level if the user has disabled JavaScript, displaying a message telling them to cange their settings in order to continue. He used this to suggest that any efforts to provide a no-JavaScript experience would be pointless. And this fairly absolute (and on-the-surface, sensible) statement caught me off-guard and sent me and the others down a blind alley.

I remember replying “yes, but even still we should try to improve the code by introducing good practices” and that feeling a little box-ticky.

However in retrospect I realise that we had temporarily made the mistake of conflating “JavaScript enabled” with “JavaScript _available_” – which are separate possibilities.

When considering resilience around JavaScript, we can consider the “factors required for JavaScript to work” as layers:

1. is JavaScript enabled in the user’s browser?
1. is the JavaScript getting through firewalls? (it recently didn’t for one of our customers on the NHS’s network)
1. has the JavaScript finished loading?
1. does the user’s browser support the JavaScript features the developers have used (i.e. does the browser “cut the mustard”?)
1. is the JavaScript error-free? It’s easy for some malformed JSON to creep in and break it…

And the point my colleague made relates to Layer 1 only. And that layer – JavaScript being disabled by the user – is actually the least likely explanation for a 
JavaScript-dependent feature not working.

So it's really important to remember that when we build things with progressive enhancement we are not just addressing Layer 1, but Layers 2—5 too (as well as other layers I’ve probably forgotten!)
