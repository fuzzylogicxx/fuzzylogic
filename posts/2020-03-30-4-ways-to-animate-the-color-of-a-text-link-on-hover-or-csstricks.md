---
date: "2020-03-30T07:56:20.196Z"
title: "4 Ways to Animate the Color of a Text Link on Hover | CSS-Tricks"
description: "Katherine Kato shows how to add animation to your link hover effect and compares the pros and cons of different approaches "
tags: [link, development, link, hover, animation, interactivity, css, transform]
linkTarget: "https://css-tricks.com/4-ways-to-animate-the-color-of-a-text-link-on-hover/"
---
> Letâs create a pure CSS effect that changes the color of a text link on hoverâ¦ but slide that new color in instead of simply swapping colors. 
---

Katherines post explores four different techniques to achieve the effect, and their comparative pros and cons with regard to accessibility, performance, and browser support.

Technique 4, which uses a CSS `transform` seems to be the most flexible, best-performing and has best cross-browser support, however because it requires adding a semantically redundant  `<span>` into the link I would use it sparingly rather than, say, on all links on the page.