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
  - dialog
---
Manuel sensed a general misunderstanding of what an interactive element is and what *focusable* really means. He wasn’t totally sure himself either, so did some research. It’s a long post but here’s the conclusion:

> Long story short: interactive elements are focusable, but focusable doesn't necessarily mean tabbable because there are also click-focusable elements, which aren't tabbable but can be focused programmatically or via click.
>
> Also, it's perfectly acceptable to place tabindex on a non-interactive element when it helps with accessibility.

Interestingly, he was motivated to do this research after feeling confused when reading some guidance on [MDN’s Dialog element docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog).

<!-- excerpt -->

The page contains a banner advising that “the `tabindex` attribute must not be used on the `dialog` element.” 

He counters that it’s fine to use the `tabindex` attribute on the `dialog` element – it doesn’t break anything. So the “must not” feels weird. It’d be better to say nothing or say “It’s _unnecessary_ to put the tabindex attribute on the dialog element” because [`dialog` already handles focus well.](https://www.matuzo.at/blog/2023/focus-dialog/)

Note: I’ve since read [a conversation between Manuel and Adrian Roselli](https://front-end.social/@matuzo/115428756116841830) and from what I can gather, applying `tabindex` to `dialog` is invalid HTML and the “must” implicitly says that. My takeaway: let’s not apply `tabindex` to `dialog`.

Manuel highlights another note on the MDN page: “Do not add the `tabindex` property to the `<dialog>` element as it is not interactive and does not receive focus.” He counters the second part of that sentence, saying that the `dialog` element _does_ receive focus because _it is_ an interactive element. 

[Dialogs are specifically mentioned in the list of interactive elements in the HTML Spec’s section on *Focus*](https://html.spec.whatwg.org/multipage/interaction.html#focus). Interactive elements are focusable and Manuel goes on to show that `dialog` meets the criteria for a *focusable area*.

He provides proof of `dialog` being focusable too, demonstrating that when you open a `dialog` via `myDialog.showModal()` and the dialog contains no interactive elements, the `dialog` element itself has focus.

All of which is backs up Manuel’s assertion that `dialog` is an interactive element.
