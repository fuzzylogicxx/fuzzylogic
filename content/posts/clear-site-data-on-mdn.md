---
title: Clear-Site-Data (on MDN)
description: The Clear-Site-Data HTTP header clears browsing data (cookies, storage, cache) associated with the requesting website.
date: 2018-12-16T12:00:00Z
tags:
  - link
  - web
  - http
  - caching
  - serviceworker
linkTarget: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Clear-Site-Data
---
The `Clear-Site-Data` HTTP header clears browsing data (cookies, storage, cache) associated with the requesting website. It can even be used to deregister service workers.

As a side note, I wonder if it might be an idea for me to update my website boilerplate to contain pages such as /clear-cookies, /clear-storage, and /clear-all. Then, if someone is having some weird cacheing-related problem on a website I developed, I can simply provide them with a link to one of those pages rather than asking them to _hard-refresh_ or launch incognito windows.
