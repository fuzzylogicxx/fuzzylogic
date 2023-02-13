---
date: 2023-02-13T09:12:33Z
title: Interview question answer
description: Answer to a typical tech interview question
tags:
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
There’s an interview question that goes something like this:

> What happens when you type in “https://www.bbc.co.uk” into a browser? Describe the journey that results in you seeing a page.

        - Refs

            - https://benmccormick.org/2017/07/24/my-favorite-interview-question/

                - Your browser sends an HTTP request which gets routed through a local modem/router and gets sent to a name server for its url extension. That name server routes the request to the correct IP address, which will resolve to some sort of web server. That server will serve up either some static files, or run some backend code in order to generate a resource (probably an html page). When the HTML page is returned, your browser will parse it, which will likely generate more requests, and the cycle will repeat.

            - https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work