---
date: 2022-01-05T19:00:37.000+00:00
title: 'Disclosure widgets with and without JavaScript and ARIA: dos and don’ts'
description: Is it ever OK to use an “HTML and CSS only” solution for disclosure widgets?
tags:
- entry
- disclosure
- javascript
- a11y
- css
- html
- howto
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
My understanding of creating accessible DIY disclosure widgets is that essentially you combine i) a `<button>` on which you toggle `aria-expanded`; immediately followed in the source order with ii) an element for the content on which you toggle the `hidden` attribute or CSS `display` property. This pattern is by necessity JavaScript-reliant because we need a click event handler, and within that to toggle attributes/properties. However for many years people have also triggered show/hide experiences using checkboxes and radio buttons, and some go further by also skipping the ARIA and JavaScript, handling the effect with CSS alone. This makes knowing the right thing to do a bit confusing so in this post I want to clarify what’s OK and what’s not.

## Scenario #1: conditionally revealed form fields

Scenario: radio or checkbox to show another form field(s). [GOV.UK’s design system pattern](https://design-system.service.gov.uk/components/radios/) (see _Conditionally revealing a related question_) …and maybe also the github issue that shows Wordpress, RBS etc. [Adrian Roselli shows that we could do this with just HTML and CSS](https://adrianroselli.com/2021/12/under-engineered-dependency-questions.html) …but the radio button needs to be at the same level as the conditionally-shown `<div>`. In GOV.UK’s case the radio button and div are not at the same level, which might explain why they went for JS and aria-expanded.

### My thoughts: do it if you can!

If you can get away with a flat HTML structure which allows you to  conditionally reveal form fields using HTML and CSS alone, with no JavaScript or ARIA required, then great! Do it. Providing the right stuff with HTML alone and removing the need for JS and ARIA is an _improvement_. Just follow Adrian’s example.

However when you’re dealing with complex User Interface designs and responsive requirements, plus the likelihood that your wider system might employ BEM or similar that involves extra HTML layers, this might be pretty tricky in practice. If your HTML isn’t lean enough, you need to fall back on a more typical JavaScript-powered experience.

## Scenario #2: checkbox hack

Scenario: checkbox hack for all manner of disclosure.

[An Event Apart](https://aneventapart.com/) use it for their “hamburger” navigation menu ([which I’ve adapted into a pen for posterity](https://codepen.io/fuzzylogicx/pen/LYNxZKb)). In their case the label is at the same level as the checkbox, just like Adrian advocates, so it seems accessible. Clever CSS selectors are employed to do the rest. Smart!

Although Stephanie Eckles talks about lots of UI patterns where `:focus` and `:hover` as trigger with no `aria-expanded` are not sufficient, I’ve not found anywhere which specifically deals with navigation components, nor `:checked` as a trigger. Maybe it’s OK?!

Another creative use of checkboxes and radio buttons is for toggle buttons [https://kittygiraudel.com/2021/04/05/an-accessible-toggle/](https://kittygiraudel.com/2021/04/05/an-accessible-toggle/ "https://kittygiraudel.com/2021/04/05/an-accessible-toggle/")

### My thoughts: maybe avoid checkbox hacking for disclosure

Personally I’m inclined to be pretty cautious about this approach. In particular I’m not sure I love the semantics or maintainability of using labels and inputs in a “clever” way rather than using a `<button>`. [As CSS-Tricks say about the checkbox hack](https://css-tricks.com/the-checkbox-hack/): 

> Some of this stuff crosses the line of what you “should” do with CSS and introduces some questionable semantics. It’s still very fun to play with and cool that it’s possible, but in general, functional behavior should be controlled by JavaScript.

## References:

* [When CSS isn’t enough](https://www.smashingmagazine.com/2021/06/css-javascript-requirements-accessible-components/) by Stephanie Eckles on Smashing Magazine
* [https://adrianroselli.com/2021/06/using-css-to-enforce-accessibility.html](https://adrianroselli.com/2021/06/using-css-to-enforce-accessibility.html "https://adrianroselli.com/2021/06/using-css-to-enforce-accessibility.html")

Notes:

* Why `aria-expanded` works when the content element is directly adjacent to the trigger: so long as the section’s content follows the button in the source order, `aria-controls` isn't needed, which is a good thing because support is limited. The user will (immediately) encounter the expanded content as they move down the page. (adapted from [https://inclusive-components.design/collapsible-sections/](https://inclusive-components.design/collapsible-sections/ "https://inclusive-components.design/collapsible-sections/"))