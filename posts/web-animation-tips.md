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

## A simple definition

Animation lets us make something visually move between different states over a given period of time.

## Benefits of animation

Animation is a good way of providing visual feedback, teaching users how to use a part of the interface, or adding life to a website and making it feel more “real”.

## Simple animation with `transition` properties

For subtle animations triggered by an event, the CSS `transition` shorthand property is the most performant approach.

If we use a CSS property such as `transform` or `opacity` (or both together) to define two different states for an element, we can then `transition` between those states.

The first state would be in the element’s starting styles (either defined explicitly or existing implicitly based on property defaults) and the other in either its `:hover` or `:focus` styles or in a class applied by JavaScript following an event.

Without the `transition` the state change would still happen (for example opacity changing from `1` to `0`) but would be instantaneous.

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

If an animation needs to run on page load, or is more complex than a simple A to B state change, then a CSS `animation` may be more appropriate than `transition`. Using this approach, animations can:

- run automatically as well as being triggered
- go from an initial state through multiple intermediate steps to a final state rather than just from state A to state B
- run forwards, in reverse, or alternate directions
- loop infinitely

We achieve complex animations by:

1. using `keyframes` to define a reusable “template” animation that includes multiple states; then
1. applying `animation` properties to an element we want to animate, including assiging one or more keyframe names.

Here’s how you do it:

<figure>

``` css
@keyframes my-animation {
  0%    { opacity: 0; }
  20%   { opacity: 1; }
  80%   { opacity: 0; }
  100%  { opacity: 1; }
}

.animate-me {
  animation: my-animation 5s infinite;
}
```

</figure>

One other thing to mention is that while there are a few good rules of thumb, it also seems to me that the choice between `transition` or `animation` is not totally binary. For example some developers seem to simply prefer animation with `keyframes` even when `transition` is viable and would (as far as I’m aware) be a potentially better choice. See [Jhey’s “entrance animations” tip](https://twitter.com/jh3yy/status/1498987146207973377) where he creates simple, two-state animations that are triggered in reponse to an event which seems to me like a case for `transition`… however he advocates `keyframes` and `animation`. Perhaps some engineers prefer one CSS syntax over the other; find it more flexible to set up reusable animations with keyframes than CSS classes; find that one fits better with their approach to using custom properties… or combinations of those reasons. It’s also entirely possible that I’m missing something important in my understanding of the two options. For now I’ll assume it’s OK to plough your own furrow. 

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

### Animate onto screen

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
- [Keyframe animation syntax](https://css-tricks.com/snippets/css/keyframe-animation-syntax/) on CSS-Tricks
- [CSS animation for beginners](https://thoughtbot.com/blog/css-animation-for-beginners) on Thoughtbot
- [Using CSS Transions on auto dimensions](https://css-tricks.com/using-css-transitions-auto-dimensions/) on CSS-Tricks
