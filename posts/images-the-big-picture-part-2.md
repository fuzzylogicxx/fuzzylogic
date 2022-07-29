---
title: "Images on the Web: The Big Picture, Part 2"
description: lorem
date: 2021-03-07 11:30:00
tags:
  - entry
  - web
  - images
  - rwd
permalink: /posts/images-on-the-web-the-big-picture-part-2/
draft: true
---
lorem
---

## Modern Responsive Images

(Sara Souidean’s go-to syntax explainer resource https://dev.opera.com/articles/responsive-images/)

In his fantastic series [Responsive Images 101](https://cloudfour.com/thinks/responsive-images-101-definitions/) Jason Grigsby defines Responsive Images as:

> A method for providing the browser with multiple image sources depending on display density, size of the image element in the page, or any number of other factors.

### The Art Direction Use Case

I rarely need this in practice. 
Note that you can now avoid layout shifts after images load by specifying `width` and `height` attributes on your `picture`’s `source` elements. https://twitter.com/_zouhir/status/1414961958701305856

## Serving sharp images to hi-density screens

(Check my notes, I also have a Note on this. Delete it asap after publishing)

Jake’s lazy and long/proper approaches: https://jakearchibald.com/2021/serving-sharp-images-to-high-density-screens/

Lazy:
> Here's the technique I use for most images on this blog: I take the maximum size the image can be displayed in CSS pixels, and I multiply that by two, and I encode it at a lower quality, as it'll always be displayed at a 2x density or greater. Yep. That's it. For 'large' images in blog posts like this, they're at their biggest when the viewport is 799px wide, where they take up the full viewport width. So I encode the image 1,598 pixels wide.

```
<picture>
  <source type="image/avif" srcset="red-panda.avif" />
  <source type="image/webp" srcset="red-panda.webp" />
  <img src="red-panda.jpg" width="1598" height="1026" alt="A red panda" />
</picture>
```

> So, if you want your images to be as sharp as possible, you need to target images at the user's device pixels, rather than their CSS pixels.

> To encode a 2x image, I throw it into Squoosh.app, and zoom it out until it's the size it'll be displayed on a page. Then I just drag the quality slider as low as it'll go before it starts looking bad.

## Fitting images into spaces

So far we haven’t considered any complexity with regard to the layout in which an image lives. However as developers we’re not just dropping images into body content columns within flowing prose.

Often we need to set an image as a _hero_, or create image galleries, or add an image to each card in a row of cards. These are situations where we’re defining a _specific shape_ which the image must i) fit inside; and ii) fill completely.

<!-- In the modern era, these layouts are responsive and fluid so our images need to be adaptable, too.  -->

We ideally also want the flexibility of taking images with differing aspect ratios and being able to fitting them into a common shape.

So we require techniques which give us a higher degree of control and which can produce reliable results irrespective of the source image’s characteristics.

### Make an image fill its parent

We can make an `img` fill its parent as follows:

<figure>

```css
.img-fill-parent {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

</figure>

Declaring `object-fit: cover` on an image allows us to make it _cover_ all or some of its parent’s shape. Under the hood the image is dynamically recropped around a given point (its middle, by default) to the target size, with its aspect ratio unchanged. So, rather than setting the image’s width and height to some unnatural shape which would squash or distort it, we instead in effect make its parent a “window” onto the undistorted image.

Flexbox Gallery example (inspired by Stephanie Eckles) https://codepen.io/fuzzylogicx/pen/QWKmBOp

Note: you don’t have to make the image fill _all_ of its parent. I could alternatively have set `height: 25vh` (for example) rather than `height: 100%`. I might do that to, say, set an image within a card to only take up a certain amount of the card’s height, leaving space for title and description below.

Note 2: one other way to set an image to cover its parent’s shape is to supply it as a background image, and use `background-size:cover`. However in this article we are assuming that our image should be considered as content rather than decoration and accessible via alternative text, and this precludes the background-image approach.

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

Talk about Every layout’s Frame.

Then, that we can now use (as a prog.enh) CSS `aspect-ratio` to set the aspect ratio of a frame without needing to do the maths ourselves. Reference _Smol Aspect Ratio Gallery_ section on https://smolcss.dev/




## Using new CSS on images

On [Picalilli](https://piccalil.li/quick-tip/use-css-clamp-to-create-a-more-flexible-wrapper-utility) Andy Bell uses the CSS `min` function “for setting sensible image sizes” in his blog posts. The image gets a `max-width` of either 100% or 55rem, whichever is smaller. That means it’ll never overflow the container, and on wide screens it’ll not stretch too wide.

<figure>

```
.post figure img {
    max-width: min(55rem,100%);
}
```

</figure>

### Automate with a 3rd party tool

Cloudinary lets you do lots of stuff.

Includes transformations https://cloudinary.com/documentation/image_transformations#scale

For the following code below, also see my Note I made (in Notes) which might have some good stuff/links.

```
<figure>
<img
  sizes="(min-width: 1600px) 646px, (min-width: 700px) 612px, 91.58vw"
  srcset="…/q_auto,f_auto,w_414/foo.jpg 414w,
  …/q_auto,f_auto,w_480/foo.jpg 480w,
  …/q_auto,f_auto,w_646/foo.jpg 646w,
  …/q_auto,f_auto,w_828/foo.jpg 828w,
  …/q_auto,f_auto,w_960/foo.jpg 960w,
  …/q_auto,f_auto,w_1292/foo.jpg 1292w"
  src="…/q_auto,f_auto,w_646/foo.jpg"
  alt="Laurence’s record purchases in Autumn 2020"
  width="646" height="338"
  loading="lazy">
</figure>
```

Notes:
To deliver the above effectively, I need a source image with a minimum width of 1292px. It could be wider if you want, giving you flexibility in case in future your layout changes and you need your image to go wider. Actually, mine will soon when I implement breakout images.

I currently host my source images on Cloudinary too. You don’t have to do that with Cloudinary, but it means I don’t need to mess around with Git Large File Storage and so on. I might change this at some point but so far it works and isn’t racking up costs.

Our image code is offering x differently sized versions of the same image.

** Update this as it needs tweaked since I’ve added my new Autumn 2020 records post image. **
They range from 320px wide to 2560px wide.
For each image we also explicitly tell the browser how wide it is (for example 320w means 320px wide).
320px makes sense because there are/were mobile phone viewports that width which were non-HD/retina, so serving that size of image would be ideal for them.
	These type of phones may be dying out. Perhaps adding an image (or replacing as lowest-width-image with one) that’s ~414px or 480px wide would be better.
640px makes sense because that’s (kind of) the widest my centre column goes (34rem at 1rem=19px assuming user hasn’t resized text = 646). It’s also 2x320 so works for 320px viewports that are HD/retina displays.
	So actually it’d make more sense for me to set that at 646
There’s also a high chance of a need for a 612px image (non-HD) because that’s the max-width of the column before the final media query which bumps the font-size and therefore the column width.
One at ~828 (2x414px (or 480px, whichever I choose as my lowest)) would make sense.
One at 1224 (2*612) makes sense
One at 1292 (646*2) would make sense
Beyond that, there’s no current need for anything more!
So my source image needs to be a minimum width of 1292px.
	But other than cost of storage, no probs with source image being wider. The source is never going to get used.
We also need to decided which image should be used as fallback for browsers such as IE11 which don’t support srcset. To be safe, probably go for one at the main col’s widest I.e. 646, safe in the knowledge that IE11 supports max-width so if the col is narrower, the image will scale down.

*** What code would I use if my source image was smaller, like one of the ones the Logan’s Run guys took? ***



### Check that you’re doing it right

1. Linting tool https://ausi.github.io/respimagelint/
1. or quick and dirty, just ocassionally check currentSrc in devtools
## Miscellaneous

### Targeting speed of internet connection


### Lazy loading


## Conclusions

It can be difficult to know when to use the CSS stuff and when to use the HTML stuff. Disciplines like performance, design and responsive layout are all colliding in confusing ways. It’s hard to keep the various techniques and technologies separate in your mind and remember what each is trying to achieve. That’s that’s why I found myself writing this article.

Here’s what I’m using:

- allow basic, fixed-size, narrow images by default, because ocassionally you need them
- max-width by default, because I can see no reason not to (it affords “flexibility with security”)
- when I know an image’s dimensions in advance (for example when it’s not hosted elsewhere, or not within a grid of uneven photos) I’ll add the HTML size attributes. I can’t add them when I don’t know them (but this should be the minority of ocassions)
- ?? class that applies width: 100% and height: auto ??
- Cloudinary for hosting
- sometimes the source image is small-ish (say 640px wide, somebody else’s photo) so I just include a simple, old-school `img` tag without lots of fancy stuff. (However by doing so I might be missing out on Cloudinary’s ability to deliver a webp rather than a jpg. Test this on the Rudy pic)
- Otherwise when the original image is large, Resolution Switching syntax at least for single images.
- Lean on Cloudinary for formats (webp etc), resizing, compression. To achieve this I use Cloudinary’s URL syntax when constructing my responsive image elements.
- I try to avoid allowing an image to scale up from its intrinsic size in case of a bad result (although browsers probably handle this better than I think and it wouldn’t be the end of the world).
- The “Lint Images” browser plugin, to check that my `sizes` code specifications actually match the widths images need to be at for the given viewport sizes
- Art Direction syntax pretty sparingly
- a frame, allowing me to easily create a “window” of any aspect ratio onto any given image. Handy for fitting images into responsive layouts.
  - although `aspect-ratio` on the image container is the leaner way forward here. Can I use it with PE? Probably.
- other manual `object-fit` only where required over and above what frame provides.
- `loading=lazy`

## Further thoughts and questions

I’m temptated to _always_ use a frame (even when the image’s own aspect ratio fits the bill) so that the frame container (rather than the image) takes up the required space therefore I don’t need to include `width` and `height` HTML attributes and CSS to override them. I’m reluctant though as I like using native standards where possible. Also, I think I’m oversimplifying the benefits (in terms of repaints etc) you get from applying the attrs to an image, so probably best to apply them and not need the frame when that’s possible/appropriate.

## What have I missed?

Let me know at @leroy022823 or laurence@fuzzylogic.me.




## References

Inspiration:

- [Every Layout’s _Frame_](https://every-layout.dev/layouts/frame/)


Stock images and other resources I’ve used:

- [NASA Images](https://images.nasa.gov/) (change the size after the tilde to what you require, [for example small](https://images-assets.nasa.gov/image/PIA17563/PIA17563~small.jpg))
- [Logoipsum](https://logoipsum.com/)


<!--

(
LH:

1. Check the Zach post  https://www.zachleat.com/web/fluid-images/?utm_campaign=CSS%2BLayout%2BNews&utm_medium=email&utm_source=CSS_Layout_News_291 which has good additions to the above for when you combine HTML width and height attrs, srcset and max-width: 100%. It seems that while width: 100% trumps the HTML width, max-width:100% will not go 100% even if there are images in `sizes` to allow it to IF the width attribute is a value which is less than than 100% container width. You can get around this by setting large/r width and height attribute values or by including width: auto.
2. Check the industrial empathy post which suggests new attrs like `decoding`
3. Check this https://web.dev/aspect-ratio/ and see if any insights, not just re. aspect-ratio.
But note that I think Una might be wrong in intimating that using aspect-ratio (alone) fixes the “tell the browser to reserve space before image has downloaded issue”. See Jen S’s reply to me https://twitter.com/fuzzylogicx/status/1347307685826469894)
)


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

So in summary: object-fit *resizes* an object (e.g. an image) to *fit*

-->
