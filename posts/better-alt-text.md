---
title: "Better Alt Text"
description: X Ways I was coding alt attributes wrongly
date: 2020-09-28 19:22:00
tags:
  - entry
  - development
  - html
  - alt
  - a11y
---
I’ve just read [The A11Y Project’s page on `alt` text](https://www.a11yproject.com/posts/2013-01-14-alt-text/).

As most of us know, the alt attribute is for providing “alternate text” descriptions of images to help ensure people do not miss out on information conveyed by graphics. This can help people using assistive technology, such as screen readers, and in situtations where (for whatever reason) images are slow or fail to load.
---

The article made some interesting points and even though I’ve been using the `alt` attribute for years I found three common cases where I could improve how I do things. 

## Avoid including the word “logo” in logo images

If the image is of a company’s logo, the alt should be the company’s name. The word "logo" is not necessary or _useful_ as part of the alternative text.

## If using an image multiple times, consider using different `alt` text

Using an image several times in a website doesn't necessarily mean the alt attribute will be the same for each instance. For example, a logo within a website’s header often doubles a link back to the home page. In this example, the alt would be useful as "Company’s name - home". If that same logo were used in the footer of the site, next to the text "Company's name, copyright 20XX", then the logo would have an empty alt (alt="") so as to not create a redundant announcement of the company's name.

## Avoid starting with “photo of…”

Don’t begin alternative text with "photo of..." or "picture of...". Assistive technologies already indicate the role of the element as an "image" or "graphic". Redundancy makes for poor user experiences.
