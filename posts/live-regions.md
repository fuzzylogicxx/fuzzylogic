---
date: 2023-01-14T19:33:42.000+00:00
title: A copy to clipboard component
description: ''
tags: []
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: true

---
Update: why do a number of implementations of Copy to Clipboard put the copyable text in an input?
https://twitter.com/fuzzylogicx/status/1626548106060783617
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard

Here’s one that doesn’t use an input: https://adamsilver.io/blog/the-trouble-with-mailto-email-links-and-what-to-do-instead/. It uses `navigator.clipboard.text` and doesn’t use an input.
End update.

Anda asked for some thoughts regarding a “copy to clipboard” component. It set my mind racing. It’s a great example of where a component being “physically small” probably leads folks to think it’d be quick and easy to create but in reality to build it responsibly requires a disproportionate amount of thinking! (Another way of saying this: [the smaller the pattern is, the easier to overlook the complex needs](https://adrianroselli.com/2020/01/defining-toast-messages.html#comment-186754))

My WIP pen [https://codepen.io/fuzzylogicx/pen/YzjxXjr/77d5d7fc91df8413a26848d6cbba2e8a?editors=1111](https://codepen.io/fuzzylogicx/pen/YzjxXjr/77d5d7fc91df8413a26848d6cbba2e8a?editors=1111 "https://codepen.io/fuzzylogicx/pen/YzjxXjr/77d5d7fc91df8413a26848d6cbba2e8a?editors=1111")

If doing it as a Web Component, some references:

* [https://github.com/24webcomponents/spoiler-alert-element/blob/main/src/spoiler-alert-element.ts](https://github.com/24webcomponents/spoiler-alert-element/blob/main/src/spoiler-alert-element.ts "https://github.com/24webcomponents/spoiler-alert-element/blob/main/src/spoiler-alert-element.ts")
* [https://www.youtube.com/watch?v=jrq59a7RrNk&list=PLJC1CIi0zsoqmxMHeUYxudg2QQUiu4JOh&index=2](https://www.youtube.com/watch?v=jrq59a7RrNk&list=PLJC1CIi0zsoqmxMHeUYxudg2QQUiu4JOh&index=2 "https://www.youtube.com/watch?v=jrq59a7RrNk&list=PLJC1CIi0zsoqmxMHeUYxudg2QQUiu4JOh&index=2")

I started by looking at Adam Silver’s book and Scott O’Hara’s [Are we live?](https://www.scottohara.me/blog/2022/02/05/are-we-live.html) because ARIA live regions were at the front of my mind… but ended up down a rabbithole and kept seeing more and more layers!

_Best practice research, complex Accessibility, JavaScript, animation, complex layout…_

Accessibility and definition

How is the message to be announced? And dismissed? Will it need interacted with? Might it occur multiple times and need to be announced each time? Might there be multiple on the page (so IDs need to be unique, JS needs to handle this, etc)?

I _think_ one option to make an update be announced is to _send focus_ to the relevant element, which also causes it to be announced accessibly. That’s not always a suitable option: i) you may not want to switch focus from the element currently in use, ii) the target may not be focusable by default; iii) there may be no useful reason to focus it (e.g. if it’s a short message with no interactive elements). I think in this case it doesn’t make sense to shift focus onto the “Copied” message.

Actually, GitHub somewhat cleverly get around the accessible announcement issue by making the trigger (button) and element announcing “Copied!” _the same element_. Focus is already on the element that changes therefore the change is announced. Their approach is to label the element with `aria-label` as “Copy” on page-load and change the value to “Copied!” after click/copy). However their resulting interface (with its visual tickmark on successful copy) is quite opinionated and restrictive, and [`aria-label` isn’t necessarily an ideal choice](https://github.com/github/clipboard-copy-element/commit/93894dba09a6e9e95ae22058f93348ede55cdb46) for various reasons.

So how do we define this pattern in order to get an accessible approach? Is the “Copied!” message a toast? Or is this a cousin of disclosure widget e.g. a tooltip, or toggletip?

Probably a toast or toggletip (it’s click-based) but not a Tooltip (it’s hover/focus based). And I’m kinda drawn more to toast because I feel our use case is more “a message appearing in response to an event”, rather than “an info-revealing trigger that’s labelled or described by the revealed info”. Also I particularly don’t fancy tooltip not only because its not click-driven but because it gets you into complex accessibility considerations (see Sarah H and Scott O links).

I love Anda’s idea of using `<output>`! It’s the native HTML element that provides a “native ARIA role=status”. ([https://www.scottohara.me/blog/2019/07/10/the-output-element.html](https://www.scottohara.me/blog/2019/07/10/the-output-element.html "https://www.scottohara.me/blog/2019/07/10/the-output-element.html")). 

Related options are ARIA `role=status` and `aria-live=polite`. `role=status` is equivalent to `aria-live=polite`). Is `output` safe to use? I _think_ so, perhaps best accompanied by `role=status` (at least for a while).

For accessibility does the `output` need to be a) ever-present rather than b) either toggled hidden/visible or injected? From research I believe the element should be ever present; only its content should change. Whether using a) a container set as a live region (meaning “inner content will change and we want that communicated”) or b) an `output` element, you update the contents but don’t show/hide or add/delete the element. I guess in some cases (not ours here) you might make an announcement element _visually hidden_ when it’s for screen readers only, but that’s different from “hiding from everyone” which causes problems.

I _think_ per [Scott’s O’s toast demo](https://scottaohara.github.io/tests/html-output/toastput-aria.html) we want a container div wrapping the <output> and this container handles styling, then the <output> should be empty but populated with the text “Copied” by the click event handler, then after a few seconds the output’s textContent should be set to empty again. (Also check what markup Heydon uses because he uses ARIA rater than `output` although I think his is pretty similar)

PE:

It should only appear on the “happy JS path” (JS enabled, generally non-blocked and working, and _this specific_ JS supported and working). Or to put it another way, it should not appear at all if the trigger would be broken. Therefore I’d use “progressive enhancement”. A web component is a good way of doing that, because one of their benefits is that (done right) they are natively PE-centric. But it’s not the only way. You could use Stimulus or whatever.

Animation:

The goal is to animate _in_ then animate _away_ the content. (Or at least to animate it away). The element being animated should probably be a `div` wrapper around an `<output>` which could start with its `opacity` set to `0`. I think this is a case for CSS’s `transition` rather than `animation` (although you could prob use either). Why? It’ll happen via a class applied to an existing element by JS in response to an event, rather than an animation that needs to happen on page load or to an element inserted into the DOM. _Hang on_: actually if it the goal were just _animating away_ I might go for transition, however if the goal is more complex e.g. “animate in, then wait for x seconds, then animate away” then I’d reach for `animation`.

Actually, should the message animate away of its own accord or should it be in response to an event? And actually, I need to remember we don’t just need to animate out the message’s visibility; we actually need to delete the message too!

Should the message disappear and be scrubbed in response to the user moving focus from the trigger (or uses the Esc key)? This is how Heydon’s toggletip works. [https://codepen.io/heydon/pen/zdYdQv](https://codepen.io/heydon/pen/zdYdQv "https://codepen.io/heydon/pen/zdYdQv") / [https://inclusive-components.design/tooltips-toggletips/](https://inclusive-components.design/tooltips-toggletips/ "https://inclusive-components.design/tooltips-toggletips/")

Or if the message should disappear and be wiped of its own accord, how should that work? Maybe make the JS for a successful copy apply the “start” state (populate “Copied!” text, add animation class) then after a little delay also add the “end” state (set text to empty, invert the animation)? An alternative is the class we apply to set a single CSS `animation` that includes all of the states (enter, wait, exit). Then all that remains is to delete the text. We could tap into `Element.getAnimations()` and wait (via a promise) for the animations to finish then delete the text. This is the approach [Adam Argyle demonstrates in his Toast solution](https://web.dev/building-a-toast-component/#putting-all-the-javascript-together). 

Styling 

Positioning the copy at the top-right of the code snippet then making the msg show underneath and centred is tricky.

Misc references:

* [Marcy Sutton course section on aria live regions](https://frontendmasters.com/courses/javascript-accessibility/announcements-with-aria-live-regions/)
* [https://inclusive-components.design/tooltips-toggletips/](https://inclusive-components.design/tooltips-toggletips/ "https://inclusive-components.design/tooltips-toggletips/")
* [https://twitter.com/aardrian/status/1405483122913861633](https://twitter.com/aardrian/status/1405483122913861633 "https://twitter.com/aardrian/status/1405483122913861633")
* [https://github.com/scottaohara/a11y_tooltips](https://github.com/scottaohara/a11y_tooltips "https://github.com/scottaohara/a11y_tooltips")
* [Using promises to wait until animations finish](https://web.dev/building-a-toast-component/#putting-all-the-javascript-together)
