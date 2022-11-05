---
date: 2022-11-05T10:25:28Z
title: Full disclosure
description: A disclosure widget is a bite-sized UI pattern that can be used as a
  window for looking at a whole host of other best practices
tags:
- entry
- javascript
- web
- development
- html
- a11y
- disclosure
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
Whether I’m thinking about inclusive hiding, hamburger menus or web components, one UI pattern I keep revisiting is the _disclosure widget_. Perhaps it’s because you can use this small pattern to consider so many wider aspects of good web development. So for future reference, here’s a braindump of my knowledge and resources on the subject.

A disclosure widget is for collapsing and expanding something. You might alternately describe that as hiding and showing something. The reason we collapse content relates to _content density_ – the idea being that we have a finite amount of screen estate so might want to reduce the space taken up by secondary content, or finer details, or repeated content so as to push the page’s key messages to the fore and save the user some scrolling. With a disclosure widget we collapse detailed content into a smaller snippet that the user can activate to expand (and collapse again) the full details.

Adrian Roselli’s article [Disclosure Widgets](https://adrianroselli.com/2020/05/disclosure-widgets.html) is a great primer on the available technical options and when each might be appropriate.

Something Adrian addresses (and I’ve previously blogged about) is the question around [for which collapse/expand use cases we can safely use the native details element](https://fuzzylogic.me/posts/does-the-html-details-element-solve-progressively-enhanced-disclosures/). I just want to present a Tl;DR heuristic here but since there’s also lots ot more to add let’s go meta and use a `details`!

<details>
  <summary>
    Use `details` for simple interface and styling requirements otherwise use a DIY disclosure</summary>
  <div>
    It’s either a bad idea or at the very least “challenging” to use a native `details` for:
    - a hamburger menu
    - an accordion
    - custom styling
    
    To do: add more detail and links to this section when I get the chance.
  </div>
</details>



Heydon Pickering’s [Collapsible sections](https://inclusive-components.design/collapsible-sections/) on Inclusive Components is excellent, and covers progressive enhancement and a web component version. It’s also oriented toward _multiple_ adjacent sections (an accordion although it doesn’t use that term) and includes fantastic advice regarding: 

* appropriate markup including screen reader considerations
* how best to programmatically switch _state_ (such as open/closed) within a web component
* how to make that state accessible via an HTML attribute on the web component (e.g. `<toggle-section open=true>`)
* how that attribute is then accessible outside the component, for example to a button and script that collapses and expands all sections simultaneously

There’s my [DIY Disclosure widget](https://codepen.io/fuzzylogicx/pen/YzQjyoj) demo on Codepen. I first created it to use as an example in a talk on [Hiding elements on the web](https://fuzzylogic.me/posts/my-talk-hiding-elements-on-the-web-for-freeagent-s-tech-blog/), but since then its implementation has taken a few twists and turns. In its latest incarnation I’ve taken some inspiration from the way Manuel Matuzovic’s [navigation tutorial](https://fuzzylogic.me/posts/2022-09-12-building-the-main-navigation-for-a-website-on-webdev/) uses a `template` in the markup to prepare the “hamburger toggle” button. I’ve also been reflecting on how the `hidden` attribute’s boolean nature is ideal for a toggle button in theory but how hiding with CSS is often more flexible.

As it happens, [the first web component I created was a disclosure widget](https://fuzzylogic.me/posts/my-first-web-component-a-disclosure-widget/). It could definitely be improved by some tweaks and additions along the lines of Heydon Pickering’s web component mentioned above. I’ll try to do that soon.