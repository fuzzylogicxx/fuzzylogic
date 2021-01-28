---
title: Do I still need to care about IE 11?
description: Do I need to care about IE 11?
date: 2021-01-27T22:31:13.407Z
mainImage.isAnchor: false
tags:
  - entry
  - internetexplorer
  - browsers
  - resilience
  - progressiveenhancement
draft: true
---
Microsoft are sunsetting IE 11 for xyz.

Great—IE is on the way out. This is good news. Less people will use it, instead upgrading to a newer browser and benefitting from a richer experience.

However it doesn’t change the fact that people now and for a few years into the future may still want to access my site on IE 11. They’ll do this for reasons I can’t anticipate.

To put it another way: IE 11 being sunset does not change the requirement for a site to be accessible (in the traditional sense of the word) in IE 11 assuming you care about those users.

Is it a number worth caring about? Could look at stats:
- Number of visitors using IE 11 is likely very small
- but note that for my personal website I don’t track people so I’ll never know.

My take on it is that it’ll be right to care about IE 11 users for a few years yet. Of course there’ll come a point where using it will be deemed ridiculous and it’ll be completely incompatible with any semi-modern set-up, but that’s a while away yet.

Right now, we kind of jump through hoops for IE 11. For example whenever we want to use CSS Grid, if we have to maintain some kind of visual parity in IE 11 we need to first write a flexbox baseline. It’d be great to be able to ignore IE 11! 

## What _can_ we do?

There might be a temptation to distill this to a single, simple question “Do I/we _support_ IE 11?”, however I think this question is too simple (a bit like the EU referendum question!) and a simple answer could lead to confusion at both the support and engineering levels down the line. 

Both the question and the strategy are a bit more nuanced. To me we need to ask: 

- should IE 11 remain on my supported browsers list?
- should I feel the need to work on queries and bugfix requests relating to IE 11?
- should I continue to provide a “non-broken” experience in IE 11?; and 
- does it need to offer the same experience as a modern browser?

Should IE 11 remain on my supported browsers list? No, take it off (after date X).

Should I feel the need to address queries relating to IE 11? No (after date X). When Microsoft stop supporting the browser it can no longer be considered reliable, predictable or secure. Those are solid reasons for saying that I no longer support queries relating to that software. I’ll suggest that the user should change browser, if they can. I’ll point them to an official Microsoft page regarding their sunsetting of IE 11.

Should I continue to provide a “non-broken” experience in IE 11? Yes. 

Does it need to be the same experience as that of a modern browser? Absolutely, unequivically not. So long as it is non-blocking, non-broken-looking and offers some subset of functionality, that’s fine. It might be useful to show a message suggesting the user upgrades their browser, but whether they choose to or not is entirely up to them—it’s non-mandatory for using the site.

(that final point/strategy is key for getting the balance right between supporting old technology, while having the ability to use current technology, while not spending all your time plugging holes for old technology)

## Why should I bother about a MVE for IE 11?

It’s not because I specifically care about IE 11. To me, it should work in IE 7, IE 8 etc etc if need be. And that’s because there should always be a minimum viable experience that would work on any browser, combined with progressive enhancement that layers on modern features for browsers that support them. Why this approach? Reach (don’t block access when you don’t have to). Resilience (handle stress cases and the rest takes care of itself). Accessibility (people might use it with screen readers). Lastly—there’s no reason not to! If you want to use any brand new feature (now or in the future) in a responsible way you _always_ have to employ progressive enhancement—that’s not going to change even when IE 11 is a distant memory. So what difference does it make? IE 11 disappearing doesn’t really change the way I have worked or need to work.

Refs:
- https://www.hassellinclusion.com/blog/should-accessible-websites-still-support-ie11/
- which references https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies