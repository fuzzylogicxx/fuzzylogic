---
date: "2019-12-21T16:59:57.458Z"
title: "Making a Better Custom Select Element (24 ways)"
description: ""
tags: [link, select, datalist, a11y]
linkTarget: "https://24ways.org/2019/making-a-better-custom-select-element/"
---
>  We want a way for someone to choose an item from a list of options, but it’s more complicated than just that. We want autocomplete options. We want to put images in there, not just text. The `optgroup` element is ugly, hard to style, and not announced by screen readers. I had high hopes for the `datalist` element, but it’s no good for people with low vision who zoom or use high contrast themes. 

`select` inputs are limited in a lot of ways. Let’s work out how to make our own while keeping all the accessibility features of the original.
---

This is a lovely tutorial and component but in my opinion requires just a few additions. I think it would benefit from:

- being progressively enhanced from a JavaScript-free baseline; and
- including discussion around and code for submitting the selected option.

Julie’s code currently exists solely as a Github repo, but for ease here’s [an editable version I’ve created on Codepen](https://codepen.io/fuzzylogicx/pen/rNamaYJ).
