---
date: 2022-10-30T13:03:26Z
title: How to build an accesssible autocomplete
description: ''
tags:
- entry
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: true

---
At work there’s currently a plan to reconcile our various _Autocomplete_ implementations which were created at different times in different ways into a single, reusable component. So far there has been a written audit of all instances and how they differ in terms of both functionality and technical makeup. There’s also been some design work to identify visual commonalities and avoid future inconsistencies. I’d now like to add another perspective: an investigation into what materials and approach is required to build something accessible and resilient. My experience is that to achieve the right result, HTML and other constraints of the medium can’t just follow and bend to design decisions, but rather must be part of and integral to them.

My team will soon be refactoring our modal dialogue component. Ours has a few deficiencies, needs better developer experience and documentation, is not built to our Design System component standards, and could use a resilience boost from some progressive enhancement.

Adam Silver

* [https://adamsilver.io/blog/building-an-accessible-autocomplete-control/](https://adamsilver.io/blog/building-an-accessible-autocomplete-control/ "https://adamsilver.io/blog/building-an-accessible-autocomplete-control/")

Adrian Roselli (same article)

* [https://adrianroselli.com/2020/03/stop-using-drop-down.html#Combo](https://adrianroselli.com/2020/03/stop-using-drop-down.html#Combo) and
* [https://adrianroselli.com/2020/03/stop-using-drop-down.html#Related](https://adrianroselli.com/2020/03/stop-using-drop-down.html#Combo)

which led me to…

Sarah Higley:

* [https://www.24a11y.com/2019/select-your-poison-part-2/#select-poison-recommendations](https://www.24a11y.com/2019/select-your-poison-part-2/#select-poison-recommendations "https://www.24a11y.com/2019/select-your-poison-part-2/#select-poison-recommendations") (see the _Roll your own_ section at bottom)
* [https://codepen.io/smhigley/pen/gObMVzv](https://codepen.io/smhigley/pen/gObMVzv)