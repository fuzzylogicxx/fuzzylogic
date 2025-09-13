---
title: Excerpts for Eleventy, by Keith Carangelo
description: How to support post excerpts that come from either the start of
  your post or a complex, multiline frontmatter value
noteWithTitle: false
linkTarget: https://www.kcaran.com/posts/excerpts-for-eleventy-my-implementation.html
date: 2025-09-13T12:45
tags:
  - link
  - excerpts
  - 11ty
  - yaml
  - frontmatter
  - personalsites
---
Recently I updated this website’s git repository README to include a summary of my approach to supporting post excerpts.

> I define an initial part of a post as the excerpt by adding a separator string between it and the remaining content. Then in my posts list I grab 11ty’s `post.page.excerpt` and pass that through a custom markdown-parsing filter.

This works pretty well but sometimes it’s a bit inflexible that the excerpt has to be part of the post. Sometimes you might want to say something different, or shorter and snappier in the excerpt.

<!-- excerpt -->

Keith offers a best of both worlds solution where you can optionally set your excerpt in front matter, and if that exists, use that.

> If I want to use different content for the excerpt than the start of the post, I include it in the page’s front matter under `excerpt` using a YAML HereDoc.

```md
---
excerpt |
  ### Heading
  This is an example excerpt with an ![image](/url/image.png)
---
```

TIL about the YAML HereDoc, and being able to include multiple lines including markdown in a frontmatter value. Nice! It looks like the syntax Keith uses there is a “literal block style indicator” – more at [YAML Multiline](https://yaml-multiline.info/).

Thanks, Keith!
