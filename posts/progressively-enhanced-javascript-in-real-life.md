---
title: Progressively enhanced JavaScript In Real Life
description: How my website’s search kept working even when javascript had failed
date: 2021-01-22T11:46:08.066Z
mainImage.isAnchor: false
tags:
  - progressiveenhancement
  - resilience
  - web
  - development
  - javascript
  - accessibility
---
Over the last couple of days I’ve witnessed a good example of progressive enhancement “In Real Life”. And I think it’s good to log and share these validations of web development best practices when they happen so that their benefits can be seen as real rather than theoretical.
---

A few days ago I noticed that the search function on [my website](https://fuzzylogic.me/) wasn’t working optimally. As usual, I’d click the navigation link “Search” then some JavaScript would reveal a search input and set keyboard focus to it, prompting me to enter a search term. Normally, the JavaScript would then “look ahead” as I type characters, searching the website for matching content and presenting (directly underneath) a list of search result links to choose from.

The problem was that although the search input was appearing, the search result suggestions were no longer appearing as I typed.

Fortunately, back when I built the feature I had just read Phil Hawksworth’s [Adding Search to a Jamstack site](https://www.hawksworx.com/blog/adding-search-to-a-jamstack-site/) which begins by creating a non-JavaScript baseline using a standard `form` which submits to [Google Search](https://www.google.co.uk/) (scoped to your website), passing as search query the search term you just typed. This is how I built mine, too. 

So, just yesterday at work I was reviewing a PR which prompted me to search for a specific article on my website by using the term “aria-label”. And although the enhanced search wasn’t working, the baseline search functionally was there to deliver me to a Google search result page (`site:https://fuzzylogic.me/ aria-label`) with the exact article I needed appearing top of the search results. Not a rolls-royce experience, but perfectly serviceable!

Why had the enhanced search solution failed? It was because the `.json` file which is the data source for the lookahead search had at some point allowed in a weird character and become malformed. And although the site’s JS was otherwise fine, this malformed data file was preventing the enhanced search from working.

JavaScript is brittle and fails for many reasons and in many ways, making it different from the rest of the stack. Added to that there’s the “unavailable until loaded” aspect (or [as Jake Archibald put it](https://twitter.com/jaffathecake/status/207096228339658752)):

> all your users are non-JS while they’re downloading your JS

The best practices that we as web developers have built up for years are not just theoretical. Go watch a screen reader user browse the web if you want proof that providing descriptive link text rather than “click here”, or employing headings and good document structure, or describing images properly with `alt` attributes are worthwhile endeavours. Those users _depend_ on those good practices. 

Likewise, JavaScript _will_ fail to be available on ocassion, so building a baseline no-JS solution will ensure that when it does, the show still goes on. 
