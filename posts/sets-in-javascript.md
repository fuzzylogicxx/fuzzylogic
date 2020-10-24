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
I don’t often store things in a `Set` in JavaScript, but perhaps I should. 

The fact it will only store *unique values* is pretty handy.

---

One place I do currently use it is for that reason is for the \`TagList\` in my 11ty-based personal website. After defining \`TagList\` as a new, empty \`Set\` I iterate each blog post and add its associated tags to \`TagList\`, safe in the knowledge that all duplicates will be removed automatically.

`Set` has built-in methods for adding, deleting and iterating. And if you need to do something else, you can easily turn it into an array, for example by:

<figure>

```
const myArray = [...mySet];
```

</figure>

Also, [support is pretty good](https://caniuse.com/?search=javascript%20set). So although so far I’ve been safely confining my use to Node scripts which build my static site, I could probably be using it client-side, too.