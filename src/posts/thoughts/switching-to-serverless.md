---
date: 2019-18-08 08:00:00.00
pageTitle: Switching to serverless
tags: ['eleventy', 'netlify', 'JAMstack', 'serverless']
title: Switching to serverless
permalink: thoughts/switching-to-serverless/index.html
draft: true
metaDescription: blah
ogImagePath: /assets/img/open_graph_share_example_1200x630.jpg
ogImageAlt: A photo of a country landscape
---


From dynamic Perch and LAMP to static 11ty and Netlify
Continuous deployment
”I’ll just make a few small tweaks to my website…” I said. Cut to 3 sleep-deprived days later and I’ve rebuilt it, SSG/JAMstack-stylee with 11ty and netlify and entirely recoded the front-end. Silly, but so far so good, and it’s greasy fast!

Why?
- Eleventy
  - Curiosity. I wanted to try it. 
  - Performance (static files, quicker TTFB)
- Netlify
  - Curiosity. I wanted to try it. 
  - Performance
  - Fits a modern open source workflow
  - Free hosting, so far
  - Convenience (d)
    - Takes the sys-admin and most of the dev-ops stuff out of the loop.
      - didn’t have to build a server nor worry about security
      - Didn’t have to have a build step for compliling static assets (I previously used Buddy for that)
      - Auto Let’s encrypt
      - Auto performance
      - Auto cache busting






However I had to find a solution to issue of FOUT on _repeat_ visits. Why was it happening? https://stackoverflow.com/questions/52308658/netlify-headers-cache-control-for-static-assets

References / inspiration:
https://www.filamentgroup.com/lab/build-a-blog/
https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/ (note this also has stuff re. moment dates and blog article excerpts I might want to revisit)
https://github.com/11ty/eleventy-base-blog
https://www.hawksworx.com/blog/keeping-sass-simple-and-speedy-on-eleventy/ (although getting my gulp pipeline to work alongside 11ty took a bit of thought and effort)
Liquid syntax https://www.shopify.com/partners/shopify-cheat-sheet
Chris F JAMstack post
