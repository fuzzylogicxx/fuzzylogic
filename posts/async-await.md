---
date: "2019-12-14T23:49:56.471Z"
title: Async and Await
description: A more elegant way of handling promises
tags: [development, javascript, asynchronous]
---
My notes and reminders for handling promises with `async` and `await` In Real Life.
---

As I see it, the idea is to switch to using `await` when working with promise-returning, asynchronous operations (such as `fetch`) because it lends itself to more flexible and readable code.

## The `await` keyword

Notes:

- `await` is for use on functions which return [promises](https://fuzzylogic.me/posts/javascript-promises-explained/) (e.g. `const users = await fetch('/users')`).
- It makes the next line of JavaScript _wait_ until that promise settles and returns its result. 
- It may only be used inside `async` functions. This make sense as you’d only want the “waiting” behaviour to happen within that limited context. 
- It’s a more elegant syntax for getting a promise‘s result than `promise.then`.
- If the promise resolves successfully, it returns the result.
- If the promise rejects, it throws the error, just as if there were a `throw` statement at that line.
- That `throw` causes execution of the current function to stop (so the next statements won't be executed), with control passed to the first `catch` block in the call stack. If no `catch` block exists among caller functions, the program will terminate.
- Given this “continue or throw” behaviour, wrapping an `await` in a `try...catch` is a really nice and well-suited pattern for including error handling, providing flexibility and aiding readability.

## `async` functions

The `async` function declaration (i.e. `async function f()`):

- defines an _asynchronous function_ i.e. a function whose processes run after the main call stack and can respond at its own convenience.
- always returns a promise. (Its return value is implicitly wrapped in a resolved promise.)
- allows us to use `await`.

Here’s a `try...catch` -based example. (NB let’s assume that we have a list of blog articles, and that function `load()` is triggered by clicking a “load more articles” button, and that the `fetchURL` endpoint returns more articles as HTML):

<figure>
  
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
      // We might add some other `await` (because async/await is useful for this kind of sequencing), or just…
      // Render our new HTML items into the DOM.
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

</figure>

Here’s another example. Let’s say that we needed to wait for multiple promises to resolve:

<figure>

``` js
const allUsers = async () => {
  try {
    let results = await Promise.all([
      fetch(userUrl1),
      fetch(userUrl2),
      fetch(userUrl3)
    ]);
    // we’ll get here if the promise returned by await
    // resolved successfully.
    // We can output a success message.
    // ...
  } catch (err) {
    this.displayError(err);
  }
}
```

</figure>

Using `await` within a `try...catch` is my favourite approach but sometimes it’s not an option because we’re at the topmost level of the code therefore not in an `async` function. In these cases it’s good to remember that we can call an `async` function and work with its returned value like any promise, i.e. using `then` and `catch`.

For example:

<figure>

``` js
async function loadUser(url) {
  const response = await fetch(url);
  if (response.status == 200) {
    const json = await response.json();
    return json;
  }
  throw new Error(response.status);
}

loadUser('no-user-here.json')
  .then((json) => {
    // resolved promise, so do something with the json
    // ...
  })
  .catch((err) => {
    // then() returns a promise, so is chainable.
    // rejected promise, so do something with the json
    document.body.innerHTML = "foo";
  });
```

</figure>

References:
- [Explanation and patterns on javascript.info](https://javascript.info/async-await)
