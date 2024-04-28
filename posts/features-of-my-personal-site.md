---
date: 2024-04-28T08:13:53.000+00:00
title: Features of my personal website
description: Logging my website’s current features so I can manage it a bit better
tags:
- entry
- web
draft: true
---
I like the metaphor for personal websites of _tending to a digital garden_. Like all gardens, they can become a bit unruly and need some weeding. Right now, as I consider updating some software and freshening things up, I realise that I’ve let it overgrow a tad.

So, here’s a post in which I’ll log my website’s current features. 

This should be useful in and of itself as a stepping stone to writing a proper readme. However it’ll also help me reflect on my website’s health and maintainability so I can decide which features to nourish and which to prune.
---

## What I want

Before getting lost in stuff I have, I thought it’d be good to set out my higher-level goals and what I feel I have the time to sustain. I think I’d like:

- retain SEO through updates
- four hundos (or close to)
- simplicity: minimal dependencies, ease of updating 
- use the best of modern web standards
- sensibly structured content
- a bit of design personality
- be able to add and edit content easily
- be able to insert photos into content easily
- a search function

## What I actually have

This is gonna be a much lower-level set of features than the above goals, but that’s OK. I can ask myself whether each supports my wider goals and are worth the effort.

### Overall approach

It’s a statically generated site powered by Eleventy. I’m happy with this – it brings a lot of flexibility and performamnce benefits.

### Tags infrastructure

I have the following pages:
- _all tags_ page
- all posts tagged with [tag]

### Photos section

There’s a photos index page and a page for individual photos. I’m not 100% sure why I created this.

Photos are grabbed fetched from Cloudinary using an 11ty [JavaScript data file](https://www.11ty.dev/docs/data-js/).

To be continued!

