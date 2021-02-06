---
date: "2020-10-24T17:44:05.553Z"
title: "How-to: Create accessible forms - The A11Y Project"
description: "Five bite-sized and practical chunks of advice for creating accessible forms."
tags: [link, web, development, a11y, accessibility, focus, forms]
linkTarget: "https://www.a11yproject.com/posts/2020-09-19-how-to-write-accessible-forms/"
---
Here are five bite-sized and practical chunks of advice for creating accessible forms. 

1. Always label your inputs.
1. Highlight input elements on focus.
1. Break long forms into smaller sections/pages.
1. Provide error messages (rather than just colour-based indicators)
1. Avoid horizontal layout forms unless necessary.
---

I already apply some of these principles, but even within those I found some interesting takeaways. For example, the article advises that when labelling your inputs it’s better not to nest the input within a `<label>` because some assistive technologies (such as Dragon NaturallySpeaking) don’t support it.

I particularly like the idea of using CSS to make the input which has focus more obvious than it would be by relying solely on the text cursor (or _caret_).

<figure>

``` css
input:focus {
  outline: 2px solid royalblue;
  box-shadow: 1px 1px 8px 1px royalblue;
}
```

</figure> 

(via [@adactio](https://twitter.com/adactio))
