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

There are lots of different strands of web development. You try your best to be good at all of them, but there’s only so much time in the day! Animation is an area where I know _a little_ but would love to know more, and from a practical perspective I’d certainly benefit from having some road-ready solutions to common challenges. As ever I want to favour web standards over libraries where possible, and take an approach that’s lean, accessible, progressively-enhanced and performance-optimised.

Here’s my attempt to break down web animation into bite-sized chunks for ocassional users like myself.
---

## Defining animation

Animation lets us make something visually move between different states over a given period of time.

## Benefits of animation

Animation is a good way of providing visual feedback, teaching users how to use a part of the interface, or adding life to a website and making it feel more “real”.

## Simple animation with `transition` properties

CSS `transition` is great for simple animations triggered by an event.

We start by defining two different states for an element—for example `opacity:1` and `opacity:0`—and then `transition` between those states.

The first state would be in the element’s starting styles (either defined explicitly or existing implicitly based on property defaults) and the other in either its `:hover` or `:focus` styles or in a class applied by JavaScript following an event.

Without the `transition` the state change would still happen but would be instantaneous.

You’re not limited to only one property being animated and might, for example, transition between different `opacity` and `transform` states simultaneously.

Here’s an example “rise on hover” effect, adapted from Stephanie Eckles’s [Smol CSS](https://smolcss.dev/#smol-transitions).

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

Note that:
1. using custom properties makes it really easy to transition a different property than `transform` without writing repetitious CSS.
2. we have a parent and child (`<div>` and `<span>` respectively in this example) allowing us to avoid the accidental flicker which can occur when the mouse is close to an animatable element’s border by having the child be the _effect_ which animates when the _trigger_ (the parent) is hovered.

## Complex animations with `animation` properties

If an element needs to animate automatically (perhaps on page load or when added to the DOM), or is more complex than a simple A to B state change, then a CSS `animation` may be more appropriate than `transition`. Using this approach, animations can:

- run automatically (you don’t _need_ an event to trigger a state change)
- go from an initial state through multiple intermediate steps to a final state rather than just from state A to state B
- run forwards, in reverse, or alternate directions
- loop infinitely

The required approach is:

1. use `@keyframes` to define a reusable “template” set of animation states (or _frames_); then
1. apply `animation` properties to an element we want to animate, including one or more `@keyframes` to be used.

Here’s how you do it:

<figure>

``` css
@keyframes flash {
  0%    { opacity: 0; }
  20%   { opacity: 1; }
  80%   { opacity: 0; }
  100%  { opacity: 1; }
}

.animate-me {
  animation: flash 5s infinite;
}
```

</figure>

Note that you can also opt to include just one state in your `@keyframes` rule, usually the initial state (written as either `from` or `0%`)  or final state (written as either `to` or `100%`). You’d tend to do that for a two-state animation where the other “state” is in the element’s default styles, and you’d either be _starting_ from the default styles (if your single `@keyframes` state is `to`) or finishing on them (if your single `@keyframes` state is `from`).

## Should I use `transition` or `animation`?

As far as I can tell there’s no major performance benefit of one over the other, so that’s not an issue.

When the animation will be triggered by pseudo-class-based events like `:hover` or `:focus` and is simple i.e. based on just two states, `transition` feels like the right choice. 

Beyond that, the choice gets a bit less binary and seems to come down to developer preference. But here are a couple of notes that might help in making a decision.

For elements that need to “animate in” on page load such as an alert, or when newly added to the DOM such as items in a to-do list, an `animation` with `keyframes` feels the better choice. This is because `transition` requires the presence of two CSS rules, leading to dedicated JavaScript to grab the element and apply a class, whereas `animation` requires only one and can move between initial and final states automatically including inserting a delay before starting. 

For animations that involve many frames; control over the number of iterations; or looping… use `@keyframes` and `animation`.

For utility classes and classes that get added by JS to _existing, visible_ elements following an event, either approach could be used. Arguably `transition` is the slightly simpler and more elegant CSS to write if it covers your needs. Then again, you might want to reuse the animations applied by those classes for both existing, visible elements and new, animated-in elements, in which case you might feel that instead using `@keyframes` and `animation` covers more situations.

## Performance

A smooth animation should run at 60fps (frames per second). Animations that are too computationally expensive result in frames being dropped, i.e. a reduced fps rate, making the animation appear janky.

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

You can find lots of animation inspiration in libraries such as [animate.css](https://animate.style/) (and be sure to [check animate.css on github](https://github.com/animate-css/animate.css) where you can search their source for specific `@keyframe` animation styles).

But here are a few specific examples of animations I or teams I’ve worked on have had to implement.

### Skip to content

The anchor’s _State A_ sees its position `fixed`—i.e. positioned relative to the viewport—but then moved out of sight above it via `transform: translateY(-10em)`. However its `:focus` styles define a _State B_ where the intial `translate` has been undone so that the link is visible (`transform: translateY(0em)`). If we `transition` the `transform` property then we can animate the change of state over a chosen duration, and with our preferred timing function for the _acceleration curve_.

HTML:

<figure>

``` html
<div class="u-visually-hidden-until-focused">
  <a
    href="#skip-link-target"
    class="u-visually-hidden-until-focused__item"
  >Skip to main content</a>
</div>

<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/">News</a></li>
    <li><a href="/">About</a></li>
    <!-- …lots more nav links… -->
    <li><a href="/">Contact</a></li>
  </ul>
</nav>

<main id="skip-link-target">
  <h1>This is the Main content</h1>
  <p>Lorem ipsum <a href="/news/">dolor sit amet</a> consectetur adipisicing elit.</p>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
</main>
```

</figure>

CSS:

<figure>

``` css
.u-visually-hidden-until-focused {
  left: -100vw;
  position: absolute;

  &__item {
    position: fixed;
    top: 0;
    left: 0;
    transform: translateY(-10em);
    transition: transform 0.2s ease-in-out;

    &:focus {
      transform: translateY(0em);
    }
  }
}
```

</figure>

To see this in action, visit my pen [Hiding: visually hidden until focused](https://codepen.io/fuzzylogicx/debug/bGRjvVj) and press the <kbd>tab</kbd> key.

### Animating in an existing element

For this requirement we want an element to animate from invisible to visible on page load. This is pretty straightforward with CSS only using `@keyframes`, `opacity` and `animation`.

Check out my [fade in and out on page load with CSS](https://codepen.io/fuzzylogicx/pen/ZNoLQB?editors=1100) codepen.

### Animating in a newly added element

Stephanie Eckles shared a great CSS-only solution for [animating in a newly added element](https://thinkdobecreate.com/articles/css-animating-newly-added-element/) which handily includes a Codepen demo. She mentions “CSS-only” because it’s common for developers to achieve the fancy animation via `transition` but that means needing to “make a fake event” via a JavaScript `setTimeout()` so that you can transition from the newly-added, invisible and class-free element state to adding a CSS class (perhaps called `show`) that contains the `opacity:1`, fancy transforms and a `transition`. However Stephanie’s alternative approach combines i) hiding the element in its default styles; with ii) an automatically-running `animation` that includes the necessary delay and also finishes in the keyframe’s single `100%` state… to get the same effect minus the JavaScript. 

Avoiding reliance on JS and finding a solution lower down the stack is always good.

<figure>

HTML: 
  
``` html
<button>Add List Item</button>
<ul>
  <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum facilis perspiciatis dignissimos, et dolores pariatur.</li>
</ul>
```
  
CSS: 
  
``` css
li {
  animation: show 600ms 100ms cubic-bezier(0.38, 0.97, 0.56, 0.76) forwards;

  // Prestate
  opacity: 0;
  // remove transform for just a fade-in
  transform: rotateX(-90deg);
  transform-origin: top center;
}

@keyframes show {
  100% {
    opacity: 1;
    transform: none;
  }
}
```

</figure>

Jhey Tompkins shared another CSS-only technique for [adding elements to the DOM with snazzy entrance animations](https://codepen.io/jh3y/pen/KKyrQYZ). He also uses just a single `@keyframes` state but in his case the `from` state which he uses to set the element’s initial `opacity:0`, then in his animation he uses an `animation-fill-mode` of `both` (rather than `forwards` as Stephanie used). 

I can’t profess to fully understand `both` however if you change Jhey’s example to use `forwards` instead, then the element being animated in will temporarily appear before the animation starts (which ain’t good) rather than being initially invisible. Changing it to `backwards` gets us back on track, so I guess the necessary value relates to whether you’re going for `from`/`0%` or `to`/`100%`… and `both` just covers you for both cases. I’d probably try to use the appropriate one rather than `both` just in case there’s a performance implication.

### Animated disclosure

Here’s an interesting conundrum.

For disclosure (i.e. show and hide) widgets, I tend to either use the native HTML `<details>` element if possible or else a [simple, accessible DIY disclosure](https://codepen.io/fuzzylogicx/pen/YzQjyoj?editors=1010) in which executing a `trigger` toggles a content element’s `hidden` attribute. In both cases, there’s no animation; the change from hidden to revealed and back again is immediate.

To my mind it’s generally preferable to keep it simple and avoid animating a disclosure widget. For a start, it’s tricky! The `<details>` element can’t be (easily) animated. And if using a DIY widget it’ll likely involve animating one of the [expensive properties](#expensive-properties). Animating `height` or `max-height` is also gnarly when working with variable (auto) length content and often requires developers to go beyond CSS and reach for JavaScript to calculate computed element heights. Lastly, forgetting the technical challenges, there’s often _no real need_ to animate disclosure; it might only hinder rather than help the user experience.

But let’s just say you _have to do it_, perhaps because the design spec requires it (like in [BBC Sounds’ expanding and collapsing tracklists](https://www.bbc.co.uk/sounds/play/m0012d93) when viewed on narrow screens).

Options:
- [Animate the `<details>` element](https://css-tricks.com/how-to-animate-the-details-element-using-waapi/). This is a nice, standards-oriented approach. But it might only be viable for when you don’t need to mess with `<details>` appearance too much. We’d struggle to apply very custom styles, or to handle a “show the first few list items but not all” requirement like in the BBC Sounds example;
- [Animate CSS Grid](https://nemzes.net/posts/animating-height-auto/#the-solutions). This is a nice idea but for now the animation only works in Firefox. It’d be great to just consider it a progressive enhancement so it just depends on whether the animation is deemed core to the experience;
- [Animate from a max-height of 0 to “something sufficient”](https://codepen.io/fuzzylogicx/pen/wvPMxvm) (my pen is inspired by [Scott O’Hara’s disclosure example](https://codepen.io/scottohara/pen/ybLMOm)). This is workable but not ideal; you kinda need to set a max-height sweetspot otherwise your animation will be delayed and too long. You could of course add some JavaScript to get the exact necessary height then set it. BBC use `max-height` for their tracklist animation and those tracklists likely vary in length so I expect they use some JavaScript for height calculation.

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

- [Inspiration: the animate.css library](https://animate.style/)
- [animate.css on github](https://github.com/animate-css/animate.css) (good for searching for keyframe CSS)
- [CSS transitions and transforms](https://thoughtbot.com/blog/transitions-and-transforms) on Thoughtbot
- [CSS Transitions](https://www.joshwcomeau.com/animation/css-transitions/) by Josh Comeau
- [Transition vs animation](https://cssanimation.rocks/transition-vs-animation/) on CSS Animation
- [Keyframe animation syntax](https://css-tricks.com/snippets/css/keyframe-animation-syntax/) on CSS-Tricks
- [CSS animation for beginners](https://thoughtbot.com/blog/css-animation-for-beginners) on Thoughtbot
- [Using CSS Transions on auto dimensions](https://css-tricks.com/using-css-transitions-auto-dimensions/) on CSS-Tricks
