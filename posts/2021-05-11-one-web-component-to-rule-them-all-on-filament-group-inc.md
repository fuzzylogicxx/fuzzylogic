---
date: "2021-05-11T17:02:01.319Z"
title: "One web component to rule them all? (on Filament Group, Inc.)"
description: "Scott Jehl with a refreshingly Progressive Enhancement -centric look at Web Components."
tags: [link, webcomponents, polyfills, progressiveenhancement, resilience]
linkTarget: "https://www.filamentgroup.com/lab/delegator/"
---
Scott Jehl has taken a refreshingly Progressive Enhancement -centric look at Web Components.

> this pattern provides a nice hook for adding progressive enhancements to already-meaningful HTML contained in these custom elements, leaving them resilient in the case of of script loading failures and allowing the page to start rendering before the JS happens to run.
---

He goes further and creates a _factory_ for creating Web Components which allows adding to a single element many small behavioural script enhancements that may or may not relate to each other.

There are also some great notes on polyfilling and the performance upgrade provided by lifecycle callbacks.

And [Scott’s wc-experiments repo](https://github.com/filamentgroup/wc-experiments) contains some interesting demos.
