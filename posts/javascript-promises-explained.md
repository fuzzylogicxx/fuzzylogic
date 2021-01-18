---
title: JavaScript Promises explained
description: A brief explainer (for future-me and anyone else it helps) on what
  promises are and how to use them.
date: 2019-12-13T17:07:38.868Z
mainImage.isAnchor: false
tags:
  - entry
  - promises
  - javascript
  - burger
  - asynchronous
draft: true
---
## A brief explainer (for future-me and anyone else it helps) on what promises are and how to use them. Note: this is not an _official_ definition, but rather something that works for me.

In the normal run of things, JavaScript code is _synchronous_. When line 1 has run (perhaps defining a new variable) and the operation has completed, line 2 runs (perhaps operating on the variable we just defined). However sometimes in line 1 we need to do something which will take longer – maybe an unknown amount of time – for example to call a function which make an API call to an external source. In many cases we want that potentially lengthy task to execute _separately_ from the main thread so as not to hold up the execution of line 2. So instead of waiting for the task to complete and return its value, we instead return a _promise_ to supply that value in the future.

A Promise is an object we use for asynchronous operations. It’s a proxy for the success value or failure reason of the asynchronous operation, which at the time the promise is created is not yet known.

A promise is in one of three states:

- pending
- fulfilled (the operation completed successfully)
- rejected (the operation failed)

We say a pending promise can either be fulfilled with a value, or rejected with a reason (error).

We also talk about a promise being _settled_ which essentially means the operation has finished so the promise is ready to be acted on accordingly.

One memorable analogy was provided in Mariko Kosaka’s [_The Promise of a Burger Party_](https://web.archive.org/web/20190212114232/http://kosamari.com/notes/the-promise-of-a-burger-party). In it she describes the situation of ordering a burger from, say, Burger King. It goes as follows:

- you place your order for a Whopper; 
- they give you a tray with a buzzer. The tray is a _promise_ that they will provide your burger as soon as it has been cooked, and the buzzer is the promise‘s _state_; 
- the buzzer (the promise‘s state) is not buzzing to start with: it’s in the _pending_ state;
- the buzzer buzzes: the promise is now _settled_;
- if their flame-grill broke down half-way they inform you of this. The cooking operation has failed, and the promise of a burger has been rejected with that reason. You’ll likely want to act on that (by getting a refund);
- alternatively all goes to plan, you go the counter and they fulfil their promise of a tasty burger placed onto your tray.

Note that if in the success case (within a `.then()` in code) you decide you want to do another thing (say, buy a coke) you could do that too, and return its result. You could then chain a further `.then()` to work with the result of your snowballing result. Note that regardless of whether your second operation was asynchronous or synchronous, a `.then()` always returns another promise.
