---
title: Testing Stimulus Controllers
description: Stimulus JS is great but doesn’t provide any documentation for
  testing controllers, so here’s some of my own
date: 2020-02-06T23:47:51.548Z
mainImage.isAnchor: false
tags:
  - web
  - development
  - stimulus
  - javascript
  - testing
  - jest
draft: false
---
Stimulus JS is great but doesn’t provide any documentation for testing controllers, so here’s some of my own that I’ve picked up.

## Required 3rd-party libraries

- [jest](https://jestjs.io/)
- [jest-dom](https://github.com/testing-library/jest-dom)

## Basic Test

<figure>

``` js
// hello_controller.test.js
import { Application as StimulusApp } from "stimulus";
import HelloController from "path/to/js/hello_controller";

describe("HelloController", () => {
  beforeEach(() => {
    // Insert the HTML and register the controller
    document.body.innerHTML = `
      <div data-controller="hello">
        <input data-target="hello.name" type="text">
        <button data-action="click->hello#greet">
          Greet
        </button>
        <span data-target="hello.output">
        </span>
      </div>
    `;
    StimulusApp.start().register('hello', HelloController);
  })

  it("inserts a greeting using the name given", () => {
    const helloOutput =  document.querySelector("[data-target='hello.output']");
    const nameInput = document.querySelector("[data-target='hello.name']");
    const greetButton = document.querySelector("button");
    // Change the input value and click the greet button
    nameInput.value = "Laurence";
    greetButton.click();
    // Check we have the correct greeting
    expect(helloOutput).toHaveTextContent("Hello, Laurence!");
  })
})
```

</figure>