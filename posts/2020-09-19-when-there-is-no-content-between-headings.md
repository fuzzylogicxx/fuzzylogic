---
date: "2020-09-19T15:27:13.124Z"
title: "When there is no content between headings"
description: "Hidde de Vries explains that a heading should not be followed by another heading without content in between"
tags: [link, html, web, development, subtitle, heading, accessibility]
linkTarget: "https://hiddedevries.nl/en/blog/2020-09-05-when-there-is-no-content-between-headings"
---
> When you use a heading element, you set the expectation of content.
---

I have always prided myself on using appropriate, semantic HTML, however it’s recently become clear to me that there’s one thing I occasionally do wrongly. Sometimes I follow a page’s title (usually an `h1` element) with a subtitle which I mark up as an `h2`. I considered this the right element for the job and my choice had nothing to do with aesthetics. 

However [a recent article on subtitles by Chris Ferdinandi](https://fuzzylogic.me/posts/2020-08-02-how-to-create-accessible-subtitles-on-go-make-things/) and now this article by Hidde have made me reconsider. 

HTML headings are essentially ”names for content sections”. On screen readers they operate like a Table of Contents – the user can use them to navigate to content.

Therefore I now reckon I should only use a `hx` heading when it will be immediately followed by (non-heading) content – paragraphs and so on – otherwise I should choose a different element. 

I should probably mark up my subtitles as paragraphs.
