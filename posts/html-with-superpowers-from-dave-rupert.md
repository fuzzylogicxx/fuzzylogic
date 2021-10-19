---
date: 2021-10-19T14:50:51Z
title: HTML with Superpowers (from Dave Rupert)
description: A new presentation on Web Components from Dave Rupert of the Shop Talk
  show
tags:
- css
- presentation
- talk
- html
- javascript
- webcomponents
noteWithTitle: false
linkTarget: https://daverupert.com/2021/10/html-with-superpowers/
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
Here’s a new presentation on Web Components from Dave Rupert (of the [Shop Talk](https://shoptalkshow.com/) show).
---

It starts off with the basics but goes on to mention how WC’s are

* supported by all major browsers,
* reaching maturity,
* work natively without build tooling, and
* are perfectly suited to a layered, progressively-enhanced approach.

I really like his _Tabs_ example where he explains how you can create an instance by providing a baseline of simple, semantic, resilient HTML:

<figure>
  ``` html
    <generic-tabs>
      <h2>About</h2>
      <div>
        <p>About content goes here. Lorem ipsum dolor sit amet…</p>
      </div>
    
      <h2>Contact</h2>
      <div>
        <p>Contact content goes here. Lorem ipsum dolor sit amet…</p>
      </div> 
    </generic-tabs>
  ```
</figure>

…which the Web Component auto-converts into its javascript-dependent _Tabs_ template…

<figure>
  ``` html
    <generic-tabs label="people">
      <button slot="tab">About</button>
      <button slot="tab">Contact</button>
    
      <div slot="panel">
        <p>About content goes here. Lorem ipsum dolor sit amet…</p>
      </div>
    
      <div slot="panel">
        <p>Contact content goes here. Lorem ipsum dolor sit amet…</p>
      </div>
    </generic-tabs>
  ```
</figure>

…then the component’s JS handles all the [complex interactivity and accessibility requirements of Tabs](https://github.com/thepassle/generic-components/blob/master/generic-tabs/GenericTabs.js#L98) under the hood.

I think if I were implementing something like Inclusive Components’ [Tabs component](https://inclusive-components.design/tabbed-interfaces/) these days I’d give a Web Component based approach serious consideration.