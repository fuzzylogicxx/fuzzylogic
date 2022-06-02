---
date: 2022-06-01T13:39:34Z
title: Refactoring a modal dialogue in 2022
description: It’s time to revisit our modal dialogue, and there are things to consider
tags:
- entry
- a11y
- modal
- javascript
- html
- standards
- dialog
- modal
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
My team will soon be refactoring our modal dialogue component. Ours has a few deficiencies, needs better developer experience and documentation, is not built to our Design System component standards, and could use a resilience boost from some progressive enhancement.
---

For a long time the best – meaning accessible, framework-agnostic, feature-packed – modal implementations were _custom_. Specifically:

* [Kitty Giraudel’s a11y-dialog](https://a11y-dialog.netlify.app/); and 
* [Scott O’Hara’s Vanilla Modal Dialog](https://scottaohara.github.io/accessible_modal_window/)

However with recent browser advances (especially from Safari), there’s an argument that the time has now come that we no longer need custom solutions and can go native. So we might reach for [the native  `<dialog>` HTML element](https://twitter.com/Una/status/1508926326392164353).

However first I think we’d need to make an informed decision regarding our satisfaction with support, based on the updated advice in Scott O’Hara’s article [Having an Open Dialog](https://www.scottohara.me/blog/2019/03/05/open-dialog.html).

Additionally we should _definitely_ be keeping one eye on proposals around [the exciting new `togglepopup` and `popup` attributes](https://twitter.com/jh3yy/status/1529909208098947072) which promise the holy grail of entirely HTML-powered modal dialogues with no JavaScript dependency.
