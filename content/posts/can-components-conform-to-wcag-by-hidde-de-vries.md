---
title: Can components conform to WCAG? by Hidde de Vries
description: "Hidde explores whether it’s sensible to regard isolated components
  as accessible "
noteWithTitle: false
linkTarget: https://hidde.blog/component-conformance/
date: 2025-08-23T21:28
tags:
  - link
  - accessibility
  - designsystems
---
Hidde is, like me, both an “accessibility nerd” and “a components enthusiast”. So it’s interesting to see him tackle whether it’s sensible for design systems – even really good ones – to “promise accessibility”.

> We should definitely test how accessible components are and document what they can and can't contribute to a website's accessibility. And WCAG requirements can help with this. However, I think claiming WCAG conformance about pages or sets of pages, as we do today, approaches it at the right level. I don't think we should want to claim conformity of components by themselves.

He goes on to say:

> There's a real risk in overpromising the value of a component if we say it is accessible or conforms to some accessible standard. It could make people believe that they no longer need to worry about accessibility once they use or buy the component. That creates the wrong expectations: accessibility is a continuous process. Like we want to always iterate on user experience, we want to always iterate on accessibility.

Here are my main takeaways.

<!-- excerpt -->

Yes, we can optimise components for accessibility and that is a very worthwhile exercise. By doing so we can front-load a lot of very useful work. If teams use those components on their pages they’ll save themselves some complex, time-consuming and easy-to-get-wrong accessibility-related work.

But:

* WCAG accessibility conformance measures pages not components – the overall interface or process the user interacts with.
* making a page accessible requires more than relying on components alone
* a component that’s “accessible in isolation” can be made inaccessible by the content you use in it, the way you combine it with other UI elements and the  context you put it into
* …so page authors can delegate some accessibility responsibility to the components they use, but final responsibility for the page lies with them
