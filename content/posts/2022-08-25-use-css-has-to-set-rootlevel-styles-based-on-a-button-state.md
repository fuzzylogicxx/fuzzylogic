---
date: "2022-08-25T13:56:10.056Z"
title: "Use CSS :has to set root-level styles based on a button’s state"
description: "Lovely dark mode tip from Google's Jhey"
tags: [link, css, has, a11y, buttons, parent, darkmode, toggle]
linkTarget: "https://twitter.com/jh3yy/status/1562081979801239553"
---
Great tip here from Jhey. He advises using a `button` with ARIA and a little JavaScript for your dark-mode toggle. And to apply the dark styles, use a CSS selector which targets the `:root` parent of the button when in “pressed” state and sets a root-level custom property to “on”.

<figure>

``` css
:root:has([aria-pressed=true]) {
  --dark:1;
}
```

</figure>
---

Seriously clever stuff! 

And aside from the CSS, I really like the way Jhey advocates using a `button` rather than a form element such as a checkbox for this kind of interface, much [like Léonie did recently](https://fuzzylogic.me/posts/2022-07-15-perceived-affordances-and-the-functionality-mismatch-by-leonie-watson/).
