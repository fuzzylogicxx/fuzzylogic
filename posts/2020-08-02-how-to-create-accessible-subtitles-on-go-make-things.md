---
date: "2020-08-02T13:18:52.446Z"
title: "How to create accessible subtitles (on Go Make Things)"
description: ""
tags: [link, a11y]
linkTarget: "https://gomakethings.com/how-to-create-accessible-subtitles/"
---
Hereâs Chris Ferdinandi, introducing the ARIA <code>doc-subtitle</code> role.

He sets the scene by describing the popular design pattern where we have a title with a subtitle directly beneath, and that subtitle is styled to be larger than the body font, but smaller than the main heading. Developers have typically marked up the subtitle using either another heading element, or using a dedicated class. He suggests that the former is bad because headings in HTML are for conveying structure (with the inference that a subtitle is not structural),  while the latter is suboptimal because it provides sighted users with additional information that visually impaired users donât get.

The doc-subtitle role #
Back in March, the wonderful Steve Faulkner shared information about the doc-subtitle role.

A better approach is coming; the new `role=doc-subtitle` will convey to screen readers that the element is a subheading.

Iâm going to hold off using it for a little bit [until screen reader support is a little better](https://twitter.com/stevefaulkner/status/1286367526105026560), but generally it feels like a good move.