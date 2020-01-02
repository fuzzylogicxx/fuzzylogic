---
date: "2019-12-12T15:11:32.612Z"
title: "Loading and Templating JSON Responses in Stimulus.js (by John Beatty)"
description: "Just because Stimulus.js is designed to work primarily with existing HTML doesn’t mean it can’t use JSON APIs when the need arises"
tags: [link, stimulus, javascript, api, json]
linkTarget: "https://johnbeatty.co/2019/01/30/loading-and-templating-json-responses-in-stimulus-js/"
---
Just because Stimulus.js is designed to work primarily with existing HTML doesn’t mean it can’t use JSON APIs when the need arises.
---

Here, John pimps up his Stimulus controller to get and use JSON from a remote API endpoint. 

He triggers a `fetch()` from the `connect()` lifecycle callback, then iterates the returned JSON creating each HTML list item using a JavaScript template literal before finally rendering them into an existing `<ul>` via a Stimulus target.

Easy when you know how!  
