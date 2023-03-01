---
date: 2023-02-26T21:54:48.000+00:00
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
Received a design with a “Copy code to clipboard” component. The code is in what appears to be a text `input`. The engineer gets in touch wondering how to build it, probably because they see that it should look like an input, but they know that it’s not actually part of a form or necessarily an input at all, therefore they don’t know which component to use. I instinctively question it too, asking for confirmation that:

* bob
* sue

And when the engineer confirms my assumptions, I then suggest that ideally the design be revisited so that it looks different from an input, otherwise it could be [confusing](https://tink.uk/perceived-affordances-and-the-functionality-mismatch/). 

It’s a hangover from `select()` and `execCommand()`. 

It is no longer necessary now we have the Clipboard API. 

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