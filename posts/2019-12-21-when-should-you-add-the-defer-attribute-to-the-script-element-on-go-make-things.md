---
date: "2019-12-21T13:37:50.023Z"
title: "When should you add the defer attribute to the script element? (on Go Make Things)"
description: "Adding the defer attribute on a script element in the <head> has the same effect as putting that <script> in the footer but offers improved performance."
tags: [link, javascript, performance, defer, head]
linkTarget: "https://gomakethings.com/when-should-you-add-the-defer-attribute-to-the-script-element/"
---
For many years I’ve placed my `<script>` in the `<footer>` rather than the `<head>`, so as to:

1. optimise performance by not having something render-blocking at the top of the document; and 
2. remove the need for a parent `DOMContentLoaded` listener by virtue of the `<script>` being positioned after the body of the page.

It turns out that my time-honoured default is OK, but not the best approach.
---

Chris has done the research for us and ascertained that placing the `<script>` in the `<head>` and adding the `defer` attribute has the same effect as putting that <script> in the footer but offers improved performance. 

This treads fairly complex territory but my general understanding is this:

Using `defer` on a `<script>` in the `<head>` allows the browser to download the script _earlier_, in parallel, so that it is ready to be used as soon as the DOM is ready rather than having to be downloaded and parsed at that point.
