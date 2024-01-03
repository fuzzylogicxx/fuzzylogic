---
date: 2023-11-01T09:20:00Z
title: Marbella with Mum and Dad
description: On holiday abroad with my parents for the first time in many years
tags:
- note
- holiday
- marbella
- spain
- travel
noteWithTitle: true
mainImage:
  cloudinary_unique_path: v1698837341/IMG_3723_1_af9w8l.jpg 
  alt: "Laurence on holiday in Marbella with Mum and Dad"
  figcaption: "On holiday in Marbella with Mum and Dad"
  aspectRatioWidth: 1300
  aspectRatioHeight: 976
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
My folks haven’t managed a holiday outside of Scotland in a long time. So it’s been nice to spend a week together in Spain. 
---

{% if app.environment == "production" %}
<figure>
  {% respimgV2
    "" + mainImage.cloudinary_unique_path + "",
    "" + mainImage.alt + "",
    mainImage.aspectRatioWidth,
    mainImage.aspectRatioHeight
  %}
  <figcaption>{{ mainImage.figcaption }}</figcaption>
</figure>
{% endif %}

Here we are, just about to board the No. 3 bus to Marbella’s old town.
