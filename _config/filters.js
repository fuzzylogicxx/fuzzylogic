import { DateTime } from "luxon";

export default function(eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	// LH DIY
  // TODO: decide if time-precision is necessary; ditch if not.
  eleventyConfig.addFilter("readableTime", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "h:mm a");
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

  // LH DIY
  // Note that I’ll only use this on posts (in lists) of type `entry`.
  // Those – unlike most short links and notes – are likely to be long and have
  // structure such as headings, so aren’t conducive to just showing the entire
  // post in lists.
  // So most posts in lists won’t use this.
  eleventyConfig.addFilter("excerpt", (postContent) => {
    const findExcerptEnd = (postContent) => {
      if (postContent === '') {
        return 0;
      }

      // check for an image first
      if (postContent.includes('</figure>')) {
        const imageEndCharacter = postContent.indexOf('</figure>', 0) + 9;
        if (imageEndCharacter !== -1) return imageEndCharacter;
      }

      // next check for a paragraph
      const paragraphClosingTag = postContent.indexOf('</p>', 0) + 4;
      if (paragraphClosingTag !== -1) return paragraphClosingTag;
    }

    const excerptEnd = findExcerptEnd(postContent);
    return postContent.substring(0, excerptEnd);
	});
};
