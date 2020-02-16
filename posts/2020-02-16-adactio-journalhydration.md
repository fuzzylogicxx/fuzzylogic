---
date: "2020-02-16T17:01:09.794Z"
title: "Hydration (Adactio: Journal)"
description: "Jeremy Keith argues that the Gatsby and Next.js approach of “server-side rendering followed by hydration” results in a poor loading experiences and does not equate to progressive enhancement."
tags: [link, progressiveenhancement, javascript, react, hydration, gatsby]
linkTarget: "https://adactio.com/journal/16404"
---
> The situation we have now is the worst of both worlds: server-side rendering followed by a tsunami of hydration. It has a whiff of progressive enhancement to it (because there’s a cosmetic separation of concerns) but it has none of the user benefits.
---

Jeremy Keith notes that these days JavaScript frameworks like React can be used in different ways: not solely for creating an SPA or for complex client-site state management, but perhaps for JavaScript that is run on the server. A developer might choose React because they like the way it encourages modularity and componentisation. This could be a good thing if frameworks like Gatsby and Next.js were to use progressive enhancement properly.

In reality, the system of _server-side rendering_ of non-interactive HTML that is reliant on a further payload of JavaScript for _hydration_ leads to an initial loading experience that is “jagged and frustrating”.

Jeremy argues that this represents a worst-of-both-worlds situation and that its alleged “progressive enhancement via improved separation of concerns” is missing the point. 

> Hope is on the horizon for React in the form of partial hydration. I sincerely hope that it will become the default way of balancing server-side rendering with just-in-time client-side interaction. 

(via [@adactio](https://twitter.com/adactio))
