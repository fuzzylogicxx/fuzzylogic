---
date: "2019-12-21T13:37:50.023Z"
title: "When should you add the defer attribute to the script element? (on Go Make Things)"
description: "Adding the defer attribute on a script element in the <head> has the same effect as putting that <script> in the footer but offers improved performance."
tags: [link, javascript, performance, defer, head]
linkTarget: "https://gomakethings.com/when-should-you-add-the-defer-attribute-to-the-script-element/"
---
For many years I’ve placed script elements just before the closing `body` tag rather than in the `<head>`. Since a standard `<script>` element is render-blocking, the theory is that by putting it at the end of the document – after the main content of the page has loaded – it’s no longer blocking anything, and there’s no need to wrap it in a `DOMContentLoaded` event listener.

It turns out that my time-honoured default is OK, but there is a better approach.
---

[Chris](https://gomakethings.com/) has done the research for us and ascertained that placing the `<script>` in the `<head>` and adding the `defer` attribute has the same effect as putting that `<script>` just before the closing body tag but offers improved performance. 

This treads fairly complex territory but my general understanding is this:

Using `defer` on a `<script>` in the `<head>` allows the browser to download the script _earlier_, in parallel, so that it is ready to be used as soon as the DOM is ready rather than having to be downloaded and parsed at that point.
