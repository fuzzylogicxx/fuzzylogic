---
date: "2019-12-14T23:49:56.471Z"
title: "Modest JS Works"
description: "Pascal Laliberté makes the case for a modest and graded approach to using JavaScript"
tags: [link, development, javascript, stimulus, spa]
linkTarget: "https://modestjs.works/"
---
Pascal Laliberté has written a short, free, web-based book which advocates a modest and layered approach to using JavaScript.

> I make the case for The JS Gradient, a principle whereby your app can have multiple coexisting modern JS approaches, starting from the global sprinkles to spot view-models to, yes, an SPA if that’s really necessary. At each point in the gradient, you’ll see when it’s a good idea to go a step further toward heavier JavaScript, or not.
---

Pascal’s philosophy includes the following ideals:

- __prefer server-generated HTML over JavaScript-generated HTML__. If we need to add more complex JavaScript layers we may deviate from that ideal, but this should be the starting point;
- __we should be able to swap and replace the HTML on a page on a whim__. We can then support techniques like _pjax_ – replacing the whole body of a page with new HTML such as with [Turbolinks](https://github.com/turbolinks/turbolinks) – and _ahah_ (asynchronous HTML over HTTP) – replacing parts of a page with new HTML – so as to make our app feel really fast while still using server-generated HTML; 
- __favour native Browser APIs over proprietary libraries__. Use the modern tools the browser gives us (History API, Custom Event handlers, native form elements, CSS and the cascade) and polyfill older browsers.

He argues that a single application can _combine_ the options along the JS Gradient, only moving to each level when required. The levels are as follows:

- __Global Sprinkles__: general app-level enhancements that occur on most pages, achieved by adding event listeners at document level to catch user interactions and respond with small updates. Examples page updates might include dropdowns, fetching and inserting HTML fragments, and Ajax form submission. This might be achieved via a single DIY script (or something like [Trimmings](https://postlight.github.io/trimmings/)) that is available globally and provides reusable utilities via `data-` attributes; 
- __Component Sprinkles__: specific page component behaviour defined in individual `.js` files, where event listeners are still ideally set on the `document`; 
- __[Stimulus]([Stimulus](https://stimulusjs.org/)) components__: where each component’s HTML holds its state and defines its behaviour, and its companion _controller_ `.js` file wires up event handlers to elements within the component; 
- __Spot View-Models__: using a framework such as Vue or React _only in specific spots_, for situations where our needs are more complex and generating the HTML on the server would be impractical. Rather than taking over the whole page, this just augments a specific page section with a data-reactive view-model.
- __A single-page application (SPA)__: typically an all-JavaScript affair, where whole pages are handled by Reactive View-Models like Vue and React and the browser’s handling of clicks and the back button are overriden to serve different JavaScript-generated views to the user. This is the least _modest_ approach but there are times when it is necessary.

One point that Pascal regularly returns to is that it’s better to add event listeners to the `document` (with a check to ensure the event occurred on the relevant element) rather than to the element itself. I already knew that [Event Delegation is better for browser performance](https://gomakethings.com/event-delegation-and-multiple-selectors-with-vanilla-js/) however Pascal’s point is that in the context of wanting to support swapping and replacing HTML on a whim, if event listeners are directly on the _element_ but that element is replaced (or a duplicate added) then we would need to keep adding more event listeners. By contrast, this is not necessary when the event listener is added to the `document`.

Note: Stimulus applies event handlers to elements rather than the `document`, however one of its USPs is that it’s set up so that as elements appear or disappear from the DOM, event handlers are automatically added and removed. This lets you swap and replace HTML as you need without having to manually define and redefine event handlers. He calls this _Automated Behaviour Orchestration_ and notes that while adding event listeners to the `document` is the ideal approach, the Stimulus approach is the next best thing.

Also of particular interest to me was his Stimulus-based Shopping Cart page demo where he employs some nice techniques such as:

- multiple controllers within the same block of HTML; 
- multiple Stimulus actions on a single element;
- controller action methods which use `document.dispatchEvent` to dispatch Custom Events as a means of communicating changes up to other components;
- an element with an action which listens for the above custom event occurring on the `document` (as opposed to an event on the element itself).

I’ve [written about Stimulus before](https://fuzzylogic.me/posts/progressively-enhanced-javascript-with-stimulus/) and noted a few potential cons when considering complex interfaces, however Pascal’s demo has opened my eyes to additional possibilities.
