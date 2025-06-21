---
date: "2022-10-02T00:03:28.909Z"
title: "Better accessible names | hidde.blog"
description: "Hidde tells us how to give more useful context to Assistive Technologies"
tags: [link, a11y]
linkTarget: "https://hidde.blog/better-accessible-names/"
---
Accessible names are used by assistive technologies to refer to elements on a web page. Hidde tells us how to word them so that they are more useful.

> Because of how we use accessible names, we want to keep them functional and avoid naming controls after what they look like. Ideally, you do this in the imperative form, that makes it easiest to quickly grasp what a thing is going to do.
---

My summary of Hidde’s top tips is:

- Name after function rather than form (“Open navigation” over “Hamburger”)
- Put the most unique part first as this makes it more easy to distinguish between elements (so “Midnight Marauders - Album” rather than “Album - Midnight Marauders”)
- Be concise – keep a name to the most important 1-3 words
- No roles as part of the name (for example don’t include the word ‘button’ or `nav`. The browser already handles this part so it’d be redundant and annoying)
- Start names with a capital letter and don't end with a full stop, because a name is not a sentence
- Avoid ARIA if you can just use good element text content
