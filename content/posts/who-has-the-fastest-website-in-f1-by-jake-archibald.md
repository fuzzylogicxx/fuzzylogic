---
title: Who has the fastest website in F1? (by Jake Archibald)
description: Jake Archibald compares ten F1 team websites in terms of performance, sharing great insights into the tools and techniques he uses.
date: 2019-03-25T12:00:00Z
tags:
  - link
  - performance
  - webpagetest
  - images
linkTarget: https://jakearchibald.com/2019/f1-perf/
---
Great article by Jake Archibald (developer advocate at Google Chrome) comparing ten F1 team websites in terms of performance. While checking for common issues he provides great insights into the tools and techniques he uses to test web performance.

Some points of note:

- He uses WebPageTest to gather the data on Chrome Canary on a mobile phone (Moto G4, a mid-to-lower end Android device) with a 3g connection;
- He doesn’t score on the amount of bandwidth used but on time to become interactive, i.e. meaningful content displayed in a stable way and reactive to a tap/click;
- “Caching is important”, so he takes the first load and second load score and adds them;
- He checks if any savings can be made via good-enough-for-mobile images resized to max. 1000px wide, for display at no larger than 500px (so it looks good on high density mobile devices).
