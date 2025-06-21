---
date: "2022-11-24T10:59:58.894Z"
title: "The anatomy of visually-hidden - TPGi"
description: "Lots of detail on the specific CSS involved in the industry-standard visually-hidden technique, and why"
tags: [link, a11y, hiding, css]
linkTarget: "https://www.tpgi.com/the-anatomy-of-visually-hidden/"
---
> This article is not about when or why you would use visually-hidden content. There’s a number of excellent articles that discuss these questions in detail, notably Scott O’Hara’s Inclusively Hidden. But most of them don’t go into much detail about the specific CSS involved — why do we use this particular pattern, with these specific properties? So today I’m going to dissect it, looking at each of the properties in turn, why it’s there, and why it isn’t something else.
---

Relevant to [How to hide elements on a web page](https://fuzzylogic.me/posts/how-to-hide-elements-for-different-browsing-contexts/).

I also liked this nugget:

> it’s often called `.sr-only` (screen reader only, but that’s not a good name, because visually-hidden content is not just for screen readers).
