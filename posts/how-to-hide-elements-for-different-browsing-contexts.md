---
title: How to hide elements for different browsing contexts
description: How to hide elements for different browsing contexts
date: "2020-10-08T16:58:08.051Z"
tags: [development, a11y, howto, css, aria]
draft: true
---
Lorem ipsum
---

## TL;DR

https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html

There are three categories of hidden content:
- Completely Hidden.
- Visually Hidden.
- Only Hidden from Assistive Technology.
Depending on the type of content, you will need to use an appropriate technique to hide it, via:
Using CSS or [hidden] to hide content completely.
Using visually-hidden class to visually hide content, but keep it available for assistive technologies.
Or using aria-hidden="true" to hide content specifically from screen readers.
Going back to my initial question “why are we hiding content?”, it’s apparent that there are some elements of a UI that truly need to be hidden. And while we have techniques to hide content, but still make it accessible for assistive technology users, I wouldn’t necessarily jump to these techniques as design solutions.

The goal should be to craft interfaces and experiences that are accessible and understandable to as many people as possible. Not to create interfaces where we can shoe horn in additional context by visually hiding it by default.

---

LH: 
Most common requirements are:
- hide for everyone
- hide only visually
  -- providing additional text for screen readers but hiding visually
  -- hide something off-screen
- hide only from AT
  -- icons: display visually but hide from AT (e.g. using aria-hidden=true; focusable=false)
  -- UI elements that can be triggered open or shut

display none, 
the hidden attribute
visibility: hidden, 
inert, 
aria-hidden=true, 
role=presentation

---

Icon buttons: https://www.sarasoueidan.com/blog/accessible-icon-buttons/ (use techniques 1,2, or 3 but not 4 oR 5)
Although note that it might be better to use a visually-hidden/a11y-only class than aria-label https://gomakethings.com/revisting-aria-label-versus-a-visually-hidden-class/
---

## The CSS display property (e.g. display: none):

.hidden {
  display: none;
}

## The `hidden` attribute

The `hidden` attribute hides things not just visually but also from assistive technologies. 
So it’s similar to display: none but you can apply it in HTML. 
It’s a boolean attribute indicating that an element is “not yet relevant, or no longer relevant”.
It’s not supported under IE11. Not really a problem, however you can fix that like normalize.css do as follows:
[hidden] {
  display: none;
}

There are other issues, however. See https://css-tricks.com/the-hidden-attribute-is-visibly-weak/.
It probably makes more sense to do:
[hidden] { display: none !important; }



// H5BP’s main.css: Hide only visually, but make available to screen readers.
// Now includes Joe Watkins’s suggested updates (ref https://zellwk.com/blog/hide-content-accessibly/ and https://github.com/h5bp/main.css/issues/12)
// It’s worth checking in on the current state of H5BP’s .visuallyhidden class. 
// Or might want to go with this Gov.UK approach: https://github.com/h5bp/main.css/issues/12#issuecomment-451965809
// NB .a11y-only (meaning "for accessibility aids only" - credit @wilto) feels like a better class name than ".visually-hidden".

.a11y-only {
  border: 0;
  clip: rect(0 0 0 0);
  height: auto;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap; /* 1 */
  &.focusable:active,
  &.focusable:focus {
    clip: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    position: static;
    width: auto;
    white-space: inherit;
  }
}

## The CSS visibility property (e.g. visibility: hidden):

// H5BP’s main.css: hide visually AND from screen readers, but maintain layout.
// NB can’t see me using this class directly but it does no harm to note here the role of "visibility: hidden;".

.invisible {
  visibility: hidden;
}


## The CSS opacity property (e.g. visibility: hidden):



------

CSS-Tricks:
What about animation? 
- display cannot be animated

https://gomakethings.com/revisting-aria-label-versus-a-visually-hidden-class/

aria-hidden
