---
date: "2020-03-12T09:18:02"
title: "Block Links: A tricky UI Problem"
description: "A problem to solve or just a bad idea?"
tags: [development, design, links, buttons, a11y]
---
You have a “card” component which includes some text content, an image, and a link or button, and it’s working great. Then along comes a design or UX requirement that the _full card_ (not just the button or link) should be clickable. This is where things get complicated.
---

I’ve been thinking about this challenge a lot recently and so, it seems, have a lot of others.

## TL;DR

I recently implemented a tailored version of Heydon Pickering’s _Redundant Click Trick_ on a component at work, because I felt like it’s the best approach, or perhaps more accurately the lesser of three evils. I’m going to monitor how that performs, but I’ve also started politely making the case to others on the team that – like Chris Coyier argues – [maybe full-card clickable regions are a bad idea](https://css-tricks.com/block-links-are-a-pain-and-maybe-just-a-bad-idea/).

## The Background

Here’s the thing – since the dawn of HTML5 we’ve been able to wrap the inline anchor (`<a>`) element around block-level content such as headings, paragraphs, and `<div>`, so isn’t the solution as easy as just doing that?

### Stuffing everything inside the anchor

Well, as with many HTML challenges, just because you _can_ do something doesn’t mean you should. I always had a nagging doubt about stuffing all that disparate content inside a single anchor, and Adrian Roselli has recently confirmed that for screen reader users this approach is harmful.

> Perhaps the worst thing you can do for a block link is to wrap everything in the `<a href>`… for a screen reader user the entire string is read when tabbing through controls… without declaring (the image) as an image… taking about 25 seconds to read before announcing it as a link.

So if you care about the user experience for those people, this feels like a no-no. 

### Stretching the anchor with pseudo-content

An alternate approach that’s gained traction over the last couple of years involves leaving the anchor or button in its initial position _within_ the card (thereby avoiding the above mentioned accessibility problem) and using pseudo-content to stretch it to cover the entire card. This CSS-only trick involves setting the card to `position:relative` then giving the anchor (or button) `:after` pseudo-content and absolutely positioning that to the card’s four corners. This makes the whole card clickable like a button.

The problem with this approach is that any text in the card is no longer selectable. Some might say that this is OK. Personally I think that text being selectable on web pages is a fundamental usability requirement. Not being able to do so calls to mind the bad old days before web fonts where we used images for headings, and I like to think we’ve evolved from those kind of practices. Also, I feel that if we developers and designers state that “losing the ability to select text is acceptable” it loses validity because we are _biased_; happy to justify taking away something fundamental from our users, potentially confusing and frustrating them, in our desire to get a non-essential feature over the line.

## References

Here are some interesting articles on the subject:

Adrian Roselli:
[Block Links, Cards, Clickable Regions etc](https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html)

Heydon Pickering (in _Inclusive Components_):
[Cards](https://inclusive-components.design/cards/)

Chris Coyier:
[Block Links are a pain and maybe just a bad idea](https://css-tricks.com/block-links-are-a-pain-and-maybe-just-a-bad-idea/)
