---
title: JavaScript Promises explained
description: A brief explainer (for future-me and anyone else it helps) on what
  promises are and how to use them.
date: 2019-12-13T17:07:38.868Z
mainImage.isAnchor: false
tags:
  - entry
  - promises
  - javascript
draft: true
---
## A brief explainer (for future-me and anyone else it helps) on what promises are and how to use them. Note: this is not an _official_ definition, but rather something that works for me.

In the normal run of things, JavaScript code is _synchronous_. When code line 1 has run (perhaps defining a new variable) and the operation has completed, code line 2 runs (perhaps operating on the variable we just defined). However sometimes in line 1 we need to do something which will take longer – maybe an unknown amount of time – for example to make an API call to a third party server. In many cases we want that to execute _separately_ from the main thread so as not to hold up the exexution of line 2.
