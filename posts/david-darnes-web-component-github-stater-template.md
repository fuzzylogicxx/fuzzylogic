---
date: 2024-04-21T10:30:01Z
title: 'Web Component GitHub Starer Template, by David Darnes'
description: 'David’s template provides not just the starter component code but also a nice readme, issue template, and publish-to-NPM flow'
tags:
- link
- webcomponents
- github
- npm
linkTarget: https://darn.es/web-component-github-starter-template/
---
David’s template provides not just the starter component code but also a nice readme, issue template, and publish-to-NPM flow.
---

It’s also always interesting to see how different developers structure their web component JavaScript. David’s code includes a neat and interesting approach to registering the comoponent, and favours setup being written in the `connectedCallback()`.

Here are a couple of his real web components which started from the template:
- [link-peek](https://github.com/daviddarnes/link-peek) (really nice and here’s David’s [corresponding explainer](https://darn.es/link-peek-web-component/))
- [mastodon-post](https://github.com/daviddarnes/mastodon-post) ([explainer](https://darn.es/mastodon-post-web-component/))

Incidentally, I noticed the [comment querying whether event listeners should perhaps be in the `constructor` instead](https://hawkticehurst.com/writing/you-are-probably-using-connectedcallback-wrong/) and linking to Hawk Ticehurst’s article [You're (probably) using connectedCallback wrong
](https://hawkticehurst.com/writing/you-are-probably-using-connectedcallback-wrong/). While their seems to be a degree of validity there, I’m not going to sweat it. I’ve checked [Keith Cirkel’s advice](https://webcomponents.guide/learn/components/initializing-your-component/) on this, which is:

> If your component has additional set up logic, like adding event listeners, then the `constructor()` isn't the best place for that - as the Web Component isn't yet inserted into (or connected) to a DOM tree, and so it won't have a parent. For that, you'll need a lifecycle callback.

I note that even [Hawk Ticehurst isn’t 100% sure about the constructor approach](https://mastodon.social/@hawkticehurst@fosstodon.org/111587713699575062). 

So I’m gonna go with putting event listeners in callbacks per Keith and David’s advice.
