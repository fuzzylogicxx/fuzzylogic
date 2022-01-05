---
date: 2022-01-05T19:00:37Z
title: 'Disclosure with CSS rather than JavaScript: dos and don’ts'
description: Is it ever OK to use an “HTML and CSS only” solution for disclosure widgets?
tags:
- entry
- disclosure
- javascript
- a11y
- css
- html
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: true

---

My understanding of creating accessible DIY disclosure widgets is that essentially you combine i) a `<button>` on which you toggle `aria-expanded`; immediately followed in the source order by ii) a content element (perhaps a `<div>`) on which you toggle the `hidden` attribute or CSS `display` property. This pattern is by necessity JavaScript-powered because we need a click event handler within which we toggle attributes/properties. However for many years people have also triggered show/hide experiences using checkboxes and radio buttons, and some go further to also skip the ARIA and JavaScript and handle the effect with CSS alone. This can be confusing so in this post I want to clarify what’s OK and what’s not.

## Scenario #1: conditionally revealed form fields

Scenario: radio or checkbox to show another form field(s). [GOV.UK’s design system pattern](https://design-system.service.gov.uk/components/radios/) (see _Conditionally revealing a related question_) …and maybe also the github issue that shows Wordpress, RBS etc. [Adrian Roselli shows that we could do this with just HTML and CSS](https://adrianroselli.com/2021/12/under-engineered-dependency-questions.html) …but the radio button needs to be at the same level as the conditionally-shown `<div>`. In GOV.UK’s case the radio button and div are not at the same level, which might explain why they went for JS and aria-expanded.

### My thoughts

If you can get away with a flat HTML structure which allows you to  conditionally reveal form fields using HTML and CSS alone, with no JavaScript or ARIA required, then great! Do it. Removing JS and ARIA when you are providing the right stuff from HTML alone is an _improvement_. Just follow Adrian’s example.

However when you’re dealing with complex User Interface designs and responsive requirements, plus the likelihood that your wider system might employ BEM or similar that involves extra HTML layers, this might be pretty tricky in practice. If that’s the case, fall back on a more typical JavaScript-powered experience. 

## Scenario #2: checkbox hack

Scenario: checkbox hack for all manner of disclosure. 

[An Event Apart](https://aneventapart.com/) use it for their “hamburger” navigation menu ([which I’ve adapted into a pen for posterity](https://codepen.io/fuzzylogicx/pen/LYNxZKb)). In their case the label is at the same level as the checkbox, just like Adrian advocates, so it seems accessible. Clever CSS selectors are employed to do the rest. Smart!

## In practice

If you can have a flat structure where the radio button or checkbox

References:

* [When CSS isn’t enough](https://www.smashingmagazine.com/2021/06/css-javascript-requirements-accessible-components/) by Stephanie Eckles on Smashing Magazine 
* [https://adrianroselli.com/2021/06/using-css-to-enforce-accessibility.html](https://adrianroselli.com/2021/06/using-css-to-enforce-accessibility.html "https://adrianroselli.com/2021/06/using-css-to-enforce-accessibility.html")

Notes:

* Why `aria-expanded` works when the content element is directly adjacent to the trigger: so long as the section’s content follows the button in the source order, `aria-controls` isn't needed, which is a good thing because support is limited. The user will (immediately) encounter the expanded content as they move down the page. (adapted from [https://inclusive-components.design/collapsible-sections/](https://inclusive-components.design/collapsible-sections/ "https://inclusive-components.design/collapsible-sections/"))