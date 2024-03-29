---
date: 2021-12-04T09:14:53.000+00:00
title: Collected web accessibility guidelines, tips and tests
description: I’ve picked up lots of accessibility knowledge over years of developing websites. Here, I gather some key tips in one place as a useful reference.
tags:
- web
- a11y
- howto
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
---
At work, I’m sometimes asked accessibility questions or to provide guidelines. I’m with Anna Cook in considering myself an [accessibility advocate rather than an expert](https://twitter.com/annaecook/status/1468602342639431682) however I have picked up lots of tips and knowledge over many years of developing websites. So I thought it’d be useful to gather some general web accessibility tips and tests in one place as a useful reference.

Caveats and notes: 
1. this is a living document which I’ll expand over time; 
2. I’m standing on the shoulders of real experts and I list my [references](#references) at the foot of the article; and
3. if I’ve got anything wrong, please [let me know!](https://twitter.com/fuzzylogicx)
---

## Table of contents

* [If you only had 5 minutes](#if-you-only-had-5-minutes)
* [Content structure](#content-structure)
* [Semantic HTML and ARIA](#semantic-html-and-aria)
* [Favour native over custom components except where they have known issues](#favour-native-over-custom-components-except-where-they-have-known-issues)
* [Make custom components convey state accessibly](#make-custom-components-convey-state-accessibly)
* [Forms](#forms)
* [Links and buttons](#links-and-buttons)
* [Ensure keyboard support](#ensure-keyboard-support)
* [Content resizing](#content-resizing)
* [Better link text](#better-link-text)
* [Supporting high contrast mode](#supporting-high-contrast-mode)
* [Skip links](#skip-links)
* [Navigation and menus](#navigation-and-menus)
* [Modal dialogues](#modal-dialogues)

## If you only had 5 minutes

If someone had a web page and only had 5 minutes to find and tackle the lowest hanging fruit accessibility-wise, I’d probably echo [Jeremy Keith’s advice](https://skiptocontent.huxleydigital.co.uk/video/caring-about-the-world-wide-web-with-jeremy-keith/) to ensure that the page covers the following:

- uses heading elements sensibly
- uses landmarks (representing roles like `banner`, `navigation`, `main`, `contentinfo`)
- marks up forms sensibly (for example using labels and appropriate buttons)
- provides images with decent text alternatives

(Note: headings and landmarks are used by screen reader users to get a feel for the page then jump to areas of interest.)

Spending just 5 minutes would be bad, of course, and you shouldn’t do that. The point is that if pushed, the above give good bang-for-your-buck.

## Content structure

The page’s content should be well structured as this makes it easier to understand for all, especially people with reading and cognitive disabilities. 

It should consist of short sections of content preceded by clear headings. Use the appropriate heading level for the place in the page. Don’t use an inappropriate heading level to achieve a given appearance such as a smaller size. Instead use the appropriate heading element then use CSS to achieve your desired style.

It should employ lists where appropriate. It should place the most important content at the beginning of the page or section to give it prominence.

Check your page for any long passages of text with no structure. Ensure that sufficient prominence is given to the most important information and calls to action.

## Semantic HTML and ARIA

Apply ARIA carefully. [No ARIA is better than bad ARIA.](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/#x2-1-no-aria-is-better-than-bad-aria)

Using semantic HTML elements is preferable to bolting on semantics via attributes since the semantics are conveyed natively avoiding redundancy and duplication. As Bruce Lawson says, “Built-in beats bolt-on, bigly”. 

Create a small number of [landmarks](https://developer.mozilla.org/en-US/blog/aria-accessibility-html-landmark-roles/) using the appropriate HTML elements. 

For some landmark-generating elements it’s appropriate to bolster them with a label or _accessible name_. For example with `nav` and `aside`, i) there’s a decent chance there might be multiple on the page; and ii) each instance creates a landmark even when it’s nested within a deeper HTML element. So it’s helpful to distinguish each different landmark of the same type by using sensible accessible names otherwise you’d get multiple navigation menus all represented by the same “navigation” in the _Landmarks_ menu. In the case of the `section` element it _needs_ an acessible name in order for it to act as a `region` landmark. For all of these you can use `aria-labelledby` set to the `id` of an inner heading, or use `aria-label`.

Note that when using multiple `<header>` (or `footer`) elements on a page, where one and one only is a direct child of `body` while the others are used within `article` or similar elements, there’s perhaps less need to add custom accessible names. That’s because only a direct child of `body` will be treated as a landmark and the others won’t, therefore they won’t be butting against each other in a screen reader’s _Landmarks_ menu and need distinguished.

## Favour native over custom components except where they have known issues

Native components require very little work, are familiar to users, and are generally accessible by default. Custom components can be built to appear and behave as designers want, but require much more effort to build and are challenging to make accessible.

There are exceptions. Since the native options are flawed across browsers, accessibility experts recommend using custom solutions for: 
- form error field messages
- focus indicator styles

## Make custom components convey state accessibly

Now that you’re building a custom component you don’t get accessibility out of the box. Whether it’s a _Like_ button or a disclosure widget, you can’t rely on a visual change alone to convey a UI change to all users. You’ll need to use the right element (note – it often starts with a `button`) and then use ARIA to convey states such as _pressed_ or _expanded_ to screen reader users.

## Forms

Because in the industry form fields are often handled with JavaScript and not submitted, people sometimes question whether form fields should live inside a form (`<form>`). My answer is **yes**, and here’s why. 

### Using the form element improves usability and accessibility

Using a `<form>` provides additional semantics allowing additional accessibility. It helps assistive devices like screen readers better understand the content of the page and gives the person using them more meaningful information.

By putting form fields inside a form we also ensure we match user expectations. We support the functionality (such as the different ways of submitting a form) that users expect when presented with form fields. 

If you’re thinking “but what about form fields that don’t _look like_ form fields?” then you’ve entered the problem territory of “deceptive user interfaces” – the situation where perceived affordances don’t match actual functionality, which causes confusion for some people. This is to be avoided. We shouldn’t use form fields (nor a `<form>`) when they are _not_ appropriate. A checkbox, radio button, or select menu is meant to _gather information_. So if your goal is instead [to let the user manipulate the current view, use a `button` rather than checkboxes or radio buttons](https://fuzzylogic.me/posts/2022-07-15-perceived-affordances-and-the-functionality-mismatch-by-leonie-watson/).

References: 
- [Why use a form element when submitting fields with JavaScript](https://gomakethings.com/why-use-a-form-element-when-submitting-fields-with-javascript/)
- [Lea Verou and Leonie Watson’s discussion regarding Toggles](https://fuzzylogic.me/posts/2022-07-15-perceived-affordances-and-the-functionality-mismatch-by-leonie-watson/)
- [My conversation about forms with accessibility expert Adrian Roselli](https://fuzzylogic.me/posts/2022-07-15-perceived-affordances-and-the-functionality-mismatch-by-leonie-watson/#update-july-19%2F7%2F22)

### Using the form element simplifies your JavaScript for event handling

Using the `form` element can also make it easier for you to meet user expectations in your JS-powered experience. This is because it gives you a single element (`form`) and event combination that allows listening to _multiple_ interactions. With a form element you can add a listener for the `submit()` event. This event fires automatically in response to the various ways users expect to submit a form, including pressing <kbd>enter</kbd> inside a field.

## Anchors and buttons

When you need to let the user navigate to another page (or part of a page) or download a file, use an anchor element.

For ea you need to let the user trigger an action such as copying to clipboard, launching a modal or submitting a form, use a button element.

Anchors should include an `href` attribute otherwise the browser will treat it like a non-interactive element. This means the link will not be included in the expected focus order and will not present a pointer to mouse users like it should. These days there is no remaining use case for an anchor without an `href`. We no longer need [named anchors](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#name) to create link-target locations within the page because we can use the `id` attribute (on any element) for that. And if you want an interactive element that does not link somewhere, you should use `button`.

Do not remove the focus outline from links and buttons in CSS, unless it’s to provide a better version.

Ensure you always give links and buttons an accessible name, even when they use icons rather than text. This might be through visually hidden text or perhaps using an ARIA-related attribute.

## Ensure keyboard support

Web pages need to support those who navigate the page by keyboard.

Use the tab key to navigate your page and ensure that you can reach all actionable controls such as links, buttons and form controls. Press the enter key or space bar to activate each control. 

If during your test any actionable control is skipped, receives focus in an illogical order, or you cannot see where the focus is at any time, then keyboard support is not properly implemented.

## Content resizing

Try zooming your page up to 400%. In Chrome, Zoom is available from the kebab menu at the top-right, or by holding down command with plus or minus. 

Content must resize and be available and legible. Everything should reflow.

Relative font settings and responsive design techniques are helpful in effectively handling this requirement. 

Relatedly, setting font-sizes in `px` should be avoided because although a user can override the “fixed-ness” with zoom, it breaks the user’s ability to choose a larger or smaller _default font size_ (which users often prefer over having to zoom every single page).

## Better link text

Blind and visually impaired users use a [screen reader](https://en.wikipedia.org/wiki/Screen_reader) to browse web pages, and screen readers provide user-friendly access to all the links on the page via a Links menu. When links are encountered in that context, link text like “Click here” and “Read more” are useless. 

Check your web page to ensure that links clearly describe the content they link to when read out of context.

Better link text also improves the flow and clarity of your content and so improves the experience for everyone.

## Supporting high contrast mode

Some people find it easier to read content when it’s in a particular colour against a specific background colour. Operating systems provide options to allow users to configure this to their preference. Websites must support support the user’s ability to apply this.

On a Windows computer go to Settings > Ease of access and turn on High contrast mode. On macOS go to System preferences > Accessibility settings > Display and select “Invert colours”.

Having changed the contrast, check that your web page’s content is fully visible and understandable, that images are still visible and that buttons are still discernible.

## Skip links

Websites should provide a “Skip to content” link because this provides an important accessibility aid to keyboard users and those who use specialised input devices. For these users, having to step through (typically via the tab key) all of the navigation links on every page would be tiring and frustrating. Providing a skip link allows them to bypass the navigation and skip to the page’s main content.

To test that a website contains a skip link, visit a page then press the tab key and the skip link should appear. Then activate it using the enter key and check that focus moves to the main content area. Press tab again to ensure that focus moves to the first actionable element in the main content.

## Navigation and menus

When developing a collapsible menu, place your menu `<button>` _within_ your `<nav>` element and hide the inner list rather than hiding the `<nav>` element itself. That way, we are not obscuring from Assistive Technologies the fact that a navigation still exists. ATs can still access the nav via landmark navigation. This is important because landmark discovery is one of the fundamental ways AT users scan, determine and navigate a site’s structure.

## Modal dialogues

[You probably don’t want to set the modal’s heading as an `<h1>`](https://stackoverflow.com/a/38467898). It likely displays content that exists on the page (which already has an `<h1>`) at a lower level of the document hierarchy.

## References

* [Using HTML landmark roles to improve accessibility](https://developer.mozilla.org/en-US/blog/aria-accessibility-html-landmark-roles/) MDN article. And [Adrian R’s suggestions for additions](https://github.com/orgs/mdn/discussions/383)
* [Navigation (landmark) role, on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role)
* Tetralogical’s [Quick Accessibility Tests](https://www.youtube.com/playlist?list=PLTqm2yVMMUKWTr9XWdW5hJ9tk512Ow0SE) YouTube playlist
* [Basic accessibility mistakes I often see in audits](https://gomakethings.com/basic-accessibility-mistakes-i-often-see-in-audits/) by Chris Ferdinandi
* Sara Soueidan’s video tutorial [Practical tips for building more accessible front-ends](https://aneventapart.com/news/post/practical-tips-for-building-more-accessible-front-ends)
* Adrian Roselli’s [Responsive type and zoom](https://adrianroselli.com/2019/12/responsive-type-and-zoom.html)
* Heydon Pickering’s tweet about [buttons in navs](https://twitter.com/heydonworks/status/766948134169620480) and Scott O’Hara’s follow up article [Landmark Discoverability](https://www.scottohara.me/blog/2016/08/10/discovering-landmarks.html)
* Tetralogical’s [Foundations: native versus custom components](https://tetralogical.com/blog/2022/11/08/foundations-native-versus-custom-components/)
