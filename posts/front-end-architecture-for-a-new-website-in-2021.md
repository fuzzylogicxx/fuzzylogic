---
date: 2021-12-12T00:41:22.000+00:00
title: Front-end architecture for a new website (in 2021)
description: ''
tags:
- entry
- http2
- html
- css
- javascript
- modules
- sass
- webcomponents
- bem
- development
- web
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
Just taking a moment for some musings on which way the front-end wind is blowing (from my perspective at least) and how that might practically impact my approach on the next small-ish website that I code.
---

## I might lean into HTTP2

Breaking CSS into small modules then concatenating everything into a single file has traditionally been one of the key reasons for using Sass, but in the HTTP2 era where multiple requests are less of a performance issue it might be acceptable to simply include a number of modular CSS files in the `<head>`, as follows:

``` html
<link href="/css/base.css" rel="stylesheet">
<link href="/css/component_1.css" rel="stylesheet">
<link href="/css/component_2.css" rel="stylesheet">
<link href="/css/component_3.css" rel="stylesheet">
```

The same goes for browser-native JavaScript modules. 

This isn’t something I’ve tried yet and it’d feel like a pretty radical departure from the conventions of recent years… but it‘s an option!

## I’ll combine ES modules and classes

It’s great that JavaScript modules are natively supported in modern browsers. They allow me to remove build tools, work with web standards, and they perform well. They can also serve as a [mustard cut](https://fuzzylogic.me/posts/browser-support-heuristics/) that allows me to use other syntax and features such as  `async/await`, arrow functions, template literals, the spread operator etc with confidence and without transpilation or polyfilling.

In the `<head>`:

``` html
<script type="module" src="/js/main.js"></script>
```

In `main.js`

``` html
import { Modal } from '/components/modal.js';

const Modal = new Modal();
modal.init();
```

In `modal.js`

``` js
export class Modal {
  init() {
    // modal functionality here
  }
}
```

## I’ll create Web Components

I’ve done a lot of preparatory reading and learning about web components in the last year. I’ll admit that I’ve found the concepts (including Shadow DOM) occasionally tough to wrap my head around, and I’ve also found it confusing that everyone seems to implement web components in different ways. However Dave Rupert’s [HTML with Superpowers](https://fuzzylogic.me/posts/html-with-superpowers-from-dave-rupert/) presentation really helped make things click.

I’m now keen to create my own _custom elements_ for javascript-enhanced UI elements; to give LitElement a spin; to progressively enhance a Light DOM baseline into Shadow DOM fanciness; and to check out how well the lifecycle callbacks perform.

## I’ll go deeper with custom properties

I’ve been using custom properties for a few years now, but at first it was just as a native replacement for Sass variables, which isn’t really exploiting their full potential. However at work we’ve recently been using them as the special sauce powering component variations (`--gap`, `--mode` etc). 

In our server-rendered components we’ve been using inline `style` attributes to apply variations via those properties, and this brings the advantage of no longer needing to create a CSS class per variation (e.g. one for each value on a spacing scale), which in turn keeps code and specificity simpler. However as I start using web components, custom properties will prove really handy here too. They can not only be updated by JavaScript, but furthermore provide a bridge between the Light DOM and Shadow DOM to make styling custom elements easier. 

## I’ll use BEM, but loosely

Naming and structuring CSS can be hard, and is a topic which really divides opinion. Historically I liked to keep it simple using the cascade, element and contextual selectors, plus a handful of custom classes. I avoided “object-oriented” CSS methodologies because I found them verbose and, if I’m honest, slightly “anti-CSS”. However it’s fair to say that in larger applications and on projects with many developers, this approach lacked a degree of structure, modularisation and predictability, so I gravitated toward BEM.

BEM’s approach is a pretty sensible one and, compared to the likes of [SUIT](https://suitcss.github.io/), provides flexibility and good documentation. And while I’ve been keeping a watchful eye on new methodologies like [CUBE CSS](https://cube.fyi/) and can see that they’re choc-full of ideas, my feeling is that BEM remains the more robust choice.

It’s also important to me that BEM has the concept of a _mix_ because this allows you to place multiple block classes on the same element so as to (for example) apply an abstract layout in combination with a more implementation-specific component class.

```
<div class="l-stack c-news-feed">
```

Where I’ll happily deviate from BEM is to favour use of certain ARIA attributes as selectors (for example `[aria-current=page]` or `[aria-expanded=true]` because this _enforces_ good accessibility practice and helps create equivalence between the visual and non-visual experience. I’m also happy to use the universal selector (`*`) which is great for [owl selectors]() and I’m fine with adjacent sibling (and related) selectors.

Essentially I’m glad of the structure and maintainability that BEM provides but I don’t want a straitjacket that stops me from using my brain and applying CSS properly.
