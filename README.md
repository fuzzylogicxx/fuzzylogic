# fuzzylogic.me

[![Netlify Status](https://api.netlify.com/api/v1/badges/c0c7b2b0-c8f9-4575-9528-312449ecffdb/deploy-status)](https://app.netlify.com/sites/vigilant-almeida-537bd4/deploys)

This repository contains the source code for https://fuzzylogic.me, the personal website of Laurence Hughes.

## Install this 11ty-powered website locally

Make a local directory and move into it:

```
mkdir my-blog-name
cd my-blog-name
```

Clone this repository into it:

```
git clone https://github.com/11ty/eleventy-base-blog.git .
```

Install dependencies

```
npm install
```

## Run Eleventy:

Generate a production-ready build into the `_site` folder:

```
npm run build
```

Or build and run on a local development server:

```
npm run start
```

## Features

* Statically generated, fast loading pages using [Eleventy](https://www.11ty.dev/)
* Hosted with [Netlify](https://www.netlify.com/)
* Focused on accessibility, performance and web good practices ([100/100 scores for all on Lighthouse](https://pagespeed.web.dev/analysis/https-fuzzylogic-me/dz2w9dl44v?form_factor=mobile))
* Supports `draft` posts that are skipped in production builds [using 11ty’s Preprocessor API](https://www.11ty.dev/docs/config-preprocessors/#example-drafts)
* Supports excerpts (I apply using a greymatter delimiter then grab 11ty’s `post.page.excerpt` and pass that through a custom markdown-parsing filter)
* Content editing via [Decap CMS](https://decapcms.org/)
* Modern images plus friendly admin workflow: upload as markdown via Decap CMS’s media library and widget; convert into various sizes, modern formats and modern HTML via 11ty’s Image plugin
* Search feature using [PageFind](https://pagefind.app/) and Zach Leatherman’s [pagefind-search](https://github.com/zachleat/pagefind-search/) web component
* Contact form using [Netlify Forms](https://docs.netlify.com/forms/setup/#html-forms)
* 404 page shown when necessary, thanks to [Netlify’s custom 404 page handling](https://docs.netlify.com/routing/redirects/redirect-options/#custom-404-page-handling)
* Code block syntax highlighting via [prism.js](https://prismjs.com/)
* Supports deep-linking to headings via Zach Leatherman’s [heading-anchors](https://github.com/zachleat/heading-anchors) web component
* RSS feed using 11ty’s [RSS plugin](https://www.11ty.dev/docs/plugins/rss/). I created [a custom collection](https://www.11ty.dev/docs/collections-api/) named `feedPosts` to let me control which posts are shared
* Tags page which lists all tags as links; plus “Posts tagged with x” pages
* Uses [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) for both client-side JS and on the server
* Pure modern CSS with no pre- or post- processing dependencies. Layers, native nesting, etc.
* Bundling (CSS and JS) via [11ty Bundle plugin](https://www.11ty.dev/docs/plugins/bundle/)
* Minification with [cssnano](https://github.com/cssnano/cssnano)
* Design Tokens defined in interoperable JSON then implemented as CSS custom properties (inspired by [Heydon’s approach](https://heydonworks.com/article/design-tokens-in-eleventy/))
* Intrinsically responsive layouts inspired by [Every Layout](https://every-layout.dev/)
* Fluid responsive type and spacing using [Utopia](https://utopia.fyi/)
* [Avatar](https://fuzzylogic.me/.well-known/avatar) available at a well-known location ([Jim Nielsen’s idea](https://blog.jim-nielsen.com/2023/well-known-avatar/))
* SEO: I provide an [XML sitemap](https://fuzzylogic.me/sitemap.xml) for search engines, and a [human-readable sitemap](https://fuzzylogic.me/sitemap/)

### Subfeatures

#### Important directories

The `content` directory is for files I want processed by 11ty – “templates” that contain variables. Note: most of these are partials which I want to end up as HTML pages so they get wrapped in an HTML layout by default. When that isn’t the case (i.e. the file needs processed by 11ty but not into an HTML file) I set `layout: false`.

The `public` directory is for files I want 11ty to skip and pass straight through.

11ty puts compiled content into the `_site` directory and it’s served from there to the public. 

#### 11ty image plugin

The 11ty Image plugin does the following for me:
- automatically works out appropriate `width` and `height` values then adds those attributes to the rendered `<img>`
- applies the attributes `loading="lazy"` and `decoding="auto"` because I’ve configured those to be applied by default
  - I override with `decoding="auto" loading="eager"` on-demand. I run my post, and the first post in my postlist template through a new filter called `loadFirstImageInPostSynchronously`. It sets `loading=eager` and `decoding=auto` to override the defaults for above the fold images I want loaded synchronously.
- creates optimised formats and multiple sizes
- transforms the original simple `<img>` into appropriate modern responsive, image markup incorporating the generated sizes and formats

#### Markdown

11ty ships with `markdown-it`. So I don’t need to install it as a dependency. I can refer to it in JavaScript and append plugins to it.

It’s good to remember that in most cases 11ty _automatically_ uses its own markdown parser and sees a post or page’s content as markdown and transforms it into HTML 👍. I don’t need to pass it through anything custom to achieve that. (I just pass it through `safe` so that Nunjucks renders HTML rather than escaping it and showing the tags on the page.`)

I add `markdown-it-attrs` so I can create post content in markdown but also add a class (could be any attribute) onto the end of certain paragraphs such as a post intro paragraph, when I want to.

I add `markdown-it-implicit-figures` to turn the paragraphs that `markdown-it` automatically wraps around images into `<figure>`s instead (without having to hardcode `figure` HTML and mess with markdown).

I have a filter (`md`) which I ceeated for outlier situations where I need a tool that parses markdown into HTML on-demand. This is needed to work with 11ty’s `post.page.excerpt`, since it delivers raw markdown (underscores and all).

## Post-update checklist

After making non-trivial updates, see [Website post-launch checklist](https://gist.github.com/fuzzylogicxx/b9c377213f95e21672dfdeeb7176c1e5).
