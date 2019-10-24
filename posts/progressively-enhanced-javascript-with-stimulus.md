---
title: Progressively Enhanced JavaScript with Stimulus
description: I’m dipping my toes into the JavaScript micro-framework from Basecamp
date: 2019-10-24
tags: [web, development, javascript, framework, progressiveenhancement]
---
I’m dipping my toes into the JavaScript micro-framework from Basecamp. Here’s my initial notes.
---

I immediately like the ethos of [Stimulus](https://stimulusjs.org/handbook/introduction).

The creators’ take is that in many cases, using one of the popular contemporary JavaScript frameworks is overkill.

We don’t always need a nuclear solution that:

- takes over our whole front end;
- renders entire, otherwise empty pages from JSON data;
- manages state in JavaScript objects or Redux; or
- requires a proprietary templating language.

Instead, Simulus suggests a more “modest” solution – using an existing server-rendered HTML document as its basis (either from the initial HTTP response or from an AJAX call), and then progressively enhancing.

Interestingly, it stores state in the HTML/DOM.

It promotes _readable markup_ – being able to read a fragment of HTML and know what’s going on.

## How it works

Stimulus’ technical purpose is to automatically connect DOM elements to JavaScript objects which are implemented via ES6 classes. The connection is made by `data–` attributes (rather than CSS classes). `data-controller` values connect and disconnect Stimulus controllers.

The key elements are:

- Controllers
- Actions (essentially event handlers) which trigger controller methods
- Targets (elements which we want to read or write to, mapped to controller properties)

## Some nice touches

I like the way you can use the `connect()` method as a place to check for support for a given feature before applying a JS-based enhancement.

It also readily supports having multiple instances of a controller on the page.

Also, actions and targets can be added to any type of element without the controller JavaScript needing to know or care, which supports _loose coupling_ between HTML and JavaScript.

## Managing State in Stimulus

- initial state can be read in from the HTML (from a DOM attribute)
- In the controller object we have a this.data API with has(), get(), and set() methods.
- we can use those methods to set new values back into our DOM attribute, so that state lives entirely in the DOM without the need for a JavaScript state object

## Possible Limitations

Feels a bit restrictive if dealing with elements that don’t just do one (or two) things; say, for example, a table with lots of rows and columns, each differing in multiple ways. 
And if element has a lot of child elements, it feels like there might be more of a performance hit to update each one individually rather than replace the lot with new `innerHTML` in one fell swoop.
