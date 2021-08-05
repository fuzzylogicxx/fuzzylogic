---
date: 2021-08-05T20:08:02Z
title: 'Should I use the HTML5 section element and if so, where? '
description: A rule-of-thumb for using the HTML section element
tags:
- aria
- region
- role
- landmark
- a11y
- development
- heuristics
- html5
- section
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
Unlike other HTML5 elements such as `header`, `footer` and `nav`, it’s never been particularly clear to me when is appropriate to use `section`. This is due in large part to many experts having expressed that it doesn’t quite work as intended.
---

I like [HTMHell’s rule-of-thumb regarding `section`](https://www.htmhell.dev/tips/the-section-element/):

> If you’re not sure whether to use a `<section>`, it’s probably best to avoid it. It’s much more important that you create [a sound document outline](https://www.htmhell.dev/tips/the-document-outline/).

Relatedly: don’t let the original intended use of `section` tempt you to put multiple H1s on a page in the vain hope that browsers and assistive technology will interpret their nesting level to handle hierarchy appropriately. That would rely on on a document outline algorithm but [no browser implements document outlining](https://adrianroselli.com/2016/08/there-is-no-document-outline-algorithm.html).

One sensible application of `section` is to provide additional information to screen reader users about the semantic difference between two adjoining content areas, when that distinction is otherwise only being made visually with CSS.

Here’s an example. Smashing Magazine’s blog articles begin with a _quick summary_, followed by a horizontal line separating the summary from the article proper. But the separator is purely decorative, so if the summary were wrapped in a `div` then a screen reader user wouldn’t know where it ends and the article begins. However by instead wrapping the summary in `<section aria-label="quick summary">`:

* our wrapper has the built-in ARIA role of `region`_._ A `region` is a type of generic [landmark](https://www.scottohara.me/blog/2018/03/03/landmarks.html) element, and as a landmark a screen reader user will find it listed in a summary of the page and can navigate to it easily.
* by giving it an accessible name (here via `aria-label`) it will be _announced_ by a screen reader, with “Quick summary region” before and “Quick summary region end” after.

Refs:

* [https://www.scottohara.me/blog/2021/07/16/section.html](https://www.scottohara.me/blog/2021/07/16/section.html "https://www.scottohara.me/blog/2021/07/16/section.html")
* [https://www.smashingmagazine.com/2020/01/html5-article-section/](https://www.smashingmagazine.com/2020/01/html5-article-section/ "https://www.smashingmagazine.com/2020/01/html5-article-section/")