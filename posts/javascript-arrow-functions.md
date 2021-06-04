---
title: JavaScript Arrow Functions
description: A quick refresher on arrow functions to help when I have a brain freeze
date: 2020-06-03T16:17:00.000Z
mainImage.isAnchor: false
tags:
  - web
  - development
  - javascript
  - syntax
  - arrowfunctions
draft: false
---
JavaScript arrow functions are one of those bits of syntax about which I occasionally have a brain freeze. Here’s a quick refresher for those moments.
---

Arrow functions are shorter than traditional function syntax. 

They don’t bind their own `this` value. Instead, the `this` value of the scope in which the function was defined is accessible. That makes them poor candidates for _methods_ since `this` won’t be a reference to the object the method is defined on. However it makes them good candidates for everything else, including use _within_ methods, where—unlike standard functions—they can refer to (for example) `this.name` just like their parent method because the arrow function has no overriding `this` binding of its own.

## TL;DR: typical usage

<figure>

```js
const someProcess = (bar) => {
  // stuff that spans multiple lines
};

// shorthand
const shortAction = (num1, num2) => num1 + num2;

```
</figure>

## Explainer

<figure>

```js
// Traditional Function
function (a) {
  return a + 100;
}

// Arrow Function Breakdown

// 1. Remove "function", place => between argument and opening curly
(a) => {
  return a + 100;
}

// 2. Remove braces and word "return". The return is implied.
(a) => a + 100;

// 3. Remove the argument parentheses
a => a + 100;

```
</figure>

## References

- [Arrow function expressions on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Arrow functions in Vanilla JS on gomakethings.com](https://gomakethings.com/arrow-functions-in-vanilla-js/)