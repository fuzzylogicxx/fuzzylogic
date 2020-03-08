---
description: The server and client render should not be 1:1.
date: 2020-03-01T14:11:21+00:00
tags: [note, ssr, javascript, progressiveenhancement]
location: Glasgow
noteTitle: 1565863401
---
In the same vein as Jeremy Keith’s recent blog post, [Hydration](https://adactio.com/journal/16404), which calls out some of the performance and user experience problems associated with current _Server Side Rendering_ approaches, I think Jake Archibald is absolutely bang on the money here.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">The server and client render should not be 1:1.<br><br>Don&#39;t render buttons on the server that require JS to work.<br><br>Don&#39;t ship code to the client that simply repeats what the server has already done.</p>&mdash; Jake Archibald (@jaffathecake) <a href="https://twitter.com/jaffathecake/status/1230388412806520833?ref_src=twsrc%5Etfw">February 20, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
