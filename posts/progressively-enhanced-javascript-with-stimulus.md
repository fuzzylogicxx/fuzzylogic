---
title: Progressively Enhanced JavaScript with Stimulus
description: I’m dipping my toes into the JavaScript micro-framework from Basecamp
date: 2019-10-24
tags: [web, development, javascript, framework, progressiveenhancement]
---
I’m dipping my toes into [Stimulus](https://stimulusjs.org/handbook/introduction), the JavaScript micro-framework from Basecamp. Here are my initial thoughts.
---

I immediately like the ethos of Stimulus.

The creators’ take is that in many cases, using one of the popular contemporary JavaScript frameworks is overkill.

We don’t always need a nuclear solution that:

- takes over our whole front end;
- renders entire, otherwise empty pages from JSON data;
- manages state in JavaScript objects or Redux; or
- requires a proprietary templating language.

Instead, Simulus suggests a more “modest” solution – using an existing server-rendered HTML document as its basis (either from the initial HTTP response or from an AJAX call), and then progressively enhancing.

It advocates _readable markup_ – being able to read a fragment of HTML which includes sprinkles of Stimulus and easily understand what’s going on.

And interestingly, Stimulus proposes storing state in the HTML/DOM.

## How it works

Stimulus’ technical purpose is to automatically connect DOM elements to JavaScript objects which are implemented via ES6 classes. The connection is made by `data–` attributes (rather than `id` or `class` attributes). 

`data-controller` values connect and disconnect Stimulus controllers.

The key elements are:

- Controllers
- Actions (essentially event handlers) which trigger controller methods
- Targets (elements which we want to read or write to, mapped to controller properties)

## Some nice touches

I like the way you can use the `connect()` method – a _lifecycle callback_ invoked whenever a given component is connected to the DOM - as a place to test browser support for a given feature before applying a JS-based enhancement.

Stimulus also readily supports the ability to have multiple instances of a controller on the page.

Furthermore, actions and targets can be added to any type of element without the controller JavaScript needing to know or care about the specific element, promoting _loose coupling_ between HTML and JavaScript.

## Managing State in Stimulus

Initial state can be read in from our DOM element via a `data-` attribute, e.g. `data-slideshow-index`.

Then in our controller object we have access to a `this.data` API with `has()`, `get()`, and `set()` methods. We can use those methods to set new values back into our DOM attribute, so that state lives entirely in the DOM without the need for a JavaScript state object.

## Possible Limitations

Stimulus feels a little restrictive if dealing with less simple elements – say, for example, a data table with lots of rows and columns, each differing in multiple ways. 

And if, like in our data table example, that element has lots of child elements, it feels like there might be more of a performance hit to update each one individually rather than replace the contents with new `innerHTML` in one fell swoop.

## Summing Up

I love Stimulus’s modest and progressive enhancement friendly approach. I can see me adopting it as a means of writing modern, modular JavaScript which fits well in a [webpack](https://webpack.js.org/) context in situations where the interactive elements are relatively simple and not composed of complex, multidimensional data. 
