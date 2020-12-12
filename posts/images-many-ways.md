---
title: "Images on the web: collecting and demystifying the options"
description: In 2020 there are a lot of different ways to handle including an
  image on a web page. In this post I step through each option and describe
  where it is appropriate.
date: 2020-12-09 11:30:00
tags:
  - entry
  - web
  - images
  - rwd
draft: true
---
In 2020 there are a lot of different ways to handle rendering an image on a web page. In this post I step through each option and describe where it is appropriate.

Let’s start by going back to the basics. I can include an image on a web page like so:

<figure>

```html
<img src="https://source.unsplash.com/WLUHO9A_xik/400x225" alt="A mountain range" />
```

</figure>

<img src="https://source.unsplash.com/WLUHO9A_xik/400x225" alt="A mountain range" />

<!--

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