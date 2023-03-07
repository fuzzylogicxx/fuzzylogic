---
date: 2023-02-25T14:24:43Z
title: Displaying tables on narrow screens
description: 'Collected resources and thoughts on the responsive challenge that is the table element'
tags: [web,development,css,html,a11y,responsive,tables]
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
Responsive design for tables is tricky. Sure, you can just make the table’s container horizontally scrollable but that’s more a developer convenience than a great user experience. And if you instead try to do something more clever, you can run into challenges [as I did in the past](https://fuzzylogic.me/posts/tables-and-pseudo-tables-lessons-and-tactics/). Still, we should strive to design good narrow screen user experiences for tables, alongside feasible technical solutions to achieve them.
---

In terms of UI design, I was interested to read Erik Kennedy’s recent newsletter on [_The best way to display tables on mobile_](https://ckarchive.com/b/75u7h8hk4mne3). Erik lists three different approaches, which are (in reverse order of his preference):

<ol reversed>
  <li>Hide the least important columns</li>
  <li>Cards with rows of Label-Value pairs</li>
  <li>More radical “remix” as a “Mobile List”</li>
</ol>

Another article worth checking is Andrew Coyle’s [The Responsive Table](https://coyleandrew.medium.com/the-responsive-table-44d533fde1e9). He describes the following approaches:

1. Horizontal overflow table (inc. fixed first column)
2. Transitional table
3. Priority responsive table

For the transitional table, Andrew links to Charlie Cathcart’s [Responsive & Accessible Data Table](https://codepen.io/pixelchar/full/rNaKLM) codepen. It looks similar (perhaps better looking but not quite as accessible) to Adrian Roselli’s [Responsive Accessible Table](https://adrianroselli.com/2017/11/a-responsive-accessible-table.html).
