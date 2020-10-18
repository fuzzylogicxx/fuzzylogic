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

Netlify > Domain Management > Branch Subdomains > create ”v4” subdomain for branch v4 deploys (and blocked search engine robots) https://v4.fuzzylogic.me/

Deployed Zach’s speedlify to Netlify which also creates a new Github repo.

Created a "build hook" on that Netlify app (its an API URL that can be hit which triggers a build)

Set up a Github action on my speedlify Github repo, scheduling a run of the netlify build (by hitting the build hook) every morning. (refs https://github.com/Jinksi/netlify-build-github-actions, https://twitter.com/iign/status/1288933337478975504

Working custom speedlify on Netlify https://zen-hoover-34d28b.netlify.app/fuzzylogic.me/

Need to consider if I want the lighthouse scores in the footer (https://github.com/zachleat/speedlify-score/). If I do, I probably don’t want or need to do this by client-side javascript.

Added two Netlify plugins

- [Lighthouse])https://github.com/netlify-labs/netlify-plugin-lighthouse#readme)
- [Minify HTML](https://github.com/philhawksworth/netlify-plugin-minify-html#readme)

Added Netlify CMS, with help from https://www.youtube.com/watch?v=WEApDhZMAL4
Note that 1) I don’t really like having the CMS Admin javascript in my base layout; it’d be good to move that into an admin-specific layout. 2) When I accessed /admin at first it kept failing, 404ing the config.yml. This might have been because I had a blank line at the end of the file or maybe it was the HTML minify plugin (which I’ve disabled for now).
