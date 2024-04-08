---
date: 2024-04-08T20:40:01Z
title: 'Building a Good Download… Button? by Eric Bailey'
description: 'Bar'
tags:
- link
- button
- accessibility
- affordance
- ux
linkTarget: https://css-tricks.com/building-good-download-button/
---
Question: when presenting users with a means of downloading a file, should you use the `anchor` element or the `button` element? 

Answer: you should use the `anchor` element.
---

Eric starts by quoting accessibility expert Scott O’Hara to explain why anchor is the appropriate element:

> The debate about whether a button or link should be used to download a file is a bit silly, as the whole purpose of a link has always been to download content. HTML is a file, and like all other files, it needs to be retrieved from a server and downloaded before it can be presented to a user.

> The confusion seems to come from developers getting super literal with the “links go places, buttons perform actions.” Yes, that is true, but links don’t actually go anywhere. They retrieve information and download it.

> Long story short, the `download` attribute is unique to anchor links for a reason. `download` augments the inherent functionality of the link retrieving data. It side steps the attempt to render the file in the browser and instead says, “You know what? I’m just going to save this for later…”

Eric follows up by suggesting that as designers and developers we should make the experience of interacting with a download link as good as possible. To that end:

- Ensure it looks like a link, i.e. underlined. You’re using a link (because it’s semantically appropriate) so now encourage the appropriate perceived affordances via conventional visual design for a link
- Use _verb plus noun_ for the text. For example, _Download fonts_
- Include the file size (for example 34 MB) to give an indication of the download time
- Consider adding an indicator that the link does something other than take you to another place on your website. A downward-facing arrow is conventional
