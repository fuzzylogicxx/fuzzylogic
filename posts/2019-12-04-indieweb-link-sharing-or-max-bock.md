---
date: "2019-12-04T22:26:07.591Z"
title: "IndieWeb Link Sharing | Max Böck"
description: "Max shows how to use the combination of a bookmarklet, Eleventy, Netlify Functions and Github to share links on your personal website."
tags: [link, indieweb, github, lambda, netlify, bookmarking]
linkTarget: "https://mxb.dev/blog/indieweb-link-sharing/"
---
> A pain point of the IndieWeb is that it's sometimes not as convenient to share content as it is on the common social media platforms… That’s why I wanted to improve this process for my site.
---

This was a fantastic walkthrough by [Max](https://twitter.com/mxbck). And based on this, I’ve just finished implementing an easy-bookmarking feature on my own website. 

I already use this site to save _Bookmarks_ so I’m hooking into that. For the bookmark-saving form, I’ve used [Stimulus](https://stimulusjs.org/) rather than [Preact](https://preactjs.com/). But otherwise this is very much based on Max’s superb tutorial.

Here’s my bookmarklet code so that future-me can create a new browser bookmark, edit it and paste this in.

<figure>
  
``` js
javascript:(function(){var title = document.getElementsByTagName('title')[0].innerHTML;title = encodeURIComponent(title);var selection = '';if (window.getSelection) {selection = window.getSelection().toString();} else if (document.selection &amp;&amp; document.selection.type != 'Control') {selection = document.selection.createRange().text;}selection = encodeURIComponent(selection);new_window=window.open('https://fuzzylogic.me/bookmarker/?title='+title+'&amp;body='+selection+'&amp;url='+encodeURIComponent(document.location.href),'Sharer','resizable,scrollbars,status=0,toolbar=0,menubar=0,titlebar=0,width=680,height=700,location=0');})();
```
  
</figure>

Incidentally, this process also provided a great way to dip my toes into the world of Netlify Functions and their supporting tools, [netlify-dev](https://www.netlify.com/products/dev/) and [netlify-lambda](https://github.com/netlify/netlify-lambda).

There’s more to be done but I wanted the first bookmark created with my shiny new system to be a link to Max’s original tutorial – and this post is it. 

Many thanks, Max! 
