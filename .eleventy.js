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

 //
 eleventyConfig.setUseGitIgnore(false);

    


  // Copy (without processing) the `assets` directory to the compiled site folder
  eleventyConfig.addPassthroughCopy('src/assets');

 // Copy the `img/` directory 
 //eleventyConfig.addPassthroughCopy("src/img");
  
 // Copy the `css/` directory
 //eleventyConfig.addPassthroughCopy("src/css");

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