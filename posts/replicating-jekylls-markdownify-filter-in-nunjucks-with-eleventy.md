---
title: Replicating Jekyll’s markdownify filter in Nunjucks with Eleventy
description: Convert a Markdown-formatted string into HTML in the Nunjucks templating language
tags:
- link
- web
- development
- 11ty
- nunjucks
- markdown
linkTarget: https://edjohnsonwilliams.co.uk/2019/05/04/replicating-jekyll-s-markdownify-filter-in-nunjucks-with-eleventy/
---
Here, [Ed](https://edjohnsonwilliams.co.uk/) provides some handy code to convert a Markdown-formatted string into HTML in Nunjucks via an Eleventy shortcode.
---

This performs the same role as the [_markdownify_ filter in Jekyll](https://jekyllrb.com/docs/liquid/filters/).

I’m now using it on this site in listings, using the shortcode to convert blog entry _excerpts_ written in markdown (which might contain code or italics, etc) into the target HTML.
