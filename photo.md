---
title: "{{photo.asset_id}}"
description: Photo
layout: layouts/photo.njk
pagination:
  data: photos
  size: 1
  alias: photo
permalink: "/photos/{{photo.asset_id}}/"
---

---
<figure>
  {% respimg "" + photo.secure_url + "", "" + title + "", "(min-width: 1600px) 646px, (min-width: 700px) 612px, 91.58vw", aspectRatioWidth, aspectRatioHeight %}
</figure>
