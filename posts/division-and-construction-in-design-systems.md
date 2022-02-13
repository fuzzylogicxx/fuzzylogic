---
date: 2022-02-03T08:57:00Z
title: Division and construction in design systems
description: I’ve been inspired by Brad Frost’s video on Storybook’s channel
tags:
- entry
- storybook
- lookbook
- atomicdesign
- designsystems
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
Over the last couple of days I’ve been watching [an interview with Brad Frost on Storybook’s channel](https://www.youtube.com/watch?v=jR0Gefa4lpg). I’m still only halfway through but it’s great so far.
---

One part I’m loving is, from about 25 mins in, when Brad talks abut how [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) _crucially_ includes the notion of not only “breaking interfaces down” (like every DS does) but also “building them back up”. It’s not just the atoms and molecules that are important, but also combining them into (in Atomic Design parlance) organisms and templates, too. For example when using Storybook as an internal workshop (in my team our equivalent is [LookBook](https://github.com/allmarkedup/lookbook)), he makes a point of it not just including components but also templates, so that:

> we can internally test with a high degree of confidence before handing over to our user-consumers that when our components are _assembled together,_ they work”.

I like the idea of our workshop containing not just components but also multicomponent arrangements, or even full page templates. It’d mean less need to go arrange this stuff in the consuming application all the time. Brad’s chat also chimes with some recent thoughts I’ve been having about _Patterns_ and also 
[a tweet from Heydon Pickering regarding a catalogue vs a system](https://twitter.com/heydonworks/status/1483127049657143297).

Essentially, I think that in component libraries, notions of hierarchy and composition are really important. Simply having “a catalogue of components” (including lots that are common to all Design Systems) might not hugely separate your system from Bootstrap or Material. However it’s our ability to combine our custom legos into specific higher order arrangements, and our care for making sure they combine together harmoniously that creates our own special sauce.
