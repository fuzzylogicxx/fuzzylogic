---
date: 2022-01-01T19:39:48Z
title: Theming to optimise for user colour scheme preference
description: 'Things I learned while optimising for dark mode'
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

“Dark mode” has been a buzz-phrase in web development since around 2019. It refers to the ability provided by modern operating systems to set the user interface’s appearance to either light or dark. Web browsers and technologies support this by allowing developers to detect whether or not the OS provides such settings, and if so which mode the user prefers. Developers can create alternate light and dark _themes_ for their websites and switch between these intelligently in response to the user’s preference.

I’ve been meaning to do some work on this front for a while and finally got around to it. Here’s how I did it and the lessons I learned along the way.
---

## The theme-color HTML meta tag

You can use the `theme-color` HTML meta tag to indicate to the browser a colour it can use to customise the display of the page and surrounding elements such as the address bar. The reason we have a meta tag solution to this rather than leaving it to CSS is _performance_; it allows the browser to make the relevant updates immediately.

In practice you might specify your “highlight colour”—[Clearleft](https://clearleft.com/) currently use their signature green. Alternatively you could specify both your _light theme_ and _dark theme_ background colours, using the `media` attribute to associate each with the user colour scheme preference it is optimised for. This is the approach I chose.

<figure>

``` html
<!-- Set theme color to white when user prefers light mode -->
<meta name="theme-color" content="rgb(255,255,255)" media="(prefers-color-scheme: light)">
<!-- Set theme color to a custom black when user prefers dark mode -->
<meta name="theme-color" content="rgb(38,38,38)" media="(prefers-color-scheme: dark)">
```

</figure>

[The theme-color meta tag has mixed support](https://caniuse.com/?search=meta%20theme-color). It works well in Safari and iOS Safari. Meanwhile only applies the colour on installed progressive web apps (PWAs).

This had me considering PWA matters again for the first time in a while. I previously definined a PWA “theme colour” for my website in my `manifest.manifest` file. However unlike in the `theme-color` meta tag approach, the manifest allows defining one theme colour only. While I don’t think there’d be any issue in having both the meta tag and manifest value in play simultaneously (my understanding is that the [HTML would take priority over the manifest](https://github.com/w3c/manifest/issues/975#issuecomment-859986496)), I decided to keep things simple and removed `theme_color` from my manifest file for now.

Note: [the w3c manifest spec may support multiple theme colours in future.](https://github.com/w3c/manifest/issues/975)

## The color-scheme meta tag

The `color-scheme` meta tag is used to specify one or more color schemes/modes with which the page is compatible. Unlike `theme-color` you don’t provide an arbitrary colour value, but rather one of `light` or `dark` or `light dark`. This information impacts the browser’s choice of default background, foreground and text colours to set on page elements, and how it presents form controls and scrollbars.

I include this meta tag on each page (just after my `theme-color` meta tags) as follows. Here, I indicate that my styles have been prepped to handle the browser applying either light or dark colour schemes and—via the order of values in the content attribute—that I prefer light.

<figure>

``` html
<meta name="color-scheme" content="light dark">
```

</figure>

Notes:

1. I’ve also seen `<meta name="supported-color-schemes">` however [Thomas Steiner explained that this is an old syntax](https://medium.com/dev-channel/what-does-dark-modes-supported-color-schemes-actually-do-69c2eacdfa1d) and has since been standardised as `<meta name="color-scheme">`;
1. There is also a `color-scheme` CSS property, which I’ll come to later. Once again though, having an HTML meta tag helps browsers to apply things *faster*;
1. although I’m currently intimating that I prefer _light_, in future I might update this to _dark_ first (assuming I don’t hear of any reasons against it). The dark colour palette is really growing on me!

## Design Tokens

It quickly became clear that I’d need global colour settings that I could use across multiple technologies and multiple files. For example, I’d want to reuse the same custom background colour value in an HTML `theme-color` meta tag, in CSS, and perhaps also in a JSON-based manifest file.

I’d previously [bookmarked Heydon Pickering’s article on design tokens in Eleventy](/posts/manage-design-tokens-in-eleventy/) and now was the time to give it a spin.

I created `_data/tokens.json` in which I defined raw tokens such as `colorDark`, `colorDarker` and `colorLight`.

Then in my Nunjucks-based HTML templates I could access that token data to define meta tag values using `{{ tokens.colorLight }}`. These values would be interpolated to the real CSS colour values during build.

I also created a new Nunjucks file, `theme_css.njk`, adding `permalink: "css/theme.css"` in its frontmatter so that it’d generate a CSS file. This file maps my design tokens to custom properties set on the root element, something like this:

<figure>

``` css
:root {
  --color-dark: {{ tokens.colorDark }};
  --color-darker: {{ tokens.colorLight }};
  --color-light: {{ tokens.colorLight }};
  --color-grey: {{ tokens.colorGrey }};
  --color-highlight: {{ tokens.colorHighlight }};
  --color-text: {{ tokens.colorText }};
}
```

</figure>

## Custom properties

Using custom properties allowed me to do the hard work of preparing my light and dark themes _upfront_ and removed the need to constantly duplicate values and write code forks throughout my CSS.

Having created base-level, reusable custom property representations of my design tokens in the previous step, I started creating more specific custom properties to serve different contexts.

``` css
:root {
  --color-page-bg-light: var(--color-light);
  --color-page-bg-dark: var(--color-dark);
  --color-ink-dark: var(--color-text);
  --color-ink-light: var(--color-light);
}
```

## CSS for default and dark-mode contexts

Now to set my light-mode defaults and fork these when the user prefers dark-mode.

Here’s my CSS:

<figure>

``` css
:root {
  color-scheme: light;

  --color-highlight: var(--color-highlight-darker);
  --color-page-bg: var(--color-page-bg-light);
  --color-band: var(--color-darker);
  --color-ink: var(--color-ink-dark);
  --color-ink-offset: var(--color-grey);

  @media (prefers-color-scheme: dark) {
    color-scheme: dark;

    --color-highlight: var(--color-highlight-dark);
    --color-page-bg: var(--color-page-bg-dark);
    --color-band: var(--color-darker);
    --color-ink: var(--color-ink-light);
    --color-ink-offset: var(--color-grey);
  }

  accent-color: var(--color-highlight);
}

body {
  background-color: var(--color-page-bg);
  color: var(--color-ink);
}
```

</figure>

Let’s break that down.

The `color-scheme` property allows us to specify one or more colour schemes/modes with which an element is compatible. I’m defining it on the root element i.e. for the whole page. My approach was to start by specifying support for a light colour scheme only, then define background and text colour custom properties with values optimised for light colour scheme.

Using `@media (prefers-color-scheme: dark) {…}` we can check the user’s colour scheme preference. When the user prefers dark, I change `color-scheme` to `dark` to let the browser do its “set sensible defaults” thing, and I update the custom property values to colours optimised to blend with a dark appearance and honour the user’s preference.

The reusable, theme-sensitive custom properties I’ve plumped for are:

- highlight colour: really just my brand colour, although lightened a touch in dark mode for better contrast;
- page background colour;
- “band” background colour: something I’d use as a band of alternative background colour to distinguish special sections like the header or footer;
- ink colour;
- “offset” ink colour: likely a grey for little bits of meta text like dates and categories

I’m sure I’ll evolve these over time.

Lastly, the `accent-colour` CSS property is used by some form controls e.g. radios and checkboxes. I set that to my highlight colour with the intention of creating a more branded experience.

## SVG considerations

My SVG-based logo didn’t look right in dark mode, however the fix was pretty simple. I applied BEM-style element classes to any problematic `path` elements of the SVG then wrote CSS for those which test for `prefers-color-scheme: dark` and update their `fill` or `stroke` colour.

## What about leaving everything to the browser?

Having read Jim Nielsen’s brilliant article on [CSS System Colors](https://blog.jim-nielsen.com/2021/css-system-colors/) I tried removing my arbitrary dark theme colours and instead leaving the colour palette entirely up to the browser having been fed `color-scheme: light dark`. Along the way I learned some interesting lessons on system colours—which we can also choose to use as valid CSS colours in our custom components—such as `Canvas` and `CanvasText`.

I love this idea in principle! However in practice:

- only Safari’s colour palette looks consistent with the rest of the Mac OS. The palette applied by Chrome doesn’t; it has its own, different “black”. So for the control you’ve given away, you don’t necessarily achieve that nice “consistency with the OS” reward in return;
- as far as I know you can’t lighten or darken the system colours so it’s hard to create a multi-tone, complimentary palette. That’s fine if you only need a single background colour for the entire page with no alternate bands of colour (like on [Jim’s blog](https://blog.jim-nielsen.com/)) however I think that’s a little restrictive. (Maybe I’m getting too hung up on control here though, and additional arbitrary additional colours would go fine alongside a variable “system black”);
- Firefox and iOS Safari are a little problematic in their support for the technologies involved, leading to writing a few hacky workarounds.

For the combined reasons above I’m sticking with manually defined colours for now (however I have [a pull request](https://github.com/fuzzylogicxx/fuzzylogic/pull/33) I can revisit later if the mood takes).

## References

- [Theming](https://web.dev/learn/design/), from Jeremy Keith’s excellent Learn Responsive Design series
- [Design Tokens in Eleventy](https://heydonworks.com/article/design-tokens-in-eleventy/) by Heydon Pickering
- [CSS System Colors](https://blog.jim-nielsen.com/2021/css-system-colors/) by Jim Nielsen
