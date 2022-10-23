---
date: 2022-10-23T16:28:08Z
title: WebC
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
* Web components as the consumer developer’s authoring interface. 
* Having web components at the core is great – especially for Design Systems – because unlike with proprietary component frameworks, WC’s do not work within a single stack only but rather are platform and stack agnostic meaning we could reuse them across products.
* Whereas normally a WC is JS-dependent even when the component has no JS-dependent content, with WebC the content will still be rendered to screen when JS fails or is unavailable. This is because WebC takes your `.webc` component file and converts it to the output HTML required.
* Progressive enhancement friendly. As above, your no-JS HTML foundational will render. But you can also colocate your foundational baseline and your scripts and CSS to enhance it in the same file.
* Component builders can write components in a single file, rather than separate template and JS
* lots of other goodies like scoped styles and JS, aggregated styles and JS, and much more.

Resources

Docs [https://www.11ty.dev/docs/languages/webc/](https://www.11ty.dev/docs/languages/webc/ "https://www.11ty.dev/docs/languages/webc/")

Crash course video tutorial [https://www.youtube.com/watch?v=X-Bpjrkz-V8](https://www.youtube.com/watch?v=X-Bpjrkz-V8 "https://www.youtube.com/watch?v=X-Bpjrkz-V8")

Progressively enhanced interactive components video tutorial [https://www.youtube.com/watch?v=p0wDUK0Z5Nw](https://www.youtube.com/watch?v=p0wDUK0Z5Nw "https://www.youtube.com/watch?v=p0wDUK0Z5Nw")