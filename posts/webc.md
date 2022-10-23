---
date: 2022-10-23T16:28:08.000+00:00
title: WebC
description: WebC, the latest addition to the Eleventy suite of technologies, is focused
  on making Web Components easier to use.
tags:
- entry
- javascript
- webcomponents
- progressiveenhancement
- 11ty
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
WebC, the latest addition to the [Eleventy](https://www.11ty.dev/) suite of technologies, is focused on making [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) easier to use. I have to admit, it took me a while to work out the idea behind this one, but I see it now and it looks interesting.
---

With WebC, web components are the consumer developer’s authoring interface. So for example you might add a badge component into your page with `<my-badge text='Lorem ipsum'></my-badge>`.

Using web components is great – especially for Design Systems – because unlike with proprietary component frameworks, components are not coupled to a single technology stack but rather are platform and stack-agnostic, meaning they could be reused across products.

From the component creator perspective: whereas normally web components frustratingly require writing accompanying JavaScript and depending on JavaScript availability even for “JavaScript-free” components, with WebC this is not the case. You can create “HTML-only” components and rely on them to be rendered to screen. This is because WebC takes your `.webc` component file and compiles it to the simplest output HTML required.

WebC is progressive enhancement friendly. As mentioned above, your no-JS HTML foundation will render. But going further, you can also colocate your foundational baseline beside the scripts and CSS that enhance it within the same file.

This ability to write components within a single file (rather than separate template and script files) is pretty nice in general.

There are lots of other goodies too such as the ability to scope your styles and JavaScript to your component, and to set styles and JS to be aggregated in such a way that your layout file can optionally load only the styles and scripts required for the components in use on the current page.

Useful resources:

* [WebC docs](https://www.11ty.dev/docs/languages/webc/)
* [_Crash course_ video tutorial](https://www.youtube.com/watch?v=X-Bpjrkz-V8) 
* [Progressively enhanced interactive components video tutorial](https://www.youtube.com/watch?v=p0wDUK0Z5Nw)