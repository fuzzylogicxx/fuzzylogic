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

- Statically generated super-fast pages using [Eleventy](https://www.11ty.dev/)
- Hosted with [Netlify](https://www.netlify.com/)
- Focus on accessibility, performance and good practice (100s all the way on lighthouse)
- Supports `draft` posts that are skipped in production builds [using 11ty’s Preprocessor API](https://www.11ty.dev/docs/config-preprocessors/#example-drafts)
- Raw image to modern image conversion via [Eleventy Image plugin](https://www.11ty.dev/docs/plugins/image/): converts formats; generates sizes; turns markdown `img` into complex, modern HTML
- Content editing via [Decap CMS](https://decapcms.org/)
- Search feature using [PageFind](https://pagefind.app/)
- Contact form using [Netlify Forms](https://docs.netlify.com/forms/setup/#html-forms)
- 404 page shown when it should be thanks to [Netlify’s custom 404 page handling](https://docs.netlify.com/routing/redirects/redirect-options/#custom-404-page-handling)
- Code block syntax highlighting via [prism.js](https://prismjs.com/)
- Deep-linking to headings via Zach Leatherman’s [heading-anchors](https://github.com/zachleat/heading-anchors) web component
- RSS feed using 11ty’s [RSS plugin](https://www.11ty.dev/docs/plugins/rss/)
- Tags page which lists all tags as links; plus “Posts tagged with x” pages
- Uses JavaScript modules for both client-side JS and on the server
- Pure CSS (I ditched Sass and am leaning into modern CSS)
- Bundling (CSS and JS) via [11ty Bundle plugin](https://www.11ty.dev/docs/plugins/bundle/)
- Design Tokens: defined in interoperable JSON then implemented as CSS custom properties (inspired by [Heydon’s approach](https://heydonworks.com/article/design-tokens-in-eleventy/))
- Intrinsically responsive layout inspired by [Every Layout](https://every-layout.dev/)
- Fluid responsive type and spacing using [Utopia](https://utopia.fyi/)
- [Avatar](https://fuzzylogic.me/.well-known/avatar) available at a well-known location ([Jim Nielsen’s idea](https://blog.jim-nielsen.com/2023/well-known-avatar/))
- SEO: I provide an [XML sitemap](https://fuzzylogic.me/sitemap.xml) for search engines, and a [human-readable sitemap](https://fuzzylogic.me/sitemap/).
