---
date: "2021-03-22T20:49:00.533Z"
title: "Encapsulated Eleventy/Nunjucks components with macros (by Trys Mudford)"
description: "Trys shows us how to use macros in Nunjucks (rather than set followed by include) to create encapsulated components."
tags: [link, nunjucks, templatelanguages, javascript, jamstack]
linkTarget: "https://www.trysmudford.com/blog/encapsulated-11ty-components/"
---
Trys shows us how to use the Nunjucks `macro` to create encapsulated components. This works out less leaky and more predictable than an `include` preceded by variables set with `set`.
---

Trys’s solution allows us to render components like so:

<figure>
  
``` twig
{{ component('button', {
  text: 'Press me'
}) }}

{# Output #}
<button type="button">Press me</button>
```

</figure>
