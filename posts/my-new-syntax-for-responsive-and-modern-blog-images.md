---
date: 2022-07-14T10:07:16Z
title: My new syntax for responsive and modern blog images
description: I’ve moved from a complicated img srcset-based approach to a simple pattern
  using the picture and source elements and modern formats
tags:
- entry
- performance
- css
- html
- webp
- avif
- responsiveimages
- rwd
- responsive
- images
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
I’ve started trialling a different HTML pattern and different technologies for the “simple” (i.e. non art-directed) responsive article images on this site. I’m continuing to lean on Cloudinary as my free image host, CDN and format-conversion service. But at the HTML level I’ve moved from a complicated `<img srcset>` based approach which included many resized versions of the same image. I’ve switched to a much simpler `<picture>` and `<source>` based pattern that keeps the number of images and breakpoints low, instead leaning into the performance gains offered by the newer formats `avif` and `webp`.
---

My new approach is based on advice in Jake Archibald’s brilliant article   
[Halve the size of images by optimising for high density displays](https://jakearchibald.com/2021/serving-sharp-images-to-high-density-screens/). Jake explains that the majority of your traffic likely consists of users with high density screens so when we can combine optimising for that and making performance gains in a progressively enhanced way, we should! He offers his “lazy but generally good enough” approach:

> Here's the technique I use for most images on this blog: I take the maximum size the image can be displayed in CSS pixels, and I multiply that by two, and I encode it at a lower quality, as it'll always be displayed at a 2x density or greater. Yep. That's it. For 'large' images in blog posts like this, they're at their biggest when the viewport is 799px wide, where they take up the full viewport width. So I encode the image 1,598 pixels wide.

<figure>
  
``` html
<picture>
  <source type="image/avif" srcset="red-panda.avif" />
  <source type="image/webp" srcset="red-panda.webp" />
  <img src="red-panda.jpg" width="1598" height="1026" alt="A red panda" />
</picture>
```
  
</figure>
  
> So, if you want your images to be as sharp as possible, you need to target images at the user's device pixels, rather than their CSS pixels. To encode a 2x image, I throw it into Squoosh.app, and zoom it out until it's the size it'll be displayed on a page. Then I just drag the quality slider as low as it'll go before it starts looking bad.

Taking Jake’s advice and attempting a tweak to use Cloudinary’s automation, my recent post [April 2022 mixtape](https://fuzzylogic.me/posts/april-2022-mixtape/) included its image like so:

<figure>
  
``` html
<figure>
  <picture>
    <source type="image/avif" srcset="https://res.cloudinary.com/…/f_avif,q_auto,w_1292/v1654433393/mato_1500_squooshed_mozjpg_xjrkhl.jpg" />
    <source type="image/webp" srcset="https://res.cloudinary.com/…/f_webp,q_auto,w_1292/v1654433393/mato_1500_squooshed_mozjpg_xjrkhl.jpg" />
      <img class="u-full-parent-width" src="https://res.cloudinary.com/…/f_jpg,q_auto,w_1292/v1654433393/mato_1500_squooshed_mozjpg_xjrkhl.jpg" width="1292" height="1292" alt="Side A of the 7-inch vinyl release of Mato’s “Summer Madness" loading="lazy" decoding="async" />
  </picture>
  <figcaption>Mato’s “Summer Madness”, as featured on the mix</figcaption>
</figure>
```
  
</figure>

And my process was as follows:

1. Start with a source image which has a minimum width of 1292, since based on my current layout that‘s twice as wide (2 × 646) as it would need to go. (Making it a little wider also does no harm, for future-proofing.)
1. Drop it into [Squoosh](https://squoosh.app/) and reduce its quality, stopping just before it gets noticeably bad.
1. Encode that as a `mozjpg` which gave the best size reduction and as far as I can tell, is a safe approach to use.
1. Upload to my Cloudinary account then copy its new Cloudinary URL.
1. Prepare the image HTML per the above snippet. The first `source` [tells Cloudinary to use format `avif`](https://cloudinary.com/blog/how_to_adopt_avif_for_images_with_cloudinary#how_do_i_do_that_), while for the second source it’s `webp`, and for the fallback `img` it’s `jpg`.
1. Check the rendered image in a browser to see the modern formats are being used. 

I’ll DRY-up that HTML into an 11ty shortcode in due course.

I’ve no doubt that I’ll be getting some of this wrong – this stuff gets pretty complicated! For example I note my image file size is still quite large so I wonder if I should be manually creating the `avif` and `webp` versions in Squoosh myself to ensure getting the savings that make this approach worthwhile, rather than handing the conversion off to Cloudinary. (However this would mean having to host more images…)

In the meantime however, I’m happy that this approach has simplified the mental overhead of handling modern, responsive blog images, and it can be a work in progress.

## Additional references

- [Browser support for avif on caiuse.com](https://caniuse.com/avif)
- Twitter thread on [forthcoming Safari support for avif](https://twitter.com/jaffathecake/status/1540697894683942912), and more 