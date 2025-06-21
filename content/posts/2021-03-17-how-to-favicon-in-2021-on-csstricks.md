---
date: "2021-03-17T10:33:03.809Z"
title: "How to Favicon in 2021 (on CSS-Tricks)"
description: "Some excellent favicon tips from Chris Coyier, referencing Andrey Sitnik’s recent article"
tags: [link, favicon, howto, web, development]
linkTarget: "https://css-tricks.com/how-to-favicon-in-2021/"
---
Some excellent favicon tips from Chris Coyier, referencing [Andrey Sitnik’s recent article](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs) of the same name.

> I always appreciate someone looking into and re-evaluating the best practices of something that literally every website needs and has a complex set of requirements.
---

Chris is using:

<figure>

``` html
<link rel="icon" href="/favicon.ico"><!-- 32x32 -->
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png"><!-- 180x180 -->
<link rel="manifest" href="/manifest.webmanifest">
```

</figure>

And in `manifest.webmanifest`:

<figure>

``` json
{
  "icons": [
    { "src": "/192.png", "type": "image/png", "sizes": "192x192" },
    { "src": "/512.png", "type": "image/png", "sizes": "512x512" }
  ]
}
```

</figure> 

(via [@mxbck](https://twitter.com/mxbck))
