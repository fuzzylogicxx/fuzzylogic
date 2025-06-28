---
date: 2023-02-26T21:54:48.000+00:00
title: Does a “Copy to clipboard” UI require an input element?
description: A look into why Copy to clipboard components are often designed and built
  a certain (maybe outdated) way
tags:
- forms
- input
- a11y
- html
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
At work, we in the Design System team recently received an enquiry from a software engineer regarding a “Copy to clipboard” component. In the Figma design, a copyable referral code is displayed inside what looks like a text input. The engineer asked if a suitable component exists for that part. I expect they were unclear on what to use after noting that it should _look like_ an input but that functionally there seems to be no need for an input or form since the user does not enter text, and nothing is being created, updated or searched.

That mismatch confused me too. I started by considering the semantics and accessibility perspective. I asked for confirmation that:

* foo
* bar

The engineer confirmed those assumptions. Foo could be [confusing](https://tink.uk/perceived-affordances-and-the-functionality-mismatch/). So  I suggested that ideally the design be revisited so that it looks different from an input.

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