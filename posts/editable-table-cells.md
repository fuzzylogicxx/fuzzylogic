---
date: 2022-09-22T09:21:18Z
title: Editable table cells
description: Not yet sure if editable table cells are a good idea, but if I had to
  do it here’s where I’d start
tags:
- note
- editable
- tables
- javascript
- a11y
noteWithTitle: true
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
Yesterday the Design System team received a tentative enquiry regarding making table cells editable. I’m not yet sure whether or not this is a good idea – experience and spidey sense tell me it’s not – but regardless I decided to start exploring so as to base my answer on facts and avoid being overly cautious.
---

In my mind’s eye, there are two ways to achieve this:

1. on clicking the cell, the cell content is presented in an (editable) form input; or
2. apply the `contenteditable` attribute

In both cases you get into slightly gnarlier territory when you start considering the need for a submit button and how to position it. 

I don’t have anything further to add at the moment other than to say that if I had to spike this out, I’d probably start by following Scott O’Hara’s article [Using JavaScript & contenteditable](https://www.scottohara.me/blog/2014/05/08/contenteditable.html).

I’d probably also tweet Scott and ask if he can say anything more on his closing statement which was:

> I have more thoughts on the accessibility of contenteditable elements, but that will also have to be a topic for another day…