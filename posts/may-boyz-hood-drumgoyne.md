---
date: 2024-05-12T09:20:00Z
title: Boys weekend with Rudy
description: Watching films, climbing hills and enjoying the sun
tags:
- note
- walking
- hill-walking
- curry
- food
- film
- football
noteWithTitle: true
mainImage:
  cloudinary_unique_path: v1715509641/Laurence_Rudy_Drumgoyne_Hill_yf78bn.jpg 
  alt: "Laurence and Rudy the border terrier take a break while climbing Drumgoyne Hill"
  figcaption: "Laurence and Rudy on Drumgoyne Hill"
  aspectRatioWidth: 1300
  aspectRatioHeight: 1731
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
---
With Clair off having fun in Skye, the boys (me and Rudy) have been spending some quality time together. On Friday night we watched Dune 11. Rudy wasn’t too bothered but I really enjoyed it. It looks absolutely stunning, especially the all-white gladiator scene. And I thought the heavy, growling soundtrack marked a return to form for Hans Zimmer. While watching I munched on a paneer palak from local heroes Kebabish which, let’s be honest, is inifinitely better than popcorn.

On Saturday with the sun shining and some post-curry guilt, we set off early and walked up Drumgoyne Hill. It was steep but really good fun.
---

We even made it home just in time to watch Celtic beat Rangers to (just about) clinch the league title.

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
