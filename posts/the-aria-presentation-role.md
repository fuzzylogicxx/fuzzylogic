---
date: 2022-10-23T09:25:21Z
title: The ARIA presentation role
description: I’ve never properly understood when you would use this role
tags:
- note
- javascript
- aria
- progressiveenhancement
- a11y
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
I’ve never properly understood when you would need to use the ARIA `presentation` role. This is perhaps in part because it is often used inappropriately, for example in situations where `aria-hidden` would be more appropriate. However I think the penny has finally dropped.
---

It’s fairly nuanced stuff so I’ll forgive myself this time!

You might use `role=presentation` in JavaScript which progressively enhances a basic JS-independent HTML foundation into a more advanced JS-dependent experience. In such cases you might want to reuse the baseline HTML but remove semantics which are no longer appropriate.

As an example, Inclusive Components [Tabbed Interfaces](https://inclusive-components.design/tabbed-interfaces/) starts with a Table of Contents marked up as an unordered list of links. However in enhanced mode the links take on a new role as tabs in a `tablist` so `role=presentation` is applied to their containing `<li>` elements so that the tab list is announced appropriately and not as a _plain_ list.