---
layout: layouts/page.njk
title: Search
description: Seek and ye might find.
tags:
  - nav
navtitle: Search
navpos: 4
navID: nav-search
---

<form action="https://www.google.co.uk/search" method="get" class="search">
  <input type="hidden" name="q" id="q" value="site:{{metadata.url}}" />
  <label for="search-str">Search</label>
  <input type="text" name="q" id="search-str" />
  <button type="submit" class="submit" id="search-submit">Search with Google</button>
</form>

