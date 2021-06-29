---
title: How to hide elements on a web page
description: How and why we might hide elements from different browsing contexts
date: 2020-10-08T10:58:00.000+00:00
tags:
- development
- a11y
- howto
- css
- aria
- html
---
In order to code modern component designs we often need to hide then reveal elements. At other times we want to provide content to one type of user but hide it from another because it’s not relevant to their mode of browsing. In all cases accessibility should be front and centre in our thoughts. Here’s my approach, heavily inspired by Scott O’Hara’s definitive guide [Inclusively Hidden](https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html).
---

Firstly, _avoid_ the need to hide stuff. With a bit more thought and by using existing fit-for-purpose HTML tools, we can perhaps create a single user interface and experience that works for all. That approach not only feels like a more equal experience for everyone but also removes margin for error and code maintenance overhead.

With that said, hiding is sometimes necessary and here are the most common categories:

1. Hide from everyone
2. Hide visually (i.e. from sighted people)
3. Hide from Assistive Technologies (such as screen readers)

## Hide from everyone

We usually hide an element from everyone because the hidden element forms part of a component’s interface design. Typical examples are tab panels, off-screen navigation, and modal dialogues that are initially hidden until an event occurs which should bring them into view. Initially these elements should be _inaccessible_ to everyone but after the trigger event, they become accessible to everyone.

Implementation involves using JavaScript to toggle an HTML attribute or class on the relevant element.

For basic, non-animated show-and-hide interactions you can either:

1. toggle a class which applies `display: none` in CSS; or
2. toggle the boolean `hidden` attribute, which has the same effect but is native to HTML5.

Both options work well but for me using the `hidden` attribute feels a little simpler and more purposeful. My approach is to ensure resilience by making the content available in the first instance in case JavaScript should fail. Then, per [Inclusive Components’ Tabs example](https://inclusive-components.design/tabbed-interfaces/), JavaScript applies both the “first hide” and all subsequent toggling.

Here’s some CSS that supports both methods. (The `hidden` attribute doesn’t strictly need this but it’s handy to regard both options as high-specifity, “trump-everything-else” overrides.)

<figure>

``` scss
.u-hidden-from-everyone, 
[hidden] {
  display: none !important;
}
```

</figure>
  
For cases where you are animating or sliding the hidden content into view, toggle a class which applies `visibility: hidden` (because this also removes the element from the accessibility tree but unlike `display`, can be animated) together with other CSS positioning and transform properties. Note that with `visibility: hidden` the physical space occupied by the element is still retained, therefore it’s best to pair it with `opacity: 0` or `max-height: 0px; overflow: hidden`. For example:

<figure>

``` scss
.off-canvas-menu {
  visibility: hidden;
  opacity: 0;
  transition: 0.2s;
  transform: translateX(20px);
}
[aria-expanded="true"] + off-canvas-menu {
  visibility: visible;
  opacity: 1;
  transform: translateX(0);
}
```

</figure>

## Hide visually (i.e. from sighted people)

We’ll usually want to hide something visually (only) when its purpose is solely to provide extra context to Assistive Technologies. An example would be adding additional, visually-hidden text to a “Read more” link such as “about Joe Biden” since that would be beneficial to screen reader users.

We can achieve this with a `visually-hidden` class in CSS and by applying that class to our element.

<figure>

``` scss
.visually-hidden:not(:focus):not(:active) {
  clip: rect(0 0 0 0); 
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; 
  width: 1px;
}
```

</figure>

Essentially this hides whatever it’s applied to unless it’s a focusable element currently being focused by screen reader controls or the tab key, in which case it is revealed.

There are other CSS approaches to hiding visually. One approach is to not only add `position: absolute` (removing the element from the document flow) but also position it off-screen with `left: -100vw` or similar. The use case for this approach might be when you want your visually hidden element to support being revealed and for that reveal to occur via a transition/animation from off-screen into the viewport. See [Scott O’Hara’s off screen skip-links example](https://codepen.io/scottohara/pen/QKmWJG).

## Hide from Assistive Technologies (such as screen readers)

We sometimes hide _visual elements_ from Assistive Technologies because they are decorative and have accompanying text, for example a “warning” icon with the text “warning” alongside. If we did not intervene then Assistive Technologies would read out “warning” twice which is redundant.

To achieve this we can apply `aria-hidden="true"` to our element so that screen readers know to ignore it. In the following examples we hide the SVG icons within buttons and links, safe in the knowledge that the included “Search” text is providing each interactive element with its _accessible name_.

<figure>

``` html
<button>
  <svg focusable="false" aria-hidden="true"><!--...--></svg>
  Search
</button>

<a href="/search">
  <svg focusable="false" aria-hidden="true"><!--...--></svg>
  Search
</a>
```

</figure>

Reference: [Contextually Marking up accessible images and SVGs](https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html)
