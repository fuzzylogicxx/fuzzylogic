---
title: "Images on the web: the big picture"
description: In modern web development there are a bamboozling number of
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
In modern web development there are a bamboozling number of ways to structure and style an image on a web page. In this post I step through the various approaches, discuss how they evolved and try to unpick where they are appropriate.

## Scope

This article is primarily about the HTML `img` element. I might mention CSS background images at some point, but by and large I’m focusing on images as _content_ rather than decoration.

Similarly I probably won’t mention _icons_ at all. I see them as a separate issue too and I recommend you use inline SVG rather than any image-based approach for those.

## Terminology

### Replaced element

The image element is a replaced element which means that the element is replaced by the resource pointed to by its `src` attribute.

### Aspect Ratio

You get an image’s aspect ratio by dividing its width by its height.

An image which is 160px wide × 90px tall can be represented as 16:9, or 1.777.

It’s important to state that aspect ratio is an _intrinsic_ characteristic of an image – i.e. it is “part of the image” – therefore outside of our control as developers. We can apply _extrinsic_ settings which change the dimensions of the rendered image on our web page, however its aspect ratio was determined when the image was originally created and cropped.

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

## A basic image

Let’s start by going back to basics. I can include an image on a web page like so:

<figure>

```html
<img src="/img/250x377.jpg" alt="A Visit… by Jennifer Egan" />
```

</figure>

Note that our markup contains no `width` or `height` attributes, just an `alt` for accessibility. Without those size attributes (and in the absence of any CSS acting on the `img`’s width or height) the image simply displays at its intrinsic dimensions i.e. the dimensions at which the file was saved, in this case 250 × 377 pixels. The image is output as follows:

<img src="https://images-eu.bookshop.org/product-images/images/9781780330969.jpg?width=250" alt="“A Visit from the Goon Squad“ by Jennifer Egan" />

Narrow and static images like this now feel pretty old-school. In these days since the Responsive Web Design movement we’re much more used to seeing full container-width media and complex code for intelligently delivering flexible media.

However I still occasionally encounter use cases for displaying a relatively narrow image _as-is_.

Sticking with the above book image example, given its aspect ratio you probably wouldn’t want it to be full-column-width on anything other than the narrowest screens simply because of how tall it could become at the expense of the reading experience. You might also be loading your images from a third party bookshop with which you have an affiliate scheme, and therefore have little control over file size and other factors influencing performance and responsive behaviour. As such you might do well to just keep it simple by loading a sensibly-sized thumbnail.

See also [this figure illustrating a simple database schema](https://railstutorial.org/book/toy_app#sec-modeling_demo_microposts) on the _Ruby on Rails Tutorial_ website. On wide viewports, the author’s preference is to simply display the image at its natural, small size and centre it, rather than blowing it up unnecessarily.

In summary, there remain times when you might need a narrow, fixed-size image.

## Include size attributes

When we know the dimensions of our image in advance, we can improve upon our previous markup by explicitly adding the `width` and `height` attributes.

<figure>

```html
<img src="/img/250x377.jpg" width="250" height="377" alt="…" />
```

</figure>

This renders the image exactly as before.

<img width="250" height="377" src="https://images-eu.bookshop.org/product-images/images/9781780330969.jpg?width=250" alt="“A Visit from the Goon Squad“ by Jennifer Egan" />

However, this addition allows the browser to reserve the appropriate space in the page for the image before it has loaded. If we don’t do this, we risk a situation where text that immediately follows our image renders higher up the page than it should while the image is still loading, only to _shift_ jarringly after the image loads.

At this stage we’re still not adding any overrides with CSS (remember CSS rules trump HTML attributes because attributes have no specificity) so the browser will render the image at whatever size values we provide, regardless of the image’s intrinsic dimensions. As such, to avoid squashing and distortion we should ensure that our size attribute values match the image’s real dimensions.

## Enter flexible images

At the dawn of the mobile web, many authors sought to handle mobile devices by creating a separate, dedicated mobile website. However this meant duplication of cost, code, content and maintenance. Responsive Web Design provided a counterpoint with a “create once, publish everywhere” philosophy which embraced the fluidity of the web and suggested we could serve desktop and mobile devices alike from a single codebase.

RWD proposed making layout and content _adaptable_. This included the idea of _flexible images_ – that for any given image you need just a single, wide version plus some clever CSS to enable it to work not only on desktop but also to adapt its size for narrower contexts and still look good.

By default when a wide image is rendered within a narrower container it will overflow that container, breaking the layout. The key to avoiding this is to set a _tolerance_ for how wide the image is permitted to go. Generally, we’ll tolerate the image being 100% as wide as its container but no wider. We can achieve this using `max-width`.

<figure>

```html
<img src="/img/wide.png" alt="…" />
```

```css
img {
  max-width: 100%;
}
```

</figure>

The eagle-eyed will have noticed that the markup in the above snippet once again excluded the HTML `width` and `height` attributes. The reason for this is that when working responsively, many of us stopped adding those size attributes, feeling that for flexible images the practice was redundant given that the space needing reserved for the image was now variable rather than fixed. And true enough, browsers were not capable of reserving space for a moving target, so including the attributes served no real purpose.

However some content management systems (most notably Wordpress) continued to output images with HTML `width` and `height` attributes as standard. This introduced a small challenge. Without the attributes we could rely on the browser to take our simple `max-width:100%` declaration and also implicitly apply `height:auto` thereby always preserving the image‘s aspect ratio when scaling it down. To achieve the same goal when the HTML `height` attribute is present, we needed the following revised CSS:

<figure>

```css
img {
  max-width: 100%;
  height: auto;
}
```

</figure>

Here’s an example of a flexible image. Note that although it is 2000 pixels wide, it shrinks to fit inside its narrower parent. Magic!

<img src="https://via.placeholder.com/2000x1500/272822/FFFFFF" />

## Jank-free responsive images

There’s been a recent development wherein modern browsers can now reserve appropriate space for flexible images while they are loading rather than only fixed images.

This means that adding the `width` and `height` attributes is once again a good idea.

If you know the image’s aspect ratio in advance, you can now use any combination of `width` and `height` attribute values which represent that ratio, and the browser will dynamically calculate and reserve the appropriate required space in the layout while the image loads, once again avoiding those jarring layout shifts I mentioned before.

However this presents a couple of challenges.

Firstly, having the `height` HTML attribute once again puts us in the position where, for any image we want to be flexibly scaled, we’ll need to explicitly add `height:auto;` in our CSS.

Secondly, having the `width` attribute is problematic when the image is one which we want to be _full-container-width_. The problem arises when the `width` attribute value provided is less than the parent element’s current width. If the only CSS you have on your image is `max-width:100%` then the image will simply use its `width` attribute value and will be narrower than its parent. One approach might be to always use a high `width` value but that feels a tad brittle; I’d rather employ a solution that is more explicit and decisive.

To solve both of the above challenges, we can apply some CSS.

<figure>

```css
  /*
  Ensures aspect ratio is respected when image
  is being scaled responsively
  (e.g. when max-width: 100% is triggered)
  while doing no harm if image is fixed.
  */
img[height] {
  height: auto;
}

  /*
  Ensure an image is 100% parent-width even if it
  has a 'width' attribute
  set to something narrower.
  */
.img-full-parent-width {
  width: 100%;
}
```

</figure>

NB these problems might go away in future if another means of providing the image’s aspect ratio becomes available, but until then, they’re real.

(
LH: Check this https://web.dev/aspect-ratio/ and see if any insights, not just re. aspect-ratio.
But note that I think una might be wrong in intimating that using aspect-ratio (alone) fixes the “tell the browser to reserve space before image has downloaded issue”. See Jen S’s reply to me https://twitter.com/fuzzylogicx/status/1347307685826469894)
)

## Pros and cons of large images

I’d like to quickly take stock.

Let’s say we have a source image which is 1200px wide. Let’s also say that it’s the featured image for a blog post and therefore will be placed in our main content column, and that this column is never wider than 600px.

If we make the image flexible using `max-width:100%`, it’ll work on wide viewports and narrow viewports (such as a mobile phone) alike.

On the plus-side, we only need to create one image for our blog post and we’re done.

Another positive is that on devices with retina screens – capable of displaying a comparatively greater density of pixel information in the same physical space – our oversized image will appear at higher quality and look great.

On the downside, we are delivering a _much_ larger image and therefore file size than is required for, for example, a 320px wide context. This has performance implications since bigger files mean longer download times, and this is excarbated when the device is not connected to high-speed wifi (as is often the case with a mobile phone). We’ll discuss ways to address this challenge later.

## Fitting images into spaces

So far we haven’t considered any complexity with regard to the layout in which a image lives. However as developers we’re not just dropping images into body content columns; often we need to set an image as a _hero_, or create image galleries, or add an image to each card in a row of cards. These are situations where we’re defining a particular shape which the image must fit into and fill completely. And in the modern era, these layouts are responsive and fluid, so our images need to be adaptable. We require techniques which give us higher degree of control and which can produce reliable results irrespective of the source image’s characteristics.

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



## Modern Responsive Images

In his fantastic series [Responsive Images 101](https://cloudfour.com/thinks/responsive-images-101-definitions/) Jason Grigsby defines Responsive Images as:

> A method for providing the browser with multiple image sources depending on display density, size of the image element in the page, or any number of other factors.

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
- `loading=lazy`

## Further thoughts and questions

I’m temptated to _always_ use a frame (even when the image’s own aspect ratio fits the bill) so that the frame container (rather than the image) takes up the required space therefore I don’t need to include `width` and `height` HTML attributes and CSS to override them. I’m reluctanct though as I like using native standards where possible.

## What have I missed?

Let me know at @leroy022823 or laurence@fuzzylogic.me.




## References

Inspiration:

- [Every Layout’s _Frame_](https://every-layout.dev/layouts/frame/)


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

So in summary: object-fit *resizes* an object (e.g. an image) to *fit*

-->
