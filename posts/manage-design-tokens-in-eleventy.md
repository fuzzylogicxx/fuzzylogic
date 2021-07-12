---
date: 2021-07-12T20:59:35Z
title: Manage Design Tokens in Eleventy
description: Eleventy offers the ability to transform data, which is handy for creating
  and transforming design tokens
tags:
- designtokens
- designsystems
- development
- web
- 11ty
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
One interesting aspect of the [Duet Design System](https://www.duetds.com/) is that they use [Eleventy](https://www.11ty.dev/) to not only generate their reference website but also to generate their Design Tokens.
---

When I think about it, this makes sense. Eleventy is basically a sausage-machine; you put stuff in, tell it how you want it to transform that stuff, and you get something new out the other end. This isn’t just for markdown-to-HTML, but for a variety of formatA-to-formatB transformation needs… including, for example, using JSON to generate CSS.

Now this is definitely a more basic approach than using a design token tool like [StyleDictionary](https://amzn.github.io/style-dictionary/#/). StyleDictionary handles lots of low-level stuff that would otherwise be tricky to implement. So I’m not suggesting that this is a _better_ approach than using StyleDictionary. However it definitely feels pretty straightforward and low maintenance.

As Heydon Pickering explains, it also opens up the opportunity to [make the Design Tokens CMS-editable in Netlify CMS](https://heydonworks.com/article/design-tokens-in-eleventy/) without content editors needing to go near the code.

So you’d have a `tokens.json` file containing your design tokens, but it’d be within the same repo as your reference website. That’s probably not as good as having the tokens in a separate repo and making them available as a package, but of course a separate 11ty repo is an option too if you prefer.

For a smaller site at least, the “manage design tokens with 11ty” is a nice option, and I think I might give it a try on my personal website.