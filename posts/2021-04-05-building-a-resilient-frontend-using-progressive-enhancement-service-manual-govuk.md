---
date: "2021-04-05T12:06:45.369Z"
title: "Building a resilient frontend using progressive enhancement - Service Manual - GOV.UK"
description: "The BBCâs guidance on developing using progressive enhancement is pretty great in all departments"
tags: [link, govuk, progressiveenhancement, principles]
linkTarget: "https://www.gov.uk/service-manual/technology/using-progressive-enhancement"
---
GOV.UKâs guidance on developing using progressive enhancement is pretty great in all departments. It begins by recommending:

> you should start by making your page work with just HTML, before adding anything else like Cascading Style Sheets (CSS) and JavaScript. This is because HTML is the most resilient layer. If the HTML fails thereâs no web page. Should the CSS or JavaScript fail, the HTML will still render correctly.
---

I particularly like the section where they address the misconception that a resilient baseline is only required in places where the user has explicitly disabled JavaScript.

> You should not assume the reason for designing a service that works without CSS or JavaScript is because a user chooses to switch these off.

As the reasons they go on to list illustrate, a user turning JavaScript off explicitly is probably the least likely of a range of reasons why extra layers on top of HTML can fail.

Relatedly, Iâve often found that [Everyone has JavaScript, right?](https://kryogenix.org/code/browser/everyonehasjs.html) serves as a great go-to reference for these sorts of conversations around resilience.