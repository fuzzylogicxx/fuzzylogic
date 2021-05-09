---
title: Responsive Navigation round-up
description: Various approaches to tackling responsive navigation
date: 2021-05-09T17:27:50.490Z
mainImage.isAnchor: false
tags:
  - navigation
  - html
  - css
  - svg
  - javascript
draft: true
---
lorem
---

TL;DR my favourite approach is the BBC’s because it’s so comprehensive. It handles everything you could possibly want.

- a “full nav” in footer, always visible.
- a first global navigation `ul` in the `header` containing some but not all of the items in the footer nav, plus a few custom links. I’ll call this the “horizontal header nav” (HHN). Note that even on super-wide viewports and fully enhanced it will never include _all_ the items that are in the “full nav”(*).
- CSS `display: none` is applied to every list item of that list.
- An overriding `display: block` is applied to a couple of the list items so that they are visible in all circumstances. The relevant items are: notifications bell/link, link to user account, and a “Menu” link.
- The href of the “Menu” anchor is an in-page link to the footer navigation.
- The text of the “Menu” link is in a `span`. There is a sibling `span` containing text “More” which is set to `display: none`.
- The Menu/More anchor also contains an SVG icon: a downward-pointing arrow.
- There is a second global navigation `div` (with inner `ul`) which contains the _full nav_ just like the footer.
- At a min-width of 400px there is enough room to display the first “main” nav item of the HHN—the “Home” link. Because we now have part of the main nav showing, the “Menu” anchor changes such that the `span` containing “Menu” is hidden with `display: none` and its previously hidden sibling `span` with text “More” is now displayed.
- At increasing viewport width increments, the HHN reveals further items.

The above works when JS is not yet loaded, broken, or disabled. The JS happy path enhances things as follows:
- 

1. interesting that they never show _all_ the nav items in the HHN even when the screen is super-wide. Although I guess by always having a “More” they maybe accept that you can’t keep adding horizontally forever, protect themselves from the a broken layout, and simultaneously afford themselves flexibility to keep adding new items if need be? Or maybe it was just easier to leave it this way.
1. it’d be nice not to repeat the nav three times in the server-rendered markup! However the alternative is pretty challenging. You need to use JS to clone nodes and move them around but remove and re-add them again if the viewport width changes. When trying to reconcile that with existing complex responsive CSS styles this quickly gets pretty gnarly (I speak from experience).

UK Govt
https://www.nhs.uk/conditions/coronavirus-covid-19/coronavirus-vaccination/coronavirus-vaccine/

JK 24 Ways
https://24ways.org/2014/responsive-enhancement/
https://media.24ways.org/2014/keith/example3.html

My Codepens

BBC

ARIA
- see FreeAgent



