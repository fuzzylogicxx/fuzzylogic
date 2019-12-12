---
date: "2019-09-01T08:12:37.003Z"
title: "Animating the underlining of multi-line text"
description: "Cassie Evans shows us how to animate underline on a multi-line text by animating the background-size of a linear gradient background."
tags: [link, animation, css]
linkTarget: "https://codepen.io/cassie-codes/pen/rNNGdmw"
---
[Cassie Evans](https://twitter.com/cassiecodes) shows us how to combine `background–size`, a `linear-gradient` based `background-image` and a keyframe animation (all in HTML and CSS) for a lovely progressive underline effect on multi-line text.
---

Here’s the gist of it:

``` html
<h2>This is a multi-line spanning animated underline. This took an annoyingly long time to figure out.</h2>
```

``` css
body {
  padding: 40vh 30vw;
  font-family: cursive;
  text-align: left;
  font-size: 130%;  
}

h2 {
  line-height: 1.5;
  display: inline;
  background-image: linear-gradient(
        transparent 50%,
        #e1fffe 50%,
        #b0f8ff 85%,
        transparent 85%,
        transparent 100%
    );
    background-repeat: no-repeat;
    background-size: 0% 100%;
    animation: animatedBackground 2s cubic-bezier(0.645, 0.045, 0.355, 1) 0.5s forwards;
}

@keyframes animatedBackground {
    to {
        background-size: 100% 100%;
    }
}
```

Thanks, Cassie!

