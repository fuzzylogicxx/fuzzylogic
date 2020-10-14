---
title: "Winter 2020 website refresh, Part 1"
description: Winter 2020 website refresh
date: 2020-10-11 07:30:00
draft: true
tags:
  - entry
  - web
  - development
  - 11ty
  - lighthouse
---
Winter 2020 website refresh, Part 1
---

Started by branching off and cleaning out everything (except `.git`).

Added [11ty-base-blog](https://github.com/11ty/eleventy-base-blog). I started from this in the previous branch too, but wanted to get up to date with the latest version of 11ty, examples of the latest 11ty goodness e.g. changes to navigation etc.

Checked my lighthouse score manually in Chrome. 

Netlify > Domain Management > Branch Subdomains > create ”v4” subdomain for branch v4 deploys (and blocked search engine robots) 

Deployed Zach’s speedlify to Netlify which also creates a new Github repo

Created a "build hook" on that Netlify app (its an API URL that can be hit which triggers a build)

Set up a Github action on my speedlify Github repo, scheduling a run of the netlify build (by hitting the build hook) every morning.

