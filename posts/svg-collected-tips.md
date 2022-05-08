---
date: 2022-03-09T17:08:12Z
title: 'SVG: collected tips'
description: I find some SVG concepts confusing so have gathered some useful tips
tags:
- svg
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
SVG is an amazing technology which I regularly use for icons and occasionally for logos and illustrations. I’ve also dipped my toe into animated SVG. But if I’m honest I still find some SVG concepts confusing so I’ve gathered some useful tips here for future reference. Note: this is a living document which I’ll expand over time.
---

## Table of contents

* [Canvas, viewport and viewbox](#canvas-viewport-and-viewbox)

## Canvas, viewport and viewBox

Let’s break down the key elements of the SVG coordinate system.

### Canvas

The canvas is the area where the SVG content is drawn. It’s infinite in both dimensions therefore the SVG can be any size. 

### Viewport

Although the canvas is infinite, the SVG is rendered on the screen relative to a finite region known as the viewport. Areas of the SVG that lie beyond the boundaries of the viewport are not visible. This is similar to a browser viewport. On a long page you don’t see all the content; just a portion of it.

Specify the viewport size by giving your `<svg>` element a width and height, e.g.:

<figure>

```
<svg width="600" height="400">
  <!-- svg content -->
</svg>
```
  
</figure>

We _could_ specify units (such as `em` or `px`) but don’t need to. Unitless values are regarded as being set in _user space_ using _user units_ which effectively equate to pixels so our example above renders a 600px by 400px viewport.

The width of the viewport can also be set in CSS. Setting `width: 100%` makes the SVG viewport fluid in a given container.

### ViewBox

The _viewport coordinate system_ starts at the top left corner of the viewport at point (0, 0). The _user coordinate system_ is by default identical to the that of the viewport however it can be modified using the `viewBox` attribute.
 
`viewBox` takes a value in the format: `x y width height`. The first two values set the upper-left corner of the viewbox and the second two its dimensions.

Specifying a smaller viewbox than viewport results in cropping the graphic to those dimensions and then zooming it in i.e. scaling it up so that it fills the entire viewport area.



## References

* [Understanding SVG Coordinate Systems](https://www.sarasoueidan.com/blog/svg-coordinate-systems/) by Sara Soueidan