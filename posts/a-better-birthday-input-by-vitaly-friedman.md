---
date: 2022-05-27T19:11:33Z
title: A better birthday input, by Vitaly Friedman
description: A nice explanation of why we should approach UI for dates the user knows
  differently from that for dates the user will choose
tags:
- link
- a11y
- forms
- UX
- dates
noteWithTitle: false
linkTarget: https://mailchi.mp/smashingmagazine.com/your-upcoming-ux-training-with-vitaly-friedman-final-details-1133905
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
I recently signed up to Vitaly from Smashing Mag’s _Smart Interface Design Patterns_ newsletter. This latest edition regarding “date of birth” inputs was interesting, and well timed as my work colleagues and I are about to revisit our form patterns. It’s a nice explainer on why we should approach UI for dates the user _knows_ differently from UI for dates the user will _choose_.
---

Vitaly recommends that when asking the user for a very specific date that they already know without needing to consult a calendar, drop-downs and calendar look-ups are unnecessary. And avoiding them is probably ideal, because `<input type=date>` and `<select>` based interfaces have some usability and accessibility kinks, as do many date-picker libraries.

It’s better to rely on three simple, adjacent _text input_ fields with a label above each field. See [GOV.UK’s Date input component](https://design-system.service.gov.uk/components/date-input/) for a great example.

Date pickers should only be required when you’re asking for a date that the user will _choose_ (say, booking a holiday or appointment) rather than one they’ll _know_. Vitaly doesn’t recommend a date picker, but I reckon the [date-picker web component](https://github.com/duetds/date-picker) from the clever folks behind the Duet Design System could be a good option.

Oh, and this also reminds me that I need to get the finger out and pick up a copy of Adam Silver’s [Form Design Patterns](https://formdesignpatterns.com/).
