---
title: Jank-free Responsive Images
description: Here’s how to improve performance and prevent jank when browsers load responsive images
date: 2019-10-23
tags: [web, development, rwd, images, jensimmons, firefox, chrome]
---
Here’s how to improve performance and prevent layout _jank_ when browsers load responsive images.
---

Since the advent of the Responsive Web Design era many of us, in our rush to make images flexible and adaptive, stopped applying the HTML `width` and `height` attributes to our images. Instead we’ve let CSS handle the image, setting a `width` or `max-width` of 100% so that our images can grow and shrink but not extend beyond the width of their parent container.

However there was a side-effect in that browsers load text first and images later, and if an image’s dimensions are not specified in the HTML then the browser can’t assign appropriate space to it before it loads. Then, when the image finally loads, this _bumps_ the layout – affecting surrounding elements in a nasty, _janky_ way.

[CSS-tricks have written about this](https://css-tricks.com/the-fight-against-layout-jank/) several times however I’d never found a solid conclusion.

## Chrome’s Performance Warning

The other day I was testing [this here website](https://fuzzylogic.me/) in Chrome and noticed that if you don’t provide images with inline width and height attributes, Chrome will show a console warning that this is negatively affecting performance.

Based on that, I made the following updates:

1. I added width and height HTML attributes to all images; and 
2. I changed my CSS from `img { max-width: 100%; }` to `img { width: 100%; height: auto; }`.

NB the reason behind #2 was that I found that that CSS works better with an image with inline dimensions than `max-width` does.

## Which dimensions should we use?

Since an image’s actual rendered dimensions will depend on the viewport size and we can’t anticipate that viewport size, I plumped for a `width` of 320 (a narrow mobile width) × `height` of 240, which fits with this site’s standard image aspect ratio of 4:3.

I wasn’t sure if this was a good approach. Perhaps I should have picked values which represented the dimensions of the image on desktop. 

## Jen Simmons to the rescue

Jen Simmons of Mozilla has [just posted a video](https://www.youtube.com/watch?v=4-d_SoCHeWE&feature=youtu.be) which not only confirmed that my above approach was sound, but also provided lots of other useful context.

Essentially, we should start re-applying HTML width and height attributes to our images, because in soon-to-drop Firefox and Chrome updates the browser will use these dimensions to calculate the image’s _aspect ratio_ and thereby be able to allocate the exact required space.

The actual dimensions we provide don’t matter too much so long as they represent the correct aspect ratio.

Also, if we use the modern `srcset` and `sizes` syntax to offer the browser different image options (like I do on this site), so long as the different images are the same aspect ratio then this solution will continue to work well.

There’s no solution at present for the [Art Direction use case](https://cloudfour.com/thinks/responsive-images-101-definitions/#artdirection) – where we want to provide different aspect ratios dependent on viewport size – but hopefully that will come along next.

I just tested this new feature in Firefox Nightly 72, using the Inspector’s Network tab to set “throttling” to 2G to simulate a slow-loading connection, and it worked really well!

## Lazy Loading

One thing I’m keen to test is that my newly-added inline `width` and `height` attributes play well with `loading="lazy"`. I don’t see why they shouldn’t and in fact they should in theory all support each other well. In tests so far everything seems good, however since `loading="lazy"` is currently only implemented in Chrome I should re-test images in Chrome once it adds support for the new image aspect ratio calculating feature, around the end of 2019. 
