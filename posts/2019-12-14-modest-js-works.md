---
date: "2019-12-14T23:49:56.471Z"
title: "Modest JS Works"
description: "Pascal LalibertÃ© makes the case for a modest and graded approach to using JavaScript "
tags: [link, development, javascript, stimulus, spa]
linkTarget: "https://modestjs.works/"
---
Pascal LalibertÃ© has written a short, free web-based book which advocates a modest and graded approach to using JavaScript .

> I make the case for The JS Gradient, a principle whereby your app can have multiple coexisting modern JS approaches, starting from the global sprinkles to spot view-models to, yes, an SPA if thatâs really necessary. At each point in the gradient, youâll see when itâs a good idea to go a step further toward heavier JavaScript, or otherwise donât.
---

Of particular interest to me was his Shopping Cart page demo using [Stimulus](https://stimulusjs.org/), where he employs some pretty cool techniques such as:

- using multiple controllers within the same block of HTML; 
- adding multiple Stimulus actions, for different controllers, to a single element;  
- controller action methods which use `document.dispatchEvent` to dispatch custom events as a means of communicating changes to other components; 
- an element with a `data-action` which listens for the above custom event occurring on the `document` as opposed to a typical event (such as click) on the element itself. 