---
date: "2019-12-14T23:49:56.471Z"
title: "Modest JS Works"
description: "Pascal Laliberté makes the case for a modest and graded approach to using JavaScript "
tags: [link, development, javascript, stimulus, spa]
linkTarget: "https://modestjs.works/"
---
Pascal Laliberté has written a short, free, web-based book which advocates a modest and graded approach to using JavaScript.

> I make the case for The JS Gradient, a principle whereby your app can have multiple coexisting modern JS approaches, starting from the global sprinkles to spot view-models to, yes, an SPA if that’s really necessary. At each point in the gradient, you’ll see when it’s a good idea to go a step further toward heavier JavaScript, or not.
---

Of particular interest to me was his Shopping Cart page demo using [Stimulus](https://stimulusjs.org/), where he employs some pretty cool techniques such as:

- using multiple controllers within the same block of HTML; 
- adding multiple Stimulus actions to a single element;  
- controller action methods which use `document.dispatchEvent` to dispatch custom events as a means of communicating changes to other components; 
- an element with a `data-action` which listens for the above custom event occurring on the `document` as opposed to a typical event (such as click) on the element itself.

I’ve [written about Stimulus before](https://fuzzylogic.me/posts/progressively-enhanced-javascript-with-stimulus/) and noted a few potential cons when considering complex interfaces, however Pascal’s demo has given me some new ideas.
