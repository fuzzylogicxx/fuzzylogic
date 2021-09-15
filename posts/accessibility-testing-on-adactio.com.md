---
date: 2021-09-15T12:32:02Z
title: Accessibility Testing (on adactio.com)
description: Jeremy Keith suggests that when it comes to accessibility testing it’s
  not just about finding the issues—it’s about finding the issues at the right time.
tags:
- development
- web
- html
- testing
- a11y-audit
- a11y
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
I really liked [Jeremy Keith’s recent journal entry on Accessibility Testing](https://adactio.com/journal/18458). Here’s my summary.
---

As I understood it, the main points were:

* Accessibility Audits performed by experts and real Assistive Technology users are _good!_
* But try to get the most out of them by having them focus on the things that you can’t easily do yourself.
* We ourselves can handle things like colour contrast. It can be checked at the design stage before a line of code is written.
* Likewise HTML structure such as ensuring accessible form labels, ensuring images have useful `alt` values, using landmarks like `main` and `nav`, heading structure etc. These are not tricky to find and fix ourselves _and_ they have a big accessibility impact.
* As well as fixing those issues ourselves we should also put in place new processes, checks and automation if possible to stop them recurring
* As for _custom interactive elements_ (tabs, carousels, navigation, dropdowns): these are specific to our site and complicated/error-prone by nature, so _those_ are the things we should be aiming to have professional Accessibility Audits focus on in order to get best value for money.
