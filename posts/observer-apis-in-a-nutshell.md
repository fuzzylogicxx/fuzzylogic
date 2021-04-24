---
title: Observer APIs in a nutshell
description: A quick explainer of what each of three HTML5 Observer APIs do and
  how they differ, for my future reference.
date: 2021-04-17T12:39:22.441Z
mainImage.isAnchor: false
tags:
  - html5
  - browserapi
  - javascript
  - containerqueries
  - css
draft: false
---
I’ve played with the various HTML5 Observer APIs (`IntersectionObserver`, `ResizeObserver` and `MutationObserver`) a little over the last few years—for example using `ResizeObserver` in a container query solution for responsive grids. But in all honesty their roles, abilities and differences haven’t yet fully _stuck_ in my brain. So I’ve put together a brief explainer for future reference. 
---

## Intersection Observer

Lets you watch for when an element of your choice intersects with a root element of your choice—typically the viewport—and then take action in response.

So you might watch for a `div` that’s way down the page entering the viewport as a result of the user scrolling, then act upon that by applying a class which animates that `div`’s opacity from `0` to `1` to make it fade in.

Here’s how it works:
- Instantiate a new `IntersectionObserver` object, passing in firstly a callback function and secondly an options array which specifies your root element (usually the viewport, or a specific subsection of it).
- Call `observe` on your instance, passing in the element you want to watch. If you have multiple elements to watch, you could call `observe` repeatedly in a loop through the relevant `NodeList`.
- in the callback function add the stuff you want to happen in response to “intersecting” and “no longer intersecting” events.

## Mutation Observer

Lets you watch for _changes_ to the attributes or content of DOM elements then take action in response.

You might use this if you have code that you want to run if and when an element changes because of another script.

Here’s how it works:
- Your typical starting point is that you already have one or more event listeners which modify the DOM in response to an event.
- Instantiate a new `MutationObserver` object, passing in a callback function.
- The callback function will be called every time the DOM is changed.
- Call `observe` on your instance, passing in as first argument the element to watch and as second argument a config object specifying what type of changes you’re interested in, for example you might only care about changes to specific attributes.
- your callback function provides an array of _MutationRecord_ objects—one for each change that has just taken place—which you can loop through and act upon.

## Resize Observer

Lets you watch for an element meeting a given size threshold then take action in response. 

For example you might add a class of `wide` to a given container only when it is wider than `60em` so that new styles are applied. This is a way of providing _container query_ capability while we wait for that to land in CSS.

Or you might load additional, heavier-weight media in response to a certain width threshold because you feel you can assume a device type that indicates the user is on wifi. Adding _functionality_ rather than applying styles is something we could not achieve with CSS alone.

<!--
One question I find myself asking is whether this is only for watching for _changes_ to an element’s size?
something I wouldn’t imagine happens too often unless the user resizes their browser
…or reorients their phone or iPad which is more likely!
—or whether it’s also for checking the element’s _initial_ size? Well, …

Here’s how it works:

- …
- …

At the moment it feels to me like `ResizeObserver` is only useful for mimicking container queries. I’ve done this once or twice in the past but as at April 2021 I’m no longer sure it’s something I need _so_ much (and can’t wait for) to the extent that I’ll keep reaching for JavaScript to achieve it. Perhaps other practical uses for this API may become apparent to me over time. 
-->

Given that Container Query support is coming in CSS and that we can usually get by without it in the meantime, I don’t think it’s something I need _so_ desperately that I’ll keep reaching for JavaScript to achieve it. However that’s not the only use for `ResizeObserver`.

It’s also worth remembering that it’s not all about _width_: `ResizeObserver` can also be used to detect and respond to changes to an element’s _height_. An example might be [watching for changes to a chat window’s height](https://web.dev/resize-observer/#application)—something that’s liable to happen as new messages appear—and then ensuring the focus stays at the bottom, on the latest message.

## References

Steve Griffiths has some great video tutorials on these topics.
- [Intersection Observer](https://www.youtube.com/watch?v=gQ8WggeHoJU&t=0s)
- [Mutation Observer](https://www.youtube.com/watch?v=gQ8WggeHoJU&t=0s)
- [Intersection Observer](https://www.youtube.com/watch?v=gQ8WggeHoJU&t=0s)
