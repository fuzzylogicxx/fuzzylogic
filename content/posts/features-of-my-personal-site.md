---
date: 2024-04-28T08:13:53.000+00:00
title: Features of my personal website
description: Logging my website’s current features so I can manage it a bit better
tags:
- entry
- web
- personalsite
---
I like the metaphor for personal websites of _tending to a digital garden_.

Like all gardens, they can become a bit unruly and need some weeding. Right now, as I consider updating some software and freshening things up, I realise that I’ve let it overgrow a tad.

So, here’s a post in which I’ll log my website’s current features. This should be useful in and of itself as a stepping stone to writing a proper readme. However it’ll also help me reflect on my website’s health and maintainability so I can decide which features to nourish and which to prune.

Note: this post will take a bit of time and a few sessions, so please regard it as a work in progress.
---

## What I want

Before getting lost in stuff I _have_, I thought it’d be good to set out my higher-level goals and what I feel I have the time to sustain. I think I’d like:

- to retain URLs and SEO through updates
- excellent accessibility and performance (four hundos on lighthouse is a good start)
- it to use the best of modern web standards
- simplicity: minimal dependencies, easy to make technical updates
- to maintain some documentation to support ease of updating
- minimal noise: I don’t want a bunch of emails from third parties, nor ongoing dependency update alerts
- sensibly organised content
- a search function
- a way for folks to contact me
- some personality in the design and content
- be able to add and edit content easily (a mobile-friendly CMS rather than via code only)
- be able to insert photos into content easily

And here are a few secondary and lower-level wants:

- code snippets should look good
- images complexities handled behind the scenes
- some indieweb features supporting interactivity with other bloggers and friends

## What I actually have

This is gonna be a much lower-level set of features than the above goals, but that’s OK. I can ask myself whether each supports my wider goals and are worth the effort.

### Main tech stack

It’s a statically generated site powered by Eleventy.

The code is hosted on GitHub.

I use Netlify for production builds, deployments and hosting.

I’m happy with this stack. The parts play well together, it’s free, and it brings a lot of flexibility and performance benefits.

### CMS

I use Decap CMS. It’s free and is working OK, however the UI is rubbish on a small screen.

I previously tried both Netlify CMS and Forestry for a while then gave up on them. I also sometimes [use github.com as my CMS](https://fuzzylogic.me/posts/how-i-use-github-as-jamstack-cms/). That works but isn’t ideal.

### SEO

I provide an [XML sitemap](https://fuzzylogic.me/sitemap.xml) which is intended [for search engines](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and a [human-readable sitemap](https://fuzzylogic.me/sitemap/).

I include a front-matter key called `pageSpecificRobotsDirective` on individual posts when I want an individual post to not be indexed.

### Key pages

#### Home

An intro, and a list of latest posts.

#### About

Some information about me that’s currently split between my interests in the web and music.

#### Contact

It’s a form, and for its backend I use [Netlify Forms](https://docs.netlify.com/forms/setup/#html-forms). That gives me the server-side handling, database storage and admin management aspects of a form for my otherwise-static site.

#### Journal Archive

Access to all published posts.

#### Search

A JS-based form for searching all posts, with an autosuggest function. I use [pagefind](https://pagefind.app) to power the search.

I don’t like how it’s JavaScript dependant and in future I should look at [trying Zach Leatherman’s web component.](https://chrismcleod.dev/blog/adding-site-search-eleventy-pagefind-web-component/)

#### 404 page

I have a `404.md` file which sets a permalink of (i.e. is built as) `404.html`. [And having made that file available, Netlify does the rest](https://www.11ty.dev/docs/quicktips/not-found/)… which is nice!

### Detailed features

#### Avatar

I [serve an avatar from a conventional location](https://fuzzylogic.me/posts/well-known-avatar/) per Jim Neilsen’s idea – [see my avatar](https://fuzzylogic.me/.well-known/avatar).

#### Design tokens

I use the technique in Heydon Pickering’s [Easily use design tokens in Eleventy](https://heydonworks.com/article/design-tokens-in-eleventy/). I have a an Eleventy global data file named tokens.json in which I define my design tokens. The point of making them available from Eleventy data is that it makes the tokens interoperable. I can grab values not only when setting CSS custom properties, but also when creating a manifest.json if I want my website to be a PWA.

#### Environment variables

I set `NODE_ENV` to `production` as an environment variable in my Netlify dashboard. This should mean that packages under `devDependencies` are not built in production which is good because that’d be a waste of time. With the `dotenv` module installed, if the NODE_ENV variable is present its value is loaded into Node.js’s `process.env` property. That allows me to check in JavaScript whether or not the current environment is production. With that, I might avoid outputting draft posts to physical files in production, or avoid hitting API resources in local development.

Only JS files can access `process.env`. So, in order to be able to check “is this production?” in other files such as Nunjucks templates I have an eleventy data file named `app.js` which makes the environment value available via `{{ app.environment }}.

Incidentally I used to set another custom environemt variable called `ELEVENTY_ENV` to `production` in the source-controlled `package.json`, within the `build` NPM script. I think this is now redundant given that I can use `NODE_ENV` for the same purpose. I previously used it within a Netlify lambda function that posted to the Github API to create new bookmark posts. I don’t do that any more so I can delete this environment variable.

#### Excerpts

I use [gray-matter’s default approach for including, delimiting and parsing excerpts from posts](https://www.11ty.dev/docs/data-frontmatter-customize/#example-parse-excerpts-from-content). The excerpt is both part of the post content but also accessible separately, which is useful for showing only the excerpt in post lists.

It’s not perfect. It’d be useful to have a class on the excerpt. It’d be useful to be able to apply different styling to it on-demand and not on every post.

#### Favicons

I updated it a few years ago per Evil Martians article https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs but it needs a further update. I’ll need to modify my SVG logo to sit on a solid background.

#### Image plugin

I use Eleventy Image to perform build-time image transformations. It takes images I’ve added in posts and pages and converts and saves them into multiple formats and sizes, and swaps the original markup for modern, responsive, multi-format image markup using `picture` and `source` and pointing to the converted image files.

#### Linting and code formatting tools

I use a `.editorconfig` file to set how my editor should handle things like nested line indentation, inserting an end of file newline and so on. I just go pretty much with what the [11ty base blog repo](https://github.com/11ty/eleventy-base-blog) uses, although I haven’t yet switched from spaces to tabs.

I have a `.prettierrc` config file which sets things like a preference for single rather than double quotes. The idea is that you also have a prettier editor extension enabled (I have one for VS Code enabled) and in your editor settings you set your editor’s default formatter to that prettier extension. It’ll then format files on save.

#### Minification and other optimisations

I use `purgecss` and `terser`.

#### Netlify config

I have a `.netlify.toml` file in which I specify the build command (`npm run build`) and the directory to publish to. I also use it to set far-future expires on custom font `.woff2` files. As far as I’m aware, this is still required. Lastly I have some redirects in there too.

#### Node.js

Eleventy is written in JavaScript and running it requires Node.js, both locally and in production. The minimum Node.js version is set in a `.nvmrc` configuration file. I do it this way because that’s how it’s done in the Eleventy Base Blog. I’m happy to follow that to avoid confusion when doing future 11ty upgrades, and it also seems sensible to set this value in the project code rather than only in Netlify as the latter could lock me into Netlify and cause confusion in future. Things to remember (from experience) are that this setting in `.nvrmc` overrides any node version set in [Netlify’s Build and deploy settings](https://app.netlify.com/sites/vigilant-almeida-537bd4/configuration/deploys#dependency-management) and also that I should avoid setting a node version in `netlify.toml` too otherwise they fight with each other.

#### npm-run-all

I use this CLI tool to run multiple npm-scripts in parallel or sequentially. You can achieve the same effect without this tool using lots of chaining ampersands, but the line gets pretty long and hard to read.

#### Sass

I use the Sass CSS preprocessor for the functionality and developer conveniences it adds on top of CSS.

#### Section links

I provide support for linking directly to headed sections of a page rather than the page’s URL only. This is also knowns as deep linking.

I use the `markdown-it-anchor` npm package. It adds an id attribute to headings (and optionally permalinks) in markdown files.

#### Slugify

I have the npm `slugify` package installed. It’s for an Eleventy filter which turns strings such as post titles into URL slugs.

#### Tags

When I create a post I apply relevant tags to it. The tag `post` is applied automatically to all posts. And when I create a note using my custom Decap note template it also applies tag `note`. (I should do the same for `entry` and `bookmark`). But aside from those special tags, I apply tag names arbitrarily.

Each post page shows its associated tags (as links) at the bottom. Each post shows beside its title the “most notable” tag. (Currently it just grabs the third tag since the first tag should automatically be `post` and in second place should be `note`, `entry` or `bookmark`).

And I have the following tag-related pages and templates:
- an [all tags](https://fuzzylogic.me/tags/) page
- a template for each tag that generates [a page listing all posts tagged with that tag](https://fuzzylogic.me/tags/accessibility/)

#### Time

I created my own Eleventy filter for “Readable time” to show “time of post” (rather than just date) on posts of type `note`. That’s a situation where the `readableDate` filter included with the Eleventy starter blog wasn’t precise enough.

I use the npm package `luxon`.

## Update 15-08-24

I added Decap CMS.

## Update 30-06-24

I’ve addressed the “a means of contacting me” item on my wants list by [adding a contact form using Netlify forms](https://github.com/fuzzylogicxx/fuzzylogic/pull/96).

## Update 29-12-24

I recently [removed a bunch of features and pages](https://github.com/fuzzylogicxx/fuzzylogic/pull/157) that had gone stale and only served to make my website harder to maintain.

- Photos section, including an 11ty [JavaScript data file](https://www.11ty.dev/docs/data-js/) where I fetched photos from Cloudinary using an 11ty
- Bookshelf
- Inspiration page
- Records for sale page and data file
- Forestry CMS stuff
- Bookmarker script and lambda folder
- DIY search feature
- JavaScript patch for CSS’s `min()` for grids, since that now has wide browser support

## Update 27-01-25

[More pruning](https://github.com/fuzzylogicxx/fuzzylogic/pull/161). I’ve removed the following:

- A `src/js` directory and related stuff such as a corresponding Eleventy watch target. I no longer had any client-side JS files so it wasn’t necessary.
- the `eslint` npm package. Maybe I’ll care about syntactic best practices on my personal site in future, but right now I prefer fewer dependencies.
- a few lines from `.gitignore` relating to folders I no longer have
- the ELEVENTY_ENV environment variable. (There are better alternatives)
- the serverless lambda function for creating posts via the Github API, and any related stuff. I no longer use it.
- Any references to an `_11ty` directory. I don’t have one.
- the Travis CI config file, since I don’t use Travis.

## Update 17-02-25

- No need for my own DIY drafts solution: now using [the 11ty preprocessor approach](https://www.11ty.dev/docs/config-preprocessors/#example-drafts) to check if posts are draft and if so not build them (therefore also not publish them) in production.
- To make “passthrough” a bit easier I have a folder called `public` which is passed through, allowing me to chuck lots of relevant stuff into that rather than defining lots of different things as “passthrough”.

## Health checklist before/after future updates
- When finished the following: I’ve updated the readme and this health checklist with any changes / new info.
- I can still reach my avatar at https://fuzzylogic.me/.well-known/avatar
- Favicons are still reachable and working (per [Evil Martians article](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs). I did not bother with the considerations for a PWA.
- RSS
  - the RSS feed (which lets people subscribe) is available at https://fuzzylogic.me/feed/feed.xml
- SEO
  - Robots: robots.txt (to tell crawlers i) which pages they’re retricted from; and ii) the location of your XML sitemap)
    - still hittable at https://fuzzylogic.me/robots.txt
      - I’m close to not needing this (and 11ty base blog doesn’t bother). If the SEO sitemap was an HTML rather than xml file I’d use a page-level meta robots tag on it and wouldn’t need the robots.txt entry. But it is. So I think this still serves a benefit.
    - posts and pages which I don’t want indexed
      - (see notes: I may create a better/multipurpose (exclude from RSS too) solution via a public_posts collection and excluding from it)
      - Current solution: posts I have individually been set to noindex, nofollow (pageSpecificRobotsDirective) have the meta robots tag and are not included in the XML sitemap
        - test https://fuzzylogic.me/posts/simon-feb-catchup/
  - XML sitemap (to tell search engines which pages to index)
    - you can hit the XML sitemap https://fuzzylogic.me/sitemap.xml and it excludes pages which shouldn’t be indexed:
      - exclude: tag pages; sitemap.xml; 404 page; pages with draft:true (like /posts/draft-test/)
- Posts
  - Drafts: a draft post can’t be reached in the browser – https://fuzzylogic.me/posts/draft-test/
  - URLs: check a few URLs and make sure they’re still the same and haven’t changed (risk is low, my /posts URL structure is uniform)
    - flex inline block
    - glyphhanger
  - Link integrity: doesn’t show linked tags going to tag pages that don’t exist (same list of low-level tags as mentioned below re. the tags page)
  - Types:
    - note looks good
    - bookmark looks good
    - rest look good
  - Excerpts: look good
  - Code snippets: look good
  - Images:
    - an image rendered using 11ty Image works properly
    - an image rendered with an earlier image implementation works properly
  - Metadata
    - My custom (via eleventyComputed) 'postType' and 'topLevelCategory' keys still work. Check a post and confirm that it still says "A note created on date in topLevelCategory"
  - Structured data
    - schema.org BlogPosting still doing what it should
- Other pages
  - Human sitemap (for humans) is available at fuzzylogic.me/sitemap and contains the right stuff (although should review this page’s usefulness, generally)
  - The tags page https://fuzzylogic.me/tags/ is available, and doesn’t list low-level tags
    - all, nav, post, posts, link, entry, note, tagList
- Miscellenous
  - Favicons (and related config) files still work
  - Lighthouse scores haven’t regressed. (Taken care of by Netlify plugin? But also manually test)
  - Indieweb: webmentions still work
