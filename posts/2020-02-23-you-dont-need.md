---
date: "2020-02-23T11:09:51.795Z"
title: "You Don't Need"
description: "A list of tips and tools on how to use simpler browser standards and avoid adding unnecessary JavaScript and libraries."
tags: [link, javascript, css, momentjs, lodash]
linkTarget: "https://github.com/you-dont-need"
---
A nice list of tips and tools on how to use simpler browser standards and APIs and avoid adding unnecessary JavaScript and libraries when theyâre not needed.
---

Lodash, Moment and other similar libraries are _expensive_ and we donât always need them. Here are some nice tools and tips.

Cautionary Note re. replacing JS with CSS: although the idea of using CSS instead of JavaScript for things like tabs and modals seems nice on the surface, it doesnât properly consider that we often _need_ JS in order to apply the correct aria attributes when the state of a UI component is modified. 

Via Will Matthewson at work (FreeAgent) when discussing our JavaScript strategy. 