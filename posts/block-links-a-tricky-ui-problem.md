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

> Perhaps the worst thing you can do for a block link is to wrap everything in the `<a href>`… for a screen reader user the entire string is read when tabbing through controls… taking about 25 seconds to read before announcing it as a link.

He adds that images nested in this way are not declared as they normally would be.

So if you care about the user experience for those people, this feels like a no-no. 

### Stretching the anchor with pseudo-content

An alternate approach that’s gained traction over the last couple of years involves leaving the anchor or button in its initial position _within_ the card (thereby avoiding the above mentioned accessibility problem) and using pseudo-content to stretch it to cover the entire card. This CSS-only trick involves setting the card to `position:relative` then giving the anchor (or button) `:after` pseudo-content and absolutely positioning that to the card’s four corners. This makes the whole card clickable like a button.

The problem with this approach is that any text in the card is no longer selectable. 

Some might say that this is OK. Personally I feel that it is a fundamental usability requirement that text on a web page be selectable. Not being able to do so calls to mind the bad old days before web fonts where we used images for headings, and I like to think we’ve evolved from those kind of practices. Also, I feel any statement by us developers and designers that “losing the ability to select text is acceptable” lacks validity because we are _biased_; happy to justify taking away something fundamental from our users, potentially confusing and frustrating them, in a blind desire to get a non-essential feature over the line.

If we’re still determined to make the full card clickable, there’s one further option. 

### The Redundant Click Trick

This technique, conceived by Heydon Pickering, uses JavaScript rather than CSS to make the card clickable.

Essentially we add an `EventListener` for a click on the Card and when one is detected, trigger a faux click on the actual anchor or button. 

One challenge inherent in this approach is that a user attempting to select text would trigger a link click, however we can again use JavaScript to detect the length of their press to infer whether they are selecting text or clicking.

The pros of this approach are that we avoid the screen reader problems and the inability to select text. 

The cons are that it requires a more complicated, JavaScript-based approach, and that the need for a “check how long the mouse has been pressed down” part isn’t ideal.

With this approach, if Analytics tracking is part of your mix I’d make sure to check that that works as expected across browsers and devices.

## Summing up

So there we go – three ways to achieve a “block link” or button. But given the compromises they involve, perhaps the question should be – is it worth it? And given the tools we currently have available, I lean towards “no”.

## References

[Block Links, Cards, Clickable Regions etc](https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html) by Adrian Roselli.

[Cards](https://inclusive-components.design/cards/) by Heydon Pickering (in _Inclusive Components_).

[Block Links are a pain and maybe just a bad idea](https://css-tricks.com/block-links-are-a-pain-and-maybe-just-a-bad-idea/) by Chris Coyier on CSS-Tricks.
