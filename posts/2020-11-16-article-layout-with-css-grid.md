---
date: "2020-11-16T21:34:45.513Z"
title: "Article Layout with CSS Grid (on mastery.games)"
description: "Very clever article (with gutters) layout achieved using CSS Grid, minmax and a minimum of fuss"
tags: [link, cssgrid, layout, article, minmax, breakout]
linkTarget: "https://mastery.games/post/article-grid-layout/"
---
Very clever responsive `<article>` layout  (with gutters and breakout images) achieved using CSS Grid, `minmax()`, the `ch` unit and a minimum of fuss. It scales automatically from narrow to wide viewports with no `auto` margins, `max-width` or media query manual overrides in sight.

> For the blog post page (the page you're looking at right now) I wanted a mobile-friendly layout where the text was centered and readable, where the images/code examples are wide.
---

The gist of it is this:

<figure>

``` css
.post {
  display: grid;
  grid-template-columns:
    minmax(1.2rem, 1fr)
    minmax(auto, 57ch)
    minmax(1.2rem, 1fr);
}
```

</figure>

Simple and deadly.

I can potentially see this as a pattern, or [layout primitive](https://every-layout.dev/rudiments/composition/), rather than just as something you might use at the top-level of the page for overall layout. I’m looking forward to trying it out! 

(via [Ahmad Shadeed](https://mastery.games/post/article-grid-layout/))
