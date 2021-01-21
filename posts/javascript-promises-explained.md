---
title: Promises in JavaScript
description: A brief explainer (for future-me and anyone else it helps) on what
  promises are and how to use them.
date: 2018-12-13T17:07:00.000Z
mainImage.isAnchor: false
tags:
  - entry
  - promises
  - javascript
  - burger
  - asynchronous
---
## A brief explainer (for future-me and anyone else it helps) on what promises are and how to use them. Note: this is not an *official* definition, but rather something that works for me.

In the normal run of things, JavaScript code is *synchronous*. When line 1 has run (perhaps defining a new variable) and the operation has completed, line 2 runs (perhaps operating on the variable we just defined). However sometimes in line 1 we need to do something which will take longer – maybe an unknown length of time – for example to call a function which fetches data from an external API. In many cases we don’t mind that taking a while, or even eventually failing, but we want it to execute *separately* from the main JavaScript thread so as not to hold up the execution of line 2. So instead of waiting for the task to complete and return its value, our API-calling function instead returns a *promise* to supply that value in the future.

A Promise is an object we use for asynchronous operations. It’s a proxy for the success value or failure reason of the asynchronous operation, which at the time the promise is created is not necessarily yet known.

A promise is in one of three states:

* pending
* fulfilled (the operation completed successfully)
* rejected (the operation failed)x

We say a pending promise can either be fulfilled with a value, or rejected with a reason (error).

We also talk about a promise being *settled* which essentially means that the operation has finished so the promise is ready to be acted on accordingly.

One memorable analogy was provided in Mariko Kosaka’s *[The Promise of a Burger Party](https://web.archive.org/web/20190212114232/http://kosamari.com/notes/the-promise-of-a-burger-party)*. In it she describes the scenario of ordering a burger from, say, Burger King. It goes something like this:

* you place your order for a Whopper; 
* they give you a tray with a buzzer. The tray is a *promise* that they will provide your burger as soon as it has been cooked, and the buzzer is the promise‘s *state*; 
* the buzzer is not buzzing to start with: it’s in the *pending* state;
* the buzzer buzzes: the promise is now *settled*;
* they might inform you that their flame-grill broke down half-way through. The cooking operation failed, and the promise of a burger has been rejected with that reason. You’ll likely want to act on that (by getting a refund);
* alternatively all goes to plan, you go the counter and they fulfil their promise of a tasty burger placed onto your tray.
* you decide you want to act on the success of getting your tasty burger by doing another thing, namely buying a coke. In code you’ll be within the `.then()` success handler for your promise and in there you can just call `buyCoke()`. (Note: the \`buyCoke()\` operation might be *synchronous*; the real life analogy being that it’s so quick to pour a coke that the assistant does it and serves it on a tray immediately rather than giving you a tray as a promise for it.) At the end of your \`then()\` you might choose to return a \`meal\` object which combines your burger and coke. 
* You could then chain a further `.then()` to the original `.then()` to work with your snowballing data value. Note that a `.then()` always returns a promise, even if the operation which happened within was not asynchronous.

## Promise syntax

There are two things we need to be able to do with promises: 

1. create and return them; 
2. work with a returned promise.

### Create and return a promise

When you create a promise you pass a function known as the executor to it, which runs instantly. Its arguments `resolve` and `reject` are callbacks provided by JavaScript. Our code goes inside the executor.

<figure>

```

let promise = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…

  if (/* everything turned out fine */) {
    resolve("Stuff worked!");
  } else {
    reject(Error("It broke"));
  }
});

```

</figure>

### Work with a returned promise

<figure>

```
let story_promise = getStory('story.json');
story_promise
.then(function(response) {
  console.log("Success!", response);
})
.catch(function(error) {
  console.log("Failed!", error);
})

```

</figure>

## References

- [Promises, by Jake Archibald](https://web.dev/promises/)
- [Promises, by javascript.info](https://javascript.info/promise-basics)
