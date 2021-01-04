---
title: "Images on the web: the big picture"
description: In modern web development there are a brain-frazzling number of
  different ways to include an image on a web page. In this post I step through
  these methods, discussing how they evolved and where they are appropriate.
date: 2020-12-09 11:30:00
tags:
  - entry
  - web
  - images
  - rwd
permalink: /posts/images-on-the-web-the-big-picture/
draft: true
---
In modern web development there are a brain-frazzling number of ways to include an image on a web page. In this post I step through the various approaches, discussing how they evolved and try to unpick where they are appropriate.

## Scope

This is about the HTML `img` element. I might mention CSS background images at some point, but by and large we’re dealing with images as _content_ rather than decoration.

I probably won’t mention icons at all – I see these as a separate issue again – and I recommend you use inline SVG for those.

## Assumptions

CSS-wise, assume that we’ll start with nothing more complex than the following boilerplate:

<figure>

```css
html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

img {
  border-style: none;
  display: block;
}
```

</figure>

## Terminology

### Aspect Ratio

You get the aspect ratio by dividing the width of an image by its height. This characteristic of the image is outside of our CSS-based control – it is determined when the image was originally created and cropped.

An image which is 160px wide × 90px tall can be represented as 16:9, or 1.777.


## Basic image

Let’s start by getting back to basics. I can include an image on a web page like so:

<figure>

```html
<img src="/img/250x377.jpg" alt="“A Visit…” by Jennifer Egan" />
```

</figure>

Note that there are no `width` or `height` attributes, just an `alt` for accessibility. Without those size attributes (and assuming there’s no CSS acting on the `img`’s width or height) the image simply displays at its intrinsic dimensions i.e. the dimensions at which the file was saved, in this case 250 × 377 pixels. The image is output as follows:

<img src="https://images-eu.bookshop.org/product-images/images/9781780330969.jpg?width=250" alt="“A Visit from the Goon Squad“ by Jennifer Egan" />

Narrow and static images like this now feel pretty old-school. The Responsive Web Design movement ushered in a trend for i) full-column-width media; and ii) [fluid media](https://alistapart.com/article/fluid-images/) where very wide images scale down for narrow contexts too.

However I still encounter use cases for displaying a relatively narrow image _as-is_.

Sticking with the above book image example, given its aspect ratio you probably wouldn’t want it to be full-column-width on anything other than the narrowest screens simply because of how tall it could become at the expense of the reading experience. You might also be loading your images from a third party bookshop with which you have an affiliate scheme, and therefore have little control over file size and other factors influencing performance and responsive behaviour. As such you might do well to keep it simple by just loading a sensibly-sized thumbnail.

For those and more reasons, there remain occasions when you might need a small, fixed-size image.

## Include size attributes

When we know the dimensions of our image in advance, we can improve upon our previous markup by explicitly setting the `width` and `height`.

<figure>

```html
<img src="/img/250x377.jpg" width="250" height="377" alt="“A Visit…” by Jennifer Egan" />
```

</figure>

By including these size attributes, we allow the browser to reserve the appropriate space in the page for the image while it loads. Otherwise, we risk a situation where text that immediately follows our image renders higher up the page than it should while the image is still loading, only to _shift_ jarringly after the image loads.

At this stage we’re still not adding any overrides with CSS (I say overrides because CSS rules have greater specificity than HTML attributes) so our HTML size attributes rule the roost and will cause the browser to render the image based on whatever values we provide, regardless of the image’s intrinsic dimensions. As such we should ensure that our size attribute values match the image’s real dimensions. You _could_ set either or both differently and the browser would respect that, however you’re likely to squash or stretch the image unnaturally or break its aspect ratio, ending up with a poor result.

## Enter flexible images

At the dawn of the mobile web, many authors sought to handle mobile devices by creating a separate, dedicated mobile website. However this meant duplication of cost, code, content and maintenance. Responsive Web Design provided a counterpoint with a “create once, publish everywhere” philosophy which embraced the fluidity of the web and suggested we could serve desktop and mobile devices alike from a single codebase.

RWD proposed making layout and content _adaptable_. This included the idea of _flexble images_ which suggested that for any given image you need just a single, wide version plus some clever CSS to allow the image to work not only on desktop but also adapt its size to narrower contexts and still look good.

By default when a wide image is rendered within a narrower container it will overflow that container, breaking the layout. The key to avoiding this is to set a _tolerance_ for how wide the image is permitted to go. Generally, we’ll tolerate the image being 100% as wide as its container but no wider. We can achieve this using `max-width`.

<figure>

```css
img {
  max-width: 100%;
}
```

</figure>

Here’s an example of a fluid image. Note that although it is 2000 pixels wide, it shrinks to fit within a narrower container.

<img src="https://via.placeholder.com/2000x1500/272822/FFFFFF" />

Note: the CSS code used in this example assumes no HTML `width` and `height` attributes being present on our `img` element.

<figure>

```html
<img src="/img/wide.png" alt="…" />
```

</figure>

By this point many of us had stopped adding those size attributes, feeling that for flexible images the practice had become redundant given that the space needing reserved for the image was now variable rather than fixed. Modern browsers, when applying our simple `max-width` declaration, would also implicitly apply `height:auto` thereby preserving a shrunken image’s aspect ratio.

Some content management systems such as Wordpress, however, continued to output images with HTML `width` and `height` attributes as standard. To keep the height in proportion in those cases we had to use the following amended CSS:

<figure>

```css
img {
  max-width: 100%;
  height: auto;
}
```

</figure>

## Jank-free responsive images

There has been a recent development in modern browsers’ wherein they can now reserve appropriate space for not just fixed images but also fluid images.

If you know the image’s aspect ratio in advance, add the `width` and `height` attributes, using any values which provide the correct ratio.



## Fitting images into spaces

### Make an image fill its parent

One way to set an image to cover its parent’s shape is to supply it as a background image, and use `background-size: cover`.

However in this article we are assuming that our image should be considered as content rather than decoration and therefore should also be accessible via alternative text.

We can make an image fill its parent as follows:

<figure>

```css
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

</figure>

Declaring `object-fit: cover` on an image allows us to make it _cover_ all or some of its parent’s shape. Under the hood the image is dynamically recropped around a given point (its middle, by default) to the target size. So, rather than setting the image’s width and height to some unnatural shape which no longer respects its aspect ratio, what we are instead in effect doing is making its parent a “window” onto the undistorted image.

Flexbox Gallery example (inspired by Stephanie Eckles) https://codepen.io/fuzzylogicx/pen/QWKmBOp

Note: you don’t have to make the image fill _all_ of its parent. I could alternatively have set `height: 25vh` (for example) rather than `height: 100%`. I might do that to, say, set an image within a card to only take up a certain amount of the card’s height, leaving space for title and description below.

### Scale down to be completely visible within a parent

Let’s say we need to display a grid of logos. As you might expect, the different logo images are uneven. We can scale uneven images to fit into their parent and be fully visible, using the following CSS:

<figure>

```css
img {
  object-fit: scale-down;
  width: 100%;
  height: 25vh;
  padding: 1rem;
}
```

</figure>

[Here‘s a Codepen example.](https://codepen.io/fuzzylogicx/pen/XWjEPWo)

Here, we’re setting a sensible height for each logo. We’re then fitting (or scaling) the logo within its dimensions which are the parent’s width and that aforementioned sensible height. And because `object-fit` can cause an image to act like it’s a container for its inner content, we can also add `padding` to ensure space around the logo (the image “contents”) to avoid it being placed flush against the card edges.

### Dictate the aspect ratio “frame”

Following on from the previous section…



## Modern Responsive Images

In https://cloudfour.com/thinks/responsive-images-101-definitions/ Jason Grigsby defines Responsive Images as:

> A method for providing the browser with multiple image sources depending on display density, size of the image element in the page, or any number of other factors.



### Automate with a 3rd party tool


## Miscellaneous

### Lazy loading


## Conclusions

It can be difficult to know when to use the CSS stuff and when to use the HTML stuff. Disciplines like performance, design and responsive layout are all colliding in confusing ways. It’s hard to keep the various techniques and technologies separate in your mind and remember what each is trying to achieve. That’s that’s why I found myself writing this article.

Here’s what I’m using:

- allow basic, narrow, non-resized images by default, because ocassionally you need them
- max-width by default, because I can see no reason not to
- when I know an image’s dimensions in advance (for example when it’s not hosted elsewhere, or not within a grid of uneven photos) I’ll add the HTML size attributes
- ?? class that applies width: 100% and height: auto ??
- Cloudinary for hosting
- sometimes the source image is small-ish (say 640px wide, somebody else’s photo) so I just include a simple, old-school `img` tag without lots of fancy stuff. (However by doing so I might be missing out on Cloudinary’s ability to deliver a webp rather than a jpg. Test this on the Rudy pic)
- Otherwise when the original image is large, Resolution Switching syntax at least for single images.
- Lean on Cloudinary for formats (webp etc), resizing, compression. To achieve this I use Cloudinary’s URL syntax when constructing my responsive image elements.
- The “Lint Images” browser plugin, to check that my `sizes` code specifications actually match the widths images need to be at for the given viewport sizes
- Art Direction syntax pretty sparingly
- a frame, allowing me to easily create a “window” of any aspect ratio onto any given image. Handy for fitting images into responsive layouts.
- other manual `object-fit` only where required over and above what frame provides.
- loading=lazy

## What have I missed?

Let me know at @leroy022823 or laurence@fuzzylogic.me




## References

Stock images and other resources I’ve used:

- [NASA Images](https://images.nasa.gov/) (change the size after the tilde to what you require, [for example small](https://images-assets.nasa.gov/image/PIA17563/PIA17563~small.jpg))
- [Logoipsum](https://logoipsum.com/)


<!--

## Maintaining the aspect ratio of fluid images

In keeping with the shift in thinking from our images being fixed-size to instead being sized variably and dependent on context, many of us removed the explicit `width` and `height` attributes from our `img` markup. It felt somewhat redundant to continue to tell the browser in fixed terms how much space to reserve for an image when that space was now variable dependent on context.

<figure>

```html
<img src="/img/wide.jpg" alt="…" />
```

</figure>

We were able to safely do this because browsers in the responsive era had evolved to the stage where they resized images _proportionally_. So, for example, regardless of how narrow the image’s container was and therefore to what width our image had shrunk to fit it, we could be confident that the image’s aspect ratio had been preserved.

Some content management systems such as Wordpress, however, continued to output images with HTML `width` and `height` attributes included as standard. In those cases it wasn’t enough for our CSS to dynamically override that `width` attribute using a `max-width` without also addressing the fixed `height` attribute too, otherwise any shrunken image’s aspect ratio would be broken. To keep the height in proportion, the following CSS was required:

<figure>

```css
img {
  max-width: 100%;
  height: auto;
}
```

</figure>

Re. max-width Given that adding this handles the above challenge while having no impact on our previous examples that used _narrow_ images, I see no reason not to have this as a global rule.

Benefits: reuse, time-saving, simpler than multiple images, support for srcset etc wasn’t always there, know it’s wide enough to be full-column-width on mobile. And retina.



If you were to put this inside a flexible container

## Fitting an image into a known space

Add an object-fit example here using an image at the top of a card.


<figure>

```html
<img src="/img/400x225.jpg" alt="A mountain range" />
```

</figure>

<img src="https://source.unsplash.com/WLUHO9A_xik/320x180" alt="A mountain range" />

This all started from:

I should change image CSS to no longer set images to width: 100% by default. (this is also a trello card)
Max-width: 100% (no height: auto required) is a safer default.
The width and auto height should be available on demand.

End of 'this all started from'.

By not setting img { width: 100%; } we have the option to display images smaller than their parent container width, for example a small avatar or book, at their natural size, rather than them being automatically stretched.

Without width and height attributes (but with CSS max-width: 100%) an image will either render at its actual
width (and height) (useful for small avatar or thumbnail) *or* be the full width of its parent container if its actual size is larger than the container
(this is the max-width: 100% kicking in).
This gives us the "fluid images" of RWD where we can use the same large image for a wide screen and a narrow screen
because the image is constrained by the width of its container.

Here’s where it gets interesting.
It’s advantageous to include HTML width and height elements to allow the browser to reserve the appropriate space in the layout for an image while it loads.
However in the past (the pre-responsive days) this was only needed to reserve space based on those *exact* values. Nowadays browsers are dealing with fluid images and need to reserve not the exact space but a scaled up or down (say to 100% parent width) version of them and it needs to also know the image’s aspect ratio in order to do this which up until recently it would only get from the image’s internal data having finished downloading it. However the recent browser updates allow the browser to compute the aspect ratio from the width and height HTML attributes.

To achieve the combination of 1) setting width and height HTML attributes and 2) using CSS to make your image fluid: as I understand it from https://www.chromestatus.com/feature/5695266130755584 and Firefox Jen Simmons, you’re going to need to then set:

```css
img {
  width: 100%;
  height: auto;
}
```

… as opposed to just max-width. This is presumably because if you don’t, because the image has e.g. an HTML-defined width, the browser will want to use that to set its width if we only have a `max-width` set in CSS. But I need to test that! It might just be a Jen Simmons thing to always say width rather than max-width, and max-width might work. To be honest though, if it’s not a hassle to add the above as a modifier, probably better just trusing JS and using it!

(NB I imagine that even if switching to a `width` situation you can still leave your default `max-width: 100%` alone because set to 100% it won’t cause any issues)

Other stuff.

Frame https://every-layout.dev/layouts/frame/:

* this is when you don’t know the image’s aspect ratio in advance but want to enforce it, perhaps for reasons of consistency in a template or grid.
* works for videos too

Responsive image syntax:

* for the resolution switching case I think everything above still stands
* for the art direction case, the browser aspect ratio computation stuff doesn’t work.

## More New stuff

Steph Eckles says \`object-fit\` lets an image act as a container for its own content. (NB she’s talking about object-fit in *general*, but this is still an interesting different perspective than EL’s “object-fit: cover dynamically recrops an image to fit the space without changing its aspect ratio”
https://egghead.io/lessons/css-apply-aspect-ratio-sizing-to-images-with-css-object-fit
https://www.youtube.com/watch?app=desktop&feature=youtu.be&v=5CZyxnCdXuk

MDN say “The object-fit CSS property sets how the content of a replaced element, such as an <img> or <video>, should be resized to fit its container. You can alter the alignment of the replaced element's content object within the element's box using the object-position property.”

So in summary: object-fit *resizes* an image to *fit*

-->
