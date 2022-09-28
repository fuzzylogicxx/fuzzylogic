---
date: 2022-09-28T14:13:39Z
title: Using the :has pseudo-class for real
description: While working on CSS for tables I found a use for the :has pseudo-class
  that lets me remove a class and the awkward logic behind it
tags:
- css
- has
- tables
- lean
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
By day I’m currently working on our Design System’s _Table_ component. In order to achieve a design spec where the table has no bottom-border I needed to set:

1. all cells in the final row of the `<tfoot>` to have no bottom-border; but also
2. if there is no `<tfoot>` then set all cells in the final row of the `<tbody>` to have no bottom-border.

Modern CSS’s support for writing selectors which traverse the DOM _up, down and sideways_ is pretty amazing here.
---

I’ve gone with:

    tfoot > :last-child td,
    tbody:not(:has(+ tfoot)) > :last-child td {
      border-bottom-width: 0;
    }

_(Some BEM stuff renamed for brevity but that’s the gist of it)_

In the past we’ve had to bloat the backend layer with complex and awkward logic that adds “convenience classes” like `.fe-Table-bodyLastRow` but [as Eric Meyer has been saying](https://shoptalkshow.com/520/#t=30:35) `:has()` in particular is going to remove the need for those convenience classes.

Hat-tip to Jhey Tompkins for [his excellent recent article on :has](https://fuzzylogic.me/posts/2022-08-08-has-the-family-selector-chrome-developers-blog/) which was a great help.