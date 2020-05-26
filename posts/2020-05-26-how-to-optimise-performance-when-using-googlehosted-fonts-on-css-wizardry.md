---
date: "2020-05-26T22:17:59.083Z"
title: "How to optimise performance when using Google-hosted fonts (on CSS Wizardry)"
description: "Harry Roberts with some tips on how to use Google-hosted fonts to make the experience several seconds faster than the baseline."
tags: [link, performance, development, web, fonts, google, preload, preconnect]
linkTarget: "https://csswizardry.com/2020/05/the-fastest-google-fonts/"
---
> A combination of asynchronously loading CSS, asynchronously loading font files, opting into FOFT, fast-fetching asynchronous CSS files, and warming up external domains makes for an experience several seconds faster than the baseline.
---

Harry Roberts suggests that, while self-hosting your web fonts is likely to be the overall best solution to performance and availability problems, weâre able to design some fairly resilient measures to help mitigate a lot of these issues when using Google Fonts. These measures combine to make the experience several seconds faster than the baseline.

Harry then kindly provides a code snippet that we can use in the `<head>` of our document to apply these measures.