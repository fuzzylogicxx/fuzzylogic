---
date: 2022-01-01T19:39:48Z
title: Theming based on user colour scheme preference
description: 'Things I learned while implementing “dark mode”'
tags:
- entry
- html
- css
- userpreferences
- preferencequeries
- darkmode
- customproperties
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
---

“Dark mode” has been a buzz-phrase in web development since around 2019. It refers to the ability provided by modern operating systems to set the user interface’s appearance to either light or dark. Web browsers and technologies support this by allowing developers to detect whether or not the OS provides colour scheme settings, and if so which of those the user prefers. If we then create alternate light and dark _themes_ for our website to optimise for the user’s preference and blend in with the OS’s appearance, we can switch between these intelligently.

I’ve been meaning to do some work on this front for a while and finally got around to it. Here’s how I did it and the lessons I learned along the way.
---

## The theme-color HTML meta tag

You can use the `theme-color` HTML meta tag to indicate to the browser a colour which it can use to customise the display of the page, and surrounding elements such as the address bar. The reason this presentational instruction exists in HTML is _performance_; it allows the browser to make the relevant updates immediately.

You might supply your “highlight colour”—[Clearleft](https://clearleft.com/) currently supply their signature green. Alternatively you could supply your _light theme_ and _dark theme_ background colours, associating each with the appropriate user colour scheme preference via the `media` attribute. This is the approach I chose.

<figure>

``` html
<meta name="theme-color" content="rgb(255,255,255)" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="rgb(38,38,38)" media="(prefers-color-scheme: dark)">
```

</figure>

[The theme-color meta tag has patchy support](https://caniuse.com/?search=meta%20theme-color). It works well in Safari and iOS Safari. Chrome tends to only apply the colour on installed progressive web apps (PWAs). Relatedly, I previously definined a PWA “theme colour” for my website in my `manifest.manifest` file. However unlike in the meta tag approach, the manifest allows defining one theme colour only (although [the w3c are considering changing this](https://github.com/w3c/manifest/issues/975)). I don’t think there’d be any issue in having both the meta tag and manifest value approaches in play simultaneously (my understanding is that the [HTML would take priority over the manifest](https://github.com/w3c/manifest/issues/975#issuecomment-859986496)) however to keep things simple I’ve removed `theme_color` from my manifest file for now.

## The color-scheme meta tag

The `color-scheme` meta tag is used to specify one or more color schemes/modes with which the page is compatible. Unlike `theme-color` you don’t provide an arbitrary colour value, but rather one of `light`, `dark` or `light dark`. This information impacts the browser’s choice of default background, foreground and text colours to set on page elements, and how to present form controls and scrollbars.

I include the tag on each page (just after my `theme-color` meta tags) as follows. Here, I indicate that my page is geared to handle the browser applying either light or dark schemes and—via the order of values in the content attribute—that I prefer light.

<figure>

``` html
<meta name="color-scheme" content="light dark">
```

</figure>

There is also a `color-scheme` CSS property, which I’ll come to later. Once again though, having an HTML meta tag helps browsers to apply things *faster*.

Notes:

1. I’ve also seen `<meta name="supported-color-schemes">` however [Thomas Steiner explained that this is an old syntax](https://medium.com/dev-channel/what-does-dark-modes-supported-color-schemes-actually-do-69c2eacdfa1d) and has since been standardised as `<meta name="color-scheme">`;
1. although I’m currently intimating that I prefer _light_, in future I might update this to _dark_ first (assuming I don’t hear of any reasons against it). The dark colour palette is really growing on me!

## The CSS color-scheme property

TBW

## The CSS accent-color property

TBW

## Custom Properties and Design Tokens

TBW

## What about leaving everything to the browser?

TBW

## References

- [Theming](https://web.dev/learn/design/), from Jeremy Keith’s excellent Learn Responsive Design series
- [Design Tokens in Eleventy](https://heydonworks.com/article/design-tokens-in-eleventy/) by Heydon Pickering
- [CSS System Colors](https://blog.jim-nielsen.com/2021/css-system-colors/ ) by Jim Nielsen
