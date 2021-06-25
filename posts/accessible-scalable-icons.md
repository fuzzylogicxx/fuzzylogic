---
title: "Best practice techniques for SVG Icons"
description: How I code SVG icons including icons in links and buttons
date: 2020-08-07 09:30:00
tags:
  - development
  - howto
  - svg
  - icon
  - hide
  - a11y
---
Here’s how I’d handle various common SVG icon scenarios with accessibility in mind.
---

## Just an icon 

So this is an icon that’s not within a link or button and has no adjacent text. This might be, for example, an upward-pointing arrow icon in a `<td>` in a “league table” where the arrow is intended to indicate a trend such as “The figure has increased” or “Moving up the table”.

The point here is that in this scenario the SVG is content rather than decoration.

<figure>
  
``` html
<svg 
  role="img" 
  focusable="false" 
  aria-labelledby="arrow-title"
>
  <title id="arrow-title">Balance has increased</title>
  <path …>…</path
</svg>
```
  
</figure>
  
Note: Fizz Studio’s article [Reliable valid SVG accessibility](https://fizz.studio/blog/reliable-valid-svg-accessibility/) suggests that the addition of `aria-labelledby` pointing to an id for the `<title>` (as Léonie originally recommended) is no longer necessary. That’s encouraging, but as it does no harm to keep it I think I’ll continue to include it for the moment.
  
The same article also offers that maybe we should not use the SVG `<title>` element (and use `aria-label` to provide an accessible name instead) due to the fact that it leads to a potentially undesirable tooltip, much like the HTML `title` attribute does. To be honest I’m OK with this and don’t see it as a problem, and as I mention later have heard probably even more problematic things about `aria-label` so will stick with `<title>`.

## Button (or link) with icon plus text
  
This is easy. Hide the icon from Assistive Technology using `aria-hidden` to avoid unnecessary repetition and rely on the text as the accessible name for the button or link.

<figure>
  
``` html
<button>
  <svg aria-hidden="true" focusable="false" ><!--...--></svg>
  Search
</button>

<a href="/search">
  <svg aria-hidden="true" focusable="false"><!--...--></svg>
  Search
</a>
```
  
</figure>

## Button (or link) with icon alone
  
In this case the design spec is for a button with no accompanying text, therefore we must add the accessible name for Assistive Technologies ourselves.

<figure>
  
``` html
<button>
  <svg focusable="false" aria-hidden="true"><!--...--></svg>
  <span class="visually-hidden">Search</span>
</button>

<a href="/search">
  <svg focusable="false" aria-hidden="true"><!--...--></svg>
  <span class="visually-hidden">Search</span>
</a>
```
  
</figure>
  
The reason I use text that’s [visually-hidden using CSS](https://fuzzylogic.me/posts/how-to-hide-elements-for-different-browsing-contexts/#hide-visually-(i.e.-from-sighted-people)) for the accessible name rather than adding `aria-label` on the button or link is because I’ve heard that the former option is more reliable. In greater detail: [aria-label is announced inconsistently and not always translated](https://gomakethings.com/revisting-aria-label-versus-a-visually-hidden-class/).

## References
- [Accessible SVG Icons by Chris Coyier](https://css-tricks.com/accessible-svg-icons/)
- [Tips for accessible SVG by Léonie Watson](https://www.sitepoint.com/tips-accessible-svg/)
- [Reliable, valid SVG accessibility by Fizz Studio](https://fizz.studio/blog/reliable-valid-svg-accessibility/)
- https://www.sarasoueidan.com/blog/accessible-icon-buttons/
- https://fuzzylogic.me/posts/how-to-hide-elements-for-different-browsing-contexts/
- https://absolutely.every-layout.dev/layouts/icon/
