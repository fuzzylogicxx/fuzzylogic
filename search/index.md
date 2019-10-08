---
layout: layouts/post.njk
title: Search
description: Seek and ye might find.
tags:
  - nav
navtitle: Search
navID: nav-search
templateClass: tmpl-post
---

<form action="https://www.google.co.uk/search" method="get" class="search">
  <input type="hidden" name="q" id="q" value="site:{{metadata.url}}">
  <label for="search-str">Search <small></label>
  <input type="text" name="q" id="search-str"></p>
  <button type="submit" class="submit" id="search-submit">Search with Google</button>
</form>
