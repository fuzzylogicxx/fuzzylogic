---
date: "2022-07-15T11:29:59.657Z"
title: "Perceived affordances and the functionality mismatch (by Léonie Watson)"
description: "Léonie tackles the prickly subject of “element re-purposing” in web development"
tags: [link, a11y, buttons, affordance, repurposing, ]
linkTarget: "https://tink.uk/perceived-affordances-and-the-functionality-mismatch/"
---
Léonie tackles the prickly subject of “element re-purposing” in web development. This post follows a [fantastic Twitter exchange started by Lea Verou](https://twitter.com/LeaVerou/status/1545712667515654144) regarding whether the common visual design request for “adjacent but mututally exclusive buttons” should be built as radio buttons or using `<button>` elements.

> Using one element or set of elements (usually because of their functionality) and styling them to look like something else is a common pattern […but…] it creates a mismatch between the actions people expect they can take and the ones they actually can.
---

Relatedly, [Lea](https://twitter.com/LeaVerou) has also gathered her post-discussion thoughts and decisions into a blog post [What is the best way to mark up an exclusive button group?](https://lea.verou.me/2022/07/button-group/) _and_ shared a new [`button-group` web component](https://github.com/LeaVerou/nudeforms/tree/main/button-group)!

Meanwhile, Léonie already has a [theme-toggle web component](https://github.com/LJWatson/website-tink-eleventy/search?q=theme-toggle) on her personal website which demonstrates the use of buttons and `aria-pressed`.

Thank you so much, Lea and Léonie.

[(via @LeonieWatson)](https://twitter.com/LeonieWatson/status/1547651790115520521)

## Update July 19/7/22

I just had a twitter conversation with Adrian Roselli where I suggested that the reasons for developers considering radio inputs over buttons for Lea’s use case might be more nuanced than simply misunderstanding HTML. I’m not sure we agreed on that one in the end, however Adrian shared [some helpful heuristics when choosing betweeen JS-powered buttons and forms](https://twitter.com/aardrian/status/1549365053580890112):

> A checkbox, radio button, select menu are meant to gather information. The submit button sends the form (whether get, post, or an AJAX call). A button (non-submit) causes a change on the page, such as toggling a control, showing or hiding something, etc. Different context/use.

> I think it would help to think of form fields as for *forms*. Forms that users intentionally submit (no matter if processed client- or server-side). Forms that gather info. Buttons that have states (expanded, pressed, etc) are for manipulation of the current view.

Takeaways: 
- Pick the HTML solution that is generally intended for your use case.
- Use a form if you’re gathering information but if you’re not, don’t. There will be exceptions like “filter forms” but that’s an edge case and most forms are not like that. 
- Forms are ideally things that users intentionally submit, via a submit button. This helps rule out “clever forms” as an option. 
- Use a button to cause a change on, or manipulate, the current page.
