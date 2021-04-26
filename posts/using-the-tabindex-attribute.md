---
date: 2017-08-04
title: Using the tabindex attribute | TPG
description: Léonie Watson explains how the HTML tabindex attribute is used to manage keyboard focus. 
linkTarget: https://developer.paciellogroup.com/blog/2014/08/using-the-tabindex-attribute/
tags: [link, a11y, focus, tab, tabbingorder, keyboardnavigation, order, cssgrid, flexbox]
---
Léonie Watson explains how the HTML tabindex attribute is used to manage keyboard focus. Of particular interest to me was a clarification of what `tabindex="-1"` does (because I always forget).

> When tabindex is set to a negative integer like -1, (the element) becomes programmatically focusable but it isn’t included in the tab order. In other words, it can’t be reached by someone using the tab key to navigate through content, but it can be focused on with scripting.
---

## tabindex="0"

Applying `tabindex="0"` to an element inserts it into the tabbing order based on its position in the source. It is not necessary to apply this to an interactive element such as a button or checkbox since they are focusable by default. You should use it sparingly (because it requires care to ensure accessibility) but you might use it on a custom element which needs to be interactive under certain circumstances such as [the horizontally scrollable container in a Data Table](https://inclusive-components.design/data-tables/).

A related note on tabbing order is that it’s not a great idea to move elements around visually such that they are ordered differently from their source order, because this creates a disconnect between tabbing order and visual order. This could be confusing for a sighted person who navigates by keyboard. CSS Grid and Flexbox offer this ability through properties such as `order`, `flex-direction` and `grid-auto-flow` however as Rachel Andrew and others have suggested, [creating this kind of disconnect is to be avoided](https://rachelandrew.co.uk/archives/2019/06/04/grid-content-re-ordering-and-accessibility/). It might be OK when the elements (and their children) are non-focusable (for example re-ordering two `div`s) but avoid applying it to focusable elements like navigation links.

## tabindex="-1"

The element becomes programmatically focusable but isn’t included in the tab order. It can’t be reached by someone using the tab key to navigate through content, but it can be focused on with scripting. Léonie offers as an example a list of form errors which we might want to set focus to using a script. An even better example might be a `div`-based modal dialogue.

## tabindex="1+"

This imposes a tab order on the content that bears no resemblance to the expected tab order. It’s an antipattern. Don’t do it.
