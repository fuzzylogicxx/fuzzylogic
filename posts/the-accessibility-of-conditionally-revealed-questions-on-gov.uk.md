---
date: 2021-09-22T10:21:20Z
title: The accessibility of conditionally revealed questions (on GOV.UK)
description: GOV.UK’s research on the conditional reveal pattern in forms suggests
  we Keep It Simple
tags:
- forms
- development
- web
- a11y
- link
noteWithTitle: false
linkTarget: https://accessibility.blog.gov.uk/2021/09/21/an-update-on-the-accessibility-of-conditionally-revealed-questions/
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
Here’s something to keep in mind when designing and developing forms. [GOV.UK](http://gov.uk/)’s accessibility team found last year that there are some accessibility issues with the “conditional reveal” pattern, i.e. when selecting a particular radio button causes more inputs to be revealed.
---

[The full background story](https://accessibility.blog.gov.uk/2021/09/21/an-update-on-the-accessibility-of-conditionally-revealed-questions/) is really interesting but the main headline seems to be: _Keep it simple._

1. Don’t reveal any more than a _single input_, otherwise the revealed section should not be in a show-and-hide but rather in its own form in the next step of the process.
2. Conditionally show _questions only_ (i.e. another form input such as _Email address_)—do not show or hide anything that’s not a question.

Doing otherwise causes some users confusion making it difficult for them to complete the form. 

See also the _Conditionally revealing a related question_ section on [the Radios component on the GDS Design System](https://design-system.service.gov.uk/components/radios/)