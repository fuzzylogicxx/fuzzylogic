---
date: "2020-08-08T012:01:21.100Z"
title: "The Simplest Way to Load CSS Asynchronously (Filament Group)"
description: "Scott Jehl of Filament Group demonstrates a one-liner technique for loading external CSS files without them delaying page rendering"
tags: [link, development, css, javascript, tool, nunjucks, customproperties, 11ty]
linkTarget: "https://www.filamentgroup.com/lab/load-css-simpler/"
---
Scott Jehl of Filament Group demonstrates a one-liner technique for loading external CSS files without them delaying page rendering.
---
> Today, armed with a little knowledge of how the browser handles various link element attributes, we can achieve the effect of loading CSS asynchronously with a short line of HTML. Here it is, the simplest way to load a stylesheet asynchronously:

<figure>
``` html
<link rel="stylesheet" href="/path/to/my.css" media="print" onload="this.media='all'">
```
</figure>
