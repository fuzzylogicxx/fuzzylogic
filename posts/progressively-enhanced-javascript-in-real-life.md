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
draft: true
---
Over the last couple of days I saw a little “In Real Life” example of progressive enhancement doing its job with regard to JavaScript. I’m currently really into logging and sharing these real-life validations of good practices so that the benefit of those practices (usually making people’s life easier) are seen to be real rather than theoretical.
---

The search function on my website wasn’t working optimally. You usually click/tap search, the JS responds by revealing a search box and setting keyboard focus to it, then you type your search term and it “looks ahead”, searching the website as you type characters, and presents a list of options.

The problem was that although the search box was appearing, no suggestions were coming up as you typed.

Fortunately, back when I built it I was reading Phil Hawksworth’s [Adding Search to a Jamstack site](https://www.hawksworx.com/blog/adding-search-to-a-jamstack-site/) which begins with creating a baseline without JavaScript, including making the (non-enhanced) search a standard form which submits to a Google search scoped to your website and the search term you just typed. For example last night I looked up a bookmark about aria-label on my website while reviewing a PR and—because the JS enhancement wasn’t available—it just posted me to a Google search site:https://fuzzylogic.me/ aria-label with the exact article I needed coming top of the search results. Not a rolls-royce experience, but perfectly serviceable.

This was great because I rely on that search many times a day.

Why had the enhanced solution failed? Because the .json file which is the source for the lookahead search (and is re-generated every commit) had somehow got a weird character into it which had malformed the file. Although all the rest of the JS was otherwise fine, this prevented the enhanced search working.

JS is brittle and fails in many ways, making it different from the rest of the stack. Then there’s the “unavailable until loaded” aspect (or as Jake Archibald put it “"We don't have any non-JavaScript users" No, all your users are non-JS while they're downloading your JS”). https://twitter.com/jaffathecake/status/207096228339658752

There were lots of those moments with Léonie’s session. And this search issue was another one for me. I’m glad on our mobbing session yesterday we got the time to include chat about “what’s the baseline before/without JS”. And it’s great to build things that are resilient.
