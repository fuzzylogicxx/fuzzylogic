module.exports = {
  tags: [
    "posts"
  ],
  layout: "layouts/post.njk",
  mainImage: {
    "aspectRatioWidth": 320,
    "aspectRatioHeight": 240
  },
  eleventyComputed: {
    /**
     * Custom handling for draft posts so they don’t show up unexpectedly.
     * If a page has `draft: true` in its YAML frontmatter then this snippet
     * will set its permalink to false and exclude it from collections.
     *
     * For dev builds we will always render the page.
     */
    permalink: data => {
      // in dev environments we want to still access a draft post by visiting its URL directly,
      // but in production the draft post should not be output to a physical file and available to search engines.
      if (process.env.NODE_ENV === 'production' && data.draft) {
        return false;
      }

      return data.permalink;
    },
    eleventyExcludeFromCollections: data => {
      if (data.draft) {
        return true;
      }

      return false;
    }
  }
};
