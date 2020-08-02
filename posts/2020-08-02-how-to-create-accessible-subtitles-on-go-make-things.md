---
date: "2020-08-02T13:18:52.446Z"
title: "How to create accessible subtitles (on Go Make Things)"
description: "Chris Ferdinandi introducing the ARIA doc-subtitle role"
tags: [link, a11y]
linkTarget: "https://gomakethings.com/how-to-create-accessible-subtitles/"
---
Here’s Chris Ferdinandi, introducing the ARIA <code>doc-subtitle</code> role.

He sets the scene by describing the popular design pattern where we have a title with a subtitle directly underneath, and that subtitle is styled to be larger than the body font but smaller than the main heading. Developers have typically marked up the subtitle using either another heading element, or using a dedicated class. He suggests that the former is bad because headings in HTML are for conveying structure (with the inference that a subtitle is not structural) while the latter is suboptimal because it provides sighted users with additional information that visually impaired users don’t get.

A better approach is coming; the new `role=doc-subtitle` will convey to screen readers that the element is a subheading.

I’m going to hold off using it for a little bit [until screen reader support improves](https://twitter.com/stevefaulkner/status/1286367526105026560), but generally this feels like a good move.
