---
title: Jank-free Responsive Images
description: Here’s how to improve performance and prevent jank when browsers load responsive images
date: 2019-10-23
tags: [web, development, rwd, images, jensimmons, firefox, chrome]
---
Here’s how to improve performance and prevent layout _jank_ when browsers load responsive images.
---

Since the dawn of the Responsive Web Design era many of us (including me), in our rush to make image sizes flexible and adaptive, stopped applying the HTML width and height attributes to our images in favour of just letting CSS handle the image, with a width limit of 100% i.e. the width of its container.

However there was a side-effect in that browsers load text first and images later, and if an image’s dimensions are not specified in the HTML then the browser can’t assign appropriate space to it before it loads. Then, when the image finally loads, this _bumps_ the layout – affecting surrounding text and other elements in a nasty, _janky_ way.

[CSS-tricks have written about this](https://css-tricks.com/the-fight-against-layout-jank/) several times however I’d never found a solid conclusion.

## Chrome’s Performance Warning

The other day I was testing this website in Chrome and noticed that if you don’t provide images with inline width and height attributes, Chrome will actually show a console warning that this is negatively affecting performance.

Based on that, I updated my images in as follows:

1. I added width and height HTML attributes; and 
2. I changed my CSS from `img { max-width: 100%; }` to `img { width: 100%; height: auto; }`.

NB the reasoning behind #2 was that I found it works better with an image with inline dimensions than `max-width`.

## Which dimensions should we use?

Since the actual rendered dimensions will depend on the viewport size and we can’t anticipate that viewport size, I plumped for 320 (a narrow mobile width) × 240, which fits with this site’s standard image aspect ratio of 4:3. I wasn’t sure if this was a good approach.

## Jen Simmons to the rescue

Jen Simmons of Mozilla has [just posted a video](https://www.youtube.com/watch?v=4-d_SoCHeWE&feature=youtu.be) which not only (thankfully) confirmed that my above approach was sound, but also provided lots of useful context.

Essentially, we should start re-applying HTML width and height attributes to our images, because in soon-to-come Firefox and Chrome updates the browser will use these dimensions to calculate the image’s _aspect ratio_ and allocate the exact required space.

Also, if we use the modern responsive image syntax `srcset` and `sizes` syntax to offer the browser different image options (like I do on this site), so long as the different images are the same aspect ratio then this solution will continue to work well.

There’s no solution at present for the [Art Direction use case](https://cloudfour.com/thinks/responsive-images-101-definitions/#artdirection) – where we want to provide different aspect ratios dependent on viewport size – but hopefully that will come along next.

## Lazy Loading

One thing I’m keen to test is that my newly-added inline `width` and `height` attributes play well with `loading="lazy"`. Having just tested on Firefox Nightly 72, the verdict is _so far so good_!
