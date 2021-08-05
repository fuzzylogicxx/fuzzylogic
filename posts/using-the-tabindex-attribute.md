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

Léonie offers the example of a list of form errors which we might want to set focus to using a script.

<aside>
  <details>
    <summary>Aside regarding Skip Links</summary>

Incidentally, I sometimes see people including `tabindex="-1"` on their `main` element. This is a special use case in support of “skip links”, the solution for helping keyboard users and users of Assistive Technologies avoid having to tab through logo and navigation elements and instead skip directly to the main content. As [Ben Myers writes](https://benmyers.dev/blog/skip-links/), the inclusion of the `tabindex` attribute is a _belt and braces_ action to ensure the skip experience is not just a visual “jump” but actually sets focus properly.

> When a user follows our skip link, we want their keyboard focus to move to our target. Modern browsers will move that focus for us, but some older browsers will only move the focus if the target is focusable. If it’s not focusable, the page will scroll down but the user's focus will still be at the top of the page.

Given that [the browser issues seem to be mostly resolved](https://axesslab.com/skip-links/) and that GOV.UK found that including the `tabindex` attribute could be harmful, I’m inclined to go without it. Or if absolutely necessary, [use JavaScript to manage the `tabindex`-driven focusability of fragment-driven targets](https://github.com/selfthinker/dokuwiki_template_writr/blob/master/js/skip-link-focus-fix.js ) like Anika Henke from GOV.uk suggests (…or [use `focus()` like Scott O’Hara](https://github.com/scottaohara/accessible_modal_window/blob/9e40b6291b567057ec5fb09dbc686b26ac7eac9e/assets--demo/demo.js)).
    
  </details>
</aside>

## tabindex="0"

Applying `tabindex="0"` to an element inserts it into the tabbing order based on its position in the source. It is not necessary to apply this to an interactive element such as a button or checkbox since they are focusable by default. You should use it sparingly (because it requires care to ensure accessibility) but you might use it on a custom element which needs to be interactive under certain circumstances such as [the horizontally scrollable container in a Data Table](https://inclusive-components.design/data-tables/).

## tabindex="1+"

This imposes a tab order on the content that bears no resemblance to the expected tab order. It’s an antipattern. Don’t do it.
