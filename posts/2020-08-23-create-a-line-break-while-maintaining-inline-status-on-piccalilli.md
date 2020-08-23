---
date: "2020-08-23T11:17:11.186Z"
title: "Create a line break while maintaining inline status (on Piccalilli)"
description: "Andy Bell shows us how to add a line break after an inline element without changing it to display: block."
tags: [link, css, development, inline, block, whitespace, break]
linkTarget: "https://piccalil.li/quick-tip/create-a-line-break-while-maintaining-inline-status/"
---
> Sometimes you want to create a line break after an inline element, while retaining that inline elementâs inline status.
---

A lovely trick from Andy Bell for breaking after an inline element (such as a form label) using a pseudo-element and the `white-space` property, so that we can avoid setting the element to `display: block` (thereby becoming full-width etc) when we donât want that. 