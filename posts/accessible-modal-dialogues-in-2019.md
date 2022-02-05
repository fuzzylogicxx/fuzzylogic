---
date: 2019-03-09T00:00:00Z
title: Accessible modal dialogues in 2019
description: The native HTML dialog element isn’t ready for use, but there are alternatives
tags:
- note
- dialog
- standards
- html
- javascript
- modal
- a11y
noteWithTitle: true
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
I [previously noted](https://fuzzylogic.me/posts/meet-the-new-dialog-element/) Keith J Grant’s article on the HTML `dialog` element which promised a native means of handling popups and modal dialogues. I’ve not yet used `dialog` in production, partly because of [spotty browser support](https://caniuse.com/#search=dialog) (although there is a polyfill) but also partly because—for reasons I couldn’t quite put my finger on after reading the spec—it just didn’t feel like the finished article.
---

Fast forward to March 2019 and [Scott O’Hara has written an excellent piece](https://www.scottohara.me/blog/2019/03/05/open-dialog.html) describing why it’s still not ready. There are a combination of factors: lack of browser support, reliance on JavaScript; and multiple accessibility issues.

The good news is: having dug deeper into Scott’s work I see that among the [many accessible components](https://github.com/scottaohara/accessible_components) he has shared with the world is a [custom, accessible modal dialogue](https://github.com/scottaohara/accessible_modal_window). So next time the need arises, I think I’ll start there. 

Thanks, [Scott](https://twitter.com/scottohara)!