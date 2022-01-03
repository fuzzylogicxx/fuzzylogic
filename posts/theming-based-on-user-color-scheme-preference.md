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
- rwd
- responsive
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

“Dark mode” has been a buzz-phrase in web development since around 2019. It refers to the ability provided by modern operating systems to set the user interface’s appearance to either light or dark. Web browsers and technologies support this by allowing developers to detect whether or not the OS provides such settings, and if so which mode the user prefers. Developers can create alternate light and dark _themes_ for their websites and switch between these intelligently (responsively?) to fit with the user’s preference.

I’ve been meaning to do some work on this front for a while and finally got around to it. (You might even be reading this post with your computer’s dark colour scheme enabled and seeing the fruits of my labour.) Here’s how I set things up and the lessons I learned along the way.
---

## Switching your computer’s appearance

On a Mac:

<kbd class="block">System Preferences > General > Appearance</kbd>

On Windows:

<kbd class="block">Colors > Choose your color</kbd>

On iOS:

<kbd class="block">Settings > Display & Brightness > Appearance</kbd>

On Android:

<kbd class="block">Settings > Dark Theme</kbd>

## Emulating this in browser DevTools

In Chromium-based browsers you can open DevTools, then open the `Rendering` tool (which might be hidden behind _More Tools_). In the _Emulate CSS media feature prefers-color-scheme_ dropdown, select _prefers-color-scheme: dark_ or _prefers-color-scheme: light_.

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

[The theme-color meta tag has mixed support](https://caniuse.com/?search=meta%20theme-color). It works well in Safari and iOS Safari. Meanwhile Chrome only applies the colour on installed progressive web apps (PWAs).

This had me considering PWA matters again for the first time in a while. I previously definined a PWA “theme colour” for my website in my `manifest.manifest` file. However unlike in the `theme-color` meta tag approach, the manifest allows defining one theme colour only. While I don’t think there’d be any issue in having both the meta tag and manifest value in play simultaneously (my understanding is that the [HTML would take priority over the manifest](https://github.com/w3c/manifest/issues/975#issuecomment-859986496)), I decided to keep things simple and removed `theme_color` from my manifest file for now.

Note: [the w3c manifest spec may support multiple theme colours in future.](https://github.com/w3c/manifest/issues/975)

## The color-scheme meta tag

The `color-scheme` meta tag is used to specify one or more color schemes/modes with which the page is compatible. Unlike `theme-color` you don’t provide an arbitrary colour value, but rather one of `light` or `dark` or both in combination. This tells the browser whether it can change default background, foreground and text colours to match the current system appearance. As Jim Nielsen notes in [Don’t forget the color-scheme property](https://blog.jim-nielsen.com/2020/color-scheme-property/), it gives the browser permission to automatically change standard form controls, scroll bars, and other named system colors.

I include this meta tag on each page (just after my `theme-color` meta tags). I indicate that my styles have been prepped to handle the browser applying either light or dark colour schemes and—via the order of values in the content attribute—that I prefer light.

<figure>

``` html
<meta name="color-scheme" content="light dark">
```

</figure>

Notes:

1. I’ve also seen `<meta name="supported-color-schemes">` however [Thomas Steiner explained that this is an old syntax](https://medium.com/dev-channel/what-does-dark-modes-supported-color-schemes-actually-do-69c2eacdfa1d) and has since been standardised as `<meta name="color-scheme">`;
1. There is also a `color-scheme` CSS property, which I’ll come to later. Once again though, having an HTML meta tag helps browsers to apply things *faster*;
1. although I’m currently intimating that I prefer _light_, in future I might update this to _dark_ first (assuming I don’t hear of any reasons against it). The dark colour palette is really growing on me!

## Ensuring colours are accessible

While working on a new dark colour palette and tweaking my light palette I made sure to check that colour contrast met accessibility requirements.

Useful tools on this front include:

- Activating Chrome’s element inspector (the “box with arrow at bottom-right” icon) enables hovering an element to check the contrast of text against background;
- Erik Kennedy’s [Accessible Color Generator](https://learnui.design/tools/accessible-color-generator.html) provides slightly modified colour alternatives when contrast is insufficient—really handy and I used this a couple of times;
- [Are my colors accessible?](https://www.aremycolorsaccessible.com/) is another great “check contrast, digest results, then tweak” tool which provides more detailed information than the Chrome inspector, especially regarding the impact of small text on contrast.

## Design Tokens

It quickly became clear that I’d need global colour settings that I could use across multiple technologies and multiple files. For example, I’d want to reuse the same custom background colour value in an HTML `theme-color` meta tag, in CSS, and perhaps also in a JSON-based manifest file.

I’d previously [bookmarked Heydon Pickering’s article on design tokens in Eleventy](/posts/manage-design-tokens-in-eleventy/) and now was the time to give it a spin.

I created `_data/tokens.json` in which I defined raw tokens such as `colorDark`, `colorDarker` and `colorLight`.

Then in my Nunjucks-based HTML templates I could access that token data to define meta tag values using `{{ '{{ tokens.colorLight }}' }}`. These values would be interpolated to the real CSS colour values during build.

I also created a new Nunjucks file, `theme_css.njk`, adding `permalink: "css/theme.css"` in its frontmatter so that it’d generate a CSS file. This file maps my design tokens to custom properties set on the root element, something like this:

<figure>

``` css
:root {
  --color-dark: {{ '{{ tokens.colorDark }}' }};
  --color-darker: {{ '{{ tokens.colorDarker }}' }};
  --color-light: {{ '{{ tokens.colorLight }}' }};
  --color-grey: {{ '{{ tokens.colorGrey }}' }};
  --color-highlight: {{ '{{ tokens.colorHighlight }}' }};
  --color-highlight-dark: {{ '{{ tokens.colorHighlightDark }}' }};
  --color-highlight-darker: {{ '{{ tokens.colorHighlightDarker }}' }};
  --color-text: {{ '{{ tokens.colorText }}' }};
}
```

</figure>

## Custom properties FTW

Using custom properties allowed me to do the hard work of preparing my light and dark themes _upfront_ and removed the need to constantly duplicate values and write code forks throughout my CSS.

Having previously created a base layer of reusable custom property representations of my design tokens, I began creating more specific custom properties to serve different contexts.

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

Using `@media (prefers-color-scheme: dark) {…}` we can check the user’s colour scheme preference. When the user prefers dark, I change `color-scheme` to `dark` to let the browser do its “set sensible defaults” thing, and I update the custom property values to those optimised to blend with a dark appearance.

The reusable, theme-sensitive custom properties I’ve plumped for are:

- highlight colour: really just my brand colour, although lightened a touch in dark mode for better contrast;
- page background colour;
- “band” background colour: something I’d use as a band of alternative background colour to distinguish special sections like the header or footer;
- ink colour: my default text colour;
- “offset” ink colour: a grey for little bits of meta text like dates and categories.

I’m sure I’ll evolve these over time.

Lastly, the `accent-colour` CSS property is used by some form controls e.g. radios and checkboxes. I set that to my highlight colour with the intention of creating a more branded experience.

## SVG considerations

My SVG-based logo didn’t look right in dark mode, however the fix was pretty simple. I applied BEM-style element classes to any problematic `path` elements of the SVG then wrote CSS for those. The CSS tests for `prefers-color-scheme: dark` and updates the path’s `fill` or `stroke` colour as necessary.

## What about leaving everything to the browser?

Having read Jim Nielsen’s brilliant article on [CSS System Colors](https://blog.jim-nielsen.com/2021/css-system-colors/) I tried feeding the browser `color-scheme: light dark`, removing my arbitrary dark theme colours, and leaving the colour palette entirely up to the browser. Along the way I learned some interesting lessons on system colours—which we can also choose to use as valid CSS colours in our custom components—such as `Canvas` and `CanvasText`.

I love this idea in principle! However in practice:

- only Safari’s colour palette looks consistent with the rest of the Mac OS. The palette applied by Chrome doesn’t; it has its own, different “black”. So for the control you’ve given away, you don’t necessarily achieve that nice “consistency with the OS” reward in return;
- as far as I know you can’t lighten or darken the system colours so it’s hard to create a multi-tone, complimentary palette, and also be confident in achieving sufficient colour contrast. That’s fine if you only need a single background colour for the entire page with no alternate bands of colour (like on [Jim’s blog](https://blog.jim-nielsen.com/)) however I think that’s a little restrictive. (Maybe I’m getting too hung up on control here though, and introducing additional arbitrary colours would work fine alongside a variable “system black”);
- Firefox and iOS Safari are a little problematic in their support for the technologies involved, leading to writing a few hacky workarounds.

For the combined reasons above I’m sticking with manually defined colours for now (however I have [a pull request](https://github.com/fuzzylogicxx/fuzzylogic/pull/33) I can revisit later if the mood takes).

## What could I do better?

With extra time, I might:

- think more deeply about dark theme design, perhaps following some of the tips regarding shadows, depth and colour contrast in CSS Tricks’ [A complete guide to dark mode on the web](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/#design-considerations); 
- consider providing a [theme switcher control](https://mxb.dev/blog/color-theme-switcher/) to allow the user to choose the website theme they want regardless of the current OS appearance. (But I probably won’t; I’m not sure it’s necessary)

## References

- [Theming](https://web.dev/learn/design/), from Jeremy Keith’s excellent _Learn Responsive Design_
- [Design Tokens in Eleventy](https://heydonworks.com/article/design-tokens-in-eleventy/) by Heydon Pickering
- [CSS System Colors](https://blog.jim-nielsen.com/2021/css-system-colors/) by Jim Nielsen
