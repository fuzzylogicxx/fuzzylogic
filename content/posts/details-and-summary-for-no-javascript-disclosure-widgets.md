---
date: 2019-02-20T00:00:00Z
title: Details and summary for no-JavaScript disclosure widgets
description: A great native way of showing and hiding content
tags:
- note
- disclosure
- details
- html
noteWithTitle: true
location: Glasgow
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
The fairly-recently added `<details>` element is a great, native HTML way to toggle content visibility.

<div class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WNOJbKd" data-preview="true" data-user="fuzzylogicx"  data-prefill='{"title":"Hiding: native disclosure using <details>","tags":["hide","hiding","html","details"],"scripts":[],"stylesheets":[]}'>
  <pre data-lang="html">&lt;p>Lorem ipsum dolor sit amet.&lt;/p>

&lt;details>
  &lt;summary>System Requirements&lt;/summary>
  &lt;p>Requires a computer running an operating system. The computer
    must have some memory and ideally some kind of long-term storage.&lt;/p>
&lt;/details>

&lt;p class="end">Remember: built-in beats bolt-on, bigly!&lt;/p>

&lt;!-- 
&lt;details> is great but there are a few gotchas:
- Not totally flexible design-wise
- Unsuitable for accordions with multiple sibling elements unless you add some JS
- Unsupported in IE 11 (but content is still available)
--></pre>
  <pre data-lang="css">:root {
  font-size: 110%;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}

input,
button {
  font-size: inherit;
}

.end {
  margin-top: 2rem;
}
</pre></div>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
