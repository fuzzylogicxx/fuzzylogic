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
    postType: (data) => data.tags[1],
    topLevelCategory: (data) => data.tags[2],
  }
};
