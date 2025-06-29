---
date: 2019-07-03T14:18:26Z
title: Accessible drop-down navigation, 3 ways
description: ''
tags:
- development
- web
- javascript
- css
- html
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
draft: true

---
tldr; 

Currently I think Adrian Roselli’s is the best compromise of Heydon’s suggested semantics (i.e. a nav element containing nested lists of links) but with the addition of button-based-menu-toggling which is sound a11y-wise. 

If I felt it was better (or as good but with better JS or more flexible) I could use Chris F’s houdini for the button rather than Adrian‘s button.

Onto this approach I’d add in-page TOC links to both the section index page and each of the pages within, per Heydon’s advice and gov.uk.

The last link in the chain for me is to see if it’s (ever) OK to have hover-based submenu toggling and if it is, how best to implement.

Full details:

Heydon (https://inclusive-components.design/menus-menu-buttons/): 

makes the distinction between i) TOC-style navigation, ii) "hamburger button"-based menu toggling; and iii) true menus i.e. for choosing actions from a list of controls.

i) a navigation submenu (or dropdown) is a table of contents rather than a true menu.

ii) semantically, they are a nested list of links. Therefore the top-level item should be a link;

iii) ARIA menus are not designated for navigation but for (Javascript-driven) application behaviour. He gives the example of choosing difficulty level in a quiz. 

iv) hoverable submenu systems ain’t so good for touch devices; 

v) since touch device users will tap the top-level link (and we don’t want to preventDefault because, as above, the aria stuff we’d need to script in is unexpected in the context of links), in-page TOCs on the target page are a great idea (as used by gov.uk https://www.gov.uk/guidance/content-design/organising-and-grouping-content-on-gov-uk)

vii) the TOC could be to in-page links or to separate pages with themselves include the TOCs at the top.

\** He doesn’t go on to demonstrate the HTML, CSS and JS required for a on-hover / on-focus submenu pattern. He only demonstrates a hamburger (button) menu pattern which is closer to a real menu since it “it has the purpose of toggling the availability of a menu on click”.

1) My first approach: using Chris F’s Houdini with my additions. Premise: in JS-enabled contexts the top-level menu link becomes a button and tap/click reveals submenu. See https://www.wonderworldsoftplay.co.uk/. Start by setting the relevant top-level nav item as an anchor pointing to an index / section TOC page (create the index page if you haven’t already) so that without JS we’re OK. Add the sub-menu list underneath, and give it the “hidden” attribute. Issues: semantically would prefer a link at top-level rather than a button. Nice-to-have: i) dropdown icon; ii) tap/click anywhere to make submenu disappear. 

2) Adrian Roselli link with arrow-based button next to it. So i) he wants the ability to use link or dropdown; and ii) it’s activated by tap/click rather than hover) http://adrianroselli.com/2019/06/link-disclosure-widget-navigation.html

3) https://marcus.io/blog/menu-or-not. Like 

Additional Notes: don’t build a navigation submenu with details/summary. (Scott O’Hara reply to Chris F)