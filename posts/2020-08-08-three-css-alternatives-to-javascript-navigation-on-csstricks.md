---
date: "2020-08-08T19:24:39.353Z"
title: "Three CSS Alternatives to JavaScript Navigation (on CSS-Tricks)"
description: "A fun post on mobile navigation options that includes a nugget about handling navigation with a dedicated page"
tags: [link, mobile, navigation, development, css, html, javascript]
linkTarget: "https://css-tricks.com/three-css-alternatives-to-javascript-navigation/"
---
In general this is a decent article on non-JavaScript-based mobile navigation options, but the thing I liked most is the idea that you could use a separate page (/menu) for your navigation menu. 

> Who said navigation has to be in the header of every page? If your front end is extremely lightweight or if you have a long list of menu items to display in your navigation, the most practical method might be to create a separate page to list them all.
---

I also noted that the article describes a method where you can “spoof” a slide-in _hamburger_ menu without JS by using the checkbox hack. I once coded a similar “HTML and CSS -only” hamburger menu, but opted instead to use the `:target` pseudo-class in combination with the adjacent sibling selector, [as described by Chris Coyier back in 2012](https://css-tricks.com/off-canvas-menu-with-css-target/).
