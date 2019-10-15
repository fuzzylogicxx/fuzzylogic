---
title: Native lazy-loading for the web | web.dev
description: Native lazy-loading without the need for JavaScript is now here.
date: 2019-08-30 15:02:00
tags:
- link
- web
- development
- performance
- chrome
- media
- images
linkTarget: https://web.dev/native-lazy-loading
---
Now that we have the HTML attribute `loading` we can set `loading="lazy"` on our website’s media, and the loading of non-critical, _below-the-fold_ media will be deferred until the user scrolls to them.
---

This can really improve performance so I’ve implemented it on images and iframes (youtube video embeds etc) throughout this site.

This is [currently only supported in Chrome](https://caniuse.com/#feat=loading-lazy-attr), but that still makes it well worth doing.
