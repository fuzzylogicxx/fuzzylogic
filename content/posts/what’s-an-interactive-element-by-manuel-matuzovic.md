---
title: What’s an interactive element? by Manuel Matuzovic
description: Manuel senses a general misunderstanding of what an interactive
  element is and what focusable really means so did some research.
noteWithTitle: false
linkTarget: https://www.matuzo.at/blog/2025/whats-an-interactive-element
date: 2025-12-14T18:05
tags:
  - link
  - html
  - a11y
  - accessibility
---
Manuel sensed a general misunderstanding of what an interactive element is and what *focusable* really means. He wasn’t totally sure himself either, so did some research. It’s a long post but here’s the conclusion:

> Long story short: interactive elements are focusable, but focusable doesn't necessarily mean tabbable because there are also click-focusable elements, which aren't tabbable but can be focused programmatically or via click.
>
> Also, it's perfectly acceptable to place tabindex on a non-interactive element when it helps with accessibility.

Interestingly, the motivation behind this was his confusion over some guidance he read on [MDN’s Dialog element docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#usage_notes).

<!-- excerpt -->

The page contains a banner advising that “the `tabindex` attribute must not be used on the `dialog` element.” 

He counters that it’s fine to use the `tabindex` attribute on the `dialog` element – it doesn’t break anything. It’d be better to say “It’s unnecessary to put the tabindex attribute on the dialog element” because [`dialog` already handles focus well.](https://www.matuzo.at/blog/2023/focus-dialog/)

He highlights another note on the MDN page: “Do not add the `tabindex` property to the `<dialog>` element as it is not interactive and does not receive focus.” Again he counters this, saying:

> Both statements are wrong. The `dialog` element does receive focus because it's an interactive element. 

[Dialogs are specifically mentioned in the list of interactive elements in the HTML Spec’s section on *Focus*](<>).  Furthermore they meet the criteria for a *focusable area*. 

He provides proof, too, demonstrating that when you open a `dialog` that contains no interactive elements with `myDialog.showModal()`, the `dialog` element is focused. 

All of which is to confirm: \`dialog\` is an interactive element.
