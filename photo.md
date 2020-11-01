---
layout: layouts/photo.njk
pagination:
  data: photos
  size: 1
  alias: photo
permalink: "/photos/{{photo.asset_id}}/"
pageSpecificRobotsDirective: "noindex, nofollow"
eleventyComputed:
  title: "Photo {{ photo.asset_id }}"
  description: "Photo {{ photo.asset_id }}"
  date: "{{ photo.created_at }}"
  aspectRatioWidth: "{{ photo.width }}"
  aspectRatioHeight: "{{ photo.height }}"
---

---
<figure>
  {% respimg "" + photo.secure_url + "", "" + title + "", "(min-width: 1600px) 646px, (min-width: 700px) 612px, 91.58vw", aspectRatioWidth, aspectRatioHeight %}
</figure>
