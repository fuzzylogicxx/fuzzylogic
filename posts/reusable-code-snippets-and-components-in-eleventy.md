---
date: 2021-08-03T15:04:22Z
title: Reusable code snippets and components in Eleventy
description: Some cunning ways to use Nunjucks and 11ty shortcodes for reusable blocks
tags:
- include
- shortcode
- macro
- components
- designsystems
- 11ty
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
There are (at least) three cunning ways in Eleventy to get “reusable snippet” or “reusable component” functionality.
---

1. Nunjucks’s `include`:  Great for just including a common, static element in your template, say a `header` or `footer` partial. (Note that while you _can_ `set` a variable just before your `include` line to make that variable available to the included partial, it’s not really “passing in” and scoping the variable like a parameter, so it’s best to reserve `include` for simple stuff.)
2. Nunjucks’s `macro`:  Takes things up a notch by supporting passing in parameters which are then locally scoped. You could use this to create a simple component. See Trys Mudford’s article [Encapsulated 11ty Components](https://www.trysmudford.com/blog/encapsulated-11ty-components/).
3. 11ty _Named Shortcodes_: The beauty of these, to my eyes, is that unlike `macro` you can also pass in a `block` of content (rather than arguments alone). This would be handy for any component or layout that might need to take a block of content (such as a \[Stack\]([https://every-layout.dev/layouts/stack/](https://every-layout.dev/layouts/stack/ "https://every-layout.dev/layouts/stack/")), off the top of my head). You can also get funkier by including `npm` packages and using `async` functions etc. See 11ty docs on [paired shortcodes](https://www.11ty.dev/docs/shortcodes/#paired-shortcodes) for more details.

Hat tip to Jérome Coupé who [recently tweeted on this topic](https://twitter.com/jeromecoupe/status/1419726991994068994) and prompted me to gather my thoughts too.