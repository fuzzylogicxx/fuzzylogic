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
Here’s a new presentation on Web Components from Dave Rupert (of the [Shop Talk](https://shoptalkshow.com/) show).
---

Dave begins by explaining that Web Components are not only a set of technologies but a set of _standards_. And a benefit of them being standards is that we can rely on them to endure and work into the future in comparison to proprietary technologies in JavaScript frameworks. That’s good news for people who like to avoid the burnout-inducing churn of learning and relearning abstractions. Of course the pace of technology change with web standards tends to be slower, however again that’s often a side-effect of cross-platform reliability and accessibility.

Some of Web Components’ historical marketing problems are now behind them, since they are supported by all major browsers and reaching maturity. Furthermore, web components have two superpowers not found in other JavaScript component approaches: 

1. the Shadow DOM, which is both powerful and frustrating. 
2. you can use web components standalone, i.e. natively, without any frameworks, build tools, or package managers.

Dave highlights an education gap where developers focused on HTML, CSS, and Design Systems don’t tend to use Web Components. He suggests that this is likely as a result of most web component tutorials focusing on JavaScript APIs for JavaScript developers. 

We can instead frame Web Components as involving a layered approach starting with HTML, moving on to CSS, and _ending_ by applying JavaScript. They are perfectly suited to progressive enhancement.

And that progressive enhancement might for example apply lots of complicated ARIA-related accessibility considerations. I really like his _Tabs_ example where you create an instance by providing a baseline of simple, semantic, resilient HTML… 

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
