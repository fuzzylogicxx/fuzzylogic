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
Whether I’m thinking about inclusive hiding, hamburger menus or web components one UI pattern I keep revisiting is the _disclosure widget_. Perhaps it’s because you can use this small pattern to bring together so many other wider aspects of good web development. So for future reference, here’s a braindump of my knowledge and resources on the subject.
---

A disclosure widget is for collapsing and expanding something. You might alternately describe that as hiding and showing something. The reason we collapse content is to save space. The thinking goes that users have a finite amount of screen estate (and attention) so we might want to reduce the space taken up by secondary content, or finer details, or repeated content so as to push the page’s key messages to the fore and save the user some scrolling. With a disclosure widget we collapse detailed content into a smaller snippet that acts as a button the user can activate to expand the full details (and collapse them again).

Adrian Roselli’s article [Disclosure Widgets](https://adrianroselli.com/2020/05/disclosure-widgets.html) is a great primer on the available native and custom ARIA options, how to implement them and where each might be appropriate. Adrian’s article helpfully offers that a disclosure widget (the custom ARIA flavour) can be used as a base in order to achieve some other common UI requirements so long as you’re aware there are extra considerations and handle those carefully. Examples include:

- link and disclosure widget navigation
- table with expando rows
- accordion
- hamburger navigation
- highly custom `select` alternatives when `listbox` is innapropriate because it needs to include items that do not have the `option` role
- a toggle-tip

Something Adrian addresses (and I’ve previously written about) is the question around [for which collapse/expand use cases we can safely use the _native_ `details` element](https://fuzzylogic.me/posts/does-the-html-details-element-solve-progressively-enhanced-disclosures/). There’s a lot to mention but since I’d prefer to present a simple heuristic let’s go meta here and use a `details`:

<details>
  <summary>Use <code>details</code> for basic narrative content and panels but otherwise use a DIY disclosure</summary>
    
  <p>It’s either a bad idea or at the very least “challenging” to use a native `details` for:</p>
    
  <ul>
    <li>a hamburger menu</li>
    <li>an accordion</li>
  </ul>
  
  <p>In terms of styling terms it’s tricky to use a `details` for:
    
  <ul>
    <li>a custom appearance</li>
    <li>animation</li>
  </ul>
  
  <p>The above styling issues are perhaps not insurmountable. It depends on what level of customisation you need.</p>
    
  <p>Note to self: add more detail and links to this section when I get the chance.</p>
</details>

I’ve also noticed that [Adrian has a handy pen combining code for numerous disclosure widget variations](https://codepen.io/aardrian/pen/dyowpJj?editors=0100).

Heydon Pickering’s [Collapsible sections](https://inclusive-components.design/collapsible-sections/) on Inclusive Components is excellent, and includes consideration of progressive enhancement and an excellent web component version. It’s also oriented toward _multiple_ adjacent sections (an accordion although it doesn’t use that term) and includes fantastic advice regarding: 

* appropriate markup including screen reader considerations
* how best to programmatically switch _state_ (such as open/closed) within a web component
* how to make that state accessible via an HTML attribute on the web component (e.g. `<toggle-section open=true>`)
* how that attribute is then accessible outside the component, for example to a button and script that collapses and expands all sections simultaneously

There’s my [DIY Disclosure widget](https://codepen.io/fuzzylogicx/pen/YzQjyoj) demo on Codepen. I first created it to use as an example in a talk on [Hiding elements on the web](https://fuzzylogic.me/posts/my-talk-hiding-elements-on-the-web-for-freeagent-s-tech-blog/), but since then its implementation has taken a few twists and turns. In its latest incarnation I’ve taken some inspiration from the way Manuel Matuzovic’s [navigation tutorial](https://fuzzylogic.me/posts/2022-09-12-building-the-main-navigation-for-a-website-on-webdev/) uses a `template` in the markup to prepare the “hamburger toggle” button. 

I’ve also been reflecting on how the `hidden` attribute’s boolean nature is ideal for a toggle button in theory – it’s semantic and therefore programattically conveys state – but how hiding with CSS can be more flexible, chiefly because `hidden` (like CSS’s `display`) is not animatible. If you hide with CSS, you could opt to use `visibility: hidden` (perhaps augmented with `position` so to avoid taking up space while hidden) which similarly hides from everyone in terms of accessibilty.

As it happens, [the first web component I created was a disclosure widget](https://fuzzylogic.me/posts/my-first-web-component-a-disclosure-widget/). It could definitely be improved by some tweaks and additions along the lines of Heydon Pickering’s web component mentioned above. I’ll try to do that soon.

## Troubleshooting

For some disclosure widget use cases (such as a custom link menu often called a _Dropdown_) there are a few events that typically should collapse the expanded widget. One is the escape key. Another is when the user moves focus outside the widget. One possible scenario is that the user might activate the trigger button, assess the expanded options and subsequently decide none are suitable and move elsewhere. The act of clicking/tapping elsewhere should collapse the widget. However there’s a challenge. In order for the widget to be able to fire `unfocus` so that an event listener can act upon that, it would have to be focused in the first place. And in Safari – unlike other browsers – [buttons do not automatically receive focus when activated](https://zellwk.com/blog/inconsistent-button-behavior/). (I think Firefox used to be the same but was updated.) The workaround is to set focus manually via `focus()` in your click event listener for the trigger button.
