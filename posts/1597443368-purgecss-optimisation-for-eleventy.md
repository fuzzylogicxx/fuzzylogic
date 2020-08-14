---
description: Daniel Post’s cool PurgeCSS trick for Eleventy
date: 2020-08-14T22:15:21+00:00
tags: [note, frontend, development, twitter, css, performance, 11ty, inline, head]
location: Glasgow
noteTitle: 1597443368
---

Here’s a cool performance-optimisation trick for Eleventy I spotted on Twitter the other day.

<figure>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">A cool trick I&#39;ve been using with <a href="https://twitter.com/eleven_ty?ref_src=twsrc%5Etfw">@eleven_ty</a>: use PurgeCSS to minimize the CSS for each individual page, then inline it in your &lt;head&gt;.<br><br>Gist here: <a href="https://t.co/LaF3ACB07n">https://t.co/LaF3ACB07n</a> <a href="https://t.co/A9uHMTf205">pic.twitter.com/A9uHMTf205</a></p>&mdash; Daniel Post (@danielpost) <a href="https://twitter.com/danielpost/status/1293286796604956673?ref_src=twsrc%5Etfw">August 11, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

</figure>

I’ve just installed this on my personal site. I was already inlining my CSS into the `<head> but the idea of only including the CSS each specific page needs was too good to resist. 

Turned out it was a breeze to get working, a nice introduction to Eleventy transforms, and – so far – it’s working great!
