---
title: Webfont loading strategies
description: I’ve been experimenting with different font loading approaches on
  my personal website
date: 2019-09-02T19:15:40.105Z
mainImage.isAnchor: false
tags:
  - fonts
  - webfonts
  - css
  - html
  - performance
  - a11y
  - javascript
  - preload
draft: false
---
When it comes to webfonts, if you want to serve an accessible and high performance experience across device types it’s not as straightforward as just specifying your fonts in CSS then hoping for the best.
---

We likely have goals such as the following:

- avoid Flash of Invisible Text (FOIT). Flash of Unstyled Text (FOUT) is preferable.
- provide a good experience for users on slow connections.
- while favouring FOUT over FOIT, take care to minimise jarring reflows.

Browser support is also a factor. For example `font-display: swap` seems like a great option however as Chris Ferdinandi pointed out in [_Why use the vanilla JS fontfaceset.load method instead of CSS font-display: swap_](https://gomakethings.com/why-use-the-vanilla-js-fontfaceset.load-method-instead-of-the-css-font-display-swap-property/) it doesn’t have comprehensive mobile support. Since mobile users are regularly on slower connections they are likely to be hit hard by load times incurred due to custom fonts, therefore a solution which doesn’t cater to them is less attractive.

I tend to go for [FOUT with a class](https://www.zachleat.com/web/comprehensive-webfonts/#fout-class)—an approach that is reliable and good enough for most use cases. The idea is to use JavaScript to detect when a font has loaded successfully, and only then add a `fonts-loaded` class to the HTML element causing CSS scoped to that class to take effect. To date I’ve handled the detection using [Bram Stein’s Font Face Observer](https://github.com/bramstein/fontfaceobserver) to benefit from greater browser support (it handles IE) than I’d get using the native `FontFaceSet.load()` however I expect to gravitate toward the [native API solution](https://gomakethings.com/a-modern-font-loading-strategy-with-the-vanilla-js-fontfaceset.load-method/) soon.

I’ve also experimented with pre-loading fonts in the `<head>` in combination with `font-display: swap` on this, my personal website. This was inspired by [the font-loading approach Zach Leatherman took with CSS-Tricks](https://zachleat.com/web/css-tricks-web-fonts/). However due to the fonts I’m using right now I’d currently be preloading too heavy a load for slow connections (thus temporarily _blocking_ initial page render) so I’d need to go further and introduce two-stage loading into that mix.

I’ve also found that your choice of font and font host can really influence (constrain) the flexibility and options you have for font features and loading.

- `font-display: swap` can only be applied on a self-hosted font or one hosted on Google Fonts (via a special querystring parameter on the font URL). So this CSS-only approach is not available with (for example) fonts hosted on Adobe Fonts or fonts.com.
- `link rel=preload` is only available for self-hosted fonts because you need to be able to rely on the URL not changing, and you can’t rely on that for externally hosted fonts.
- You might want to use the opentype features of a font but are they available in your font hosting/loading solution? Some of the fonts hosted on Google Fonts have nice OpenType features but by default these features are pruned out.
- Getting access to the source `.ttf` file is beneficial as it allows you to  _subset_ the font, including special features and characters but also cutting out any your website does not require. Google Fonts have an open license which means we don’t need to lean on their hosting but can instead download fonts in `.ttf`, subset them (I use [Glyphhanger](https://github.com/filamentgroup/glyphhanger)) and self-host them.

This is all a work in progress and I’m still working this stuff out.