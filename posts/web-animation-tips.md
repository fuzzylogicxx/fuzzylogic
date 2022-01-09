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

Animation is an area where I know _a little_ but would love to know more, and from a practical perspective I’d certainly benefit from having some road-ready solutions to common challenges. As ever I want to favour web standards over libraries where possible, and take an approach that’s accessible, progressively-enhanced and performance-optimised.

Here’s my attempt to break down web animation into bite-sized chunks for ocassional users like myself.
---

## A simple definition

Animation lets us make something visually move between different states over a given period of time.

## Simple animation with transition

Animation via the CSS `transition` shorthand property is the most performant method for subtle animations. It is suited to subtle hover and focus effects.

We can `transition` another CSS property such as `transform` or `opacity` to move between two different element states that have been defined using that property. The first state would be in the element’s starting styles and the other in either its `:hover` or `:focus` styles or in a class that'd be applied by JavaScript following an event. Without the `transition` the state change would still happen (e.g. opacity change from 1 to 0) but would be instantaneous. 

Here’s an example “move up on hover” effect adapted from Stephanie Eckles’s [Smol CSS](https://smolcss.dev/#smol-transitions).
<figure>
  
``` html
<div class="u-animate u-animate--rise">
  <span>rise</span>
</div>
```
  
</figure>

<figure>
  
``` css
.u-animate > * {
  --transition-property: transform;
  --transition-duration: 180ms;
  transition: var(--transition-property) var(--transition-duration) ease-in-out;
}

.u-animate--rise:hover > * {
  transform: translateY(-25%);
}
```
  
</figure>

Note that 
1. we use custom properties to make it really easy to transition a different property than `transform` without writing repetitious CSS.
2. we have a parent and child (`<div>` and `<span>` respectively in this example) and we avoid the accidental flicker which can occur when the mouse is close to an animatable element’s border by having the child be the _effect_ which animates when the _trigger_ (the parent) is hovered.  

## Performance

A smooth animation should run at 60fps (frames per second). Animations that are too computationally expensive result in frames being dropped, i.e. a lesser fps rate, making the animation appear janky.

### Cheap and slick properties

The CSS properties `transform` and `opacity` are very cheap to animate. Also, browsers often optimise these types of animation using hardware acceleration. To hint to the browser that it should optimise an animation property (and to ensure it is handled by the GPU rather than passed from CPU to GPU causing a noticeable glitch) we should use the CSS `will-change` property.

<figure>
  
``` css
.my-element {
  will-change: transform;
}
```
  
</figure>

### Expensive properties

CSS properties which affect layout such as `height` are very expensive to animate. Animating height causes a chain reaction where sibling elements have to move too. Use `transform` over layout-affecting properties such as `width` or `left` if you can.

Some other CSS properties are less expensive but still not ideal, for example `background-color`. It doesn't affect layout but requires a repaint per frame. 

Test your animations on a popular low-end device.

## Timing functions

- linear goes at the same rate from start to finish. It’s not like most motion in the real world.
- ease-out starts fast then gets really slow. Good for things that come in from off-screen, like a modal dialogue.
- ease-in starts slow then gets really fast. Good for moving somethng off-screen.
- ease-in-out is the combination of the previous two. It‘s symmetrical, having an equal amount of acceleration and deceleration. Good for things that happen in a loop such as element fading in and out.
- ease is the default value and features a brief ramp-up, then a lot of deceleration. It’s a good option for most general case motion that doesn’t enter or exit the viewport.

## Practical examples

Intro to be written.

### Skip to content

The anchor’s initial state would be positioned off-canvas above the viewport (`transform: translateY(-10em)`).

Its `:focus` styles define a different state where the intial `translate` has been undone so that the link is visible (`transform: translateY(0em)`). 

If we `transition` the `transform` property then we can animate the change of state over a chosen duration, and with our preferred timing function for the _acceleration curve_.

### Animated disclosure

Like [BBC Sounds’ playlists](https://www.bbc.co.uk/sounds/play/m0012d93) on narrow viewports.

To be written.

<!-- this might be relevant https://css-tricks.com/newsletter/277-animating-height/ -->

### Ringing bell icon

To be written.

### Pulsing “radar” effect

To be written.

<!-- 
My animation-related pens that might be handy
- Auto slide-in (after delay) then slide out w. CSS and vanilla JS https://codepen.io/fuzzylogicx/pen/OYZmVQ
- Animate a scrolled-to element w. vanilla JS and CSS https://codepen.io/fuzzylogicx/pen/vwjgbq
- Fade in and out on page load with CSS https://codepen.io/fuzzylogicx/pen/ZNoLQB
- Using Vanilla JS Animations Helper Function and animate.css https://codepen.io/fuzzylogicx/pen/gywbwr
- Animate slide up like jQuery with just CSS & JS https://codepen.io/fuzzylogicx/pen/YMWRYB
- Fade out on click with a JS-applied class to trigger CSS transition and opacity https://codepen.io/fuzzylogicx/pen/6cd1db274f5ff23233b50c6140e600fa
-->

## Accessibility

Accessibility and animation can co-exist, as Cassie Evans explains in her CSS-Tricks article [Empathetic Animation](https://css-tricks.com/empathetic-animation/). We should consider which parts of our website are suited to animation (for example perhaps not on serious, time-sensitive tasks) and we can also respect reduced motion preferences at a global level or in a more finer-grained way per component. 

## Notes

- `transition-delay` can be useful for avoiding common annoyances, such as when a dropdown menu that appears on hover disappears when you try to move the cursor to it.

## References

- [CSS transitions and transforms](https://thoughtbot.com/blog/transitions-and-transforms) on Thoughtbot
- [CSS Transitions](https://www.joshwcomeau.com/animation/css-transitions/) by Josh Comeau
