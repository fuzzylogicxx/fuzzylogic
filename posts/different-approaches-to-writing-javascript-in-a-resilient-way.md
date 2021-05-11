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

## Recurring question: in progressively enhanced approaches, how to avoid layout shift caused by enhancing?

How best to enhance a basic thing _quickly_ so that the user doesn’t see a noticeable _switch_? Example: enhancing a table of contents containing links to sections _quickly_ into a _tabbed interface_).
And are there situations (e.g. perhaps when JS already cached?) when this is perhaps not even a problem?

### Making the JS run as early as is possible and sensible

If all you need to know is that _JS is available_, you could add class `js-available` to the `html` element in your second or so line of `head`. You could have some critical inline CSS following that which does, for example, `.js-available .disclosure-content { display: none; }`. 

However because that hides the content before we’re sure that the JS which sets up the event handler on the disclosure element has loaded and is not broken, I’m not sure there are any cases in which that’ll ever feel resilient enough. But anyway, I’m putting it here just for reference. Who knows, I might think of cases where it’s useful.

#### Inline it in the head?

Inlining JS (some or all of it) avoids a few JS failure pitfalls and may improve speed.
Doing it early in the `head` would mean it runs early… however it would run straight away before the DOM elements it’s due to operate on are even loaded. 
We might be better:
- putting it before closing `</body>` tag;
- although we know that `script defer` from the `head` is better because it makes the script available earlier
- and we might go better again by using `script type=module` in the `head` which has `defer` by default but skips IE 11, if that’s desirable.
- perhaps `script type=module` with all the JS just literally inlined inside the `script` tags is a good option.
- making sure it’s the first JS to run could be useful.

An option I considered was whether—Scott Jehl/Filament style—we could use the `onload` attribute on an element in the middle of the document to run JS then and there. However before even getting into whether that’s a good or scalable idea, it’s perhaps a non-starter because `onload` is only available on elements like `iframe` and `img`… and not on `div` or `ul` etc.

One other possibility is to use a Web Component (like Zach has below). 
1. According to https://www.filamentgroup.com/lab/delegator/ it may offer a performance benefit in that the JS runs early or quicker (but I’m not sure; it might still be after the DOM is loaded).
2. it wraps up the JS neatly so that a breakage in one place would break the whole class—which is a good thing as the enhancement would not be “part-added”.
3. it’s a class-based approach (so nicely organised) to JS but one that is framework free.

One other thing I’m thinking is that perhaps in PE approaches the baselines need to try to minimise the flicker impact. 
One technique for doing this is by putting things which might otherwise flicker somewhere off-screen, be it on another page or in a footer section, and linking to them. 
- In JK’s 24ways responsive navigation article he puts the navigation at the bottom and links to it from his “Menu” link at the top-right (the jump-to-footer pattern). But cleverly he makes the stuff before the footer nav have a min-height of 100%. However this isn’t always possible. We might be able to do it sometimes (navs, modals) but in other cases we might just need to make our JS as performant as poss and suck up any possible flicker.

Zach Leatherman’s (for Netlify) “banner with close button” example is good https://www.zachleat.com/web/layout-shift/ and also see linked Github repo and https://twitter.com/zachleat/status/1332353805451751430). 
Although the bits that are JS-dependent are just working with a `button` (applying a class to unhide it, adding a click event listener to it) and storing something in localStorage, so not too flicker-prone.

It combines:

- banner markup is in the HTML by default. Includes button by default! (see opacity note later). (NB Jake A might not approve of this client side stuff in the server render)
- banner “theme” CSS (just for default “banner is displaying” context—the critical CSS?) is inlined in the `head`
- but minimal JS runs early in the `head` (immediately after inlined CSS) and applies a `banner--hide` class to the HTML element if appropriate based on a localStorage check (equiv of cookies)
- additional, external CSS includes contextual selector for hiding the banner if `banner--hide` or `hidden` are presnt. Also sets the close button’s `opacity` to `0` by default. (“We use opacity to toggle the close button so that it doesn’t reflow the component when it’s enabled via JavaScript.) (LH note: he also uses `pointer-events: none;`. I wonder if this combined `opacity:0` and `pointer-events:none` approach is sufficient to hide the button from screen readers? I’ve asked https://twitter.com/zachleat/status/1332353805451751430)
- uses a web component (class) to enhance the banner (keeping the overall approach lean and framework-free)
- WC deals with showing the button, closing, applying `hidden` and setting localStorage
- banner web component JS is loaded in a `script type=module`
- the value stored in localStorage allows doing something different on repeat visits.

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
- `.js` is nowhere near as useful as `.cuts-the-mustard` (although note that that while JK’s responsive nav tutorial adds a `.cuts` class, I don’t think the BBC ever did. They just showed the JS they used as a smoke test before including more JS)
- worse again than a class added by the actual JS performing the functionality esp. one that signals “we know that everything went OK with the JS”
- I think it’s undercooked. 

The benefit of it is that it’s there _early_ …however it’s insufficient. 

Re. a `.cuts-the-mustard` CSS class, this is interesting from Manuel Matuzovic:

> I’m cutting the mustard at JS module support. If a browser supports JavaScript modules, it means that it’s a browser that supports modern JavaScript, such as modules, ES 6 syntax, fetch, etc. I ship most JS only to these browsers and I use the js class in CSS, if the styling of a component is different, when JS is active.

```
<script type="module">
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');
</script>
```

Personally I i) don’t like the vague class name “js”; and ii) still don’t like CSS acting on mustard-cutting alone rather than JS applying the classes only at the end of a completed function.

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

