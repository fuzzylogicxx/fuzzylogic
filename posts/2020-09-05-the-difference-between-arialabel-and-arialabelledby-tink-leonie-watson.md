---
date: "2020-09-05T08:52:36.996Z"
title: "The difference between aria-label and aria-labelledby (Tink - Léonie Watson)"
description: "Accessibility Expert Léonie Watson on the differences between aria-label and aria-labelledby and how to choose the right one"
tags: [link, a11y, development, aria]
linkTarget: "https://tink.uk/the-difference-between-aria-label-and-aria-labelledby/"
---
> The `aria-label` and `aria-labelledby` attributes do the same thing but in different ways. Sometimes the two attributes are confused and this has unintended results. This post describes the differences between them and how to choose the right one.
---

The key takeaways for me were:

- Many HTML elements have an _accessible name_ (which we can think of as its “label”) and this can be derived from the element’s content, an attribute, or from an associated element; 
- for `aria-labelledby`, use the `id` of another element and that will then use that element’s text as your first element’s accessible name;
- use native HTML over ARIA where possible, but when you need ARIA it’s better to reuse than duplicate so if an appropriate label already exists in the document use `aria-labelledby`; otherwise use `aria-label`;
- an ARIA attribute will trump any other accessible name (such as the element’s content)
- there are some elements on which these ARIA attributes [do not work consistently](https://developer.paciellogroup.com/blog/2017/07/short-note-on-aria-label-aria-labelledby-and-aria-describedby/) so check these before using.
