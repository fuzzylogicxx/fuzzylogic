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

// Copy (without processing) the `assets` directory to the compiled site folder
eleventyConfig.addPassthroughCopy('src/assets');

// If you use a subdirectory, it’ll copy using the same directory structure.
//eleventyConfig.addPassthroughCopy("css/fonts");

// Base Config
return {
  dir: {
    input: 'src',
    output: 'dist'
  }
}



});
