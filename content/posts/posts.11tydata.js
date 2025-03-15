export default {
	tags: ["posts"],
	layout: "layouts/post.njk",
  eleventyComputed: {
    postType: (data) => data.tags[1],
    topLevelCategory: (data) => data.tags[2],
  }
};
