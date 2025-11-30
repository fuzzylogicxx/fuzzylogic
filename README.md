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
git clone https://github.com/fuzzylogicxx/fuzzylogic.git .
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
* Supports excerpts
* Content editing via [Decap CMS](https://decapcms.org/)
* Modern images, and a friendly creator/admin workflow
* Search feature using [PageFind](https://pagefind.app/) and Zach Leatherman’s [pagefind-search](https://github.com/zachleat/pagefind-search/) web component
* Contact form using [Netlify Forms](https://docs.netlify.com/forms/setup/#html-forms)
* 404 page shown when necessary, thanks to [Netlify’s custom 404 page handling](https://docs.netlify.com/routing/redirects/redirect-options/#custom-404-page-handling)
* Code block syntax highlighting performed at build time rather than on the client, via 11ty’s [Syntax Hightlighting plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/) which in turn uses [prism.js](https://prismjs.com/)
* Supports deep-linking to headings via Zach Leatherman’s [heading-anchors](https://github.com/zachleat/heading-anchors) web component
* RSS feed using 11ty’s [RSS plugin](https://www.11ty.dev/docs/plugins/rss/). 
* Tags page which lists all tags as links; plus “Posts tagged with x” pages
* Uses [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) for both client-side JS and on the server
* Pure modern CSS with no pre- or post- processing dependencies. Layers, native nesting, etc.
* Bundling (CSS and JS) via [11ty Bundle plugin](https://www.11ty.dev/docs/plugins/bundle/)
* Minification with [cssnano](https://github.com/cssnano/cssnano)
* JS linted to encourage good practices using eslint
* Design Tokens defined in interoperable JSON then implemented as CSS custom properties (inspired by [Heydon’s approach](https://heydonworks.com/article/design-tokens-in-eleventy/))
* Intrinsically responsive layouts inspired by [Every Layout](https://every-layout.dev/)
* Fluid responsive type and spacing using [Utopia](https://utopia.fyi/)
* [Avatar](https://fuzzylogic.me/.well-known/avatar) available at a well-known location ([Jim Nielsen’s idea](https://blog.jim-nielsen.com/2023/well-known-avatar/))
* SEO: I provide an [XML sitemap](https://fuzzylogic.me/sitemap.xml) for search engines, and a [human-readable sitemap](https://fuzzylogic.me/sitemap/)
* Faster local development: in local `serve` mode I only build what’s necessary. I keep the search-index-generator, CSS minification and other time-consuming processes for production builds.

### Subfeatures

#### Important directories

The `content` directory is for files I want processed by 11ty – “templates” that contain variables. Note: most of these are partials which I want to end up as HTML pages so they get wrapped in an HTML layout by default. When that isn’t the case (i.e. the file needs processed by 11ty but not into an HTML file) I set `layout: false`.

The `public` directory is for files I want 11ty to skip and pass straight through.

11ty puts compiled content into the `_site` directory and it’s served from there to the public. 

#### Excerpts

I define an initial part of a post as the excerpt by adding a separator string (`<!-- excerpt -->`) between it and the remaining content. Then in my posts list I grab 11ty’s `post.page.excerpt` and pass that through my custom markdown-parsing _filter_.

#### Images

I upload source images into the codebase via Decap CMS’s media library and widget, which outputs markdown image syntax. Then, 11ty’s Image plugin transforms this into modern HTML (per my preferred config) which includes the `picture` and `source` elements, while also generating the necessary additional image file sizes and lighter-weight formats.

The 11ty Image plugin does the following for me:
- automatically works out appropriate `width` and `height` values then adds those attributes to the rendered `<img>`
- applies the attributes `loading="lazy"` and `decoding="auto"` because I’ve configured those to be applied by default
  - I override with `decoding="auto" loading="eager"` on-demand. I run my post, and the first post in my postlist template through a new filter called `loadFirstImageInPostSynchronously`. It sets `loading=eager` and `decoding=auto` to override the defaults for above the fold images I want loaded synchronously.
- creates optimised formats and multiple sizes
- transforms the original simple `<img>` into appropriate modern responsive, image markup incorporating the generated sizes and formats

One gotcha when using Decap CMS’s image widget is to ensure that it sets the correct path in the generated markdown image (I want `/img/uploads/` rather than just `/img/`). If it doesn’t, I can manually amend it in the editor’s markdown mode.

#### Sharing music and media

Embedding youtube and bandcamp (etc) players comes at a fairly heavy performance cost. So when [sharing music in a post](https://github.com/fuzzylogicxx/fuzzylogic/blob/v3/content/posts/2025-07-05-16-56.md) I use Paul Irish’s fantastic [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed) web component, which is a game-changer.

#### Markdown

11ty ships with `markdown-it`. So I don’t need to install it as a dependency. I can refer to it in JavaScript and append plugins to it.

It’s good to remember that in most cases 11ty _automatically_ uses its own markdown parser which will work with a post or page’s markdown content and transform it into HTML – I don’t need to pass the content through anything custom to achieve that 👍. (I just pass it through Nunjucks’ `safe` so that Nunjucks renders HTML rather than escaping it and showing the tags on the page.)

I add `markdown-it-attrs` so that in additional to using basic markdown syntax I can also add a class (or any attribute) onto the end of certain paragraphs such as a post intro paragraph, when I want to. This makes it much more feasible to write the entire post in markdown.

I add `markdown-it-implicit-figures` to turn the paragraphs that `markdown-it` automatically wraps around images into `<figure>`s instead, rather than having to hardcode `figure` HTML and mess with markdown. I add the `figcaption: "title"` config option, which plucks the `title` out of a markdown image and instead uses it as the content for a figure’s `figcaption`.

I have a filter (`md`) which I ceeated for outlier situations where I need a tool that parses markdown into HTML on-demand. This is needed to work with 11ty’s `post.page.excerpt`, since it delivers raw markdown (underscores and all).

#### Controlling feed and search engine content

I have a custom frontmatter key named `pageSpecificRobotsDirective` allowing me to set certain posts to `noindex, nofollow`. I also generate [a custom 11ty collection](https://www.11ty.dev/docs/collections-api/) named `feedPosts` from this and use this as the collection for my RSS feed. This lets me control which posts are amplified.

## Post-update checklist

After making non-trivial updates, see [Website post-launch checklist](https://gist.github.com/fuzzylogicxx/b9c377213f95e21672dfdeeb7176c1e5).
