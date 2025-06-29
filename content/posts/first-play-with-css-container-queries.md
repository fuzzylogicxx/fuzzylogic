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
In responsive design we generally want a single component to get different styles in different contexts. Up until recently the prevailing method of context-awareness was to use a CSS media query to query the _viewport_ size. This wasn’t ideal. For example you might want an component to be styled differently when in a narrow context such as a sidebar (regardless of the device size), and viewport-based queries don’t help with that.

But everything has changed. We can now use CSS to query the size of any given container and [this feature is supported in all major browsers](https://caniuse.com/css-container-queries).

There’s a bit of new syntax to learn, so I recently had [my first play with container queries](https://codepen.io/fuzzylogicx/pen/xxaeVbQ?editors=1100) on codepen.

My pen is pretty trivial, but the goal was specifically to do the most minimal test that lets me test-drive the key syntax. It turns out that it’s quite straightforward.

Define an element as a container:

<figure>

``` css
.sidebar {
  container: ctr-sidebar / inline-size;
}
```

</figure>

Change the styles of another element (`.foo`) when it’s inside that container and the container’s inline-size (the logical property name for `width`) matches a given query:

<figure>

``` css
@container ctr-sidebar (max-width: 300px) {
  .foo {
    // context-specific styles go here 
  }
}
```

</figure>

Note that you could also omit the `ctr-sidebar` context in the above query, if you wanted the change to apply in _all_ defined containers.
