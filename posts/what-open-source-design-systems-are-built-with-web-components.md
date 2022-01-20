---
date: 2022-01-19T09:33:15Z
title: What open-source design systems are built with web components?
description: 'Alex Page, a Design System engineer at Spotify, has just asked: What
  open-source design systems are built with web components?'
tags:
- link
- development
- web
- shopify
- designsystems
- javascript
- a11y
- webcomponents
noteWithTitle: false
linkTarget: https://twitter.com/alexpage_/status/1483542442997522433
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
Alex Page, a Design System engineer at Spotify, has just asked:

> What open-source design systems are built with web components? Anyone exploring this space? Curious to learn what is working and what is challenging. [#designsystems](https://twitter.com/hashtag/designsystems?src=hashtag_click) [#webcomponents](https://twitter.com/hashtag/webcomponents?src=hashtag_click)

And there are lots of interesting examples in the replies.
---

I plan to read up on some of the stories behind these systems.

I really like Web Components but given that I don’t take a “JavaScript all the things” approach to development and design system components, I’ve been reluctant to consider that web components should be used for _every component_ in a system. They would certainly offer a lovely, HTML-based interface for component consumers and offer interoperability benefits such as Figma integration. But if we shift all the business logic that we currently manage on the server to client-side JavaScript then:

- the user pays the price of downloading that additional code; 
- you’re writing client-side JavaScript even for those of your components that aren’t interactive; and
- you’re making _everything_ a custom element (which as Jim Neilsen has previously written [brings HTML semantics and accessibility challenges](https://blog.jim-nielsen.com/2021/custom-elements-without-js/)).

However maybe we can keep the JavaScript for our Web Component-based components really lightweight? I don’t know. For now I’m interested to just watch and learn.
