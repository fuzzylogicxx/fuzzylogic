---
date: 2022-09-22T09:34:23Z
title: 'Tabs: truth, fiction and practical measures'
description: ''
tags:
- entry
- javascript
- a11y
- tabs
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: false

---
My colleague Anda and I just had a good conversation about tabs, and specifically the company’s tabs component. I’ve mentioned before that our tabs are unconventional and potentially confusing, and Anda was interested to hear more.

## Conventional tabbed interfaces

Here are some great examples of _tabs_ components.

* [https://inclusive-components.design/tabbed-interfaces/](https://inclusive-components.design/tabbed-interfaces/ "https://inclusive-components.design/tabbed-interfaces/")
* [https://design-system.service.gov.uk/components/tabs/](https://design-system.service.gov.uk/components/tabs/ "https://design-system.service.gov.uk/components/tabs/")

It’s a device intended to improve content density. A same-page experience. Activating a tab reveals its corresponding tab panel. The whole thing is ideally progressively-enhanced, starting as a basic Table of Contents. There’s quite a lot of advanced semantics, state and interactivity under the hood.

## Faux tabs

But in our Design System at work, ours are currently just the “tabs” with no tab panels, and each “tab” generally points to _different pages_ rather than somewhere on the same page – i.e. it’s a navigation menu made to look like a tabbed interface. 

I’m not happy with this from an affordance point of view. Naming and presenting something as one thing but then having it function _differently_ leads to usability problems and communication breakdowns.

## Confused language causes problems

One real-life problem with our tabs is that they have been engineered as if they are conventional tabs, however since the actual use case is often _navigation_ this implementation is inappropriate. 

We currently give each “tab” [the ARIA `tab` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role), defined as follows:

> The ARIA `tab` role indicates an interactive element inside a `tablist` that, when activated, displays its associated `tabpanel`.

But _our tabs_ have no corresponding `tabpanel`; they don’t use JavaScript for a single-page experience balancing semantics, interactivity and state [as is conventional](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role#required_javascript_features). **They’re just navigation links.** And this mismatch of tabs-oriented ARIA within a non-tabs use case will do more harm than good. It’s an accessibility fail.

## A stop-gap solution

If content for one or more `tabpanel` is provided, apply the complicated ARIA attributes for proper tabs. If not, don’t. This means we allow component consumers to either create i) a real tabbed interface, or ii) “a nav menu that looks like tabs” (but without any inappropriate ARIA attributes). I don’t agree with the latter as a design approach, but that’s a conversation for another day!

## Tabs in the future

Some clever people involved with Open UI are using web components to explore how a useful `tabs` element could work if it were an HTML element. Check out [the Tabvengers’ spicy-sections component](https://github.com/tabvengers/spicy-sections. ). Again, this is based on the conventional expectation of tabs as a same-page experience for arranging content, rather than as a navigation menu. And I think it’d make sense to stay on the same path as the rest of the web.