---
date: 2023-07-29T12:50:01Z
title: Blockquotes in screen readers, by Adrian Roselli
description: 'Adrian tests how blockquotes, marked up in a variety of ways, are announced in different screen readers'
tags:
- link
- html
- blockquote
- a11y
- screenreaders
noteWithTitle: false
linkTarget: https://adrianroselli.com/2023/07/blockquotes-in-screen-readers.html

---
Adrian tests how blockquotes, marked up in a variety of ways, are announced in different screen readers. He concludes that his personal choice is as follows:

```
<main>
  <!-- other content -->
  <blockquote>
    <p>A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools.</p>
    <footer>— <cite>Douglas Adams, <a href="https://en.wikipedia.org/wiki/Mostly_Harmless">Mostly Harmless</a></cite></footer>
  </blockquote>
  <!-- other content -->
</main>
```
---

He goes on to mention that the `footer` is used simply a styling hook, since in the context of a `main` it is not a landmark and is strictly presentational. 

The `cite` element has semantic intent – it’s [the element for marking up the title of a cited creative work](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite) – even if those semantics are not always exposed to users. 

He avoids the `cite` _attribute_ completely because it creates noise in JAWS, and recommends against using `figure` with `figcaption` because it results in unnecessarily verbose and duplicate announcements.

So there’s an action for my team at work, because our blockquote component currently uses `figure` and `figcaption`. Perhaps at the time of build we took advice from one of the MDN or W3C pages which Adrian has now shown weren’t ideal.
