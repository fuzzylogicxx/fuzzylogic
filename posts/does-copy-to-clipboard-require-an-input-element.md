---
date: 2023-02-26T21:54:48Z
title: Does Copy to clipboard require an input element?
description: ''
tags: []
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: true

---
It’s a hangover from `select` and `execCommand()`. 

It is no longer necessary due to the Clipboard API. 

Also `execCommand()` is deprecated (no longer recommended).

And we should stop with the affordance mismatches.

Refs

* [https://masteringjs.io/tutorials/fundamentals/copy-to-clipboard](https://masteringjs.io/tutorials/fundamentals/copy-to-clipboard "https://masteringjs.io/tutorials/fundamentals/copy-to-clipboard")
* [https://wearefrankly.co/](https://wearefrankly.co/ "https://wearefrankly.co/") (view-source:[https://wearefrankly.co/](https://wearefrankly.co/ "https://wearefrankly.co/"))
* On Github, for example the copy branch name feature on a Pull Request
* Stack overflow
  * [https://stackoverflow.com/questions/50941892/copy-to-clipboard-value-of-selected-option](https://stackoverflow.com/questions/50941892/copy-to-clipboard-value-of-selected-option "https://stackoverflow.com/questions/50941892/copy-to-clipboard-value-of-selected-option")
  * [https://stackoverflow.com/questions/60217202/copy-text-to-clipboard-now-that-execcommandcopy-is-obsolete](https://stackoverflow.com/questions/60217202/copy-text-to-clipboard-now-that-execcommandcopy-is-obsolete "https://stackoverflow.com/questions/60217202/copy-text-to-clipboard-now-that-execcommandcopy-is-obsolete")
* [https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand "https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand")
* [https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API "https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API")