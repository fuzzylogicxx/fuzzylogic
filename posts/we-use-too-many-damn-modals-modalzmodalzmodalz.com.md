---
date: 2022-08-09T20:03:21Z
title: We use too many damn modals (modalz modalz modalz dot com)
description: Advice on using (or ideally avoiding) modal dialogues
tags:
- link
- modal
- a11y
linkTarget: https://modalzmodalzmodalz.com/
draft: false

---
At our fortnightly Accessibility Forum at work, we just had a great discussion about modal dialogues. We started by discussing whether focus should be completely trapped within the modal or if the user should at least have access to the browser toolbar (we decided on the former). We then moved onto a general discussion on the pros and cons of modals, which led me to share MODALZ MODALZ MODALZ with the team.
---

Adrian Egger’s website presents some interesting suggestions, which I’ll summarise below:

Have you considered using the following alternatives to modals?

* Non-modal dialogs (e.g. toasts): for non-critical interactions that don’t block the user, use these rather than modals
* New page: lead the user to a different page to isolate the interaction without losing access to functionality such as navigation.
* Go inline: present your content inline to be less disruptive.
* Expanding elements: Use expanding elements such as accordions, toolbars, tooltips, or sliding sidebars (or other modeless elements).
* “Undo” patterns: instead of confirmation modals, consider using inline “Undo” option to speed up the user’s interactions.

When all else fails here’s how to get modals right:

_Do:_

* Make it easy to close: make it simple to get rid of ‐ by escape key, clicking outside the modal window, and a clearly labelled close button.
* Single purpose: limit the interaction to one, straightforward task.
* Keep it short: be brief and concise in your content
* Accessibility: this is fairly self-explanatory — if you can’t make it accessible, don’t use a modal.

_Do not:_

* Modal inception: avoid opening a modal from a modal.
* Fullscreen modals: you might as well navigate to a new page.
* Multi-step modals: never create a multi-step modal. That way madness lies.
* Self-spawning modals: never present modals unless prompted by the user.
* Marketing modals: seriously, nobody wants that sh*t — especially not your newsletter.

Modals are so hard to do well and present so many possible issues that I think before diving into designing/building one, it’s worth questioning if a modal is really appropriate for your use case.