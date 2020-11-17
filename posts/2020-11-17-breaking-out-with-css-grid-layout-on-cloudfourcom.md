---
date: "2020-11-17T21:21:00.629Z"
title: "Breaking Out With CSS Grid Layout (on cloudfour.com)"
description: "The original and best CSS Grid “article with full-width images” layout"
tags: [link, cssgrid, breakout, image, responsive, layout, article, minmax]
linkTarget: "https://cloudfour.com/thinks/breaking-out-with-css-grid-layout/"
---
While [bookmarking the mastery.games article](https://fuzzylogic.me/posts/2020-11-16-article-layout-with-css-grid/) yesterday, I started getting the feeling that something was awfully familiar. It was! I’ve seen this layout before – from Tyler Sticka back in 2017 to be precise – but failed to bookmark it at the time.
---

Here, then, is the original and still the best CSS Grid “article with breakout images” layout! 

I particularly love the way that, by naming the lines and appending `-start` and `-end` as appropriate you can then target the area between those lines using its short name.

<figure>
  
``` css
.Prose {
  display: grid;
  grid-template-columns: 
    [full-start] minmax(1em, 1fr) 
    [main-start] minmax(0, 40em) [main-end]
    minmax(1em, 1fr) [full-end];
}

.Prose > * {
  grid-column: main;
}

.Prose-splash {
  grid-column: full;
}
```

</figure>
