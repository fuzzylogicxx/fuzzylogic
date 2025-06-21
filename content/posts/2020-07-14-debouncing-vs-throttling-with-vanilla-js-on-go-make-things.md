---
date: "2020-07-14T13:03:29.799Z"
title: "Debouncing vs. throttling with vanilla JS (on Go Make Things)"
description: "Chris Ferdinandi describes two techniques for improving performance when working with frequently invoked JavaScript event handlers"
tags: [link, development, javascript, debounce]
linkTarget: "https://gomakethings.com/debouncing-vs.-throttling-with-vanilla-js/"
---
Chris explains how debouncing and throttling are two related but different techniques for improving performance and user experience when working with frequently invoked JavaScript event handlers.

With throttling, you run a function immediately, then wait a specified amount of time before running it again. Any additional attempts to run it before that time period is over are ignored.

With debouncing, after the relevant event fires a specified time period must pass _uninterrupted_ in order for your function to run. When the time period has passed uninterrupted, that last attempt to run the function is the one that runs, with any previous attempts ignored.
---

You might _debounce_ code in event handlers for _scroll_ events to run when the user is completely done scrolling so as not to negatively affect browser performance and user experience.

For interactions that update the UI, _throttling_ might make more sense, so that the updates run at predictable intervals.

NB I’ve previously found [Trey Huffine’s debounce tutorial and example function](https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086) really useful, too.
