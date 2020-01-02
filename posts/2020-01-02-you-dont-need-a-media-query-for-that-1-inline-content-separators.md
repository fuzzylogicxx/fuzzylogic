---
date: "2020-01-02T15:55:39.494Z"
title: "You don't need a media query for that: #1 Inline content separators"
description: ""
tags: [link, responsive, css, mediaqueries, flexbox, overflow]
linkTarget: "https://medium.com/@mandy.michael/you-dont-need-a-media-query-for-that-1-inline-content-separators-a9c562a597a6"
---
> Create a more flexible component which allows the text to wrap based on the content rather than the viewport size.
---

Here, [Mandy Michael](http://batmandy.com/) explores similar territory to [Every Layout](https://every-layout.dev/) in suggesting that not all responsive pattern challenges require, or indeed are best served by, media queries. 

The example here is a pipe-separated text pair (I could imagine an _author_ and _publish date_ meta line) which Mandy wants to wrap â with pipe separator hidden â only when the content and container require it, rather than based on the less-relevant viewport width.

She uses a clever combination of `flex-wrap: wrap;`, generated content, padding, `transform` and `overflow-y: hidden` to achieve her goal. (via [@Mandy_Kerr](https://twitter.com/Mandy_Kerr))