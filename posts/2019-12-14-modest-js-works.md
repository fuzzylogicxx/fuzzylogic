---
date: "2019-12-14T23:49:56.471Z"
title: "Modest JS Works"
description: "Pascal Laliberté makes the case for a modest and graded approach to using JavaScript"
tags: [link, development, javascript, stimulus, spa]
linkTarget: "https://modestjs.works/"
---
Pascal Laliberté has written a short, free, web-based book which advocates a modest and graded approach to using JavaScript.

> I make the case for The JS Gradient, a principle whereby your app can have multiple coexisting modern JS approaches, starting from the global sprinkles to spot view-models to, yes, an SPA if that’s really necessary. At each point in the gradient, you’ll see when it’s a good idea to go a step further toward heavier JavaScript, or not.
---

Pascal’s philosophy includes the following ideals:

- __prefer server-generated HTML over JavaScript-generated HTML__. If we need to add more complex JavaScript layers we may deviate from that ideal, but this should be the starting point;
- __we should be able to swap and replace the HTML on a page on a whim__. We can then support techniques like _pjax_ – replacing the whole body of a page with new HTML such as with [Turbolinks](https://github.com/turbolinks/turbolinks) – and _ahah_ ([asynchronous HTML over HTTP](http://microformats.org/wiki/rest/ahah)) – replacing parts of a page with new HTML – so as to make our app feel really fast while still using server-generated HTML; 
- __favour native Browser APIs over proprietary libraries__. Use the History API, Custom Event handlers, native form elements, CSS with its cascade, and polyfill for older browsers.

He argues that a single application can _combine_ the options along the JS Gradient as follows:

- Global Sprinkles: general app-level enhancements that occur on most pages, achieved by adding event listeners (ideally at document level) to catch user interactions and respond with small updates. Examples might include dropdowns, fetching and inserting HTML fragments, and Ajax form submission. This could be achieved by DIY-building a small, single library or importing something like [Trimmings](https://postlight.github.io/trimmings/) which perhaps provides reusable utilities via `data-` attributes, and including that library globally; 
- Component Sprinkles: specific page component behaviour defined in a single .js file; 



One point that Pascal regularly returns to is that it’s better to define event listeners on the `document` rather than on the target element itself. I already knew that [Event Delegation is better for browser performance](https://gomakethings.com/event-delegation-and-multiple-selectors-with-vanilla-js/) however Pascal’s point is that in the context of wanting to support swapping and replacing HTML on a whim, if event listeners are on the _element_  and that element is replaced (or a duplicate element added) then we would need to add the event listener again. 

Also of particular interest to me was his Shopping Cart page demo using [Stimulus](https://stimulusjs.org/), where he employs some nice techniques such as:

- multiple controllers within the same block of HTML; 
- multiple Stimulus actions on a single element;
- controller action methods which use `document.dispatchEvent` to dispatch Custom Events as a means of communicating changes up to other components;
- an element with an action which listens for the above custom event occurring on the `document` (as opposed to an event on the element itself).

He also makes the interesting point that one of the unique aspects of Stimulus is that by virtue of its lifecycle methods it supports xxxxx being replaced or cloned without having to manually re-add global event listeners.

I’ve [written about Stimulus before](https://fuzzylogic.me/posts/progressively-enhanced-javascript-with-stimulus/) and noted a few potential cons when considering complex interfaces, however Pascal’s demo has opened my eyes to additional possibilities.
