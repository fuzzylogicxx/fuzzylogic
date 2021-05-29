---
title: "Web Components: gathering my thoughts"
description: Taking stock of Web Components and what’s the best approach for me
date: 2021-05-29T21:54:26.217Z
mainImage.isAnchor: false
draft: true
---
https://cloudfour.com/thinks/mighty-morphin-web-components/
Takeaways from this: 

* instead of the `template` approach Max used, you can `render` the component HTML in the JS for the WC. I’m undecided as to which I prefer and the relative benefits of each. In both cases the HTML (like the JS and CSS) is encapsulated, I think.
* Tyler is reinforcing something I‘ve learned from Max’s article which is that *HTML is the API*. So in Rails I do `render(FooComponent.new())` but with a WC it’s `<c4-input value="..."></c4-input>` (although I’d prefer including some HTML rather than an empty element, so there’s a pre-enhancement baseline)
- I like this on one of the reasons to go for WC: “Although these takeaways apply conceptually to any component-based JavaScript framework, for some reason it feels more real to me for honest-to-goodness in-browser custom elements than it does for proprietary abstractions that eventually boil down to divs and spans. Perhaps that’s my web standards bias showing!”