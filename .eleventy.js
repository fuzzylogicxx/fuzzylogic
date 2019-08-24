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

  // Filter (by front-matter key) using `Array.filter`
  // eleventyConfig.addCollection("thoughts", function(collection) {
  //   return collection.getAll().filter(function(item) {
  //     // Side-step tags and do your own filtering
  //     return "thoughts" in item.data;
  //   });
  // });

  // Collections

  const now = new Date();
  const livePosts = post => post.date <= now && !post.data.draft;

  eleventyConfig.addCollection('feed', function(collection) {
    return collection
      .getFilteredByTag("post")
      .filter(livePosts)
      //.reverse()
  })

  // Collections: Thoughts
  eleventyConfig.addCollection('thoughts', function(collection) {
    return collection
      .getFilteredByTag("post")
      .filter(item => item.inputPath.match(/\/thoughts\//) !== null)
      .filter(livePosts)
      //.reverse()
  })

  // Collections: Bytes
  eleventyConfig.addCollection('bytes', function(collection) {
    return collection
      .getFilteredByTag("post")
      .filter(item => item.inputPath.match(/\/bytes\//) !== null)
      .filter(livePosts)
      //.reverse()
  })

  // Collections: Links
  eleventyConfig.addCollection('links', function(collection) {
    return collection
      .getFilteredByTag("post")
      .filter(item => item.inputPath.match(/\/links\//) !== null)
      .filter(livePosts)
      //.reverse()
  })

  // Collections: Sounds
  eleventyConfig.addCollection('sounds', function(collection) {
    return collection
      .getFilteredByTag("post")
      .filter(item => item.inputPath.match(/\/sounds\//) !== null)
      .filter(livePosts)
      //.reverse()
  })

  // We’ll use a dedicated .eleventyignore file to tell 11ty what not to process, rather than .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Copy (without processing) the following directories and file types to the compiled site folder
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/browserconfig.xml');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/safari-pinned-tab.svg');
  eleventyConfig.addPassthroughCopy('src/site.webmanifest');
  eleventyConfig.addPassthroughCopy('src/robots.txt');
  eleventyConfig.addPassthroughCopy('src/serviceworker.js');
  //eleventyConfig.addPassthroughCopy('src/_headers');


  // Base Config
  return {
    templateFormats: [
      "html",
      "liquid",
      "md",
      "njk",
      // Now list any non-11ty-recognized template extensions, and files of those types (e.g. icon PNGs) will just be copied directly through to /dist.
      // Feels a bit hacky but documentation advocates it!
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
