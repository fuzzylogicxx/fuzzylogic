---
date: 2021-10-19T14:50:51Z
title: HTML with Superpowers (from Dave Rupert)
description: A new presentation on Web Components from Dave Rupert of the Shop Talk
  show
tags:
- link
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
Here’s a great new presentation by Dave Rupert (of the [Shop Talk](https://shoptalkshow.com/) show) in which he makes a compelling case for adopting Web Components. Not only do they provide the same benefits of encapsulation and reusability as components in proprietary JavaScript frameworks, but they also bring the reliability and portability of web standards, work without build tools, are suited to progressive enhancement, and may pave the way for a better web. 
---

Dave begins by explaining that Web Components are based on not just a set of technologies but a set of _standards_, namely:

- Custom Elements (for example `<custom-alert>`)
- Shadow DOM
- ES Modules
- the HTML `<template>` element

Standards have the benefit that we can rely on them to endure and work into the future in comparison to proprietary technologies in JavaScript frameworks. That’s good news for people who like to avoid the burnout-inducing churn of learning and relearning abstractions. Of course the pace of technology change with web standards tends to be slower, however that’s arguably a price worth paying for cross-platform stability and accessibility.

Some of Web Components’ historical marketing problems are now behind them, since they are supported by all major browsers and reaching maturity. Furthermore, web components have two superpowers not found in other JavaScript component approaches: 

Firstly, the Shadow DOM (which is both powerful and frustrating). The Shadow DOM provides _encapsulation_ but furthermore in progressive enhancement terms it enables the final, _enhanced_ component output which serves as an upgrade from the baseline _Light DOM_ HTML we provided in our custom element instance. It can be a little tricky or confusing to style, however, although there are ways.

Secondly, you can use web components _standalone_, i.e. natively, without any frameworks, build tools, or package managers. All that’s required to use a “standalone” is to load the `<script type=module …>` element for it and then use the relevant custom element HTML on your page. This gets us closer to just writing HTML rather than wrestling with tools.

Dave highlights an education gap where developers focused on HTML, CSS, and Design Systems don’t tend to use Web Components. He suggests that this is likely as a result of most web component tutorials focusing on JavaScript APIs for JavaScript developers. However we can instead frame Web Component authoring as involving a layered approach that starts with HTML, adds some CSS, then _ends_ by applying JavaScript.

Web Components are perfectly suited to progressive enhancement. And that progressive enhancement might for example apply lots of complicated ARIA-related accessibility considerations. I really like the _Tabs_ example where one would create a Tabs instance by providing a baseline of semantic and resilient HTML that simply renders headings and paragraphs… 

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

…but the Web Component’s JavaScript would upgrade this into interactive tabs…

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

The idea is that the component’s JS would handle all the [complex interactivity and accessibility requirements of Tabs](https://github.com/thepassle/generic-components/blob/master/generic-tabs/GenericTabs.js#L98) under the hood. I think if I were implementing something like Inclusive Components’ [Tabs component](https://inclusive-components.design/tabbed-interfaces/) these days I’d seriously consider doing this as a Web Component.

Later, Dave discusses the JavaScript required to author a Custom Element. He advises that in order to avoid repeatedly writing the same lengthy, boilerplate code on each component we might use a lightweight library such as his favourite, [LitElement](https://lit-element.polymer-project.org/guide).

Lastly, Dave argues that by creating and using web components we are working with web standards rather than building for a proprietary library. We are creating compatible components which pave the cowpaths for these becoming future HTML standards (e.g. a `<tabs>` element!) And why is advancing the web important? Because an easier web lowers barriers: less complexity, less tooling and setup, less gatekeeping—a web for everyone.  
