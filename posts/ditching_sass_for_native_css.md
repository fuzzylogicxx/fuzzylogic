---
date: 2023-05-20T09:34:01Z
title: Ditching Sass for native CSS
description: 'I gather my thoughts regarding dropping Sass as a dependency'
tags:
- entry
- sass
- css
noteWithTitle: false
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: true

---
I gather my thoughts on the potentisl for dropping Sass as a dependency.
---

TL;DR
For personal sites. For large company sites…

Back in 2020 [I bookmarked Jeremy Keith’s article Sass and clamp](https://fuzzylogic.me/posts/2020-08-07-sass-and-clamp-on-adactio-journal/). 
Jeremy had found that, rather than making life easier, Sass was beginning to _get in the way_ in some cases (such as being able to use `clamp`). I’ve experienced this too.
It was a good summary of the comparative differences between Sass and CSS at that moment. He considered the key features he used Sass for and whether he could get by without them.

- variables, we now have CSS custom properties.
- mixins, in CSS we can do a lot with calc(). However he didn’t have a replacement for `darken()` and `lighten()` for colours.
- nesting of selectors, then (at time of writing) there’s no native CSS replacement for that. Jeremy preferred writing out selectors in full so didn’t use it. 
- splitting CSS across multiple files then combining them into a single file.

I noted that many of the CSS functions which provide similar effects to mixins, variables etc are currently only supported in the most modern, standards-compliant browsers. Sass can pre-process its variables and mixins into older, more broadly-supported CSS. So choosing the pure CSS, processor-free option within a progressive enhancement oriented approach might mean that your broadly-supported baseline is more basic than it would be by using Sass. That’s the sort of decision I could take fairly lightly for my personal website, but I could see it being less palatable for stakeholders working on larger sites.
For example, if your site needs to support IE11 and theming which includes custom colour schemes, unfortunately you don’t have the luxury of putting all your eggs in the native CSS custom properties basket.

-

More recently I wrote about [native CSS nesting](https://fuzzylogic.me/posts/native-css-nesting/). I’d like to use this, but support…

-

Chris Ferdinandi just posted Is it time to drop Sass?

Interesting points: 
Mixins:
for darken and lighten, use `hsl` because the l is for lighten so you can set the percentage accordingly.
This would of course mean doing some work on all your existing colours.

Nesting and splitting files: Chris recommended using ESBuild. 
Firstly, writing native CSS nesting and having that compiled to unnested. 
Secondly splitting and combining CSS the longstanding native way by using `@import`, but having ESBuild transform/bundle that into a single file so as to avoid the performance problems of @import.
So the approach is more post-processor than pre-processor.

Thoughts:
If you’re not already using ESBuild (for example you might load build-free JS as native modules, and might process Sass using an npm script), then you’d be dropping one dependency but adding another!
If you are already using ESBuild (or a build tool that can process CSS in the same way) then fine – you’re re-using what you already have.

One thing I don’t love about this kind of approach is that it often ships the heavy, older workaround to not only the older browsers that need it, but also the newer browsers that don’t. 
That feels wasteful. It’s less “progressive enhancement” and more “lowest common denominator”. 
Then again, nesting is such a low-level, wide-impact thing that – like `@layers` – it’s an all or nothing and not something you can easily treat as an enhancement. 
The ES build based approach lets you start using CSS nesting perhaps a year earlier than you might otherwise.

Mixins and Sass maps:
I think these are more ingrained than Chris has covered. 
Maps for compound structures (font-size and line-height pairs). 
Mixins for returning those. 
DRYness: mixins for conversions where the calculation is a single place rather than a calc repeated in 200 places.
