const fs = require("fs");
const filesize = require("file-size");

const markdownIt = require('markdown-it')
//const markdownItAnchor = require('markdown-it-anchor')


module.exports = (function(eleventyConfig) {

  // don’t want to have to set tags: post at directory level then have to repeat the post tag on each individual post
  eleventyConfig.setDataDeepMerge(true);

  //
  eleventyConfig.addFilter("filesize", function(path) {
    let stat = fs.statSync(path);
    if( stat ) {
      return filesize(stat.size).human();
    }
    return "";
  });

  // Markdown Parsing
  eleventyConfig.setLibrary(
      'md',
      markdownIt({
          html: true,
          breaks: true,
          typographer: true
      })
      // .use(markdownItAnchor, {
      //     permalink: true,
      //     permalinkSymbol: '#',
      //     permalinkClass: 'heading-anchor',
      //     permalinkBefore: true,
      //     level: 2,
      //     slugify: s =>
      //         encodeURIComponent(
      //             'h-' +
      //                 String(s)
      //                     .trim()
      //                     .toLowerCase()
      //                     .replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g, '')
      //                     .replace(/\s+/g, '-')
      //         )
      // })
  )

  // // Filter using `Array.filter`
  // eleventyConfig.addCollection("thoughts", function(collection) {
  //   return collection.getAll().filter(function(item) {
  //     // Side-step tags and do your own filtering
  //     return "thoughts" in item.data;
  //   });
  // });

  // Collections: Thoughts
  eleventyConfig.addCollection('thoughts', function(collection) {
    return collection
      getFilteredByTag("post")
      .filter(item => item.inputPath.match(/\/thoughts\//) !== null)
      //.reverse()
  })

  // Collections: Bytes
  eleventyConfig.addCollection('bytes', function(collection) {
    return collection
      getFilteredByTag("post")
      .filter(item => item.inputPath.match(/\/bytes\//) !== null)
      //.reverse()
  })

  // Collections: Links
  eleventyConfig.addCollection('links', function(collection) {
    return collection
      getFilteredByTag("post")
      .filter(item => item.inputPath.match(/\/links\//) !== null)
      //.reverse()
  })

  // Collections: Sounds
  eleventyConfig.addCollection('sounds', function(collection) {
    return collection
      getFilteredByTag("post")
      .filter(item => item.inputPath.match(/\/sounds\//) !== null)
      //.reverse()
  })

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
