---
date: 2022-02-15T21:03:21Z
title: Minimum Viable Web Component (by Zach Leatherman)
description: Zach Leatherman illustrates the very simple boilerplate needed for a
  minimum viable web component
tags:
- link
- webcomponents
linkTarget: https://codepen.io/zachleat/pen/dyGjawM
draft: false

---
[Zach tweeted](https://twitter.com/zachleat/status/1282807913501859841) last year to share a codepen which illustrates the very simple boilerplate needed for a minimum viable web component. Note: his example is so simple that in this case the JavaScript isn’t actually needed for the custom element to work, however the provided JS is a starting point for when you do actually intend to add JS-driven features.
---

<figure>
  
``` html
<foo-component>Hello, world</foo-component>
```
  
``` css
foo-component {
  font-size: 4em;
}
```
  
``` js
customElements.define("foo-component", class extends HTMLElement {
  constructor() {
    super();
    // Add your custom functionality.
  }
});
```

</figure
