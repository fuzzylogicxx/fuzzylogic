---
date: "2020-08-08T12:01:21.100Z"
title: "The Simplest Way to Load CSS Asynchronously (Filament Group)"
description: "Scott Jehl of Filament Group demonstrates a one-liner technique for loading external CSS files without them delaying page rendering"
tags: [link, development, css, javascript, tool, nunjucks, customproperties, 11ty]
linkTarget: "https://mxb.dev/blog/color-theme-switcher/"
---
Scott Jehl of Filament Group demonstrates a one-liner technique for loading external CSS files without them delaying page rendering.
---
<figure>
  
``` html
<link 
      rel="stylesheet" 
      href="/path/to/my.css" 
      media="print" 
      onload="this.media='all'">
```

</figure>
