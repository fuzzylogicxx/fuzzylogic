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

You can use them to plug unsupported _methods_ (not syntax).

### Manual polyfilling

CF: The great thing about polyfills is that when browser support gets better, you can rip them out without having to refactor code.
They can be lean and nice, like CF’s for Object.fromEntries()  https://vanillajstoolkit.com/polyfills/objectentriesfrom/
But you’d need to maintain them and communicate them across a team in a way’s tricky and isn’t required by polyfill.io.
Also the file/function would be downloaded by every browser regardless of whether or not the method is supported. It might not use the polyfill, but the polyfill is still downloaded because it needs to run its initial test _in case_ it’s needed.


### polyfill.io

## Babel


Misc
Andy Bell talks about a minimum viable experience and compares this to MVP and agile https://piccalil.li/blog/a-minimum-viable-experience-makes-for-a-resilient-inclusive-website-or-app
