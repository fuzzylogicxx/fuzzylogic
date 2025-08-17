---
title: "Explaining why you should use a button to launch a dialogue "
description: bob
noteWithTitle: false
date:
  ? "{ now }"
---
[I’ve explained before that it should be a button](https://fuzzylogic.me/posts/should-i-use-a-button-or-a-link/).

I got into a wee bit of debate, which at first I found frustrating. It seemed that my colleague didn’t want to just accept that it’s a good idea to use the right HTML element for the job and that this is a heuristic that will save you a lot of time and protect your users. But as I wrote about it, and thought about it, and importantly re-read their comments, I realised that really they had good intentions and were more concerned about resilience than anything else. 

The industry doesn’t just use dialogues for confirmation prompts. It also uses them to contain much more complicated content, such as form for adding a user or some other entity.

In such cases the dialogue is really doing the job of a page. Engineers might feel it’s appropriate or necessary to give it the powers and back-end of a typical page via a dedicated MVC set-up including a controller action and template partial, etc. 

They might have some good intentions regarding resilience and progressive enhancement and like the idea of a using a link to launch the dialogue because they can set its \`href\` to point at the “page URL” of the dialogue content so that if JavaScript fails the link takes the user to that separate page rather than launching the dialogue and they can still fill out the form there.

Copy the appendix from my work doc.

**Miscallaneous other notes, some of which I can ditch cos the appendix covers most of this better:**

If you make it an anchor, you are giving users (and their tech) the expectation that it will work like an anchor. That encompasses conventions for: how it can be used; what it will do; and what they’ll be able to do immediately after using it. There’s masses of detail in each of those aspects… and those details are fundamentally different for anchors than for buttons. So you’re providing the range of expectations for an anchor however you won’t make good on those expectations because you’re making it do something different. So, you’re creating a confusing mismatch between the expectations you’ve given and the result you’ve delivered.

While `<button>` is purpose-built to perform an action, links (i.e. `<a href>`) are for taking you places.

So, it’s important to firstly establish that 1) based on its purpose the button element is the appropriate choice for launching a dialogue; and also 2) based on its purpose, anchor is not appropriate. That’s two compelling arguments for using button not link to trigger a dialogue.

We could stop there. The practice of “use the HTML element intended for the job you’re doing” is not only important for good development, but is also a heuristic that avoids us having to consider all the complex underlying details, since those have been taken care of for us. But let’s get into some of that.

HTML elements (especially critical ones like button and anchor) have all sorts of characteristics relating to accessibility and usage behaviour that make them fit for their purpose. And those are so old and well-known that users expect them to behave that way. (Take a link: it implies (in many ways) that clicking it will take you to a different location – either another page, or a different spot on the current one.)

Second general point: when you don’t use the right element, and do use the wrong element unconventionally, things go wrong for users. That’s because when you present users with element X, they’ll have the expectation that it will work like element X. When it doesn’t, you’ve broken their expectations and patterns.

Confusion before, during and after.

It’s not just purpose that differs between elements. They also: are operable in unique ways (keyboard operation, mouse inc right-click operation, assistive tech); – convey “what they are” to users in unique ways (announced role, affordances inc visual and behavioural cues)

Second perspective: operability. These are different for the two elements.

Third perspective: semantics. HTML elements communicate “what they are”. The button and anchor elements have different roles: button and link respectively. These are communicated to browsers.  Semantic information is vitally important for some users. We communicate: meaning, purpose, and behaviour.

\*During\*: the user will get a link’s standard right-click options (bookmarking the URL, open in new window, etc) which feel inappropriate and mismatched when the user’s likely experience is a launched dialogue, and also when that’s FA’s target experience and the full page version is a fallback

After* clicking a link that actually does not take you somewhere a user might be confused because: URL has not changed; clicking the back button won’t take them back to where it normally would after following a real link. Generally you might expect to be in one situation and therefore have available the related tools and shortcuts particular set of screen reader shortcuts to work, but they don’t.

It’s worth highlighting that the OpenUI Collective in their invoker commands work back this up. They provided support on button alone because it’s the appropriate element. And they write about how <a> is the wrong element for the job of launching a dialogue. (<https://open-ui.org/components/invokers.explainer/#why-is-commandcommandfor-limited-to-buttons>) (start from the sentence above _What about adding Invoker defaults for <a>?_). Relatedly, when you look at the advice given about either dialogue launching, or buttons vs links, from the trusted people (OpenUI, Sara, Hidde, Adrian R, even MDN’s dialog page) you will find that they use a button every time. They think hard about this stuff and test harder, so that’s telling.

I can understand two reasons for wanting to use anchors to launch modals. Firstly resilience: a link will work when JS is unavailable, for whatever reason. (assuming the linked resource is available and usable as a dedicated web page). But bear in mind that this generally won’t be the user’s experience. Generally JS will be available so the trigger element will launch a <dialog> and for all the reasons listed above, button is appropriate for that and anchor is not. (*We could consider a progressive enhancement approach which provides an anchor initially then our JS replaces that with a button. That’s doable but would require smart work, including avoiding browser reflows and layout shifts. I strongly recommend we focus on setting the foundational layer of accessibility and usability via appropriate HTML before considering this). The second reason I can see for using an anchor as the modal trigger is if folks feel it’s easy for engineers. However, we can provide components and guidance for the “trigger” element, so that we “make the right thing the easy thing”. The component would attach the stimulus for listening to button activation then launching the modal, so engineers would not be DIYing that.

Relevant links (aside from ones mentioned above): <https://open-ui.org/components/invokers.explainer/#why-is-commandcommandfor-limited-to-buttons>, <https://stackoverflow.com/a/38619310>, Adrian-endorsed heuristic by David McDonald (WCAG team member) <https://x.com/aardrian/status/1322134910258286597>, Sara Souidean <https://practical-accessibility.today/chapters/buttons-vs-links/>. One by me <https://fuzzylogic.me/posts/should-i-use-a-button-or-a-link/>. (More info on the dialog element <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog>)
