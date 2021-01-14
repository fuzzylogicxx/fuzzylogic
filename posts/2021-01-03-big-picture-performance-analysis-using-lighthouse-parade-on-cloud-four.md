---
date: "2021-01-03T18:42:11.343Z"
title: "Big picture performance analysis using Lighthouse Parade (on Cloud Four)"
description: "Lighthouse Parade is a Node.js command line tool that crawls a domain and gathers lighthouse performance data for every page."
tags: [link, tool, performance, lighthouse]
linkTarget: "https://cloudfour.com/thinks/big-picture-performance-analysis-using-lighthouse-parade/"
---
I like the sound of this performance analysis tool from the clever folks at [Cloud Four](https://cloudfour.com/), especially because it covers your entire site rather than just a single page.

> Lighthouse Parade is a Node.js command line tool that crawls a domain and gathers lighthouse performance data for every page. With a single command, the tool will crawl an entire site, run a Lighthouse report for each page, and then output a spreadsheet with the aggregated data.
---

It was also easy to run with no local installation, via:

<figure>

``` bash
npx lighthouse-parade https://fuzzylogic.me
```

</figure>

However it was taking a _long_ time to run over all the pages of my statically generated site (there are lots of pages), so much so that I felt I needed to stop it due to my laptop sounding like it was about to take off. So if running it again, I’d probably only do so on a smaller site, or first check [the tool’s documentation](https://github.com/cloudfour/lighthouse-parade) to see if either scope-limiting or sitemap-based crawling support have been added.
