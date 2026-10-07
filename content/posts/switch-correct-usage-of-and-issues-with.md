---
title: Switch, correct usage of and issues with
description: Switch, correct usage of and issues with
noteWithTitle: false
date:
  ? "{ now }"
---
[Chris F has written about a Toggle Switch component](https://gomakethings.com/creating-a-toggle-switch-with-just-css/) he’s [created for his UI framework, Kelp](https://kelpui.com/docs/components/switch/#switch-checkbox). 

Under the hood, the switch is a checkbox.

Chris does all manner of cool things and I learned stuff.

But I’m not sure about the use of a checkbox as a switch.

For one, that suggests to me that it’s part of a form therefore there’ll be a submit button, therefore it won’t apply straight away but rather needs the additional action of using the submit button.

(Alternatively, Chris might not be thinking that way and might be applying the change immediately on interaction with the checkbox. If so, not sure how I feel about that either.)

It’s not clear. That’s maybe a slight weakness in the docs. It doesn’t suggest how to use and what not to do, but only on what you can do. If we did that in our DS, it wouldn’t be great. 

I’m inclined to think that switches should take effect straight away. And therefore that checkboxes might not be the right element.

[Adrian R:](https://adrianroselli.com/2019/03/under-engineered-toggles.html)

> Use `<input type="checkbox">` if: you want to progressively enhance the control (and/or) flipping the toggle will only take effect when the user submits it

[Scott R](https://github.com/scottaohara/aria-switch-control):

> The expected user experience of a switch control is for an immediate action to take place. For instance, toggling a light/dark theme for a website or application, where the change should instantly take effect.
>
> A checkbox, which is often found within a form, or in other UI where multiple elements can be checked, may not be understood to enact an immediate change to other elements or content in the document/screen. That's not to say additional information couldn't be presented to the user to indicate such functionality for a checkbox, but it's not a standard expectation.

Also:

Person who recommended that [checkboxes should be considered delayed action rather than immediate action](https://github.com/w3c/aria-practices/issues/2647) and a good conversation on the topic.

[APG’s switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
