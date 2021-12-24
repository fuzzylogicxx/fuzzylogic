---
date: 2021-12-22T22:42:48Z
title: Web animation tips
description: 'Some notes and tips to help quickly address animation challenges '
tags:
- entry
- javascript
- css
- development
- web
- transition
- animation
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
---
Warning: this entry is a work-in-progress and incomplete. That said, it's still a useful reference to me which is why I've published it. I’ll flesh it out soon!

There are lots of different strands of web development. You try your best to be good at all of them, but it ain’t gonna happen—there’s only so much time in the day! 

Animation is an area where I know _a little_ but would love to know more, and from a practical perspective I’d certainly benefit from having some ready solutions to common challenges. As ever I want to favour web standards over libraries where possible, and take an approach that’s accessible, progressively-enhanced and performance-optimised.

Here’s my attempt to break down web animation into bite-sized chunks for ocassional users like myself.
---

## A simple definition

Animation lets us make something visually move between different states over a given period of time.

## Simple animation with transition

Animation via the CSS `transition` shorthand property is the most performant method for subtle animations. It is suited to subtle hover and focus effects and also “entrance” and “exit” animations.

We can `transition` another property such as `transform` or `opacity` to move between two different element states that have been defined using that property. The first state would be in the element’s starting styles and the other in either its `:hover` or `:focus` styles or in a class that'd be applied by JavaScript following an event. Without the `transition` the state change would still happen (e.g. opacity change from 1 to 0) but would be instantaneous. 

One good “entrance and exit” use case would be a “Skip to content” link. The anchor’s initial state would be positioned off-canvas above the viewport (`transform: translateY(-10em)`) while its `:focus` styles define another state where the intial `translate` has been undone so that the link is visible (`transform: translateY(0em)`). If we `transition` the `transform` property then we can animate the change of state over a duration of our choice and with our preferred timing function (the latter creating an _acceleration curve_).

<figure>
  
``` html
<div class="has-animation rise">
  <span>rise</span>
</div>
```
  
</figure>

<figure>
  
``` css
.has-animation > * {
  --transition-property: transform;
  --transition-duration: 180ms;
  transition: var(--transition-property) var(--transition-duration) ease-in-out;
}

.rise:hover > * {
  transform: translateY(-25%);
}
```
  
</figure>

Note our use of custom properties to make it really easy to transition a different property without writing repetitious CSS.
