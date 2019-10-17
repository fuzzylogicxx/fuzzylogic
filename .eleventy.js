const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const CleanCSS = require("clean-css");
//const pluginRespimg = require('eleventy-plugin-respimg');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  //
  // Eleventy Filters (functions we use elsewhere to modify strings, dates, file contents etc to get what we want)
  //

  // Readable Date filter
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  // Readable Time filter
  eleventyConfig.addFilter("readableTime", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("h:mm a");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // 'squash' filter (used when creating the search index) | credit Phil Hawksworth
  // Make a search index string by removing duplicated words
  // and removing less useful, common short words
  // @param {String} text

  eleventyConfig.addFilter("squash", (text) => {
    var content = new String(text);

    // all lower case, please
    var content = content.toLowerCase();

    // remove all html elements and new lines
    var re = /(&lt;.*?&gt;)/gi;
    var plain = unescape(content.replace(re, ''));

    // remove duplicated words
    var words = plain.split(' ');
    var deduped = [...(new Set(words))];
    var dedupedStr = deduped.join(' ')

    // remove short and less meaningful words
    var result = dedupedStr.replace(/\b(\.|\,|the|a|an|and|am|you|I|to|if|of|off|me|my|on|in|it|is|at|as|we|do|be|has|but|was|so|no|not|or|up|for)\b/gi, '');
    //remove newlines, and punctuation
    result = result.replace(/\.|\,|\?|-|—|\n/g, '');
    //remove repeated spaces
    result = result.replace(/[ ]{2,}/g, ' ');

    return result;
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  //
  // Collections
  //

  // returnIfLive: function for use as callback in Array.filter()
  // to exclude any posts with date in the future or marked as draft.
  const now = new Date();
  const returnIfLive = post => post.date <= now && !post.data.draft;

  // Live Posts
  eleventyConfig.addCollection('liveposts', function(collection) {
    return collection
      .getFilteredByTag("posts")
      .filter(returnIfLive)
  })

  // Collection of Tags in use (on Live Posts only)
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getFilteredByTag("posts").filter(returnIfLive).forEach(function(item) {
      if( "tags" in item.data ) {
        let tags = item.data.tags;

        tags = tags.filter(function(item) {
          switch(item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "post":
            case "posts":
            case "link":
            case "entry":
            case "note":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  })

  // Navigation Items, Sorted
  eleventyConfig.addCollection("navItems", function(collection) {
    return collection.getFilteredByTag("nav").sort(function(a, b) {
      return b.data.navpos - a.data.navpos;
    });
  });

  // Cloudinary / Responsive Images
  eleventyConfig.cloudinaryCloudName = 'fuzzylogic';
	eleventyConfig.srcsetWidths = [320, 640, 960, 1280, 1600, 1920, 2240, 2560];
  eleventyConfig.fallbackWidth = 640;

  eleventyConfig.addShortcode( 'respimg', function( src, alt, srcsetWidthRange=eleventyConfig.srcsetWidths, sizes ) {
    const fetchBase = `https://res.cloudinary.com/${ eleventyConfig.cloudinaryCloudName }/image/fetch/`;
    return `<img
    srcset="${srcsetWidthRange.map( ( w ) => { return `${ fetchBase }q_auto,f_auto,w_${ w }/${ src } ${ w }w` } ).join( ', ' )}"
    sizes="${ sizes ? sizes : '100vw' }"
    src="${ fetchBase }q_auto,f_auto,w_${ eleventyConfig.fallbackWidth }/${ src }"
    ${ alt ? `alt="${ alt }"` : '' }
    loading="lazy" />`;
  } );


  // Excerpts (https://www.11ty.io/docs/data-frontmatter/#example%3A-parse-excerpts-from-content)
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true
  });


  //
  // Markdown Plugins
  //
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: true,
    permalinkClass: "section-link",
    permalinkSymbol: "#"
  };

  mdi = new markdownIt(options);

  eleventyConfig.setLibrary("md", mdi.use(markdownItAnchor, opts));

  // Render a markdown string from a .md file (e.g. a post excerpt) as the target HTML in Nunjucks
  eleventyConfig.addNunjucksFilter("markdownStringToHTML", markdownString => mdi.render(markdownString));

  //
  // BrowserSync Config
  //
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  // Don’t process these; just copy them as-is into the output directory.
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("android-chrome-192x192.png");
  eleventyConfig.addPassthroughCopy("android-chrome-256x256.png");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("mstile-150x150.png");
  eleventyConfig.addPassthroughCopy("pwa_icon-512x512.png");
  eleventyConfig.addPassthroughCopy("safari-pinned-tab.svg");


  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
