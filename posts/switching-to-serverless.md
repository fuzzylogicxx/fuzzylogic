---
title: Switching to Serverless
description: Moving from a Perch site on the LAMP stack to an 11ty-based site on Netlify
date: 2019-08-18 08:00:00
tags:
- entry
- web
- development
- eleventy
- netlify
- JAMstack
- serverless
draft: true
---
SEe https://trello.com/c/DJOVkciy/87-write-and-publish-a-debrief-blog-post-i-got-help-from and "Notes > My Blog"

From dynamic Perch and LAMP to static 11ty and Netlify
Continuous deployment
”I’ll just make a few small tweaks to my website…” I said. Cut to 3 sleep-deprived days later and I’ve rebuilt it, SSG/JAMstack-stylee with 11ty and netlify and entirely recoded the front-end. Silly, but so far so good, and it’s greasy fast!

Why?
- Eleventy
  - Curiosity. I wanted to try it.
  - Performance (static files, quicker TTFB)
  - Database-less: all content is centralised in the repo
  - Work in code: i.e. write articles in code (remove the middleman).
- Netlify
  - Curiosity. I wanted to try it.
  - Performance – hmmm....  although not sure about the FOUT issue   with self-hosted fonts.
  - Free hosting, so far
  - Does the deployment and hosting stuff on top of your existing Open Source build and repo hosting workflow
  - Provides a CDN so better worldwide performance
  - Convenience (d)
    - Takes the sys-admin and most of the dev-ops stuff off your plate.
      - didn’t have to build a server nor worry about security
      - Didn’t have to have a build step for compliling static assets (I previously used Buddy for that)
      - Auto Let’s encrypt
      - Auto performance
      - Auto cache busting

I started off without starting from the Eleventy base blog before learning the error of my ways. With it, you get:
- RSS
- Permalink anchors for your markdown headers
- Tag pages
- In general the elegant simplicity that comes from something made by the creators




However I had to find a solution to issue of FOUT on _repeat_ visits. Why was it happening? https://stackoverflow.com/questions/52308658/netlify-headers-cache-control-for-static-assets

References / inspiration:
hawksworx search
https://www.filamentgroup.com/lab/build-a-blog/
https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/ (note this also has stuff re. moment dates and blog article excerpts I might want to revisit)
https://github.com/11ty/eleventy-base-blog
https://www.hawksworx.com/blog/keeping-sass-simple-and-speedy-on-eleventy/ (although getting my gulp pipeline to work alongside 11ty took a bit of thought and effort)
Liquid syntax https://www.shopify.com/partners/shopify-cheat-sheet
Chris F JAMstack post
