---
date: "2022-08-25T13:56:10.056Z"
title: "Use CSS :has to set root-level styles based on a button state"
description: "Lovely dark mode tip from Google's Jhey"
tags: [link, css, has, parent, darkmode]
linkTarget: "https://twitter.com/jh3yy/status/1562081979801239553"
---
Great tip from Jhey in which he advises to use a button (rather than a checkbox or similar) for your dark-mode toggle, then use a combination `:has` and the buttonâs programatically-conveyed state to set a root-level custom property.

:root:has([aria-pressed=true]) {--dark:1;}
---

Aside from the clever CSS, I really like the way Jhey advocates for using a button for this kind of interface, like LÃ©onie did recently.