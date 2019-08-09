const fs = require("fs");
module.exports = (function(eleventyConfig) {
 eleventyConfig.addFilter("filesize", function(path) {
  let stat = fs.statSync(path);
  if( stat ) {
   return (stat.size/1024).toFixed(2) + " KB";
  }
  return "";
 });
});