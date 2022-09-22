---
date: 2022-09-22T09:34:23Z
title: 'Tabs: truth, fiction and practical measures'
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
Real tabbed interfaces

[https://inclusive-components.design/tabbed-interfaces/](https://inclusive-components.design/tabbed-interfaces/ "https://inclusive-components.design/tabbed-interfaces/")

[https://design-system.service.gov.uk/components/tabs/](https://design-system.service.gov.uk/components/tabs/ "https://design-system.service.gov.uk/components/tabs/")

Ours are just the “tabs” with no tab panels, and each “tab” generally points to _different pages_ rather than somewhere on the same page – i.e. they are a navigation menu made to look like a tabbed interface. 

I’m not happy with this from an affordance point of view. Naming and presenting something as one thing but then having it function differently (or use materials intended for another purpose) leads to usability problems and communication breakdowns. (Ref buttons and links, Lea and Léonie)

One real-life problem with our tabs is that they have (understandably) been engineered as if they are conventional tabs, however since the actual use case is often _navigation_ this implementation is inappropriate. 

We give each “tab” [the ARIA `tab` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role), which is defined as follows:

> The ARIA `tab` role indicates an interactive element inside a `tablist` that, when activated, displays its associated `tabpanel`.

But this isn’t true of our tabs – they have no corresponding `tabpanel`. They’re just navigation links. Our mismatch of including tabs-related ARIA for a non-tabs use case will do more harm than good. It’s an accessibility fail.

If content for one or more `tabpanel` is provided, apply the complicated ARIA attributes for proper tabs. If not, don’t. This means we allow consumers to either get a real tabbed interface, or simply create “a nav menu that looks like tabs” which doesn’t include inappropriate and harmful ARIA attributes. I don’t agree with the latter as a design approach, but that’s a conversation for another day!