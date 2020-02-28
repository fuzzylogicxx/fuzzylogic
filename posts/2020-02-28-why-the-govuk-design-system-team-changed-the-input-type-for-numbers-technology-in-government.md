---
date: "2020-02-28T12:28:46.652Z"
title: "Why the GOV.UK Design System team changed the input type for numbers (Technology in Government"
description: "GOV.UK recently moved away from using HTML input type “number” for asking users for numbers and now use input type “text” with appropriate attributes."
tags: [link, a11y, forms]
linkTarget: "https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/"
---
> Using `<input type="text" inputmode="numeric" pattern="[0-9]*">` (instead of `<input type="number") allows for a degree of separation between how the user enters data (“input mode”), what the browser expects the user input to contain (type equals number), and potentially how it tries to validate it.
---

An interesting post from the UK Government listing a host of usability and accessibility problems arising from using `<input type="number">`. 

Now that browser support for the `inputmode` attribute is sufficient, they have moved to `<input type="number" inputmode="numeric">`. 

I trust GOV.UK’s opinion and think I’ll follow suit. 
