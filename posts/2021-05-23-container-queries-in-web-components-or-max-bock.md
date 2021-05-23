---
date: "2021-05-23T09:26:30.032Z"
title: "Container Queries in Web Components | Max BÃ¶ck"
description: "Clever demo with lots of interesting web component related techniques"
tags: [link, containerqueries, progressiveenhancement, webcomponents, css, html, javascript]
linkTarget: "https://mxb.dev/blog/container-queries-web-components/"
---
Max’s demo is really clever and features lots of interesting web component related techniques.

> I came up with this demo of a book store. Each of the books is draggable and can be moved to one of three sections, with varying available space. Depending on where it is placed, different styles will be applied to the book.
---

Some of the techniques I found interesting included:

- starting with basic HTML for each book, which provides a resilient baseline
- wrapping each book in a custom `book-element` tag (which would simply be interpreted as a `div` in the worst case scenario)
- giving each inner element (image, title, author) a `slot` attribute, e.g. `slot="title"`, which is a nice, declarative interface for flexible component content

Other references

- [Using Templates and Slots, on MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)
