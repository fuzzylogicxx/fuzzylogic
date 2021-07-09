---
title: Favourite Eleventy (11ty) Resources
description: My go-to resources when building a new site using 11ty
date: 2021-07-03T14:24:03.788+00:00
mainImage.isAnchor: false
tags:
- 11ty
- web
- development
- cache
- plugin
- blog
draft: false

---
Here are my current go-to resources when building a new site using Eleventy (11ty).
---

[Build an Eleventy site from scratch](https://egghead.io/courses/build-an-eleventy-11ty-site-from-scratch-bfd3) by Stephanie Eckles. As the name suggests, this is for starting from a blank canvas. It includes a really simple and effective way of setting up a Sass watch-and-build pipeline that runs alongside that of Eleventy, using only `package.json` scripts rather than a bundler.

[Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog) from 11ty. If rather than a blank canvas you want a boilerplate that includes navigation, a blog, an RSS feed and prism CSS for code block styling (among other things) then this is a great option. Of course, you can also just cherry-pick the relevant code you need, as I often do.

[Eleventy Navigation Plugin](https://www.11ty.dev/docs/plugins/navigation/). This allows you to set a page or post as a navigation item. It handily supports ordering and hierarchical nesting (for subnavigation). You can then render out your navigation from a layout in a one-liner or in a custom manner.

[Eleventy Cache Assets Plugin](https://www.11ty.dev/docs/plugins/cache/). This is really handy for caching fetched data so as not to exceed API limits or do undue work on every build.

[11ty Netlify Jumpstart](https://11ty-netlify-jumpstart.netlify.app/) is another from Stephanie Eckles but this time a “quick-start boilerplate” rather than blank canvas. It includes a minimal Sass framework, generated sitemap, RSS feed and social share preview images. The [About page it generates](https://11ty-netlify-jumpstart.netlify.app/about/) contains lots of useful info on its features.

[forestry.io settings for 11ty Base Blog](https://github.com/forestryio/eleventy-base-forestry/tree/forestry/.forestry) and [forestry.io settings for Hylia](https://github.com/DirtyF/hylia-forestry/tree/forestry/.forestry) (Andy Bell’s 11ty starter)

[All my posts tagged “11ty”](https://fuzzylogic.me/tags/11ty/)

More to follow…
