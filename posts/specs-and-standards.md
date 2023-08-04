---
date: 2023-08-04T09:09:24.000+00:00
title: Specs and standards
description: A handy reference for the key front-end standards
tags:
- entry
- web
- spec
- standard
draft: true
---
Something Adrian Roselli said recently has stuck with me. The gist was that when developers need definitive guidance they shouldn’t treat MDN as gospel, but rather refer to the proper specifications for web standards.
---

## HTML
[The HTML Living Standard](https://html.spec.whatwg.org/multipage/)

The [_Edition for Web Developers_](https://html.spec.whatwg.org/dev/) version looks handy. It seems to be streamlined and you can also use the forward-slash key to jump straight into a search then type something like “popover” to access that specification quickly.

## WCAG Accessibility 

[How to Meet WCAG (Quick Reference)](https://www.w3.org/WAI/WCAG21/quickref/#info-and-relationships)

Adrian referenced / linked to this in one of his blog articles.

## ARIA
[W3C’s ARIA in HTML document](https://www.w3.org/TR/html-aria/)

Adrian will quote or reference this when talking about roles, landmarks and the like… for example when [he tweeted about developers using `section`](https://twitter.com/aardrian/status/1587524667325177864).

Note: it (somewhat confusingly) describes itself as a W3C _recommendation_. But despite that naming it should be regarded as definitive guidance. That description links to an explainer of W3C recommendation confirming that these are specifications which have been endorsed by W3C, that software manufacturers should implement, and that may be cited as W3C standards. My understanding is that if a specification is at an earlier stage it will be described as a W3C proposed recommendation.





Miscellaneous
How useful is MDN?
[Adrian re. were MDN references WHATWG HTML:](https://adrianroselli.com/2018/09/hack-on-mdn.html)

> MDN typically references WHATWG HTML, which often gets accessibility… well, not quite right. Part of my efforts included updating the accessibility content to point to the W3C specs wherever appropriate.
> 
