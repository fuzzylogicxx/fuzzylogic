---
title: "Animating the dialog element with CSS transition and @starting-style  "
description: A new way to animate a dialog element’s entrance and exit as a CSS transition
noteWithTitle: false
date: 2025-09-13T21:22
tags:
  - entry
  - animation
  - css
  - web
---
I’ve written before that [CSS `transition` is great for simple animations triggered by an event](https://fuzzylogic.me/posts/web-animation-tips/#simple-animation-with-transition-properties). You might want to transition something in response to a `focus` or `hover` event. Or, perhaps your use case is that the user activates a button to launch a previously-hidden `dialog` element and you want to use transition to animate the dialogue’s entrance and exit.

<!-- excerpt -->

We can use the CSS `@starting-style` at-rule to define property values on an element that we want to transition, where “starting” means the point at which it is first displayed on a previously loaded page, or when its `display` type changes from `none` to something else. And why is this needed? Because by default, CSS transitions only occur when a property value changes on a *visible* element. Now, thanks to `@starting-style` we can set “transition starting point styles” for *hidden* and dynamically-introduced elements.

In the case of a `dialog` you can use it to set starting values for properties that you want to transition from every time the `dialog` is opened. 

There are a couple of useful bits of context to know. Firstly, `dialog` has a user agent style of `display: none`. Secondly, modern HTML elements like `dialog` give us some nice state-related hooks, such as `dialog:open`.

Here’s the code (which I also have available in [a codepen](https://codepen.io/fuzzylogicx/pen/myeKeaG)).

```html
<button commandfor="my-dialog" command="show-modal">Launch dialogue</button>

<dialog id="my-dialog">
  Content here.
  <button commandfor="my-dialog" command="close" >close</button>
</dialog>
``` 

```css
/* Styles for a closed dialog. */
/* When it’s open, the `:open` styles below will override these. */
dialog {
  opacity: 0;
  transform: scaleY(0);
  /* list of properties we will transition */
  transition:
    opacity 0.7s ease-out,
    transform 0.7s ease-out,
    overlay 0.7s ease-out allow-discrete,
    display 0.7s ease-out allow-discrete;
}

/* Styles for an open dialog */
dialog:open {
  opacity: 1;
  transform: scaleY(1);
}

/* Styles the open dialog starts with and transitions from. */ 
/* Needs to come after the previous `dialog:open {}` rule to take effect, */
/* because the specificity is equal */
@starting-style {
  dialog:open {
    opacity: 0;
    transform: scaleY(0);
  }
}

/* Transition the :backdrop when the dialog is promoted to the top layer */
dialog::backdrop {
  background-color: transparent;
  transition:
    display 0.7s allow-discrete,
    overlay 0.7s allow-discrete,
    background-color 0.7s;
  /* Equivalent to transition: all 0.7s allow-discrete; */
}

dialog:open::backdrop {
  background-color: rgb(0 0 0 / 25%);
}

@starting-style {
  dialog:open::backdrop {
    background-color: transparent;
  }
}
```

For more details, see: 

* [Transitioning Dialog Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#transitioning_dialog_elements) on MDN
* [Transitioning a Popover](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using#transitioning_a_popover) on MDN
* [](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using#transitioning_a_popover)[@starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) on MDN
