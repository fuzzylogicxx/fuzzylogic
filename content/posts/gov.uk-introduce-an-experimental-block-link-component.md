---
title: GOV.UK introduce an experimental block link component
noteWithTitle: true
description: It’ll be interesting to see how GOV.UK’s experiment with block links
  pans out
date: 2021-12-13T12:35:00Z
location: Glasgow
tags:
- note
- html
- blocklink
- designsystems
- web
- a11y

---
Here’s an interesting development in the [block link saga](https://fuzzylogic.me/posts/block-links-a-tricky-ui-problem/): GOV.UK have introduced one (named `.chevron-card`) on their Homepage, citing how [it’ll improve accessibility by increasing mobile touch targets](https://insidegovuk.blog.gov.uk/2021/12/13/updating-the-gov-uk-homepage/). It’s not yet been added to their Design System while they’re monitoring it to see if it is successful. They’ve chosen the approach which starts with a standard, single, non-wrapping anchor then “stretches” it across the whole card via some pseudo elements and absolute positioning magic. I’m slightly surprised at this choice because it breaks the user’s ability to select text within the link. [Really interested to see how it pans out!](https://twitter.com/fuzzylogicx/status/1470369635681943561)

<figure>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Lovely write-up, &amp; great rationale re. larger mobile tap targets! I’ve wrestled with “block links” &amp; found that each approach has issues so it’s v. interesting that you chose the route that impacts text selection. Is that the lesser of the evils? Keen to hear how it pans out!</p>&mdash; Laurence Hughes (@fuzzylogicx) <a href="https://twitter.com/fuzzylogicx/status/1470369635681943561?ref_src=twsrc%5Etfw">December 13, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

</figure>
