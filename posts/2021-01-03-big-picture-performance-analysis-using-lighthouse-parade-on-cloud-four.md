---
date: "2021-01-03T18:42:11.343Z"
title: "Big picture performance analysis using Lighthouse Parade (on Cloud Four)"
description: "Lighthouse Parade is a Node.js command line tool that crawls a domain and gathers lighthouse performance data for every page."
tags: [link, tool, performance, lighthouse]
linkTarget: "https://cloudfour.com/thinks/big-picture-performance-analysis-using-lighthouse-parade/"
---
> Lighthouse Parade is a Node.js command line tool that crawls a domain and gathers lighthouse performance data for every page. With a single command, the tool will crawl an entire site, run a Lighthouse report for each page, and then output a spreadsheet with the aggregated data.
---

I like the sound of this tool, especially because it analyses your entire site rather than just a single page. It was also easy to run with no local installation, via:

<figure>

``` bash
npx lighthouse-parade https://fuzzylogic.me
```

</figure>

However it was taking a _long_ time to run over all the pages of my statically generated site (there are lots of pages) so I probably either need to do some configuration or else wait for [sitemap support to land](https://github.com/cloudfour/lighthouse-parade/issues/3).
