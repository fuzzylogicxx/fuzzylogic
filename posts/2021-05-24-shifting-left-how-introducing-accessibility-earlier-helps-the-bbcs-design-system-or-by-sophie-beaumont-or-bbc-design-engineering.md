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

When you need a new piece of UI, just because an existing component looks similar does not mean it is appropriate. It’s tempting, and reusability is a key goal, however on the web how something looks is only part of the story. 

A well-built component built to take whatever is thrown at it will have been constructed to convey meaning and purpose at a lower-level than the visual (CSS) level, and to provide that to both non-visual and visual environments.

That’s why sometimes the existing component is not a fit, because the meaning/purpose required for the new thing is different to that of the existing thing…and bloating the component to change its meaning is bad for maintainability and reusability.

This is great advice for comparing and choosing between components:

> Focus on what components achieve rather than their appearance

To me this also highlights one of the key benefits of modern [micro-layouts](https://every-layout.dev/). Separate the content (and purpose) from the layout…then you get maximum reusability because you have common presentations/layouts which are meaning-agnostic.
