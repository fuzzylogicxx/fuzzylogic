---
date: 2022-04-25T09:29:43Z
title: Web components as progressive enhancement, by Cloud Four
description: Paul Herbert of Cloud Four describes using a web component to enhance
  an existing HTML element (textarea)
tags:
- link
- details
- progressiveenhancement
- textarea
- webcomponents
noteWithTitle: false
linkTarget: https://cloudfour.com/thinks/web-components-as-progressive-enhancement/
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
> _By enhancing native HTML instead of replacing it, we can provide a solid baseline experience, and add progressive enhancement as the cherry on top._

Great article by Paul Herbert of Oregon’s Cloud Four. Using a web component to enhance an existing HTML element such as `<textarea>` (rather than always creating a custom element from scratch) feels very lean, resilient and maintainable.
---

Off the top of my head I could see this being a nice approach for other custom form controls.

[Zach Leatherman also took this approach with the `<details>` element](https://www.zachleat.com/web/details-utils/) in quite exciting ways and is using it in production on Netlify’s marketing websites. I’m a bit cautious of jumping on that one just yet, though, because it’s plays more fast-and-loose with the intended purpose of the element and in so doing probably might present some accessibility issues. Still really interesting though.

[Thanks to @adactio for sharing.](https://adactio.com/links/19001)
