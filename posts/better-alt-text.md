---
title: "Better Alt Text"
description: Three ways in which I could improve my handling of alternative text for graphics
date: 2020-09-28 19:22:00
tags:
  - entry
  - development
  - html
  - alt
  - a11y
---
I’ve just read [The A11Y Project’s page on `alt` text](https://www.a11yproject.com/posts/2013-01-14-alt-text/).

As most of us know, the HTML `alt` attribute is for providing “alternate text” descriptions of images to help ensure people do not miss out on information conveyed by graphics. This can help people using assistive technology such as screen readers, and in situations where images are slow or fail to load.

The article made some interesting points and even though I’ve been using the `alt` attribute for years I found three common cases where I could improve how I do things.

---

## Avoid starting with “photo of…”

Don’t begin alternative text with “photo of…” or “picture of…”. Assistive technologies already indicate the role of the element as an “image” or “graphic”. Redundancy makes for a poor user experience.

## Avoid including the word “logo” in logo images

If the image is a company’s logo, the `alt` should be the company’s name. Adding the word “logo” as part of the alternative text is neither necessary nor useful. (One thing I found helpful here is to think of the way I, a sighted person, perceive looking at Apple’s logo. I just think “Apple”, not “Apple’s logo”, so I guess the same principle applies.)

## If using an image multiple times on the page, tailor the `alt` text

Using an image several times in a website doesn't necessarily mean the alt attribute should be the same for each instance. For example, when using a logo in the website’s header this often doubles as a link back to the home page. In this example, the `alt` would be most useful as “Apple - Homepage”. If that same logo were used in the footer of the site alongside the text “Apple, copyright 20XX”, then the logo should have an empty alt (alt="") so as to avoid creating a redundant announcement of the company’s name.
