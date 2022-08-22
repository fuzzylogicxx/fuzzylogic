---
date: 2022-08-21T15:00:31Z
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

---
Back in June I attended CSS Day in Amsterdam. One of my favourite talks was [The CSS Cascade – A Deep Dive](https://www.youtube.com/watch?v=zEPXyqj7pEA) by Bramus van Damme. Bramus covered everything we wanted to know about the cascade but were afraid to ask! This included an introduction to CSS Cascade Layers – another potentially game-changing CSS development.
---

I previously [enjoyed Stephanie Eckles’s article _Getting Started with CSS Cascade Layers_](https://fuzzylogic.me/posts/getting-started-with-css-cascade-layers-by-stephanie-eckles/) so my interest was already piqued. However seeing Bramus’s talk in person really helped bring home the practical benefits of CSS layers. For example, currently if we have the selectors `ul[class]` defined early in the “reset” section of our styles and `.nav` defined later in a “components” section, that “reset” selector would win due to its higher specificity. That’s not what we want – we want our component styles to override our global styles. This has previously led people to hack around the problem by adding extra specificity to the latter selector or by [wrapping `:where()` around the former](https://css-tricks.com/using-the-specificity-of-where-as-a-css-reset/) to decrease its specificity – neither of which are desirable. With layers we can do:

<figure>
  
``` css
@layer reset, components;
  
@layer reset {
  ul[class] {
    /* set margin to 0 here */
  }
}
  
@layer components {
  .nav {
    /* set custom margins here */
  }
}
```  
  
</figure>

And `.nav` gets that higher specificity that we want.

I also like that layers fit well with an [ITCSS](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528) approach.

## Taking layers for a spin

Cascade Layers are relatively newly-supported in browsers but pretty all-consuming in CSS terms to the extent that using them in a progressively-enhanced approach isn’t really an option. So I wouldn’t yet advocate using Layers on an important production website. However there’s nothing to stop me test-driving them on my personal site. Users on old browsers still get the essential content (although very few styles) and for this site, that’s good enough. So I’ve taken the plunge. 

And it’s working really well already! Recently while rewriting some CSS I found that if the top of my styles featured a reset which disabled margins on `h2` but I also wanted an h2 to take on margins when used within a [low-specificity flow utility](https://piccalil.li/quick-tip/flow-utility/), the reset style was winning – pretty frustrating. But when I moved my reset styles into a `reset` layer and my layout styles into a `layouts` layer with the layer order set as `reset, layouts` then the layout styles win! Really cool.
