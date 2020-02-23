---
date: "2020-02-23T11:09:51.795Z"
title: "You Don't Need"
description: "A list of tips and tools on how to use simpler browser standards and avoid adding unnecessary JavaScript and libraries."
tags: [link, javascript, lean, tools, development, css, momentjs, lodash]
linkTarget: "https://github.com/you-dont-need"
---
A nice list of tips and tools on how to use simpler browser standards and APIs and avoid unnecessary JavaScript and libraries.
---

Lodash, Moment and other similar libraries are _expensive_ and we don’t always need them. This Github repo contains a host of nice tips, snippets and code–analysing tools.

One cautionary note regarding the idea of replacing JS with CSS: although the idea of using CSS rather than JavaScript for components like tabs and modals seems nice at first, it doesn’t properly consider that we often _need_ JS for reasons of accessibility, in order to apply the correct aria attributes when the state of a UI component is modified. 

Via Will Matthewson at work (FreeAgent) during our group conversation on JavaScript strategy. 
