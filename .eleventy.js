const fs = require("fs");
const filesize = require("file-size");


module.exports = (function(eleventyConfig) {

  //
  eleventyConfig.addFilter("filesize", function(path) {
    let stat = fs.statSync(path);
    if( stat ) {
      return filesize(stat.size).human();
    }
    return "";
  });

  // We’ll use a dedicated .eleventyignore file to tell 11ty what not to process, rather than .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Copy (without processing) the following directories and file types to the compiled site folder
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/site.webmanifest');
  eleventyConfig.addPassthroughCopy('src/safari-pinned-tab.svg');
  eleventyConfig.addPassthroughCopy('src/robots.txt');


  // Base Config
  return {
    templateFormats: [
      "html",
      "liquid",
      "md",
      "njk",
      // Now list any non-11ty-recognized template extensions, and files of those types will just be copied directly through to /dist. Feels a bit hacky but documentation advocates it!
      "png"
    ],
    dir: {
      input: 'src',
      output: 'dist',
      includes: "_includes",
      layouts: "_layouts"
    }
  }

});
