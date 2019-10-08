const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const CleanCSS = require("clean-css");
const Terser = require('terser');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  //
  // Eleventy Filters (we pass stuff through them to get them out the way we want)
  //

  // Readable Date filter
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  // cssmin filter
  eleventyConfig.addFilter("cssmin", (code) => {
    return new CleanCSS({}).minify(code).styles;
  });

  // jsmin filter
  eleventyConfig.addFilter('jsmin', (code) => {
    let minified = Terser.minify(code);
    if ( minified.error ) {
        console.log("Terser error: ", minified.error);
        return code;
    }
    return minified.code;
  });

  // 'squash' filter (used when creating the search index)
  // credit Phil Hawksworth
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


  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Collections

  // Function for use as a callback in Array.filter() to exclude any posts
  // with date in the future and or marked as draft.
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


  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

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

    markdownTemplateEngine: "liquid",
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
