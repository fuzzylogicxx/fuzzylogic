---
title: How I subset web fonts
description: Subsetting fonts makes them quicker to download. Here’s how I use
  glyphhanger to do it.
date: 2021-03-07T11:14:27.659Z
mainImage.isAnchor: false
tags:
  - fonts
  - webfonts
  - typography
  - css
  - glyphhanger
  - howto
---
On [my personal website](https://fuzzylogic.me) I currently use three web fonts from the _Source Sans 3_ group: regular, italic and semibold. I self-host my fonts because that’s a good practice. Additionally I use a variety of special characters to add some typographic life to the text.

When self-hosting it’s important from a performance perspective to minimise the weight of the font files your visitors must download. To achieve this I subset my font files so as to include the characters my content uses but no more. Here’s how I do it.
---

Note: to follow these steps, you’ll need [glyphhanger](https://github.com/filamentgroup/glyphhanger). The Github page includes installation and usage guidelines however there are a few common installation pitfalls so if you’re on a Mac I recommend checking Sara Souidean’s [_How I set up Glyphhanger on macOS_](https://www.sarasoueidan.com/blog/glyphhanger/) for some friendly assistance. 

For the purposes of this walkthrough I’ll assume you have a directory in your application named `fonts`.

Start by deleting the custom font files from your application’s `fonts` directory.

Run your site locally in an incognito browser window. For my Eleventy-based site, I run `npm run serve` which serves the site at `http://localhost:8080`. 

Visually check a page or two of your locally-running site to ensure it’s no longer serving your web fonts and is instead rendering text using system fonts.

Visit the source page for your custom fonts—in my case [the Github repository for Source Sans 3](https://github.com/adobe-fonts/source-sans). Download in `.ttf` format the latest versions of the fonts you need and place them in your `fonts` directory. For me these are:
- Regular, 
- Italic; and 
- Semibold.

Note the large file sizes of these `.ttf` files. Source Sans 3’s `Regular.ttf` font is `299 kb`.

At the command line, `cd` into your `fonts` directory. 

Now we’re going to run glyphhanger on one font/weight at a time. This tool will intelligenty crawl your website to check which glyphs are in use for the given weight then include those in your subset file which it will output in `.ttf`, `.woff` and `.woff2`. I use glyphhanger’s `spider` option so that it spiders multiple pages (rather than just one) at a time, meaning that it is more likely to catch all the special characters I’m using.

<figure>

```
glyphhanger http://localhost:8080/posts/ --subset=SourceSans3-Regular.ttf --spider-limit=0
```

</figure>

If all went well you should see output like this:

<figure>

```
U+20-23,U+25-2A,U+2C-5B,U+5D,U+5F,U+61-7D,U+A9,U+B7,U+BB,U+D7,U+E9,U+F6,U+200B,U+200E,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2026,U+2122,U+2190,U+2192,U+2615,U+FE0F
Subsetting SourceSans3-Regular.ttf to SourceSans3-Regular-subset.ttf (was 292.24 KB, now 46.99 KB)
Subsetting SourceSans3-Regular.ttf to SourceSans3-Regular-subset.zopfli.woff (was 292.24 KB, now 22.14 KB)
Subsetting SourceSans3-Regular.ttf to SourceSans3-Regular-subset.woff2 (was 292.24 KB, now 17.77 KB)
```

</figure>

The `.woff2` subset file has reduced the file size from `299 kb` to `17.77 kb` which is pretty impressive!

Update your CSS to point at the new `woff2` and `woff` subset files for your font. Mine looks like this:

<figure>

```
@font-face {
  font-family: Source Sans Pro;
  src: url(/fonts/sans/SourceSans3-Regular-subset.woff2) format("woff2"),
       url(/fonts/sans/SourceSans3-Regular-subset.zopfli.woff) format("woff");
  font-weight: 400;
  font-display: swap;
}
```

</figure>

Check your locally running application to ensure that the relevant text (body copy in this case) is now being served using the web font rather than fallback font, and that special characters are also being served using the web font. 

I’ll usually crack open the Fonts panel in Firefox’s DevTools and check that, amongst other things, my pagination links which use the rightward pointing arrow character (→ or unicode `U+2192`) are rendering it using Source Sans Pro and not sticking out like a sore thumb by using Helvetica due to the glyph not being included in the subset.

Delete the `.ttf` file you started with and any `.ttf` subsets generated, because you won’t serve files in that format to your website visitors.

Repeat the glyphhanger subsetting and CSS updating process for any other weights (italic, semibold) or custom fonts you want to subset.

One last handy tip: if there’s a weight for which I don’t need a fancy character set (for example the Semibold I use for headings), I might just grab default _latin_ charset `woff` and `woff2` files from the [Google Webfonts Helper](https://google-webfonts-helper.herokuapp.com/fonts/source-sans-pro). The files tend to be small and well-optimised and this can save a little time. (This is only possible if the font is available from Google Fonts which is true in the case of _Source Sans Pro_.)
