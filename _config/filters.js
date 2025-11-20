import { DateTime } from "luxon";
import markdownIt from "markdown-it";
import markdownItAttrs from 'markdown-it-attrs';
import markdownItImplicitFigures from 'markdown-it-implicit-figures';

export default function(eleventyConfig) {
	// LH DIY’d.
  // TODO: decide if time-precision is necessary; ditch if not.
  eleventyConfig.addFilter("readableTime", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "h:mm a");
	});

  // Convert raw markdown to HTML.
  // Useful when working with the `page.data.excerpt` that 11ty makes available,
  // because it comes as raw markdown however when I use it as the content snippet
  // per blog post in a list of posts, I want those excerpts rendered
  // as proper HTML – with bolding, italics, links etc – a string doesn’t cut it.
  // So I pass the excerpts through this.
  // Note: the advanced markdown things I’m doing here (including <figure> around images etc)
  // mirror the way I’ve configured 11ty’s own markdown parser in eleventy.config.js.
  // I want the exact same HTML results when I generate HTML from markdown using this filter.
  // Ref: https://github.com/11ty/eleventy/issues/1380#issuecomment-698457560
  eleventyConfig.addFilter("md", (content = "") => {
    return markdownIt()
      .use(markdownItAttrs)
      .use(markdownItImplicitFigures, { figcaption: "title"})
      .render(content);
  });

  // apply HTML `loading` and `decoding` attributes to images
  // so that they override my 11ty Image plugin “sensible defaults”
  // on above the fold images which *should* be loaded eagerly.
  eleventyConfig.addFilter("loadFirstImageInPostSynchronously", (postContent, isLCPImage = false) => {
    let isMatch = false;

    if (typeof postContent === 'string') {
      const relevantPart = postContent.slice(0, 450);
      if (relevantPart.includes('<img ') && relevantPart.includes('<img eleventy:ignore') === false) {
        isMatch = true;
      }
    }

    if (isMatch) {
      let replacement = '<img loading="eager" decoding="auto"';
      if (isLCPImage) {
        // on some pages (like the individual post page/template) there’s no banner,
        // so the post’s first image can be considered “the LCP image”.
        // so go further and set fetchpriority=high
        // https://addyosmani.com/blog/fetch-priority/
        replacement = '<img fetchpriority="high" loading="eager" decoding="auto"';
      }

      // apply replacement to first img instance only
      // Handily, that’s how replace() works by default
      // return postContent.replace('<img ', '<img loading="eager" decoding="auto" ');
      return postContent.replace('<img ', replacement);
    }

    return postContent;
	});
  // end LH DIY’d

  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});



	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "entry", "link", "note", "posts"].indexOf(tag) === -1);
	});

  eleventyConfig.addFilter("sortAlphabetically", strings =>
		(strings || []).sort((b, a) => b.localeCompare(a))
  );
};
