---
title: "Record"
layout: layouts/post.njk
pagination:
  data: records
  size: 1
  alias: record
permalink: "/records/{{record.basic_information.title|slug}}/"
---

# {{ record.basic_information.artists[0].name }} – {{ record.basic_information.title }} ({{ record.basic_information.labels[0].name }})


