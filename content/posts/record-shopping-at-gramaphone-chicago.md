---
title: Record Shopping at Gramaphone, Chicago
description: "When in Chicago, buy #house"
date: 2018-08-26T21:13:00.000Z
location: Chicago, IL
tags:
  - note
  - records
  - music
  - house
  - chicago
mainImage:
  url: https://res.cloudinary.com/fuzzylogic/image/upload/v1603638115/86f73c36-e6c1-4f89-9a69-e59b6a9666f4_aw0nsm.jpg
  alt: "Records and slipmats purchased from Gramaphone Records, Chicago, in August 2018"
  aspectRatioHeight: 240
draft: false
---
When in Chicago, buy #house

{% if app.environment == "production" %}

<figure>
  {% respimg "" + mainImage.url + "",
  "" + mainImage.alt + "",
  "(min-width: 1600px) 646px, (min-width: 700px) 612px, 91.58vw",
  320, mainImage.aspectRatioHeight,
  [320, 640, 960, 1280, 1600] %}
  <figcaption>My haul from Gramaphone Records, Chicago, August 2018</figcaption>
</figure>
{% endif %}
