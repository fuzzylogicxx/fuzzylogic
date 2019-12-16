---
date: "2019-12-14T23:49:56.471Z"
title: Async and Await
description: A more elegant way of handling promises
tags: [development, javascript, asynchronous]
---
My notes and reminders for handling promises with `async` and `await` In Real Life.
---

## `async` functions

The `async` function declaration defines an asynchronous function. 

Such functions execute in a separate order from than the rest of the code, and will always returns a promise.

So whatever it looks like it is returning, rest assured that this will be wrapped in a resolved promise implicitly.

## The `await` keyword

Notes: 

- `await` only works only inside `async` functions. 
- It’s used on things which return promises (e.g. `await fetch(url)`. 
- It makes JavaScript _wait_ until that promise settles and returns its result.
- It’s a more elegant syntax for getting a promise‘s result than `promise.then`.
- If a promise resolves normally, then `await promise` returns the result. 
- But in case of a rejection, it throws the error, just as if there were a throw statement at that line. 
- That throw will mean that execution of the current function will stop (the next statements won't be executed), and control will be passed to the first catch block in the call stack. If no catch block exists among caller functions, the program will terminate.
- Wrapping an `await` in a `try...catch` is a nice pattern for including error handling.

References:
- [Explanation and patterns on javascript.info](https://javascript.info/async-await)
