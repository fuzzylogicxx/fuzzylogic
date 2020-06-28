---
date: "2020-06-28T19:06:42.259Z"
title: "Striking a Balance Between Native and Custom Select Elements (on CSS-Tricks)"
description: "A custom-styled select solution that satisfies those who insist on a custom component but retains all the built-in accessibility we get from native form controls."
tags: [link, development, select, html, javascript, css, a11y, progressiveenhancement]
linkTarget: "https://css-tricks.com/striking-a-balance-between-native-and-custom-select-elements/"
---
> We’re not going to try to replicate everything that the browser does by default with a native select element. We’re going to literally use a select element when any assistive tech is used. But when a mouse is being used, we’ll show the styled version and make it function as a select element.
---

This custom-styled select solution satisfies those who insist on a custom component but retains all the built-in accessibility we get from native form controls. I also really like the use of a `@media (hover: hover)` media query to detect an environment with hover (such as a computer with a mouse rather than a mobile browser on a handheld device).
