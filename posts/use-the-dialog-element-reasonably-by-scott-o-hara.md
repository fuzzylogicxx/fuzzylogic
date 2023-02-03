---
date: 2023-02-03T09:03:21Z
title: Use the dialog element (reasonably), by Scott O’Hara
description: 'Scott reckons the HTML dialog element is now ready to be used with confidence '
tags:
- a11y
- modal
- dialog
- standards
- html
- javascript
linkTarget: https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html
draft: false

---
Here’s an important update on _native modal dialogues_. TL;DR – it’s now OK to use `dialog`.
---

Last year [I posted that Safari now supported the HTML `dialog` element](https://fuzzylogic.me/posts/refactoring-a-modal-dialogue-in-2022/) meaning that we were within touching distance of being able to adopt it with confidence. My caveat was:

> However first I think we’d need to make an informed decision regarding our satisfaction with support, based on the updated advice in Scott O’Hara’s article [Having an Open Dialog](https://www.scottohara.me/blog/2019/03/05/open-dialog.html).

(Accessibility expert Scott O’Hara has been diligently testing the `dialog` element for _years_.)

However the happy day has arrived. The other day Scott posted [Use the dialog element (reasonably)](https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html). It includes this advice:

> I _personally_ think it’s time to move away from using custom dialogs, and to use the `dialog` element instead.

That’s an important green-light!

And this of course means that we can stop DIYing modal dialogues from `div`s plus super-complicated scripting and custom ARIA, and instead let a native HTML element do most of the heavy lifting for us. 

From a Design System perspective, I’d previously suggested to my team that when we revisit our _Modal_ component we should err toward a good custom dialogue library first, however I’m now likely to recommend we go for native `dialog` instead. Which is great!
