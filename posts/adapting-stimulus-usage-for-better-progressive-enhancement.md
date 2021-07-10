---
title: Adapting Stimulus usage for better Progressive Enhancement
description: Can we go a step further and also use Stimulus to render our script-triggering elements?
date: 2021-07-01T08:48:00Z
mainImage.isAnchor: false
tags:
- progressiveenhancement
- button
- javascript
- stimulus
---
A while back, [Jake Archibald tweeted](https://twitter.com/jaffathecake/status/1230388412806520833):

> Don't render buttons on the server that require JS to work.
---

The idea is that user interface elements which depend on JavaScript (such as buttons) should be rendered _on the client-side_, i.e. with JavaScript.

In the context of a progressive enhancement mindset, this makes perfect sense. Our _minimum viable experience_ should work without JavaScript due to the [fragility of a JavaScript-dependent approach](https://kryogenix.org/code/browser/everyonehasjs.html) so should not include script-triggering buttons which might not work. It then follows that if we add JavaScript-based interactivity as an enhancement then that layer should also be responsible for rendering the `button`s that trigger the interactivity.

This is how I used to build JavaScript interactions as standard, however sadly due to time constraints and framework conventions I don’t always follow this best practice on all projects.

At work, we use [Stimulus](https://stimulus.hotwired.dev/). Stimulus has a pretty appealing philosophy:

> Stimulus is designed to enhance _static_ or _server-rendered_ HTML—the “HTML you already have”

However in [their examples](https://stimulus.hotwired.dev/handbook/hello-stimulus) they always render buttons on the server; they always assume the JavaScript-powered experience is the baseline experience. I’ve been pondering whether that could easily be adapted toward better progressive enhancement and it seems it can.

My hunch was that I should use the `connect()` lifecycle method to render a `button` into the component (and introduce any other script-dependent markup adjustments) at the _earliest opportunity_. I wasn’t sure whether creating new DOM elements at this point and fitting them with Stimulus-related attributes such as `action` and `target` would make them available via the standard Stimulus APIs like server-rendered elements but was keen to try. I started by checking if anyone was doing anything similar and found a thread where [Stimulus contributor Javan suggested that DIY target creation is fine](https://github.com/hotwired/stimulus/issues/41#issuecomment-355961542).

I then gave that a try and it worked! Check out my pen [Stimulus with true progressive enhancement](https://codepen.io/fuzzylogicx/pen/oNWzgzO?editors=1111). It’s a pretty trivial example for now, but proves the concept.
