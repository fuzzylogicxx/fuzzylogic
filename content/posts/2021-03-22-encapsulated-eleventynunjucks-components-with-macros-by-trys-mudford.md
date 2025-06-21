---
date: "2021-03-22T20:49:00.533Z"
title: "Encapsulated Eleventy/Nunjucks components with macros (by Trys Mudford)"
description: "Trys shows us how to use macros in Nunjucks (rather than set followed by include) to create encapsulated components."
tags: [link, nunjucks, templatelanguages, javascript, jamstack]
linkTarget: "https://www.trysmudford.com/blog/encapsulated-11ty-components/"
---
Trys shows us how to use the Nunjucks `macro` to create encapsulated components. This works out less leaky and more predictable than an `include` preceded by variables assigned with `set`.
---

Trys’s solution allows us to render components like so:

<figure>

``` twig
{%- raw -%}
{{ component('button', {
  text: 'Press me'
}) }}

{# Output #}
{% endraw %}
<button type="button">Press me</button>
```

</figure>

**Update, 8th Aug 2021**: when I tried implementing this I found that it results in errors when attempting to render components anywhere other than on the base template where Trys recommended including the `import` line. The workaround—as [Paul Salaets points out](https://github.com/trys/11ty-component-macro/issues/1)—is to include the `import` at the top of every page-level template (`index.njk`, `archive.njk` etc) that uses the component macro.
