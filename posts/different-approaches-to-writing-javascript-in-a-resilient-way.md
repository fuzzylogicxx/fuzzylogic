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

JK 
At every turn, checks whether the feature he is about to use is supported, i.e. whether the user’s system “cuts the mustard”. For example in https://adactio.com/journal/17516:

<figure>

``` js 
if (!win.localStorage) return;

// and…
if ('onpagehide' in win) {
  …
}
```

</figure>

He also only uses modern _syntax_ within contexts where he knows they will be supported. For example in a service worker he knows he can also use x, y and z.

Is this suitable at scale?

### FD Tools

Modernizr
or lighter-weight http://featurejs.com/

## JavaScript modules

## Polyfills

### Manual polyfilling

### polyfill.io

## Babel