---
date: 2022-01-01T14:39:23Z
title: Building a toast component (by Adam Argyle)
description: 'Comprehensive tutorial on the tricky UI challenge of a Toast component '
tags:
- link
- development
- web
- output
- html
- css
- javascript
- toast
noteWithTitle: false
linkTarget: https://web.dev/building-a-toast-component/
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
Great tutorial (with accompanying video) from Adam Argyle which starts with a useful definition of what a `Toast` is and is not:

> Toasts are non-interactive, passive, and asynchronous short messages for users. Generally they are used as an interface feedback pattern for informing the user about the results of an action. Toasts are unlike notifications, alerts and prompts because they're not interactive; they're not meant to be dismissed or persist. Notifications are for more important information, synchronous messaging that requires interaction, or system level messages (as opposed to page level). Toasts are more passive than other notice strategies.
---

There are some important distinctions between toasts and notifications in that definition: toasts are for less important information and are non-interactive. I remember in a previous work planning exercise regarding a toast component a few of us got temporarily bogged down in working out the best JavaScript templating solution for SVG icon-based “Dismiss” buttons… however we were probably barking up the wrong tree with the idea that toasts should be manually dismissable.

There are lots of interesting ideas and considerations in Adam’s tutorial, such as:

* using the `<output>` element for each toast
* some crafty use of CSS Grid and logical properties for layout
* combining `hsl` and percentages in custom properties to proportionately modify rather than redefine colours for dark mode
* animation using `keyframes` and `animation`
* native JavaScript modules

Thanks for this, [Adam](@argyleink)!