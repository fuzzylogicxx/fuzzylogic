---
date: 2019-08-30 15:02:00.00
pageTitle: Native lazy-loading for the web | web.dev
tags: ['web', 'development', chrome', 'media', 'images']
title: Native lazy-loading for the web | web.dev
permalink: /links/{{ page.fileSlug }}/index.html
linkTarget: https://web.dev/native-lazy-loading
metaDescription: Native lazy-loading without the need for JavaScript is now here.
---

By adding the HTML attribute `loading` to our websites’ media and setting the value to `lazy`, the loading of our non-critical, _below-the-fold_ images and videos will be deferred until the user scrolls to them.

This can really improve performance so I’ve implemented it on images and iframes (youtube video embeds etc) throughout this site. 

This is currently only supported in Chrome, but that still makes it well worth doing.
