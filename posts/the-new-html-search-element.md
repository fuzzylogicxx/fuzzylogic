---
date: 2023-04-03T08:55:20Z
title: The new HTML search element
description: The search element is a native HTML element for creating a search landmark
  (rather than for creating a search input)
tags:
- progressiveenhancement
- html
- search
- entry
- a11y
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
My work colleague [Ryan](https://twitter.com/ryandeegan) recently drew my attention to the new HTML `search` element. This morning I read [Scott O’Hara’s excellent primer](https://www.scottohara.me/blog/2023/03/24/search-element.html). Scott worked on implementing `<search>`, and his article cleared up my questions around what it is and when we can start using it.
---

Firstly `<search>` is not a “search input” – it’s not a replacement for any existing `input` elements. Instead it’s a native HTML element to create a `search` [landmark](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles), something that until now we could only achieve by applying `role="search"` to another element.

Landmarks are an important semantic structure allowing screen reader users to orient themselves and jump to important areas of a web page. Existing landmark-signalling elements you might know include `<header>`, `<main>`, `<footer>`. So you would use `<search>` to _wrap around_ a search function, thus providing additional accessibility. And it lets you do so with a native HTML element instead of re-purposing another element by adding ARIA properties, per [the first rule of ARIA use](https://www.w3.org/TR/using-aria/#rule1). It’d look something like this:

    <search>
      <form action="/path/to/search/">
        <label for="query">Find an article</label>
        <input id="query" name="q" type="search">
        <button type="submit">Go!</button>
      </form>
    </search>

So as Scott himself admits:

> To be brutally honest, this is not the most important element that’s ever been added to the HTML specification. It _is_ however a nice little accessibility win.

## Do I have a use for this?

If you have a search function or search page and currently miss the opportunity to offer a _search_ landmark you could do so and improve the user experience.

## Can I use the `<search>` element today?

As Scott mentions, it’s not yet available in browsers (although it likely will arrive soon). So if you added `<search>` (just as I’ve typed it there) to a page, it wouldn’t currently create a search landmark. So you _could_ wait for a while before using the element. Alternatively, because HTML’s design is intentionally geared toward a progressive enhancement mindset, you could take [Jeremy Keith’s approach](https://adactio.com/links/20054) and safely use the following today:

    <search role="search">
     ...
    </search>

Jeremy knows that when browsers encounter an HTML element they don’t know, they don’t break but rather treat it as an anonymous element and carry on. So he includes `<search>` to start adopting the new element today, but bolts on `role=search` temporarily to manually provide the landmark until browsers understand `search`. He’ll then remove the `role=search` part once support for `search` is widespread.
