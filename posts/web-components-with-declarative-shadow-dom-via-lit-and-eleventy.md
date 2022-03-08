---
date: 2022-03-08T11:02:35Z
title: Web Components with Declarative Shadow DOM via Lit and Eleventy
description: Here’s a new development in the Web Components story, and one that may
  have positive implications for resilience, performance and progressive enhancement.
tags:
- entry
- javascript
- lit
- chriscoyier
- bradfrost
- declarative
- shadowdom
- webcomponents
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
Here’s a new development in the Web Components story, and one that may have positive implications for resilience, performance and progressive enhancement.
---

[Declarative Shadow DOM](https://web.dev/declarative-shadow-dom/) is a new way to implement and use Shadow DOM directly in HTML rather than by constructing a shadow root in JavaScript.

But some people including Chris Coyier and Brad Frost) reckon that writing that looks horrible. [Brad said](https://bradfrost.com/blog/link/eleventy-lit/):

> Declarative Shadow DOM always looked gross to me and I felt it almost defeats the purpose of web components.

And [Chris added](https://css-tricks.com/newsletter/290-designing-context-menus-css-presentations-and-complaining-about-web-browsers/):

> the server-side rendering story for Web Components, Declarative Shadow DOM, doesn’t feel very nice to me if you have to do it manually.

However Lit, a library which makes working with Web Components easier, are now [providing ways to make this easier when Lit is used with Eleventy](https://lit.dev/blog/2022-02-07-eleventy/).

[Brad likes this:](https://bradfrost.com/blog/link/eleventy-lit/)

> With tools like this (especially this [@lit-labs/ssr](https://github.com/lit/lit/tree/main/packages/labs/ssr) project), we can have our cake and eat it too: use web components in a dev-friendly way, and then have the machines do the heavy lifting to convert that into a grosser-yet-progressive-enhancement-enabled syntax that ships to the user.

[As does Chris:](https://css-tricks.com/newsletter/290-designing-context-menus-css-presentations-and-complaining-about-web-browsers/)

> using JavaScript frameworks in an entirely-client-side rendered way isn’t nearly as good for anything (users, SEO, performance, accessibility, etc) as server-side rendering (the effects of hydration are still debatable, but I view as largely worth it) … \[but\] the server-side rendering story for Web Components, Declarative Shadow DOM, doesn’t feel very nice to me if you have to do it manually. So… don’t do it manually! Let Eleventy do it!

As an additional footnote, perhaps we can make frameworks other than Eleventy (such as Rails) create server-rendered custom elements with Declarative Shadow DOM in a similar way. One to explore.