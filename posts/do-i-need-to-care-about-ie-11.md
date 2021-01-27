---
title: Do I need to care about IE 11?
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
Stats
- Number of visitors using IE 11 is likely very small
- but note that for my personal website I don’t track people so I’ll never know.


There’s might be a temptation to distill this to a single, simple question “Do I/we _support_ IE 11?”, however I think this question is too simple (a bit like a referendum question!) and a simple answer could lead to confusion (at both the support and engineering levels) down the line. 

Both the question and the strategy need to be more nuanced. To me we need to ask: 

- “should it be “non-broken” in IE 11?”; 
- “does it need to offer the same experience as a modern browser?”; and 
- should IE 11 be on my supported browsers list?
- “should I feel the need to work on queries and bugfix requests relating to IE 11?”.

Should it “non-broken”? Yes. 

Does it need to offer the same experience as a modern browser? Absolutely, unequivically not. So long as it is non-blocking, non-broken-looking and offers some subset of functionality, that’s fine. It might be useful to show a message suggesting the user upgrades their browser, but whether they choose to or not is entirely up to them—it’s non-mandatory for using the site.

Should I feel the need to address queries relating to IE 11? No (after date X). When Microsoft stop supporting the browser it can no longer be considered reliable, predictable or secure. Those are solid reasons for saying that I no longer support queries relating to that software. I’ll suggest that the user should change browser, if they can. I’ll point them to an official Microsoft page regarding their sunsetting of IE 11.

## Why should I worry about making it work?

It’s not because I specifically care about IE 11. To me, it should work in IE 7, IE 8 etc etc if need be. And that’s because there should always be a minimum viable experience that would work on any browser, combined with progressive enhancement that layers on modern features for browsers that support them. Why this approach? Reach (don’t block access when you don’t have to). Resilience (handle stress cases and the rest takes care of itself). Accessibility (people might use it with screen readers). Lastly—there’s no reason not to! If you want to use any brand new feature (now or in the future) in a responsible way you _always_ have to employ progressive enhancement—that’s not going to change even when IE 11 is a distant memory. So what difference does it make? IE 11 disappearing doesn’t really change the way I have worked or need to work.

Refs:
- https://www.hassellinclusion.com/blog/should-accessible-websites-still-support-ie11/
- which references https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies