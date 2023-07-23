---
date: 2023-07-23T16:34:01Z
title: To delete something, use a form rather than a link
description: 'Great comment from a Rails engineer on a discussion thread'
tags:
- link
- web
- form
- semantics
- HTML
- button
- rails
noteWithTitle: false
linkTarget: https://discuss.hotwired.dev/t/destroy-record-in-turbo-frame/2731/2
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
In web-based products from e-commerce stores to email clients to accounting software you often find index pages where each item in a list (or row in a table) has a _Delete_ option. This is often coded as a link… but it shouldn’t be.

I liked this comment by Rails developer Dan where he advises a fellow Rails developer that to create his Delete control he should use a form rather than a link, via Rails’s `button_to` method.
---

Dan mentions that in the past Rails UJS set an unsdesirable historical precedent by including a pattern of hijacking links for non-GET reqests.

[But per the HTML standard, links are for navigation:](https://html.spec.whatwg.org/dev/links.html#:~:text=Hyperlinks,a%20browser%20or%20download%20them.)

> Hyperlinks… are links to other resources that… cause the user agent to navigate to those resources, e.g. to visit them in a browser or download them.

And [as Dan goes on to say](https://discuss.hotwired.dev/t/destroy-record-in-turbo-frame/2731/8) links that’s why links make a GET request. 
> A GET request is a visit, it says “show me this” and it’s idempotent. When you make the same request it’ll show the same thing.

If on the other hand you want a control that does something (in this case requst an entity to be deleted) then the appropriate HTML element is a form.

Relatedly, Jeremy Keith previously wrote about how to use request methods properly in his excellent post [Get safe](https://adactio.com/journal/17768).
