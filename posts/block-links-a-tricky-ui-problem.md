---
date: "2020-03-12T09:18:02"
title: "Block Links: A tricky UI Problem"
description: "A problem to solve or just a bad idea?"
tags: [development, design, links, buttons, a11y]
---
You have a “card” component which includes some text content, an image, and a link or button, and it’s working great. But then comes a design or UX requirement that the _full card_ (not just the button or link) should be clickable. This is where things get complicated.
---

I’ve been thinking about this challenge a lot recently and so, it seems, have a lot of others.

## TL;DR

I’ve just implemented a tailored version of Heydon Pickering’s _Redundant Click Trick_ on a component at work, because I felt like it’s the best approach, or perhaps more accurately the lesser of three evils. I’m going to monitor how that performs, but I’ve also started politely making the case to others on the team that – like Chris Coyier argues – [maybe full-card clickable regions are a bad idea](https://css-tricks.com/block-links-are-a-pain-and-maybe-just-a-bad-idea/).

## The Background

Here’s the thing – since the dawn of HTML5 we’ve been able to wrap the inline anchor (`<a>`) element around block-level content such as headings, paragraphs, and `<div>`, so isn’t it as easy as that? 

Well, as with many HTML challenges, just because you _can_ do something doesn’t mean you should. I always had a nagging doubt about stuffing all that disparate content inside a single anchor, and Adrian Roselli has recently confirmed that for screen reader users this approach is harmful.

> Perhaps the worst thing you can do for a block link is to wrap everything in the `<a href>`… for a screen reader user the entire string is read when tabbing through controls… without declaring (the image) as an image… taking about 25 seconds to read before announcing it as a link.

So if you care about the user experience for those people, this feels like a no-no. 

Here are some interesting articles on the subject:

Adrian Roselli:
[Block Links, Cards, Clickable Regions etc](https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html)

Heydon Pickering (in _Inclusive Components_):
[Cards](https://inclusive-components.design/cards/)

Chris Coyier:
[Block Links are a pain and maybe just a bad idea](https://css-tricks.com/block-links-are-a-pain-and-maybe-just-a-bad-idea/)
