---
title: Testing the 11ty Image plugin
description: A post with an image tranformed by the 11ty image plugin
noteWithTitle: true
date: 2024-11-24T19:18:08.000+00:00
tags:
  - note
  - web
  - images
draft: false
---
I’m testing out the [Eleventy Image plugin](https://www.11ty.dev/docs/plugins/image/). Here’s a post with an image which, if all goes well, will be converted by the plugin from source `jpeg` into lightweight `avif` and `webp` formats and the underlying code transformed from a basic `img` element into comprehensive modern HTML image syntax.

<!-- This image is near the top of the page and could be regarded as important in the LCP.
So let’s unset the customisations to the loading and decoding attributes
and make the image loading synchronous. -->
<figure>
  <img decoding="auto" loading="eager" alt="A photo of the sign at the entrance to La Petite Garoupe restaurant, Antibes. The letters are in neon and the sign is surrounded by flowers." src="/img/uploads/img_4088.jpeg" />
  <figcaption>Entrance sign at La Petite Garoupe restaurant, Antibes</figcaption>
</figure>
