---
layout: layouts/page.njk
title: Search
description: Seek and ye might find.
eleventyNavigation:
  key: Search
  order: 5
---

<!-- <form action="https://www.google.co.uk/search" method="get" class="search">
  <input type="hidden" name="q" id="q" value="site:{{metadata.url}}" />
  <label for="search-str">Search</label>
  <input type="text" name="q" id="search-str" />
  <button type="submit" class="submit" id="search-submit">Search with Google</button>
</form> -->

<link href="/pagefind/pagefind-ui.css" rel="stylesheet">

<!-- <style>
  @media (prefers-color-scheme: dark) {
    :root {
      --pagefind-ui-primary: #eeeeee;
      --pagefind-ui-text: #eeeeee;
      --pagefind-ui-background: #152028;
      --pagefind-ui-border: #152028;
      --pagefind-ui-tag: #152028;
    }
  }
</style> -->

<p>Type your search term into the form below.</p>

<div id="search" class="search"></div>

<script src="/pagefind/pagefind-ui.js" onload="new PagefindUI({ element: '#search', showImages: false });"></script>

