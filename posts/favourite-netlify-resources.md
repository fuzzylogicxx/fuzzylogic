---
date: 2021-07-15T07:25:58Z
title: Favourite Netlify resources
description: ''
tags:
- howto
- netlify
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: true

---
Table of contents

* Netlify
* Netlify CMS

## Netlify

## Netlify CMS

How to add Netlify CMS to your site [https://www.netlifycms.org/docs/add-to-your-site/](https://www.netlifycms.org/docs/add-to-your-site/ "https://www.netlifycms.org/docs/add-to-your-site/#filter")

Summary of all `config.yml` options [https://www.netlifycms.org/docs/configuration-options/](https://www.netlifycms.org/docs/configuration-options/ "https://www.netlifycms.org/docs/configuration-options/")

Collection Types: folder or file, and how they should be configured in `config.yml` [https://www.netlifycms.org/docs/collection-types/](https://www.netlifycms.org/docs/collection-types/ "https://www.netlifycms.org/docs/collection-types/")

Working References

* [https://github.com/danurbanowicz/eleventy-netlify-boilerplate/](https://github.com/danurbanowicz/eleventy-netlify-boilerplate/ "https://github.com/danurbanowicz/eleventy-netlify-boilerplate/")

Using Github as an Authentication (via OAuth) Provider, rather than using Netlify Identity for authentication:

* compared my repo’s admin/config.yml and my Netlify site’s settings against those of a repo using Github as an Authentication Provider;
* noticed that my repo was set up to do authentication using Netlify Identity whereas the other website’s authentication uses “Github Backend”, which means using Github as an (OAuth) Authentication Provider;
* In Netlify, removed Netlify Identity from my Netlify site (because I’m not going to use it for authentication any more)
* Updated my site’s `admin/config.yml`, changing `name: git-gateway` to `name: github` and adding `repo: ownername/reponame`
* Followed the Netlify docs page [Using an authentication provider](https://docs.netlify.com/visitor-access/oauth-provider-tokens/#using-an-authentication-provider) which provides guidance on registering a new OAuth application in Github
* [Created a new oauth application](https://github.com/settings/developers) in my personal Github account. I plan to transfer ownership of that to the more appropriate owner soon, if possible.
* The Netlify CMS dashboard is now accessible!