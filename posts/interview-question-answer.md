---
date: 2022-11-08T09:12:33Z
title: Interview question answer
description: Answer to a typical tech interview question
tags:
- request
- http
- web
- interview
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
There’s a classic web developer interview question that goes something like this:

What happens when you type in “www.bbc.co.uk” into a browser? Describe the journey that results in you seeing a page.
---

You could answer it like this:

Your browser sends an HTTP request which gets routed through a local modem/router then gets sent to a nameserver. That nameserver routes the request to the correct IP address, which will resolve to some sort of web server. That server will serve up either some static files, or run some backend code in order to generate a resource (probably an html page). When the HTML page is returned, your browser will parse it, which will likely generate more requests, and the cycle will repeat.

To do: 
- add something about HTTPS
- add more about the front-end aspects: DOM, CSSOM, Accessibility tree, render blocking resources etc

## References:

- [My favorite interview question](https://benmccormick.org/2017/07/24/my-favorite-interview-question/), by Ben McCormick
- [How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work), on MDN