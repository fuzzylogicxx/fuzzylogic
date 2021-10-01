---
date: 2021-10-01T07:37:58Z
title: Testing ES modules with Jest
description: A few troubleshooting tips to allow Jest to be able to work with ES modules
  without Babel
tags:
- testing
- development
- web
- javascript
- note
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
Here are a few troubleshooting tips to enable Jest, the JavaScript testing framework, to be able to work with ES modules without needing Babel in the mix for transpilation. Let’s get going with a basic set-up.

`package.json`

<figure>

```
…,
"scripts": {
  "test": "NODE_ENV=test NODE_OPTIONS=--experimental-vm-modules jest"
},
"type": "module",
"devDependencies": {
  "jest": "^27.2.2"
}
```

</figure>

Note: take note of the crucial `"type": "module"` part as it’s the least-documented bit and your most likely omission!

`javascript/sum.js`

<figure>

```
export const sum = (a, b) => {
  return a + b;
}
```    
</figure>

`spec/sum.test.js`

<figure>
```
import { sum } from "../javascript/sum.js";
    
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
</figure>

Hopefully that’ll save you (and future me) some head-scratching.
