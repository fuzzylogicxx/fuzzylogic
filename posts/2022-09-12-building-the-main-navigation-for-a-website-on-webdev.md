---
date: "2022-09-12T11:38:34.401Z"
title: "Building the main navigation for a website (on web.dev)"
description: "Manuel Matuzovic with a great summary of the the things to think about when building responsive navigation"
tags: [link, a11y, aria, disclosure, navigation]
linkTarget: "https://web.dev/website-navigation/"
---
> learn about semantic HTML, accessibility, and how using ARIA attributes can sometimes do more harm than good.
---

Alongside all the sound accessibility and hiding related advice, I also found Manuel’s approach to progressive enhancement interesting. Rather than i) include a hamburger `button` directly in the DOM and set its initial state to `hidden`; or ii) create the `button` element with JavaScript, he instead nests the `button` in a [template](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) element then clones that element with JavaScript. He later [tweeted his rationale for this approach](https://twitter.com/mmatuzo/status/1568149800209498113):

> If JS doesn't work, the markup inside the template won't be rendered on screen and it's more convenient to prepare the markup upfront instead of using document.createElement().

The ability to prepare complex, JS-dependent component markup upfront in declarative HTML rather than recreating it in JavaScript is a compelling argument for his approach. Especially so if you don’t work in JS framework-based systems therefore your components are not written in JavaScript. 
