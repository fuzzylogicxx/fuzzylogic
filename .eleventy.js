const {DateTime} = require('luxon');
const fs = require('fs');
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const { PurgeCSS } = require('purgecss');
const { minify } = require("terser");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  // Tell 11ty that when changes are made inside the src/sass dir, it should recompile.
  // Needed so that the purge-and-inline-css transform runs every time we make a Sass update.
  // …so that our updated styles get put into the <head> and we can check them.
  eleventyConfig.addWatchTarget('./src/sass/');

  eleventyConfig.addWatchTarget('./src/js/');

  //
  // Eleventy Transforms
  // Transforms can modify a template’s output.
  // For example, use a transform to format/prettify an HTML file with proper whitespace.
  //

  // For each .html file replace a placeholder line in the <head> with a inlined <style> block.
  // Include only the CSS required by the page, thanks to the purgecss NPM package.
  // Note 1: this covers everything; it doesn’t need invoked/called elsewhere.
  // Note 2: for each page, the page’s HTML content and its output path are available.
  eleventyConfig.addTransform('purge-and-inline-css', async (content, outputPath) => {
    if (!outputPath.endsWith('.html')) {
      return content;
    }

    const purgeCSSResults = await new PurgeCSS().purge({
      content: [{ raw: content }],
      css: ['_includes/css/main.css'],
      keyframes: true,
    });

    return content.replace(
      '<!-- THIS WILL BE REPLACED WITH INLINE CSS -->',
      '<style>' + purgeCSSResults[0].css + '</style>'
    );
  });

  //
  // Eleventy Filters
  // (functions we use elsewhere to modify strings, dates, file contents etc to get what we want)
  //

  /**
   * jsmin()
   * custom filter into which we pass some JavaScript and get it back minified.
   * Uses terser for the minification.
   * Terser config options: https://github.com/terser/terser#minify-options-structure
   * Example Nunjucks call: {{ myjs | jsmin | safe }}
   * @param  {String} "const mynum = 123;"
   * @return {String} the minified JS or, if minification failed, the unminified JS.
   */
  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
    code,
    callback
  ) {
    try {
      var options = { mangle: { toplevel: true }, format: { comments: false } };
      const minified = await minify(code, options);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });

  // Readable Date filter
  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('dd LLL yyyy');
  });

  // Readable Time filter
  eleventyConfig.addFilter('readableTime', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('h:mm a');
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // 'squash' filter (used when creating the search index) | credit Phil Hawksworth
  // Make a search index string by removing duplicated words
  // and removing less useful, common short words
  // @param {String} text

  eleventyConfig.addFilter('squash', text => {
    var content = new String(text);

    // all lower case, please
    var content = content.toLowerCase();

    // remove all html elements and new lines
    var re = /(&lt;.*?&gt;)/gi;
    var plain = unescape(content.replace(re, ''));

    // remove duplicated words
    var words = plain.split(' ');
    var deduped = [...new Set(words)];
    var dedupedStr = deduped.join(' ');

    // remove short and less meaningful words
    var result = dedupedStr.replace(
      /\b(\.|\,|the|a|an|and|am|you|I|to|if|of|off|me|my|on|in|it|is|at|as|we|do|be|has|but|was|so|no|not|or|up|for)\b/gi,
      ''
    );
    //remove newlines, and punctuation
    result = result.replace(/\.|\,|\?|-|—|\n/g, '');
    //remove repeated spaces
    result = result.replace(/[ ]{2,}/g, ' ');

    return result;
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  //
  // Collections
  //

  // onlyHistoricPublishDates: function for use as callback in Array.filter()
  // to exclude any posts with date in the future (i.e. scheduled posts).
  const now = new Date();
  const onlyHistoricPublishDates = post => post.date <= now;

  // Collection of Tags (those for “Live Posts” only)
  eleventyConfig.addCollection('tagList', function(collection) {
    // use a Set because values have to be unique so it deals with that out of the box
    let tagSet = new Set();
    collection
      .getFilteredByTag('posts')
      .filter(onlyHistoricPublishDates)
      .forEach(function(item) {
        if ('tags' in item.data) {
          let tags = item.data.tags;

          // filter out tags that we don’t want to show in tag lists
          tags = tags.filter(function(item) {
            switch (item) {
              // this and the `filter` list in posts-tagged-with-tag.njk should be the same
              case 'all':
              case 'post':
              case 'posts':
              case 'link':
              case 'entry':
              case 'note':
                return false;
            }

            return true;
          });

          for (const tag of tags) {
            tagSet.add(tag);
          }
        }
      });

    // returning an array in addCollection works from Eleventy 0.5.3
    // use spread operator on our set within array braces to convert set to array
    // also sort array of tags alphabetically
    return [...tagSet].sort();
  });

  // Cloudinary / Responsive Images
  eleventyConfig.cloudinaryCloudName = 'fuzzylogic';
  eleventyConfig.srcsetWidths = [320, 640, 960, 1280, 1600, 1920, 2240, 2560];
  eleventyConfig.fallbackWidth = 640;
  eleventyConfig.aspectRatioWidth = 320;
  eleventyConfig.aspectRatioHeight = 240;

  eleventyConfig.addShortcode('respimg', function(
    src,
    alt,
    sizes,
    aspectRatioWidth = eleventyConfig.aspectRatioWidth,
    aspectRatioHeight = eleventyConfig.aspectRatioHeight,
    srcsetWidthRange = eleventyConfig.srcsetWidths
  ) {
    const cloudinaryBase = `https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/image/upload/`;
    var cloudinaryImgPath = src.replace(cloudinaryBase, '');
    return `<img
    class="img-full-parent-width"
    srcset="${srcsetWidthRange
      .map(w => {
        return `${cloudinaryBase}q_auto,f_auto,w_${w}/${cloudinaryImgPath} ${w}w`;
      })
      .join(', ')}"
    sizes="${sizes ? sizes : '100vw'}"
    src="${cloudinaryBase}q_auto,f_auto,w_${
      eleventyConfig.fallbackWidth
    }/${cloudinaryImgPath}"
    width="${aspectRatioWidth}" height="${aspectRatioHeight}"
    ${alt ? `alt="${alt}"` : ''}
    loading="lazy"
    decoding="async" />`;
  });

  // Excerpts (https://www.11ty.io/docs/data-frontmatter/#example%3A-parse-excerpts-from-content)
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true
  });

  //
  // Markdown Plugins
  //
  let markdownIt = require('markdown-it');
  let markdownItAnchor = require('markdown-it-anchor');
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: true,
    permalinkClass: 'section-link',
    permalinkSymbol: '#'
  };

  mdi = new markdownIt(options);

  eleventyConfig.setLibrary('md', mdi.use(markdownItAnchor, opts));

  // Render a markdown string from a .md file (e.g. a post excerpt) as the target HTML in Nunjucks
  eleventyConfig.addNunjucksFilter('markdownStringToHTML', markdownString =>
    mdi.render(markdownString)
  );

  //
  // BrowserSync Config
  //
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  // Don’t process files of these types; just copy them as-is into the public directory.
  // Note: no 'css' entry because we’re inlining CSS so don’t need any physical css files in the public dir.

  // the easy stuff
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('fonts');
  eleventyConfig.addPassthroughCopy('android-chrome-192x192.png');
  eleventyConfig.addPassthroughCopy('android-chrome-256x256.png');
  eleventyConfig.addPassthroughCopy('apple-touch-icon.png');
  eleventyConfig.addPassthroughCopy('favicon-16x16.png');
  eleventyConfig.addPassthroughCopy('favicon-32x32.png');
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('mstile-150x150.png');
  eleventyConfig.addPassthroughCopy('pwa_icon-512x512.png');
  eleventyConfig.addPassthroughCopy('safari-pinned-tab.svg');

  eleventyConfig.setTemplateFormats([ "md", "njk" ]);

  return {

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: '/',

    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: '.',
      includes: '_includes',
      data: '_data',
      output: '_site'
    }
  };
};
