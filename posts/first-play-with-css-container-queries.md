---
date: 2023-04-10T19:42:17Z
title: First play with CSS Container Queries
description: The container query syntax is pretty straightforward
tags:
- note
- rwd
- responsive
- containerqueries
- css
noteWithTitle: true
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
We can now use CSS to query the size of any given container, rather than only the viewport, and [this feature is supported in all major browsers](https://caniuse.com/css-container-queries).

Here’s [my first play with container queries, on codepen](https://codepen.io/fuzzylogicx/pen/xxaeVbQ?editors=1100).

My codepen is pretty trivial but the goal was only to do the most minimal test that lets me understand the key syntax. It turns out that it’s quite straightforward.

Define an element as a container:

<figure>

    .sidebar {
      container: ctr-sidebar / inline-size;
    }

</figure>

Change the styles of another element (`.foo`) when it’s inside that container and the container’s inline-size (the logical property name for `width`) matches a given query:

<figure>

    @container ctr-sidebar (max-width: 300px) {
      .foo {
    	// context-specific styles go here 
      }
    }

</figure>

Note that you could also omit the `ctr-sidebar` context in the above query, if you wanted the change to apply in _all_ defined containers.