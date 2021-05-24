---
date: "2021-05-23T09:26:30.032Z"
title: "Container Queries in Web Components | Max Böck"
description: "Clever demo with lots of interesting web component related techniques"
tags: [link, containerqueries, progressiveenhancement, webcomponents, css, html, javascript]
linkTarget: "https://mxb.dev/blog/container-queries-web-components/"
---
Max’s demo is really clever and features lots of interesting web component related techniques.

> I came up with this demo of a book store. Each of the books is draggable and can be moved to one of three sections, with varying available space. Depending on where it is placed, different styles will be applied to the book.
---

Some of the techniques I found interesting included:

- starting with basic HTML for each book and its image, title, and author elements rather than an empty custom element, thereby providing a resilient baseline
- wrapping each book in a custom `book-element` tag (which the browser would simply treat like a `div` in the worst case scenario)
- applying the `slot` attribute to each of the nested elements, for example `slot="title"`
- including a `template` with `id="book-element"` at the top of the HTML. This centralises the optimal book markup, which makes for quicker, easier, and less disruptive maintenance. (A `template` is parsed but not rendered by the browser. It is available solely to be referenced and used by JavaScript)
- including _slots_ within the `template`, such as `<slot name="title">`
- putting a `style` block within the `template`. These styles target the book component only, and include container query driven responsiveness
- targetting the `<book-element>` wrapper element in CSS via the `:host` selector, and applying `contain` to set it as a container query context
- targetting a `slot` in the component CSS using (for example) `::slotted(img)`

## Thoughts

Firstly, in the basic HTML/CSS, I might ensure images are `display: block` and use `div` rather than `span` for a better baseline appearance should JavaScript fail.

Secondly, even though this tutorial is really nice, I still find myself asking: why use a Web Component to render a book rather than a server-side solution when the latter removes the JS dependency? Part of the reason is no doubt developer convenience—people want to build component libraries in JavaScript if that’s their language of choice. Also, it requires less backend set-up and leads to a more portable stack. And back-end tools for component-based architectures are generally less mature and feature-rich then those for the front-end.

One Web Component specific benefit is that Shadow DOM provides an encapsulation mechanism to style, script, and HTML markup. This encapsulation provides private scope that both prevents the content of the component from being affected by the external document, and keeps its CSS and JS from leaking _out_… which might be nice for avoiding the namespacing you’d otherwise have to do.

I have a feeling that Web Components might make sense for some components but be neither appropriate nor required for others. Therefore just because you use Web Components doesn’t mean that you suddenly need to feel the need to write or refactor every component that way. It’s worth bearing in mind that client-side JavaScript based functionality comes with a performance cost—the user needs to wait for it to download. So I feel there might be a need to exercise some restraint. I want to think about this a little more.

## Other references

- [Using Templates and Slots, on MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)
