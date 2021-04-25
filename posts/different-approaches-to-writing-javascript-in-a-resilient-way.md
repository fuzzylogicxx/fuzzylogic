---
title: Different approaches to writing JavaScript in a resilient way
description: Different approaches to writing JavaScript in a resilient way
date: 2021-01-24T09:40:08.834Z
mainImage.isAnchor: false
tags:
  - entry
  - javascript
  - web
  - development
  - progressiveenhancement
draft: true
---
Lorem
---

## Prologue: a single JS error breaking all JS for your site

[Remy Sharp](https://remysharp.com/2019/07/24/progressive-enhancement) explains how that due to JS not being fault-tolerant like HTML the combination of a syntax error plus the (good) practice of “all JS combined in one file” means…: 

> if the arrow function is encountered by a browser that doesn't support ES6 arrows, it'll cause a syntax error. If the site is following best practice and combining all their JavaScript into a single file, this means that all their JavaScript just broke.

## Another recurring question: how to avoid layout shift caused by enhancing?

How best to enhance a basic thing _quickly_ so that the user doesn’t see a noticeable _switch_ (or in which situations (e.g. perhaps when JS already cached?) is this not even a problem?)

This “banner with close button” example is good https://www.zachleat.com/web/layout-shift/. Combines:

- banner markup is in the HTML by default. Includes button by default! (see opacity note later)
- banner “theme” CSS (just for default “banner is displaying” context—the critical CSS?) is inlined in the `head`
- but minimal JS runs early in the `head` (immediately after inlined CSS) and applies a `banner--hide` class to the HTML element if appropriate based on a localStorage check (equiv of cookies)
- additional, external CSS includes contextual selector for hiding the banner if `banner--hide` or `hidden` are presnt. Also sets the close button’s `opacity` to `0` by default. (“We use opacity to toggle the close button so that it doesn’t reflow the component when it’s enabled via JavaScript.) (LH note: he also uses `pointer-events: none;`. I wonder if this combined `opacity:0` and `pointer-events:none` approach is sufficient to hide the button from screen readers?)
- uses a web component (class) to enhance the banner (keeping the overall approach lean and framework-free)
- WC deals with showing the button, closing, applying `hidden` and setting localStorage
- banner web component JS is loaded in a `script type=module`

## Feature detection

(or “capability detection”)

The “Cuts the mustard” approach

original BBC https://responsivenews.co.uk/post/18948466399/cutting-the-mustard
refined by Jake https://twitter.com/jaffathecake/status/570872103227953153

JK 
[On a case by case basis](https://adactio.com/links/9943), checks whether the feature he is about to use is supported, i.e. whether the user’s system “cuts the mustard”. For example in https://adactio.com/journal/17516:

<figure>

``` js 
if (!win.localStorage) return;

// and…
if ('onpagehide' in win) {
  …
}
```

</figure>

Is this suitable at scale?

(NB he does use some polyfills too https://adactio.com/journal/17605)

He also only uses modern _syntax_ (as opposed to APIs and _methods_) within contexts where he knows they will be supported (no doubt leaning on caniuse.com). For example in a service worker he knows he can also use x, y and z.

### Feature Detection Tools

Modernizr
or lighter-weight http://featurejs.com/

Is Modernizr’s “.no-js replaced by .js” a safe way to 
- apply CSS for JS-powered situations
    - Or does it only handle “JS is enabled” but fail to handle “JS is not yet loaded or broken?”
        - perhaps it’s safer for CSS classes to be applied by the relevant JS that needs to be working
        - …or is that overkill?
    - also it’s no-xyz-css-feature classes shouldn’t be replied upon because if JS is disabled then they won’t have been applied if even they should otherwise be present.

Worth saying that 
- `.js` is nowhere near as useful as `.cuts-the-mustard` 
- worse again than a class added by the actual JS performing the functionality esp. one that signals “we know that everything went OK with the JS”
- I think it’s undercooked. 

The benefit of it is that it’s there _early_ …however it’s insufficient. 

## JavaScript modules

[Heydon recommends](https://briefs.video/videos/is-progressive-enhancement-dead-yet/):
- use ES6 modules natively using script type=module. This means you don’t need to mess around with bundlers, transpilers etc
- if you really need to, you could also create a script including polyfills and transpiled JS, and include using `script nomodule`

There are many more gradations of how you can use modules – see my article on ES6 modules. However I’d be inclined to K.I.S.S.



## Polyfills

You can use them to plug unsupported _methods_ (not syntax).

Adactio [says](https://adactio.com/journal/17605): 

> Polyfills are supposed to be temporary. At some stage, as everyone upgrades their browsers, I should be able to remove them.

### Manual polyfilling

CF: The great thing about polyfills is that when browser support gets better, you can rip them out without having to refactor code.
They can be lean and nice, like CF’s for Object.fromEntries()  https://vanillajstoolkit.com/polyfills/objectentriesfrom/
But you’d need to maintain them and communicate them across a team in a way’s tricky and isn’t required by polyfill.io.
Also the file/function would be downloaded by every browser regardless of whether or not the method is supported. It might not use the polyfill, but the polyfill is still downloaded because it needs to run its initial test _in case_ it’s needed.

### polyfill.io

## Babel


Misc
Andy Bell talks about a minimum viable experience and compares this to MVP and agile https://piccalil.li/blog/a-minimum-viable-experience-makes-for-a-resilient-inclusive-website-or-app

## Interestings

- PE is not just about morality (although it touches a11y so that’s an aspect of it); and not about dealing with the edge case of JS being disabled (although that may be less edge than you think). It’s not even only about “in the moment” resilience. I’ve found that it can have _long-term, wider benefits_ to the simplicity of your stack, your workflow and thereby allowing more time to concentrate on modern browsers and less on old browsers (transpiling, polyfilling, writing non-standard workarounds, browser-testing, sniffing and catering custom messages to, etc). That’s the lightbulb moment. Also: it encourages a resilient mindset that benefits in many other ways. (a11y, usability, machine interoperability)

- prog enc doesn’t solve _everything_! If your server is down, or something went wrong on the server, there’s nothing we can do there*. 
- But the key point is that all you need to deliver core content is good HTML. HTML doesn’t need anything more than itself to provide content, and once delivered won’t throw errors.
    - (* actually there is something we can do here if you want to get into an offline first strategy using a service worker)

- I keep hearing “fallback”. PE is not about fallbacks. You set a baseline, then add enhancements which may or may not take effect, but you don’t assume they will. That’s fundamentally different from a fallback.

### Decisions to make

1. Dealing with lack of support for features

- Cut the mustard at the script loading stage like Jake says? https://jakearchibald.com/2013/progressive-enhancement-still-important/
- Or go with JK suggestion that to be sure you need to do feature detection for every given feature which is why he does it as he goes along in the actual JS code rather than at script loading stage. 
- Maybe JA and JK approaches could be combined if you had a more comprehensive mustard cutting check coverig all the features you want to use, but that’s less maintainable than the simple mustard-cutting syntax that JA recommends.
- Anyway now we have `<script type=module>` does that not provide modern mustard-cutting? For example if you know you’ve got native ES module support in the browser, you know you’ve also got spread operator support, etc.  

2. What about when JS breaks *in the middle of a function*?

- Not “no js”; not “not yet loaded JS”; not “fundamentally broken (or intentionally fails mustard-cut) because arrow functions aren’t supported”; but rather:
- …we’ve already `e.preventDefault()`-ed the basic/baseline behaviour but an exception has been raised and so things are broken. 
- This is really interesting https://molily.de/javascript-failure/ 
    - one takeaway is that we shouldn’t by force of habit put e.preventDefault() at the top. 
        - It might be too optimistic.
        - Instead write your event handling functionality, do your exception handling, then…
        - Put e.preventDefault() at the bottom.
        - The effect will be that we will only prevent default if we haven’t already thrown/returned an exception, so…
        - The default link/submit/whatever will work if the detail of the JS has a problem
    - LH learning:
        - e.preventDefault() does not need to be put at the top for any “do it quickly to avoid the event happening first!” reason.  That’s not the case.
- And this may be worth reading https://molily.de/robust-javascript/ 


## References

- https://christianheilmann.com/2015/02/18/progressive-enhancement-is-not-about-javascript-availability/ (he had the idea of escalators vs elevators. He also gets into “it’s not about JS being turned off”. But otherwise it’s pretty general)
- https://jakearchibald.com/2013/progressive-enhancement-still-important/
    - in defence of prog.enh in the face of detractors who build entirely JS-driven sites.
    - how pages load in progressively enhanced pages (rendered in chunks) vs entirely JS-driven (first render is blocked by all previous steps)
    - The’re a misconception that you’d need to duplicate on server and client. Lean on the server; don’t duplicate on the client
    - if dynamically updating part of the page, consider just getting server to send new HTML rather than getting as JSON and converting to HTML on the client
    - if need client-side templates, use format like Mustache that can be shared w/ server. Even compile templates to JS function on server, saving client from having to parse and compile.
    - stop pretending you have a webapp rather than a website and are exempt from best practices.
- https://24ways.org/2014/responsive-enhancement/ 
    - really good run-through of enhancing a responsive navigation. He uses his nav JS (a script loaded at the bottom of the doc) to apply `.cuts-the-mustard` and that class is used in a contextual selector to apply his CSS. 
    - If I were going down the route I _might_ consider tweaking to rename class as `enhancement-ready` or similar and only applying it when I know all the other stuff has worked. I guess it depends on your case i.e. how error-prone the JS is.
    - “Progressive enhancement doesn’t mean you have to provide all the same functionality to everyone – quite the opposite.”
    - Progressive Enhancement isn’t a technology. It’s a way of thinking. Once you start thinking this way, you’ll be prepared for whatever the next ten years throws at us.
- [Just what is it that you want to do?](https://adactio.com/journal/7774)
    - again a riposte to detractors
    - “But progressive enhancement is not about offering all functionality; progressive enhancement is about making sure that your core functionality is available to everyone. Everything after that is, well, an enhancement (the clue is in the name). The trick to doing this well is figuring out what is core functionality, and what is an enhancement. There are no hard and fast rules.”

