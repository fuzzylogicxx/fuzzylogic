---
date: "2019-12-21T16:59:57.458Z"
title: "Making a Better Custom Select Element (24 ways)"
description: ""
tags: [link, select, datalist, a11y]
linkTarget: "https://24ways.org/2019/making-a-better-custom-select-element/"
---
>  We want a way for someone to choose an item from a list of options, but it’s more complicated than just that. We want autocomplete options. We want to put images in there, not just text. The `optgroup` element is ugly, hard to style, and not announced by screen readers. I had high hopes for the `datalist` element, but it’s no good for people with low vision who zoom or use high contrast themes. `select` inputs are limited in a lot of ways. Let’s work out how to make our own while keeping all the accessibility features of the original.
---

Julie Grundy argues here that despite us having [greater ability to style the standard `select`](https://fuzzylogic.me/posts/2019-12-21-styling-a-select-like-its-2019-or-filament-group-inc/) in 2019 there are times when that element doesn’t quite meet modern expectations.

This is a lovely, full-featured and fully accessible component. It could perhaps be improved by not showing the down-arrow icon until JavaScript is loaded, but otherwise it’s great.

Julie’s code currently exists solely as a Github repo, but for ease I’ve created [this editable version on Codepen](https://codepen.io/fuzzylogicx/pen/rNamaYJ).

Will I use this in place of the `select` element? Not if I can help it, because after years of experience working with form elements I still trust native elements to work better cross-platform than custom alternatives. However if a design requires dropdown options to employ custom patterns such as media objects, then I’ll definitely reach for this component.
