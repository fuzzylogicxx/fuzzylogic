---
date: 2022-06-06T07:50:59Z
title: Getting Started With CSS Cascade Layers, by Stephanie Eckles
description: An interesting look into the problems CSS cascade layers could solve,
  and whether or not they’re ready to use
tags:
- link
- organisation
- cascade
- specificity
- css
noteWithTitle: false
linkTarget: https://www.smashingmagazine.com/2022/01/introduction-css-cascade-layers/
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
Yesterday I read [Eric Meyer discussing CSS Cascade Layers](https://aneventapart.com/news/post/looking-ahead-june-2022) and saying that its transition from first public working draft to shipping as a full public release in every major desktop and mobile browser had happened so fast it made his head spin. Amazing stuff and a real indicator of the turbo-boosted pace at which modern CSS is now moving. 

It also made me want to properly read up on Cascade Layers, because I knew a bit of the theory but wanted to consider using it in practice. I’m no great fan of “cascade-taming” CSS frameworks like BEM and SUIT (although I acknowledge why we have them) so I’m interested to know if Cascade Layers can replace them. Stephanie Eckles’ article is an excellent primer.
---

I liked the idea of a specifying a stack like this:

<figure>
  
``` css
@layer reset, base, theme, components, utilities;
```
  
</figure>

You can then write styles into any of those layers at _any point_ in a stylesheet, safe in the knowledge that the original stack definition sets the order of priority rather than the sequence in which we wrote specific styles.

Stephanie also addresses the question of whether we should write every _component_ as a layer, which is something I’ve been considering. She advises that _you could_… but it’s probably not going to achieve the scoping effect that you want.

> layers are not intended to solve scoping or encapsulation of styles. For that, keep an eye on another spec also being authored by Miriam Suzanne for actual [native CSS scoping](https://css.oddbird.net/scope/explainer/).

Lastly, Stephanie tackles how ready Cascade Layers are to use right now. At the time she wrote the article – January 2022 – the feature wasn’t widely supported, so wasn’t an option. Additionally Cascade Layers can’t really be used as a progressive enhancement because its nature is so all-encompassing and because testing for feature support using `@supports` isn’t an option.

_However_ like Eric Meyer mentions, a few months is a long time in CSS support! And as I write in June 2022 the browser support picture is currently [looking quite healthy](https://caniuse.com/?search=cascade%20layers). However given that the first browsers to add support were only released a few months ago in February or March of this year, I think we might need to wait a bit longer (maybe a year?) to use this on larger, higher-traffic sites. 

Nothing to stop us experimenting on our smaller and intranet-based sites, though!
