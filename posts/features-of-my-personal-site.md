---
date: 2024-04-28T08:13:53.000+00:00
title: Features of my personal website
description: Logging my website’s current features so I can manage it a bit better
tags:
- entry
- web
- personalsite
---
I like the metaphor for personal websites of _tending to a digital garden_. 

Like all gardens, they can become a bit unruly and need some weeding. Right now, as I consider updating some software and freshening things up, I realise that I’ve let it overgrow a tad.

So, here’s a post in which I’ll log my website’s current features. This should be useful in and of itself as a stepping stone to writing a proper readme. However it’ll also help me reflect on my website’s health and maintainability so I can decide which features to nourish and which to prune.

Note: this post will take a bit of time and a few sessions, so please regard it as a work in progress.
---

## What I want

Before getting lost in stuff I _have_, I thought it’d be good to set out my higher-level goals and what I feel I have the time to sustain. I think I’d like:

- retain URLs and SEO through updates
- excellent accessibility and performance (four hundos on lighthouse is a good start)
- use the best of modern web standards
- simplicity: minimal dependencies, easy to make technical updates
- to maintain some documentation to support ease of updating
- minimal noise: I don’t want a bunch of emails and alerts from third parties
- sensibly organised content
- a search function
- a means of contacting me
- some personality in the design and content
- be able to add and edit content easily (a CMS would be nice)
- be able to insert photos into content easily

And here are a few lower-level wants:

- code snippets should look good

## What I actually have

This is gonna be a much lower-level set of features than the above goals, but that’s OK. I can ask myself whether each supports my wider goals and are worth the effort.

### Main engine

It’s a statically generated site powered by Eleventy.

The code is hosted on GitHub. I use for Netlify for production builds, deployments and hosting.

I’m happy with this stack. The parts play well together, it’s free, and it brings a lot of flexibility and performamance benefits.

### Configuration

The minimum node.js version (used as the runtime for building the site including installing its dependencies) is set in a `.nvmrc` configuration file. That’s because that’s how it’s done in the Eleventy Base Blog and i) I’m happy to follow that to avoid confusion when doing future 11ty upgrades, and ii) it seems sensible to set this in the project code rather than only in Netlify thereby locking me into Netlify and again potentially causing confusion in future. Things to remember (from experience) are that that this setting in `.nvrmc` overrides any node version set in [Netlify’s Build and deploy settings](https://app.netlify.com/sites/vigilant-almeida-537bd4/configuration/deploys#dependency-management) and also that I should avoid setting a node version in `netlify.toml` too otherwise they all fight each other.

### CMS

I don’t currently have one, having previously tried both Netlify CMS and Forestry for a while then gave up on them. I currently [use github.com as my CMS](https://fuzzylogic.me/posts/how-i-use-github-as-jamstack-cms/). That works but isn’t ideal. I’m looking for another free or cheap solution.

### Contact form

I use [Netlify Forms](https://docs.netlify.com/forms/setup/#html-forms) for this. That gives me the server-side handling, database storage and admin management aspects of a form for my otherwise-static site.

### Photos section

There’s a photos index page and a page for individual photos. I’m not 100% sure why I created this.

Photos are fetched from Cloudinary using an 11ty [JavaScript data file](https://www.11ty.dev/docs/data-js/). I note that I’ve set it to only fetch those photos when the node environment is `production`. One of the effects of that seems to be that the /photos/ page is not generated (you get a 404) when I build the site locally. I think that’s because the `photos` data collection is empty therefore cannot be paginated therefore the page is not generated.

### Detailed features

#### Readable time

I created this Eleventy filter to show “time of post” on posts of type `note`. That’s a situation where the `readableDate` filter included with the Eleventy starter blog wasn’t precise enough.

#### Tags infrastructure

I have the following pages:
- _all tags_ page
- all posts tagged with [tag]


## Actions I’ve realised I can take

- rename `eleventy.js` to `eleventy.config.js` like in the [Eleventy base blog](https://github.com/11ty/eleventy-base-blog)
- …

To be continued!

## Update Sunday 30-06-24

I’ve addressed the “a means of contacting me” item on my wants list by [adding a contact form using Netlify forms](https://github.com/fuzzylogicxx/fuzzylogic/pull/96).
