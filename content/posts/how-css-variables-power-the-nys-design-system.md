---
title: How CSS Variables Power the NYS Design System
description: How the NYS Design System uses CSS variables and design tokens to enable consistent, scalable, and customizable UI development across New York State.
noteWithTitle: false
linkTarget: https://designsystem.ny.gov/about/updates/css-variables/
date: 2026-11-06T10:33
tags:
  - link
  - css
  - designsystems
---
> How the NYS Design System uses CSS variables and design tokens to enable consistent, scalable, and customizable UI development across New York State.

A useful insight into how one organisation handles design tokens via custom properties, including a number of advanced considerations.

<!-- excerpt -->

At work, we’ve been deep in preparation for full-scale rollout of design tokens rollout for well over a year. And we’re partway down the line because we’ve defined them (core and semantic tiers), fed them into [Style Dictionary](https://styledictionary.com/), and converted them to custom properties which we deliver to and serve in consuming applications. 

Where I think we still have a way to go is in properly appreciating that “using custom properties for design tokens” brings new opportunities and perhaps also risks.

The way we (at work) previously did “variables” for CSS was with [Sass variables](https://sass-lang.com/documentation/variables/). And if I’m honest we used those more as _constants_ rather than true variables. We’d set something once so we can then refer to that variable name throughout the CSS rather than rewriting the value repeatedly. We also tended to do it near the top of the CSS (the top of the [ITCSS](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528) triangle) in _settings_ files. But by contrast, in 2019 when we started using custom properties, we immediately saw them as a powerful means of providing CSS component APIs that support per-instance configuration by overriding properties with custom values. See the `space` property in [Every Layout’s _Stack_](https://every-layout.dev/layouts/stack/#the-generator) as an example. Different use case.

The NYS Design System talk about how they have primitive tokens and semantic tokens, which is normal. But what’s interesting is that they also have public and private tokens. It seems that they primarily use those at the level of their design system components, and as a means of allowing component-user developers to override safely within a structured system.

The approach seems to be that they’ll use custom properties within their component implementation. Most of these are intended to be private/internal only. A few of them will also be made public. The naming convention they use to distinguish between private and public custom properties is to give private properties an underscore. Additionally, the public properties are documented, whereas the private properties are not. For example:

- `--_nys-button-background-color`: internal (used inside the component)
- `--nys-button-background-color`: public (documented and safe to override)

And they say that internally, private tokens often map to their semantic or primitive version, with this example:

<figure>

```
--_nys-button-background-color: var(--nys-button-background-color, var(--nys-color-theme));
```

</figure>

That clever code uses a public override if it exists, but otherwise falls back to the default colour.

Aside from their excellent explanatory blog post, you’ll also find succinct reference material about their token structure and how to use it in [Foundations: Tokens](https://designsystem.ny.gov/foundations/tokens/). And for an example of how they document public custom properties for their components, see [Button > Style overrides](https://designsystem.ny.gov/components/button/#style-overrides).

In summary, lots of smart thinking to crib from here.
