---
date: 2017-08-04
title: Using the tabindex attribute | TPG
description: Léonie Watson explains how the HTML tabindex attribute is used to manage keyboard focus. 
linkTarget: https://developer.paciellogroup.com/blog/2014/08/using-the-tabindex-attribute/
tags: [link, a11y, focus, tab, tabbingorder, keyboardnavigation, order, cssgrid, flexbox]
---
Léonie Watson explains how the HTML tabindex attribute is used to manage keyboard focus. Of particular interest to me was a clarification of what `tabindex="-1"` does (because I always forget).
---

## tabindex="-1"

The element becomes programmatically focusable but isn’t included in the tab order. It can’t be reached by someone using the tab key to navigate through content, but it can be focused on with scripting via the `focus()` method.

We might use this because we want to be able to set focus to a particular element via a script. Léonie offers the example of a list of form errors.

Alternatively we might use this because we want to prevent a normally tabbable element from being tabbable. [Sara Souidean uses this technique](https://aneventapart.com/news/post/practical-tips-for-building-more-accessible-front-ends) (in combination with `aria-hidden=true`) on e-commerce product teaser “media objects” in order to limit the number of duplicate links that keyboard users must tab through.

## Tabindex on page targets to assist with keyboard focus

I’ve often seen `tabindex="-1"` used as a companion to the `id` attribute on elements of a page intended to be directly accessible via links. Examples include a `main` element that should be directly accessible from a “Skip to content” link, or the headings in a blog article to support sharing direct links to page sections. 

Before HTML5, creating an internal “link target” required creating an anchor element that used the `name` attribute. In HTML5 this use of anchor was deprecated with authors instead encouraged to add the `id` attribute to any element they wish. The reason why developers added `tabindex="-1"` to their `main` and `h2` (etc) “targets” is because some older browsers, when responding to a link to such a resource, would move visual focus (i.e. scroll to the element) but not move keyboard focus if the target element was not focusable. Including `tabindex` solved that problem.

Modern browsers will move the focus for us and so using `tabindex` for this purpose is no longer necessary.

## tabindex="0"

Applying `tabindex="0"` to an element inserts it into the tabbing order based on its position in the source. It is not necessary to apply this to an interactive element such as a button or checkbox since they are focusable by default. You should use it sparingly (because it requires care to ensure accessibility) but you might use it on a custom element which needs to be interactive under certain circumstances such as [the horizontally scrollable container in a Data Table](https://inclusive-components.design/data-tables/).

## tabindex="1+"

This imposes a tab order on the content that bears no resemblance to the expected tab order. It’s an antipattern. Don’t do it.
