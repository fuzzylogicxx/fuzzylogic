---
date: 2023-02-25T14:24:43Z
title: Displaying tables on narrow screens
description: ''
tags: []
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: true

---
Responsive design for tables is tricky. Sure, you can just make the table’s container horizontally scrollable but that’s more a developer convenience than a great user experience. And if you instead try to do something more clever, you can run into challenges [as I have learned in the past](https://fuzzylogic.me/posts/tables-and-pseudo-tables-lessons-and-tactics/).

But still, we should strive to come up with good user experiences, and feasible technical solutions to support them. 

I was interested to read Erik Kennedy’s recent newsletter on [_The best way to display tables on mobile_](https://ckarchive.com/b/75u7h8hk4mne3)

Erik suggests three different approaches.

<ol reversed>
  <li></li>
  <li></li>
  <li></li>
</ol>

Do I agree with the above? If so could Adrian R’s accessible solution be used to achieve them?

A similar article worth checking is Andrew Coyle’s [The Responsive Table](https://coyleandrew.medium.com/the-responsive-table-44d533fde1e9). He describes the following approaches:

1. Horizontal overflow table
2. Transitional table (Adrian R or Charlie Cathcart)
3. Priority responsive table
