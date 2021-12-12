---
date: 2021-12-12T00:41:22Z
title: Front-end architecture for a new website (in 2021)
description: ''
tags:
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
draft: true

---
Some musings on how the front-end wind is blowing (to my mind at least) and how in practice I’d approach things on the next small-ish website that I code.

## I might take advantage of HTTP2

Concatenating modular CSS into a single file is great and one of the reasons people use Sass, but in the HTTP2 era it’s perhaps less necessary for performance, and it might be acceptable to go without Sass and simply include a number of modular CSS files in the `<head>`, for example: 

``` html
<link href="/css/base.css" rel="stylesheet">
<link href="/css/component_1.css" rel="stylesheet">
<link href="/css/component_2.css" rel="stylesheet">
<link href="/css/component_3.css" rel="stylesheet">
```

This isn’t something I’ve actually tried yet… but it‘s an option!

## I’ll use ES modules and classes

It’s great that JavaScript modules are natively supported in modern browsers. They allow me to remove dependencies and they perform well. They can also serve as a [mustard cut](https://fuzzylogic.me/posts/browser-support-heuristics/) that allows me to use other syntax and features such as  `async/await`, arrow functions, template literals, the spread operator etc with confidence and without transpilation or polyfilling.

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

In modal.js: 

``` js
export class Modal {
  init() {
    // modal functionality here
  }
}
```

## I’ll use custom properties

lorem

## I’ll create web components


## I’ll use BEM (probably)

lorem