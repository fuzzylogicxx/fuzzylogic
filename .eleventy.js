const fs = require("fs");
const filesize = require("file-size");





module.exports = (function(eleventyConfig) {



 eleventyConfig.addFilter("filesize", function(path) {
  let stat = fs.statSync(path);
  if( stat ) {
   return filesize(stat.size).human();
  }
  return "";
 });


  // Copy the `img/` directory 
  eleventyConfig.addPassthroughCopy("img");
  
  // Copy the `css/fonts/` directory
  eleventyConfig.addPassthroughCopy("css");

  // If you use a subdirectory, it’ll copy using the same directory structure.
  //eleventyConfig.addPassthroughCopy("css/fonts");



});