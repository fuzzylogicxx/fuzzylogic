---js
const eleventyNavigation = {
	key: "Search",
	order: 5
};
const description = "Seek and ye might find"
---
<link href="/pagefind/pagefind-ui.css" rel="stylesheet">

<!-- <style>
  @media (prefers-color-scheme: dark) {
    :root {
      --pagefind-ui-primary: #eeeeee;
      --pagefind-ui-text: #eeeeee;
      --pagefind-ui-background: #152028;
      --pagefind-ui-border: #152028;
      --pagefind-ui-tag: #152028;
    }
  }
</style> -->

# Search

<p>Type your search term into the form below.</p>

<div id="search" class="search"></div>

<script src="/pagefind/pagefind-ui.js" onload="new PagefindUI({ element: '#search', showImages: false });"></script>

