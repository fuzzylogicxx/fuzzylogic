---
date: 2022-08-12T15:00:31Z
title: Experimenting with CSS cascade layers
description: 'After enjoying Bramus van Damme’s talk at CSS Day I’ve been trying CSS cascade layers on my personal site'
tags: [entry, css, cascade]
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: true

---
Back in June I attended CSS Day in Amsterdam. One of my favourite talks was [The CSS Cascade – A Deep Dive](https://www.youtube.com/watch?v=zEPXyqj7pEA) by Bramus van Damme. Bramus covered everything we wanted to know about the cascade but were afraid to ask! This included an introduction to CSS Cascade Layers – another potentially game-changing CSS development.
---

I previously [enjoyed Stephanie Eckles’s article _Getting Started with CSS Cascade Layers_](https://fuzzylogic.me/posts/getting-started-with-css-cascade-layers-by-stephanie-eckles/) so my interest was already piqued. However seeing Bramus’s talk in person really helped bring home the practical benefits of CSS layers. For example, in a battle between the selectors `ul[class]` defined early in the “reset” section of our styles and `.nav` defined later in our “components” section, `ul[class]` would win… which is not what we want. This has previously led people to hack around the problem by adding extra specificity to the latter selector or by adding `:where` to the former to decrease its specificity, neither of which are desirable. With layers we can do:

<figure>
  
``` css
@layer reset {

}
```  
  
</figure>

Miriam Suzanne’s guide [https://css-tricks.com/css-cascade-layers/](https://css-tricks.com/css-cascade-layers/ "https://css-tricks.com/css-cascade-layers/")
Mention that it’s safe to do it on my personal site



Link to my existing bookmark (Steph Eckles)

Mention ITCSS



Working already! And without the need for hard-to-read [specificity hacks](https://css-tricks.com/using-the-specificity-of-where-as-a-css-reset/) in your reset like setting `:where(h1)`. If you set disable margins on your `h2` in your reset styles at the top but then have an h2 in a low-specificity layout like a flow utility and _want_ there to be a margin, normally the reset style would win which would be frustrating. But if you put your reset styles in a `reset` layer and your layout styles in a `layouts` layer and set the layers order as `reset, layouts` then the layout styles win! Really cool.
