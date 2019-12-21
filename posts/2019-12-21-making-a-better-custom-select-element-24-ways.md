---
date: "2019-12-21T16:59:57.458Z"
title: "Making a Better Custom Select Element (24 ways)"
description: ""
tags: [link, select, datalist, a11y]
linkTarget: "https://24ways.org/2019/making-a-better-custom-select-element/#comments"
---
>  We want a way for someone to choose an item from a list of options, but itâs more complicated than just that. We want autocomplete options. We want to put images in there, not just text. The `optgroup` element is ugly, hard to style, and not announced by screen readers. I had high hopes for the `datalist` element, but â¦ itâs no good for people with low vision who zoom or use high contrast themes.

Select inputs are limited in a lot of ways. Letâs work out how to make our own while keeping all the accessibility features of the original.
---

This is really nice but in my opinion requires some additions. 

- Itâs not progressively enhanced from a JavaScript-free baseline; 
- it doesnât include any discussion around or code for submitting the chosen option.

The example code only exists as a Github repo, but hereâs [an editable version Iâve created on Codepen](https://codepen.io/fuzzylogicx/pen/rNamaYJ).