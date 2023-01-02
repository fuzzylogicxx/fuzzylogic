---
date: 2023-01-02T21:03:21Z
title: 'Lean “plugin subscription form” by Chris Ferdinandi '
description: You don’t need to include a JS library when a lightweight vanilla JS
  solution would do the job
tags: [link, form, progressiveenancement, lean, javascript, validation]
linkTarget: https://gomakethings.com/more-html-less-javascript/
draft: false

---
I enjoyed this two-part tutorial from Chris arising from his critique of a subscription form plugin which includes the entire React library to achieve what could be done with a lightweight HTML and vanilla JavaScript solution. Chris advocates a progressively-enhanced approach. Instead of rendering the form with JavaScript he renders it in HTML and argues that not only is there no need for the former approach – because forms natively work without JavaScript – but also it only introduces fragility where we could provide resilience.
---

Part one: [Using a wrecking ball when a hammer would suffice](https://gomakethings.com/using-a-wrecking-ball-for-a-problem-that-requires-hammer/)

Part two: [More HTML, less JavaScript](https://gomakethings.com/more-html-less-javascript/)

I also recreated the front-end parts in [a codepen](https://codepen.io/fuzzylogicx/pen/yLqJzmZ) to help this sink in.

Lastly, as someone who always favours resilience over fragility I wanted to take a moment to consider the part that Chris didn’t cover – why JavaScript is required _at all_. I guess it’s because, being a plugin, this is intended for portability and you as author have decided you want the error and success messaging to be “white-labelled” on the consuming website rather than for the user to be taken to a separate website. You don’t know the context’s stack so to provide a universally-supported solution you use JavaScript to handle the messaging, which then means you need to use JS to orchestrate everything else – preventing default submission, validating, fetch-based submission and API response handling.
