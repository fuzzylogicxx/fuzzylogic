---
date: 2023-01-15T21:59:57Z
title: Live regions
description: ''
tags: []
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: true

---
Does your page include a JavaScript-powered feature which results in new (or updated) content appearing? Do you want to ensure all users, regardless of abilities and browsing preferences, are made aware?

If the feature is not a match for another specific pattern such as a modal dialogue or disclosure widget then we need an alternative approach. 

From Form Patterns by Adam Silver:

Screen readers will normally only announce content when it is focused, but live regions announce their content when it changes. This means we can communicate to screen reader users without asking them to leave their current location.

Examples 

A dynamic character count (like when writing a tweet). Users can continue to type into the textarea and the live region will announce changes.

    <div role="status" aria-live="polite">You have 100 characters remaining.</div>”

Note: might not need both role=status AND aria-live="polite”. Check this on MDN or similar.

Autocomplete. As the menu is populated with options matching what the user types, we’ll also populate a live region div with how many results are available; for example, “13 results available. With this information at hand, users can continue typing to narrow the results further, or they can select a suggestion from the menu. The feedback is only useful to screen reader users, so it’s hidden with visually-hidden. Sighted users will see the suggestions appear in the menu as they type.

    <div aria-live="polite" role="status" class="visually-hidden">13 results available.</div>