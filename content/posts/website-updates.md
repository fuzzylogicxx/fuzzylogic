---
title: Website updates
description: Logging some updates I’ve made to my 11ty-powered website
noteWithTitle: false
date: 2025-07-06T17:11
---
I’ve recently been updating my website over a series of nights and weekends. The changes aren’t very noticeable to the eye; they mostly involved modernising and streamlining back-end features and technology, plus some improvements to accessibility and performance. I’m really happy to have made them!

About a year ago I wrote about [the features I wanted on my personal website versus those it had](https://fuzzylogic.me/posts/features-of-my-personal-site/). The work I’ve been doing recently has helped to plug the gaps. 

During this work I documented the latest features of my website [on the readme of my public website repository](https://github.com/fuzzylogicxx/fuzzylogic). I find it really useful to be able to see this information at a glance. It’ll also make life much easier when I want to tweak things in the future.

Here’s what the *Features* section of my readme currently says:

* Statically generated, fast loading pages using [Eleventy](https://www.11ty.dev/)
* Hosted with [Netlify](https://www.netlify.com/)
* Focused on accessibility, performance and web good practices ([100/100 scores for all on Lighthouse](https://pagespeed.web.dev/analysis/https-fuzzylogic-me/dz2w9dl44v?form_factor=mobile))
* Supports `draft` posts that are skipped in production builds [using 11ty’s Preprocessor API](https://www.11ty.dev/docs/config-preprocessors/#example-drafts)
* Raw image to modern image conversion via [Eleventy Image plugin](https://www.11ty.dev/docs/plugins/image/): converts formats; generates sizes; turns markdown `img` into the modern HTML for performant, responsive images
* Content editing via [Decap CMS](https://decapcms.org/)
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

I’ve created a checklist called [Website post-launch checklist](https://gist.github.com/fuzzylogicxx/b9c377213f95e21672dfdeeb7176c1e5) which I can use after making updates. I’ve added this to my readme. (Perhaps in future I can automate some of the checklist tasks but for now manual is fine.)

I also want to do updates to 11ty and its plugins more regularly – I think that’ll be less painful. I have dependabot alerts turned on and I have also subscribed to the [11ty’s Blog’s](https://www.11ty.dev/blog/) in an effort to hear about upcoming changes.

I’ve added myself to [11ty’s community](https://www.11ty.dev/docs/community/) and am now [listed as an Eleventy author.](https://gist.github.com/fuzzylogicxx/b9c377213f95e21672dfdeeb7176c1e5) I hope that some day I’ll find that [fuzzylogic.me](https://fuzzylogic.me) has been added to 11ty’s Speedlify Leaderboard too – that’d be cool!
