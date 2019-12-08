---
title: Using CSS Custom Properties to streamline animation
description: Here’s how to use CSS “variables” in your transforms so you don't need to rewrite the whole transform rule in order to transition a single property
date: 2019-12-07 13:49:00
tags:
  - entry
  - development
  - css
  - transform
---
Thanks to [a great tip from Lucas Hugdahl on Twitter](https://twitter.com/LucasHugdahl/status/1190438217482264576), here’s how to use CSS custom properties (variables) in your transforms so you don't need to rewrite the whole `transform` rule in order to `transition` (animate) a single property.
---

Let’s take the simple example of a button that we want to increase in size when hovered.

By using a custom property for the `scale` value, We can keep things <abbr title="Don’t Repeat Yourself">DRY</abbr>er in our `:hover` rule by only updating that variable rather than rewriting the entire `transform` rule.

The button HTML: 

``` html
<button>Hover over me</button>
```

CSS:

``` css
button {
  transition: transform .5s ease-in-out;
  transform: translateX(-50%) translateY(-50%) scale(var(--scale, 1));
}

button:hover {
  --scale: 2;
}
```

[Check out my full demo on Codepen](https://codepen.io/fuzzylogicx/pen/PowPRwK).
