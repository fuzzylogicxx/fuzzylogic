const { DateTime } = require('luxon');
const fs = require('fs');
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const { minify } = require("terser");

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  // Drafts.
  // See also _data/eleventyDataSchema.js which validates that
  // `draft` is either undefined or boolean, and raises an error if not.
  // TODO: add the above schema file once I’ve switched to ES modules.
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});




  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",

		// Add any other Image utility options here:

		// optional, output image formats
		formats: ["avif", "webp"],
		// formats: ["auto"],

		// optional, output image widths
		// widths: ["auto"],
    widths: [800, "auto"],

		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
      sizes: "(max-width: 860px) 100vw, 840px",
      loading: "lazy",
		  decoding: "async",
		},
	});


  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  // Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig
		.addPassthroughCopy({
			"./public/": "/"
		});

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch CSS files
	eleventyConfig.addWatchTarget("css/**/*.css");

  // Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
	// Bundle <style> content and adds a {% css %} paired shortcode
	eleventyConfig.addBundle("css", {
		// Add all <style> content to `css` bundle (use <style eleventy:ignore> to opt-out)
		// Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		bundleHtmlContentFromSelector: "style",
	});



  //
  // Shortcodes
  //

  // Get current year
  // https://11ty.rocks/eleventyjs/dates/#year-shortcode
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);








  //
  // Eleventy Filters
  // (functions we use elsewhere to modify strings, dates, file contents etc to get what we want)
  //

  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

  eleventyConfig.addFilter('readableTime', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('h:mm a');
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});


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

  // Responsive image shortcode V2
  // (currently using Cloudinary both as image host and for its image transformation features)
  eleventyConfig.cloudinaryCloudName = 'fuzzylogic';
  eleventyConfig.cloudinaryImgURLStart = `https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/image/upload/`;
  eleventyConfig.cloudinaryImgQuality = '55';

  // width: based on my current layout where content col is 646 wide, this is 2x as wide as needed
  eleventyConfig.cloudinaryImgWidth = '1292';

  // I removed the following two attrs because of https://cloudfour.com/thinks/stop-lazy-loading-product-and-hero-images/
  // loading="lazy"
  // decoding="async"
  // TODO: if poss, make them optional parameters.
  eleventyConfig.addShortcode('respimgV2', function(
    cloudinaryImgUniquePath,
    alt,
    aspectRatioWidth,
    aspectRatioHeight
    ) {
      return `<picture>
        <source type="image/avif" srcset="${eleventyConfig.cloudinaryImgURLStart}f_avif,q_${eleventyConfig.cloudinaryImgQuality},w_${eleventyConfig.cloudinaryImgWidth}/${cloudinaryImgUniquePath}" />
        <source type="image/webp" srcset="${eleventyConfig.cloudinaryImgURLStart}f_webp,q_${eleventyConfig.cloudinaryImgQuality},w_${eleventyConfig.cloudinaryImgWidth}/${cloudinaryImgUniquePath}" />
        <img
          eleventy:ignore
          class="u-full-parent-width"
          src="${eleventyConfig.cloudinaryImgURLStart}f_jpg,q_${eleventyConfig.cloudinaryImgQuality},w_${eleventyConfig.cloudinaryImgWidth}/${cloudinaryImgUniquePath}"
          width="${aspectRatioWidth}"
          height="${aspectRatioHeight}"
          alt="${alt}" />
      </picture>`;
    }
  );

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
    eleventy:ignore
    class="u-full-parent-width"
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


  //
  // Customize Markdown library and settings:
  //
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "#"
    }),
    level: [1,2,3,4]
    // , slugify: eleventyConfig.getFilter("slugify")
  });
  eleventyConfig.setLibrary("md", markdownLibrary);


  // Don’t process files of these types; just copy them as-is into the public directory.
  // Note: no 'css' entry because we’re inlining CSS so don’t need any physical css files in the public dir.

  // the easy stuff

  // CMS
  // Ref: https://www.cassey.dev/adding-decap-cms-to-11ty/
  eleventyConfig.addPassthroughCopy("admin");

  // Avatar and anything else to be findable at a well-known location
  eleventyConfig.addPassthroughCopy('.well-known');

  // More…
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
