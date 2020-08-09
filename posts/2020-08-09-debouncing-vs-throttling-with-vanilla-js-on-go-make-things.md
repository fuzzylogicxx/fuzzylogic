---
date: "2020-08-09T13:03:29.799Z"
title: "Debouncing vs. throttling with vanilla JS (on Go Make Things)"
description: "Chris Ferdinandi describes two techniques for improving performance when working with frequently invoked JavaScript event handlers"
tags: [link, development, javascript]
linkTarget: "https://gomakethings.com/debouncing-vs.-throttling-with-vanilla-js/"
---
Chris explains how debouncing and throttling are two related but different techniques for improving performance and user experience when working with frequently invoked JavaScript event handlers.

With throttling, you run a function immediately, then wait a specified amount of time before running it again. Any additional attempts to run it before that time period is over are ignored.

With debouncing, you wait a specified amount of time before running a function. The last attempt to run the function is the one that runs, and any previous attempts within the time period are ignored.
---

You might _debounce_ scroll events to run when the user is completely done scrolling so as not to negatively affect the user experience. 

For interactions that update the UI, _throttling_ might make more sense, so that the updates run at predictable intervals.
