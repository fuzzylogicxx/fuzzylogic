---
title: How to hide elements on a web page
description: How and why we might hide elements from different browsing contexts
date: 2020-10-08T10:58:00Z
tags:
- development
- a11y
- howto
- css
- aria
- html
draft: false

---
## When hiding an element, accessibility should be front and centre in our thoughts. Typically we’ll be trying to reconcile some visual design effect with the need to keep things inclusive and part of that job involves identifying those users from whom the content can safely be hidden and those for whom it must remain accessible. Having established that we can then choose and use the appropriate best practice technique. Inspired by Scott O’Hara’s definitive guide [Inclusively Hidden](https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html), here’s my approach.

Firstly, try to _avoid_ the need to hide stuff. With a bit more thought and by using existing fit-for-purpose HTML tools, we can perhaps create a single user interface and experience that works for all. That approach not only feels like a more equal experience for everyone but also probably removes margin for error and unnecessary additional code maintenance.

But if you do need to hide something…

The most common categories of hiding are:

1. Hide from everyone
2. Hide visually (i.e. from sighted people)
3. Hide from Assistive Technologies (such as screen readers)

## Hide from everyone

We usually hide an element from everyone because the hidden element forms part of a component’s interface design. Typical examples are tab panels, off-screen navigation, and modal dialogues that are initially hidden until an event occurs which should bring them into view. Initially these elements should be _inaccessible_ but after the trigger event, they become available to everyone.

Implementation involves using JavaScript to toggle an HTML attribute or class on the relevant element. 

For basic, non-animated show-and-hide interactions:

1. if you want the content to be available in the event of CSS not loading, toggle a class which applies `display: none` in CSS.
2. if you want the content to start hidden regardless of CSS being available or not, toggle the `hidden` attribute.

I tend to keep it safe and simple and stick with a `.hide` class that applies `display: none`.

For cases where you are animating or sliding the hidden content into view, toggle a class which applies `visibility: hidden` (because it respects CSS transitions) together with other CSS positioning and transform properties. Note that `visibility: hidden` does not remove the element from the DOM so its physical space is still retained, therefore it’s best to pair it with `opacity: 0` or `max-height: 0px; overflow: hidden`.

## Hide visually (i.e. from sighted people)

We’ll usually want to hide an element visually when its purpose is to provide extra context to Assistive Technologies in a situation where a user interface design works _visually_ but is otherwise insufficient.

An example might be adding visually-hidden text to accompany an element which is only represented by an icon.

## Hide from Assistive Technologies (such as screen readers)

We sometimes hide _visual elements_ from Assistive Technologies because they are decorative and accompanied by adjacent _text_, for example a “warning” icon with the text “warning” alongside. If we did not intervene then AT would read out the same text twice which is redundant.