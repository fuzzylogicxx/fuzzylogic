---
title: Sets in JavaScript
description: Sets in JavaScript only store unique values which makes them pretty handy
date: 2020-10-24T16:00:42.453Z
tags:
  - set
  - javascript
  - syntax
draft: false
---
I don’t often store things in a `Set` in JavaScript, but maybe I should. The fact it will only store *unique values* makes it pretty handy.

---

One place I do currently use a `Set` for the above benefit is for the `TagList` in my 11ty-based personal website. I start by defining `TagList` as a new, empty `Set`. I then need to assemble all possible tags so iterate blog posts and for each add its associated tags to `TagList`. This means I can be sure that all duplicates will be removed automatically.

As you would imagine, `Set` has built-in methods for adding, deleting and iterating items. But if you need to do something beyond that, you can easily turn it into an array, for example by:

<figure>

```
const myArray = [...mySet];
```

</figure>

Also, [browser support is pretty good](https://caniuse.com/?search=javascript%20set). So although to date I’ve been safely confining my use to Node scripts for building my static site, I could probably be using it client-side, too.