---
date: 2022-01-15T10:56:35Z
title: Saving CSS changes in DevTools without leaving the browser
description: Writing and saving CSS directly in the devtools panel
tags:
- entry
- browsers
- css
- howto
- tip
- chrome
- devtools
- development
- web
noteWithTitle: false
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
Scott Jehl recently wrote on Twitter:

> Browser devtools have made redesigning a site such a pleasure. I love writing and adjusting a CSS file right in the sources panel and seeing design changes happen as I type, and saving it back to the file. (…) Designing against live HTML allows happy accidents and discoveries to happen that I wouldn't think of in an unconstrained design mockup

I feel very late to the party here, but I’ve just tried this out on my own website. Here’s what I did.
---

1. started up my 11ty-based site locally which launches a `localhost` URL for viewing it in the browser;
2. opened Chrome’s DevTools at _Sources;_
3. checked the box “Enable local overrides” then followed the prompts to allow access to the folder containing my SCSS files;
4. opened an SCSS file in the Sources tab for editing side-by-side with my site in the browser;
5. made a change, hit <kbd>Cmd-S</kbd> to save and marvelled at the fact that this updated that file, as confirmed by a quick `git status` check.
6. switched to the _Elements_ panel, opened its _Styles_ subpanel, made an element style change there, then marvelled at this too saving that change to a file.

This is a _really_ interesting way of working that gets us closer to the browser and I can see me using it. 

There are also a couple of challenges which I’ll probably want to consider. Right now when I make a change to a Sass file, the browser takes a while to reflect that change, which diminishes the benefit of this approach. My site is set up such that Eleventy watches for changes to the sass folder as a trigger for rebuilding the static site. This is because for optimal performance I’m purging the compiled and combined CSS and inlining that into the `<head>` of every file… which unfortunately means that when the CSS is changed, every file needs rebuilt. So I need to wait for Eleventy to do its build thing until the page I’m viewing shows my CSS change.

I might consider no longer inlining CSS, or only inlining a small amount of critical stuff, or maybe (as best of all worlds) only do the inlining for production but not in development. I like that latter idea.

