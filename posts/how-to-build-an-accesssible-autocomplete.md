---
date: 2022-10-30T13:03:26Z
title: How to build an accesssible autocomplete
description: Investigating which HTML materials and (if necessary) ARIA supplements
  are appropriate to ensure building something accessible and resilient
tags:
- entry
- forms
- aria
- html
- a11y
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
At work there are plans afoot to reconcile various differing _Autocomplete_ implementations into a single, reusable component. So far there’s been a written audit presenting all instances and how they differ in functional and technical respects. There’s also been design work to identify visual commonalities and avoid future inconsistencies. I’d now like to add another perspective: an investigation into which HTML materials and (if necessary) ARIA supplements are appropriate to ensure we build something accessible and resilient.
---

My experience is that to achieve the right result, HTML semantics and related concerns can’t just follow and bend to spec and visual design goals, but rather must _influence_ the setting of those goals.

I’ll flesh out my findings in due course, but for now here are the key resources I’ve identified and plan to dig deep into.   

[Adrian Roselli’s article Stop Using ‘Drop-down’](https://adrianroselli.com/2020/03/stop-using-drop-down.html). To summarise the options of interest:

* _ARIA Listbox_ lets you create a DIY thing that has the same roles and semantics as a `<select>` but where you have greater stylistic control. There are different ways to implement a Listbox.
* `Datalist` is the native HTML version of a [combo box](https://en.wikipedia.org/wiki/Combo_box). A combo box is essentially a `<select>` with a text field. `Datalist` is announced by screen readers in different ways but as far as I can gather these are quirky rather than terrible. I found [a nice Twitter thread on DataList](https://twitter.com/IMAC2/status/1383384601192656897) which not only shows off its function but also includes [a promising accessibility-related comment](https://twitter.com/patrick_h_lauke/status/1383511763417649152) from Patrick H Lauke of Tetralogical. The drawback, because `Datalist` is native HTML, is that its options are not stylelable.
* _ARIA Combobox_ is a pattern that combines ARIA `combobox`, `textbox` and `listbox` roles, and the benefit it brings is to allow a level of custom design that you couldn’t achieve with `Datalist`.
* `Autocomplete` (not to be confused with the HTML `autocomplete` _attribute_) describes a control which provides users with suggestions that may not be available in the DOM already… for example when you fetch options via Ajax in reponse to what the user types.

With regard to Autocomplete, Adrian points to [Adam Silver’s _Building an accessible autocomplete control_](https://adamsilver.io/blog/building-an-accessible-autocomplete-control/).

And for advice on whether or not to go with a native select or a custom control, and how best to implement listbox and combobox if that’s your choice, Adrian points to the following resources from Sarah Higley:

* [`<select>` your poison part 2](https://www.24a11y.com/2019/select-your-poison-part-2/#select-poison-recommendations) (see the _Roll your own_ section at bottom)
* [Recommended Combobox Patterns](https://codepen.io/smhigley/pen/gObMVzv) pen

I also see that GOV.UK have marked a possible _Autocomplete_ component as one of their [next priorities](https://design-system.service.gov.uk/community/upcoming-components-patterns/) to review. Their [Autocomplete discussion thread](https://github.com/alphagov/govuk-design-system/discussions/2374) includes examples and research and will be really helpful.
