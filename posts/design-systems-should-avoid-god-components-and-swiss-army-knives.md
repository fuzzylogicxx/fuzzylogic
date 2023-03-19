---
date: 2023-03-17T13:44:20Z
title: Design Systems should avoid “God components” and Swiss Army Knives
description: Bloated components are problematic; laser-focused components are reusable
  and flexible
tags:
- scope
- components
- language
- naming
- designsystems
- development
- web
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
Something we often talk about in our Design System team is that components should not be like Swiss Army Knives. It’s better for them to be laser-focused because by limiting their scope to a single task they are more reusable, flexible, extensible.
---

Discussions often arise when we consider the flip-side – components which do too much, know too much, or care too much! When they cover too much ground or make assumptions about their context, things go wrong. Here are some examples.

## Card

In websites where many elements have a “rounded panel”-like appearance so as to pop off the background, you can run into problems. Because of the _somewhat_ Card-like appearance, people start to regard many semantically distinct things as “Cards” (rather than limiting the meaning of Card to [a more conventional definition](https://www.bbc.co.uk/gel/features/cards)). Here are some of the problems this can cause:

* If the name covers a million use cases, then how can you _describe_ it sensibly, or define its boundaries? 
* When do you stop piling on different things it can mean? How do you stop it growing? How do you avoid bloat?
* Ongoing naming/confusion issues: you’re setting yourself up for continued confusion and code disparity. If something is “semantically” a note, or a comment, or a message etc then you can expect that future staff are gonna describe it as that rather than a Card! They’ll likely (understandably) write code that feels appropriate too. The problem will continue. 

I appreciate that often we need pragmatic solutions, so if our designs have lots of similar-looking elements then there is still something we can do. If the repeated thing is more of a “shape” than a something with common-purpose, then just call it out as that! That could either be by name – for example Every Layout have a [_Box_ layout](https://every-layout.dev/layouts/box/) which could be a starting point – or by categorisation i.e. by moving the non-ideally named thing into a clearly demarcated _Utilities_ (or similar) category in your Design System.

## Flex

It seems that a number of Design Systems have a _Flex_ component. My feeling, though,  is that these represent an early reaction to the emergence of CSS’s Flexbox, rather than necessarily being sensible system-friendly or consumer-friendly components. CSS layout covers _a lot_ and I think breaking this down into different smaller tools (Stack, Inline, Grid etc) works better. 

## Button

I’ve talked before about [the “Everything is a button” mindset and how it’s harmful](https://fuzzylogic.me/posts/buttons-versus-links-differences-and-tips/). Buttons and links are fundamentally different HTML elements with totally different purposes, and bundling them together has various ill effects that I see on a regular basis.

## References

* [Shifting left: how introducing accessibility earlier helps the BBC’s design system (by Sophie Beaumont)](https://fuzzylogic.me/posts/2021-05-24-shifting-left-how-introducing-accessibility-earlier-helps-the-bbcs-design-system-or-by-sophie-beaumont-or-bbc-design-engineering/)
