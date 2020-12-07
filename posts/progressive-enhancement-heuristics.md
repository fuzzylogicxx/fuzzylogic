---
title: Progressive Enhancement Heuristics
description: In web development it’s useful when we can say “if the browser
  supports X, then we know it also supports Y”
date: 2020-12-07T20:33:37.159Z
mainImage.isAnchor: false
tags:
  - entry
  - progressiveenhancement
  - modules
  - javascript
  - css
  - customproperties
  - cssgrid
draft: false
---
In web development it’s useful when we can say “if the browser supports X, then we know it also supports Y”.
---

There was a small lightbulb moment at work earlier this year when we worked out that:

> if the user’s browser supports CSS Grid, then you know you it also supports custom properties. 

Knowing this means that if you wrap some CSS in an `@supports(display:grid) {` then you can also safely use custom properties within that block.

I love this rule of thumb! It saves you looking up [caniuse.com](https://caniuse.com/) for each feature and comparing the browser support. 

This weekend I did some unplanned rabbit-holing on the current state of (and best practices for using) ES modules in the browser, as-is and untranspiled. That revealed another interesting rule of thumb:

> any browser that supports `<script type="module">` also supports `let` and `const`, `async/await`, the spread operator, etc.

One implication of this is that if you currently build a large JavaScript bundle (due to being transpiled down to ES 3/5 and including lots of polyfills) and ship this to _all_ browsers including the modern ones… you could instead configure your bundler to generate _two_ bundles and do:

<figure>
``` html
// only one of these will be used. 
<script type="module" src="lean-and-modern.js"></script>
<script nomodule src="bulky-alternative-for-old-browsers.js"></script>
```
</figure>

I might make a little page or microsite for these rules of thumb / techniques. They’re pretty handy!