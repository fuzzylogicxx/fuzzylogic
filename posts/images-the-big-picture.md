---
title: "Images on the Web: The Big Picture, Part 1"
description: In modern web development there are a myriad ways to include an image on a web page. In this post I step through
  the various methods, discussing how they evolved and where they are appropriate.
date: 2021-02-28 11:30:00
tags:
  - entry
  - web
  - images
  - rwd
permalink: /posts/images-on-the-web-the-big-picture/
---
In modern web development there are a myriad ways to present an image on a web page and it can often feel pretty baffling. In this series I step through the options, moving from basic to flexible images; then from modern responsive images to the new CSS for fitting different sized images into a common shape. By the end I'll arrive at a flexible, modern boilerplate and toolkit for images.
---

## Scope

This article is primarily about the HTML `img` element (and related markup). I might mention CSS background images at some point, but by and large I’m focusing on images as _content_ rather than decoration.

Similarly I probably won’t mention _icons_ at all. I see them as a separate concern and recommend you use inline SVG rather than any image-based approach.

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
  vertical-align: middle;
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

Now I know that narrow and static images like this feel pretty old-school. In these days since the Responsive Web Design movement we’re much more used to seeing either full-container-width media or complex markup for intelligently delivering flexible media, or both.

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

We’re not overriding width or height with CSS (remember CSS rules would trump HTML attributes because attributes have no specificity) so the browser will render the image at whatever size attribute values we provide, regardless of the image’s intrinsic dimensions. As such, to avoid squashing and distortion we should ensure that our size attribute values match the image’s real dimensions.

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

The eagle-eyed will have noticed that the markup in the above snippet once again excluded the HTML `width` and `height` attributes. The reason for this is that when working responsively, many of us stopped adding those size attributes, feeling that for flexible images the practice was redundant. The image’s dimensions were now a moving target, and the space needing reserved for the image by the browser was now variable rather than fixed. And true enough, browsers were not capable of reserving space for a moving target, so including the attributes served no real purpose.

Regardless, some content management systems (most notably Wordpress) continued to output images with HTML `width` and `height` attributes as standard. This introduced a small challenge. Without the attributes we could rely on the browser to take our simple `max-width:100%` declaration and also implicitly apply `height:auto` thereby always preserving the image‘s aspect ratio when scaling it down. To achieve the same goal when the HTML `height` attribute is present, we needed the following revised CSS:

<figure>

```css
img {
  max-width: 100%;
  height: auto;
}
```

</figure>

Here’s an example of a flexible image. It’s 2000 pixels wide, but shrinks to fit inside its narrower parent. Magic!

<img src="https://via.placeholder.com/2000x1500/272822/FFFFFF" />

## Jank-free responsive images

There’s been a recent development wherein modern browsers can now reserve appropriate space for flexible images while they are loading (rather than only for fixed images).

This means that adding the `width` and `height` attributes is once again a good idea.

If you know the image’s aspect ratio in advance, you can now use any combination of `width` and `height` attribute values which represent that ratio, and the browser will dynamically calculate and reserve the appropriate required space in the layout while the image loads, once again avoiding those jarring layout shifts I mentioned before.

However this presents a couple of challenges.

Firstly, having the `height` HTML attribute once again puts us in the position where, for any image we want to be flexibly scaled and safely limited by `max-width`, we’ll need to explicitly add `height:auto;` in our CSS.

Secondly, having the `width` attribute can be problematic when the image is one which we explicitly want to be full-container-width, for example the featured image in a blog post. The problem arises when the `width` attribute value provided is less than the containing element’s current width. If the only CSS you have on your image is `max-width:100%` then the image will adopt the value from its `width` attribute and consequently be narrower than its parent. One approach might be to always use a sufficiently high `width` value but that feels a tad brittle; I’d rather employ a solution that is more explicit and decisive.

To solve both of the above challenges, we can apply some additional CSS.

<figure>

```css
  /*
  Ensure correct aspect ratio is preserved when
  max-width: 100% is triggered and image
  has the HTML height attribute set,
  while doing no harm otherwise.
  */
img[height] {
  height: auto;
}

  /*
  Optional class to make an image 100% container-width.
  Overrides the 'width' attribute, avoiding the risk of the image
  being too narrow because its width value is narrower than the container.
  When using this try to ensure your image’s intrinsic width is at least as
  wide as its container’s maximum width because otherwise on wide
  viewports the image would stretch and the results might not be great.
  */
.img-full-parent-width {
  width: 100%;
}
```

</figure>

## Pros and cons of large images

I’d like to quickly take stock.

Let’s say we have a source image which is 1200px wide. Let’s also say that it’s the featured image for a blog post and therefore will be placed in our main content column, and that this column is never wider than 600px.

If we make the image flexible using `max-width:100%`, it’ll work on wide viewports and narrow viewports (such as a mobile phone) alike.

On the plus-side, we only need to create one image for our blog post and we’re done.

Another positive is that on devices with retina screens – capable of displaying a comparatively greater density of pixel information in the same physical space – our oversized image will appear at higher quality and look great.

On the downside, we are delivering a _much_ larger image and therefore file size than is required for, for example, a 320px wide context. This has performance implications since bigger files mean longer download times, and this is excarbated when the device is not connected to high-speed wifi (as is often the case with a mobile phone).

Dealing with these challenges using modern _Responsive Images_ will be the subject of Part #2.

## References

- [Ethan Marcotte: Responsive Web Design](https://alistapart.com/article/responsive-web-design/)
- [Jen Simmons: Do this to improve image loading](https://www.youtube.com/watch?v=4-d_SoCHeWE&feature=youtu.be)
- [Every Layout’s _Frame_](https://every-layout.dev/layouts/frame/)
- [Zach Leatherman—Barebones CSS for Fluid Images](https://www.zachleat.com/web/fluid-images/)


