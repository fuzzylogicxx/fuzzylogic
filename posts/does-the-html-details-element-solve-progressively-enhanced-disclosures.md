---
date: 2022-05-29T08:54:32Z
title: Does the HTML details element solve progressively-enhanced disclosures?
description: ''
tags:
- entry
- progressiveenhancement
- disclosure
- details
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
[Scott Jehl recently tweeted:](https://twitter.com/scottjehl/status/1524746181271863296)

> I love the details/summary HTML elements. So versatile. My favorite part is being able to show a collapsed state from the start without worrying about potential operability issues if JavaScript fails to run (since its behavior doesn't need it).

Scott goes on to describe how creating disclosure widgets (controls that hide and show stuff) with resilience in mind is so much more difficult when not using `<details>`, and can require complex progressive enhancement techniques. These involve making content available by default in case JavaScript fails, then hiding it when the disclosure widget JS loads successfully… ideally without a jarring flash of content in between.

Like Scott says, the `<details>` element is different because you can have the content collapsed (hidden) by default without worrying about JavaScript and workarounds. The hidden content can be toggled open natively. That‘s a real superpower… and also makes you wonder: how many different places and different ways can we use this super-element?