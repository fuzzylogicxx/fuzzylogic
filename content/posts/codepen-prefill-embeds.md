---
title: Codepen Prefill Embeds
description: Testing CodePen’s prefill embeds, which progressively enhance code on your own site into an editable pen.
noteWithTitle: true
date: 2019-01-27T18:21:00
tags:
  - note
  - codepen
  - css
---
Testing [Codepen’s new feature](https://blog.codepen.io/documentation/prefill-embeds/) for progressively enhancing code hosted _on your own site_ from a basic `pre` element into an interactive, editable pen. To demo this I’m using a [great code snippet from Chris Ferdinandi](https://gomakethings.com/smooth-scrolling-links-with-only-css/) for CSS-only smooth-scrolling.

<div class="codepen" data-height="265" data-theme-id="0" data-default-tab="html,result" data-user="cferdinandi" data-slug-hash="LqGZrb" data-prefill='{"title":"CSS Smooth Scroll Demo","tags":[],"stylesheets":[],"scripts":[]}'>
  <pre data-lang="html">&lt;p id="top">
	&lt;a href="#bazinga">Go to the middle&lt;/a>&lt;br>
	&lt;a href="#1@#%^-bottom">Go to the bottom&lt;/a>
&lt;/p>&#10;&#10;&lt;p>
	.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>
	.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>
	.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.
&lt;/p>&#10;&#10;&lt;p id="bazinga">&lt;a href="#1@#%^-bottom">Go to the bottom&lt;/a>&lt;/p>&#10;&#10;&lt;p>
	.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>
	.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>
	.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.
	.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>
	.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>
	.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.&lt;br>.
&lt;/p>&#10;&#10;&lt;p id="1@#%^-bottom">&lt;a href="#">Go back to the top&lt;/a>&lt;/p></pre>
  <pre data-lang="css" >html {
	scroll-behavior: smooth;
}&#10;&#10;@media screen and (prefers-reduced-motion: reduce) {
	html {
		scroll-behavior: auto;
	}
}</pre>
  
</div>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
