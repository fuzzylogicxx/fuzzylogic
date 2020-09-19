---
date: "2020-09-19T15:27:13.124Z"
title: "When there is no content between headings"
description: "Hidde de Vries explains that a heading should not be followed by another heading without content inbetween"
tags: [link, html, web, development, subtitle, heading, accessibility]
linkTarget: "https://hiddedevries.nl/en/blog/2020-09-05-when-there-is-no-content-between-headings"
---
> When you use a heading element, you set the expectation of content
---

I have always prided myself on using appropriate, semantic HTML, however itâs recently become clear to me that thereâs one thing I occasionally do wrongly. 
Sometimes I follow a pageâs title (usually an `h1` element) with a subtitle which is marked up as an `h2`. I considered this the right thing to do and my choice had nothing to do with aesthetics. 

However [a recent article on subtitles by Chris Ferdinandi](https://fuzzylogic.me/posts/2020-08-02-how-to-create-accessible-subtitles-on-go-make-things/) and now this article by Hidde have made me think again. 

HTML headings are essentially ânames for a section of contentâ. On screen readers they operate like a Table of Contents. 

Therefore I should only use a `hx` heading when it will be immediately followed by (non-heading) content â paragraphs and so on â otherwise I should choose a different element. I should probably mark up my subtitles as paragraphs.