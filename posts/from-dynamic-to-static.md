---
title: From dynamic to static
description: From dynamic to static
date: 2021-06-18T08:43:21.306Z
location: ""
mainImage.isAnchor: false
tags:
  - entry
  - netlify
  - hosting
  - linode
  - personalsite
  - development
  - lamp
  - 11ty
draft: false
---
“I’ll just make a few small tweaks to my website…” said I. Cut to three sleep-deprived days later and I’ve rebuilt it, SSG/JAMstack-stylee with Eleventy and Netlify and entirely re-coded the front-end. Silly, but so far so good, and it’s greasy fast!
---

So yes, I’ve just updated my website from being a dynamic, LAMP-stack affair which used Perch CMS and was hosted on Linode to being statically-generated using Eleventy and hosted on Netlify.

It mostly went smoothly. And the environmental and continuous deployment boilerplate that Netlify provide are fantastic, and will be a real time-saver over my current “set up and maintain a Linode server” approach.

In terms of challenges and troubleshooting, I did have to find a solution to the issue of FOUT on repeat visits. It seems this was happening as a result of [Netlify’s interesting approach to asset caching](https://stackoverflow.com/questions/52308658/netlify-headers-cache-control-for-static-assets) which works well for most requirements but wasn’t so great for self-hosted webfonts. My solution was to add specific headers for `.woff` and `.woff2` files in my application’s Netlify config file.


