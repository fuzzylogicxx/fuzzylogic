---
layout: layouts/page.njk
title: Search
description: Seek and ye might find.
eleventyNavigation:
  key: Search
  order: 6
---

{#- Add the page-find web component JS to the JavaScript bundle #}
{%- js %}{% include "node_modules/@zachleat/pagefind-search/pagefind-search.js" %}{% endjs %}

Type your search term into the form below.

<search class="search">
  <!-- Fall back to DuckDuckGo site search (use any search engine here) -->
  <pagefind-search pagefind-autofocus>
    <form class="searchform-basic" action="https://duckduckgo.com/" method="get">
      <label style="display: inline;">
        Search for:
        <input style="max-width: 16rem;" type="search" name="q" autocomplete="off" autofocus>
      </label>
      <!-- Put your searchable domain here -->
      <input type="hidden" name="sites" value="fuzzylogic.me">
      <button type="submit">Search</button>
    </form>
  </pagefind-search>
</search>
