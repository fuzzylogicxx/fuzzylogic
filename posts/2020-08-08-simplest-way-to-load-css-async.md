---
date: "2020-08-08T12:01:21.100Z"
title: "The Simplest Way to Load CSS Asynchronously (Filament Group)"
description: "Scott Jehl of Filament Group demonstrates a one-liner technique for loading external CSS files without them delaying page rendering"
tags: [link, performance, development, css, javascript, tool, nunjucks, customproperties, 11ty]
linkTarget: "https://www.filamentgroup.com/lab/load-css-simpler/"
---
Scott Jehl of Filament Group demonstrates a one-liner technique for loading external CSS files without them delaying page rendering.
---
This isn’t really necessary in situations where your (minified and compressed) CSS is small (14k or below) but could be useful when working with large CSS files.

> Today, armed with a little knowledge of how the browser handles various link element attributes, we can achieve the effect of loading CSS asynchronously with a short line of HTML. Here it is, the simplest way to load a stylesheet asynchronously:

<figure>
  
``` html
<link rel="stylesheet" href="my.css" media="print" onload="this.media='all'">
```

</figure>

Note that if JavaScript is disabled or otherwise not available your stylesheet will only load for print and not for screen, so you’ll want to [follow up with a “normal” (non-print specific) stylesheet within `<noscript>` tags](https://twitter.com/nhoizey/status/1152330563082227712).
