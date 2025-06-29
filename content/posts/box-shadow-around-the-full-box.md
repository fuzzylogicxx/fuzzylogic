---
title: Box Shadow around the full box
description: Sometimes when coding a UI element you want a shadow around, rather
  than inset from, the element
date: 2019-03-08T19:30:51.384Z
mainImage.isAnchor: false
tags:
  - entry
  - boxshadow
  - css
  - border
  - code
  - development
  - tip
draft: false
---
Sometimes when coding a UI element you want a shadow around the *whole* box. However, most CSS box-shadow examples/tutorials tend to show *inset* box-shadows or ones that otherwise sit off to the side.

Here’s how to apply `box-shadow` to the whole box for a simple but nice effect.

<figure>

``` css
.box-with-shadow {
  box-shadow: 0 0 4px #ccc;
}
```

</figure>

And here’s how it looks:

<div style="box-shadow: 0 0 4px #ccc; margin: 2em; padding: 2em; display: grid; place-items: center;">Lorem ipsum</div>



