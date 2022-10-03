---
date: "2020-10-02T13:49:48.003Z"
title: "A Guide To The State Of Print Stylesheets In 2018 - Smashing Magazine"
description: "Rachel Andrew explains how to write CSS for a nicely optimised printed page that uses a minimum of ink and paper and ensures that content is easy to read"
tags: [link, print, css, development, mediaqueries, designsystems]
linkTarget: "https://www.smashingmagazine.com/2018/05/print-stylesheets-in-2018/"
---
Rachel Andrew explains how to write CSS for a nicely optimised printed page that uses a minimum of ink and paper and ensures that content is easy to read.
---

I really like the section on Workflow that compares the options of 
1. organising your print styles as a separate stylesheet loaded via a `<link>` in the `<head>` (this is the “traditional” approach); versus
2. using `@media print {}` in your main styles, which opens up the opportunity to locate each component’s print styles beside its main styles.

As Rachel notes, the first option might feel tidy (and keeping print styles separate reduces the size of your main stylesheet) however on larger sites this approach can lead to print styles being “out of sight, out of mind” and poorly maintained.

I think there will always be a need for 80% global print styles, supplemented by a sprinkling of component-specific print styles (and _maybe_ even the odd utility class). It’s just a case of how you organise this. 

I had an idea that you could maybe put the _global_ print styles in a separate sheet and locate the _component styles_ beside components in the main stylesheet however because we tend to want global print styles to _add to_ and override main styles you’d want the print_globals file coming after the main styles, but that then screws up the order of the component-specific print styles. When [`@layers` with `<link>` is supported](https://css-tricks.com/css-cascade-layers/#aa-layering-entire-stylesheets-with-import-or-link) perhaps this could all work! Until then, the future of print CSS for large design systems is perhaps Option 2: colocate print styles with screen styles.
