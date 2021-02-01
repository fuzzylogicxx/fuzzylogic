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
TL;DR: yes, but with a Minimum Viable Experience. 
---

Microsoft are sunsetting IE 11 for xyz.

Great—IE is on the way out. This is good news. Less people will use it, with many feeling individuals and companies feeling the time is right to upgrade to a newer browser. They will then also benefit from a richer experience.

However it doesn’t change the fact that people now and for a few years into the future may still want to access “my site” on IE 11. They’ll do this for reasons I can’t anticipate.

To put it another way: IE 11 being sunset does not change the requirement for a site to be available in IE 11 assuming you care about those users.

Is it a number worth caring about? You could look at stats for some guidance. You’ll likely find that the number of visitors using IE 11 is very small. In the case of my personal website I’ll never know, since I gave up tracking people using analytics a while ago due to the unwanted side-effects of the practice.

My take on it is that it’ll still be appropriate to care about IE 11 users for a few years yet. Of course there’ll come a point where using that browser will be deemed ridiculous (like using IE 6 is now) and it’ll be completely incompatible with any semi-modern set-up… but for IE 11 that’s a while away yet.

The thing is, right now, we jump through a lot of hoops for IE 11. For example if we want to use CSS Grid and want to maintain some kind of visual parity in IE 11 then we need to first write a flexbox baseline.

Surely, given Microsoft’s announcement, we must be able to throwing off _some_ of these shackles?

## What _can_ we do?

There’s a temptation to distill this to a single question “Do we _support_ IE 11?”, however I think this question might be too simple and might not sufficiently equip support or engineering teams to know _exactly_ how to go proceed. 

Both the question and required strategy are in reality a little more nuanced. To me, we need to ask: 

- should IE 11 remain on my official “supported browsers” list?
- should I action customer queries and bug reports relating to IE 11?
- should I provide a “non-broken” experience in IE 11?; 
- does the IE 11 experience need to be the same as the experience on a modern browser?

## Should IE 11 remain on my supported browsers list?

No, take it off (after date X).

## Should I feel the need to address customer queries relating to IE 11?

No (after date X). 

When Microsoft stop supporting the browser it can no longer be considered reliable, predictable or secure. Those are solid reasons for saying that I no longer support queries relating to that software. I’ll suggest that the user should change to a modern browser, if they can. I’ll point them to an official Microsoft page regarding their sunsetting of IE 11.

Should I continue to provide a “non-broken” experience in IE 11?

Yes!

## Does it need to be the same experience as that of a modern browser?

No, absolutely, unequivically not!

So long as it is non-blocking, non-broken-looking and offers some subset of functionality, that’s fine. It might be useful to try to do some sort of feature query then show a message suggesting the user upgrades their browser from IE 11, but whether they choose to or not is entirely up to them. I don’t want to dictate.

This point about serving different experiences for old and new browsers is absolutely key. If you accept that it’s OK for the experiences to be different then that really helps in finding a balance between: 

1. being available to customers with old technology; while 
2. safeguarding your ability to stay current with modern technology; while
3. not needing to spend time fixing things relating to the old technology.

## Why should I bother about a Minimum Viable Experience for IE 11?

It’s not because I specifically care about IE 11. To me, it should work in IE 7, IE 8 etc etc if need be. And that’s because there should always be a minimum viable experience that would work on any browser, combined with progressive enhancement that layers on modern features for browsers that support them. 

Why this approach? 

- Wider Reach (don’t block access when you don’t have to); 
- Resilience: if you handle the stress cases, the other cases are taken care of too;
- Accessibility: people might use IE 11 with screen readers.

Lastly—there’s no reason not to! If you want to use any brand new feature (now or in the future) in a responsible way you _always_ have to employ progressive enhancement—that’s not going to change even when IE 11 is a distant memory. So what difference does it make? IE 11 disappearing doesn’t really change the way I need to work.

Refs:
- https://www.hassellinclusion.com/blog/should-accessible-websites-still-support-ie11/
- https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies
