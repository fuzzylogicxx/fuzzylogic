---
date: 2022-07-27T07:14:19Z
title: Custom multi-checkbox and multi-radio controls
description: At work, we’ve had a design request to create some custom controls and
  here I consider our approach
tags:
- a11y
- affordance
- entry
- forms
- html
- css
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
Our Design System team has recently received “new component requests” for some custom filtering controls. These _look like_ custom-styled `<select>`s however their “options” appear more like checkboxes and radio buttons. I think the inspiration was [Carbon Design System’s Dropdown component](https://carbondesignsystem.com/components/dropdown/usage) and the idea is to bring consistency to filtering controls in forms. Although it’s not yet time to fully explore this and make a yay/nay decision on the request, I’ve been doing some initial thinking.
---

(Note: this post is kinda a journey and work-in-progress. I’ll return to complete it and tidy up. For now it serves as a handy log of my research.)

When this was first mooted without guide designs, I assumed we’d be making a custom select. Filament Group have previously shown how to style one of those, although that only affects the “trigger” part. CSS can’t yet style the options. That then led me to check in on the progress of [Open UI’s selectmenu element](https://css-tricks.com/the-selectmenu-element/) which _does_ support styling the options however it appears that it’s far from road-ready. 

However then I saw the designs and realised that while the outside looks like a select, the options look like a group of checkboxes or (kinda) like radio buttons, rather than typical `<select>` options. And of course the checkboxes and radio buttons themselves are custom-styled.

This led me to reading the following resources. 

* [Under-engineered multi-selects](https://adrianroselli.com/2022/05/under-engineered-multi-selects.html)
* [Under-engineered select menus](https://adrianroselli.com/2021/03/under-engineered-select-menus.html)
* [Under-engineered custom radio buttons and checkboxen](https://adrianroselli.com/2017/05/under-engineered-custom-radio-buttons-and-checkboxen.html)
* [Inclusively Hiding & Styling Checkboxes and Radio Buttons](https://www.sarasoueidan.com/blog/inclusively-hiding-and-styling-checkboxes-and-radio-buttons/#styling-the-svg-accessibly)

Léonie Watson’s post [Perceived affordances and the functionality mismatch](https://tink.uk/perceived-affordances-and-the-functionality-mismatch/) is also looming large in the back of my mind.