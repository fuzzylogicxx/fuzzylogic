---
title: JavaScript-free dialogues
description: "Using the HTML commandfor attribute to launch dialogues and form
  method=dialog to close ‘em "
noteWithTitle: false
date: 2025-08-13T23:34
tags:
  - entry
  - html
  - dialog
  - modal
  - javascript
---
At work, my talented colleague [Anda](http://andapopovici.com/) and I have been taking a fresh look at modal dialogues with a view to modernising relevant design system components. 

During this project I’ve expanded [my knowledge of the HTML dialog element](https://fuzzylogic.me/tags/dialog/) and how to use it. And I’ve really enjoyed learning that we’re now in an era where you have the option to both launch and dismiss a dialogue without any reliance on JavaScript. That’s good news not only for resilience but also for lean development and maintenance. It’s also just cool – go HTML!

To let users dismiss a `dialog` we can nest inside it an implicit or explicit `button type=submit` inside a `form method=dialog`. Activating this button causes the dialog box to close, the states of any other form controls to be saved but not submitted, and sets the [`dialog.returnValue`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/returnValue) to the `value` of the button. Here’s an example:

```html
<dialog>
  <p>Hello world</p>
  <form method="dialog">
    <button>Close</button>
  </form>
</dialog>
```

At first this felt nice but not particularly useful in real life, since dialogues often contain “real forms” that might typically need a method of POST. I foresaw issues in having to nest one form inside the other which isn’t feasible, and also I imagined you’d typically want a second dismissal button (perhaps labelled *Cancel*) at the bottom of the “real form” and would want that to reuse the same dismissal approach which might be tricky if it’s not directly inside the `form method=dialog`. 

However I can see two ways around the issues. Firstly you could have both forms, non-nested, and still make one of the buttons in the main form act as a “close” button for the `method=dialog` form by judicious use of button’s `form` attribute. Check out my pen: [Putting the submit button of a \`form method=dialog\` inside another “main” form.](https://codepen.io/fuzzylogicx/pen/KwdMRZb) As an alternative option, I believe you could even dispense with the form that uses `method=dialog` by applying `formmethod=dialog` to buttons responsible for dismissing the dialog. That’d allow you to just have the single “main” form. 

When thinking about launching dialogues I discovered the new [Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API). This gives the `button` element new attributes that we can use to declaratively associate the button with another element such as a `dialog`. We can additionally specify a method of that associated element that we want executed when our button is activated. Here’s an example:

```html
<button commandfor="mydialog" command="show-modal">Show modal dialog</button>
<dialog id="mydialog">
  Dialog Content
</dialog>
```

Taking things a step further, you could also use the Invoker API to create the button(s) for dismissing the `dialog` too, rather than the form-based approach I mentioned previously.

```html
<dialog id="mydialog">
  <button commandfor="mydialog" command="close">Close</button>
  Dialog Content
</dialog>
```

At present, the `commandfor` attribute does not yet work across all the major browsers. So right now we won’t be using the Invoker API in production – or if we do it’d only be in cases where we’re using using JS to create a `button` and can first do [feature detection](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing/Feature_detection) to check if the user’s browser supports invoker commands. For now we’ll likely find other ways to launch dialogues, and if we want a non-JS-reliant way to close a `dialog` we’d reach for the “form method” approach.

But in general the future of powerful, declarative HTML looks bright and full of opportunities.
