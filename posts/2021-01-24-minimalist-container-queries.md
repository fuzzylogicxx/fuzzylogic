---
date: "2020-10-24T21:05:05.034Z"
title: "Minimalist Container Queries"
description: "Scott Jehl’s experimental take on a container/element query aimed at letting us set responsive styles for our elements based on their immediate context rather than that of the viewport."
tags: [link, containerqueries, responsive, css, webcomponents, css, javascript, html]
linkTarget: "https://codepen.io/scottjehl/pen/NWrdRQv"
---
Scott Jehl’s experimental take on a container/element query aimed at letting us set responsive styles for our elements based on their immediate context rather than that of the viewport.

> I made a quick and minimal take on approximating Container/Element Queries using a web component and basic CSS selectors.
---

The idea is that for any given instance of the `<c-q>` custom element / web component you would define a scoped custom property which sets the pixel min-widths you’re interested in, like so:

<figure>
  
``` css
c-q {
  --breakpoints: "400 600 800";
  background: black;
}
```

</figure>

Zero to many of those numeric `min-width` values will appear in the element’s `data-min-width` HTML attribute based on which (if any) of them the element’s width is equal to or greater than. 

You can style the element based on their presence using the `~=` attribute selector, like this:

<figure>
  
``` css
c-q[data-min-width~="400"] { 
  background: green; 
}
c-q[data-min-width~="600"] {
  background: blue;
}
```

</figure>

See also [Scott’s tweet announcing this](https://twitter.com/scottjehl/status/1319724488339214336) which contains some interesting contributions including [Heydon’s watched-box](https://github.com/Heydon/watched-box).

All of the various JavaScript approaches/experiments are summarised in CSS-Tricks’s article [_Minimal Takes on Faking Container Queries_](https://css-tricks.com/minimal-takes-on-faking-container-queries/).

(via [@scottjehl](https://twitter.com/scottjehl))
