---
date: "2021-05-24T10:17:38.384Z"
title: "Shifting left: how introducing accessibility earlier helps the BBC’s design system (by Sophie Beaumont)"
description: "Absolute gold from the BBC regarding accessibility, bloated components, and purpose versus appearance."
tags: [link, designsystems, accessibility]
linkTarget: "https://medium.com/bbc-design-engineering/shifting-left-how-introducing-accessibility-earlier-helps-the-bbcs-design-system-716ec5cfbcd8"
---
Absolute gold here regarding accessibility, bloated components, and purpose versus appearance.

> It’s easy for a component to become bloated and its purpose increasingly ambiguous.

---

The article also makes a fundamental point.

When you need a new UI element, just because an existing component _looks similar_ does not mean it’s appropriate. It’s tempting to think that way—especially when you prioritise reusability—however on the web the way something _looks_ is only part of the story.

A well-built component that was made to handle whatever is thrown at it will convey meaning and purpose at a lower-level than the visual (CSS) level, so that it is understandable in both non-visual and visual environments.

That’s why sometimes the existing component is not a good fit because the purpose of the new thing, and the user’s intent when using it, are different to that of the existing thing. And bloating the existing component to change or muddy its purpose is bad for maintainability and reusability.

I loved this nugget on shifting left during design:

> One of the things I’ve really pushed for in the most recent features is UX accessibility documentation during the design phase. What does that mean? Well, it means that when we are designing a new feature, we request that our UX designers and architects chat with our developers early and draft a basic semantic HTML structure and any specific accessibility behaviours. Think landmarks, headings, buttons, links, and careful focus management, to name a small selection.

I did this recently when working on a _Data Table_ component with [Zita](https://twitter.com/zitafreeburn). We found that early discovery of user intent allied to coding early semantic markup prototypes really informed our understanding of constraints, opportunities and architecture for the remainder of the process.

Additionally, this is great advice for comparing and choosing between components:

> Focus on what components achieve rather than their appearance

To me this also highlights one of the key benefits of modern [micro-layouts](https://every-layout.dev/). Separate the content (and purpose) from the layout…then you get maximum reusability from those common, _workhorse_ layouts because they are meaning-agnostic.
