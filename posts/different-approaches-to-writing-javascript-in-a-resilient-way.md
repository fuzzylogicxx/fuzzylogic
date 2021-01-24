---
title: Different approaches to writing JavaScript in a resilient way
description: Different approaches to writing JavaScript in a resilient way
date: 2021-01-24T09:40:08.834Z
mainImage.isAnchor: false
tags:
  - entry
  - javascript
  - web
  - development
  - progressiveenhancement
draft: true
---
Lorem
---

## Feature detection

(or “capability detection”)

The “Cuts the mustard” approach

original BBC https://responsivenews.co.uk/post/18948466399/cutting-the-mustard
refined by Jake https://twitter.com/jaffathecake/status/570872103227953153




JK 
[On a case by case basis](https://adactio.com/links/9943), checks whether the feature he is about to use is supported, i.e. whether the user’s system “cuts the mustard”. For example in https://adactio.com/journal/17516:

<figure>

``` js 
if (!win.localStorage) return;

// and…
if ('onpagehide' in win) {
  …
}
```

</figure>

Is this suitable at scale?

(NB he does use some polyfills too https://adactio.com/journal/17605)

He also only uses modern _syntax_ (as opposed to APIs and _methods_) within contexts where he knows they will be supported (no doubt leaning on caniuse.com). For example in a service worker he knows he can also use x, y and z.

### FD Tools

Modernizr
or lighter-weight http://featurejs.com/

## JavaScript modules

https://briefs.video/videos/is-progressive-enhancement-dead-yet/

## Polyfills

### Manual polyfilling

### polyfill.io

## Babel


Misc
Andy Bell talks about a minimum viable experience and compares this to MVP and agile https://piccalil.li/blog/a-minimum-viable-experience-makes-for-a-resilient-inclusive-website-or-app
