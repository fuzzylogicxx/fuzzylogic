---
date: "2019-12-27T10:00:35.700Z"
title: "Lazy load embedded YouTube videos (CSS-Tricks)"
description: "A performance-enhancing trick for embedding youtube videos by taking advantage of the srcdoc attribute."
tags: [link, performance, youtube, video, embed, srcdoc]
linkTarget: "https://css-tricks.com/lazy-load-embedded-youtube-videos/"
---
> This is a very clever idea via Arthur Corenzan. Rather than use the default YouTube embed, which adds a crapload of resources to a page whether the user plays the video or not, use the little tiny placeholder webpage that is just an image you can click that is linked to the YouTube embed.
---

This is a performance-enhancing trick for embedding youtube videos which eschews the default YouTube embed (and all the resources it adds to a page whether the video plays or not) in favour of rendering a tiny placeholder webpage in the `srcdoc` attribute.