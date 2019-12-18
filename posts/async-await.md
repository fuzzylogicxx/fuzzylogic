---
date: "2019-12-14T23:49:56.471Z"
title: Async and Await
description: A more elegant way of handling promises
tags: [development, javascript, asynchronous]
---
My notes and reminders for handling promises with `async` and `await` In Real Life.
---

## `async` functions

The `async` function declaration defines an _asynchronous function_ i.e. a function whose processes can operate independently of other processes and can respond at its own convenience.

`async` functions always returns a promise. So regardless of what it might appear to be returning, rest assured that this return value will be implicitly wrapped in a resolved promise.

## The `await` keyword

Notes:

- `await` is used on functions which return promises (e.g. `await fetch(url)`).
- It makes JavaScript _wait_ until that promise settles and returns its result.
- It may only be used inside `async` functions.
- It’s a more elegant syntax for getting a promise‘s result than `promise.then`.
- If the promise resolves successfully, then `await promise` returns the result.
- But in the case of promise rejection, it throws the error, just as if there were a `throw` statement at that line.
- That `throw` will cause execution of the current function to stop (so the next statements won't be executed), with control passed to the first `catch` block in the call stack. If no `catch` block exists among caller functions, the program will terminate.
- Wrapping an `await` in a `try...catch` is a really nice and well-suited pattern for including error handling, providing flexibility and aiding readability.

Here’s a `try...catch` -based example. (NB let’s assume that we have an HTML list and that function `load()` is triggered by clicking a “load more posts” button and that the `fetchURL` endpoint returns some HTML):

``` js
export default class LoadMore {

  async fetchItems(url) {
    const response = await fetch(url, { method: "GET" });
    if (response.ok) {
      return response.text();
    }
    throw new Error("Sorry, there was a problem fetching additional items.");
  }

  async load() {
    const fetchURL = "https://mysite.com/products/";
    try {
      const newItems = await this.fetchItems(fetchURL);
      // If we’re here, we know our promise fulfilled.
      // Render our new HTML items into the DOM.
      // ...
      this.renderItems(newItems);
    } catch (err) {
      this.displayError(err);
    }
  }

  displayError(err) {
    const errorMsgContainer = document.querySelector("[data-target='error-msg']");
    errorMsgContainer.innerHTML = `<span class="error">${err}</span>`;
  }

}
```



References:
- [Explanation and patterns on javascript.info](https://javascript.info/async-await)
