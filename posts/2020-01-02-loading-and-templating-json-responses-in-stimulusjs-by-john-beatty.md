---
date: "2020-01-02T15:11:32.612Z"
title: "Loading and Templating JSON Responses in Stimulus.js (by John Beatty)"
description: "Just because Stimulus.js is designed to work primarily with existing HTML doesnât mean it canât use JSON APIs when the need arises."
tags: [link, stimulus, javascript, api, json]
linkTarget: "https://johnbeatty.co/2019/01/30/loading-and-templating-json-responses-in-stimulus-js/"
---
Just because Stimulus.js is designed to work primarily with existing HTML doesnât mean it canât use JSON APIs when the need arises.
---

Here, John pimps up his Stimulus controller to get and use JSON from a remote API endpoint. 

He triggers a `fetch()` from the `connect()` lifecycle callback, then creates each HTML list item from the returned JSON using a JavaScript template literal before finally rendering them into the DOM via a Stimulus target.

Easy when you know how!  