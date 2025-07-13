import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

// Things deserving their own separate files
import pluginFilters from "./_config/filters.js";

// LH custom imports:

// use markdown-it-anchors so I can add classes in my markdown posts,
// like so {.post__intro}. If I were instead to write them as HTML (<p class="intro">),
// any markdown (links etc) I put within the opening and closing HTML tags would
// not get processed into HTML (annoyingly) unless I add silly empty lines above and below
// the markdown content.
import markdownItAttrs from 'markdown-it-attrs';

// use markdown-it-anchors to turn the paragraphs that markdown-it automatically
// wraps around images into <figure>s.
import markdownItImplicitFigures from 'markdown-it-implicit-figures';

// use cssnano (which is a configuration for postcss) to transform/minify the CSS we’ll bundle with 11ty Bundle
import postCSS from "postcss";
import cssNano from "cssnano";

// end LH custom imports

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	// Drafts, see also _data/eleventyDataSchema.js
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

  // Add my own choice of plugins for markdown-it (I want markkdownItAttrs) to 11ty’s provided markdown-it instance.
  // Ref: https://www.11ty.dev/docs/languages/markdown/#add-your-own-plugins
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItImplicitFigures));
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItAttrs));

	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig
		.addPassthroughCopy({
			"./public/": "/"
		})
		.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch CSS files
	eleventyConfig.addWatchTarget("css/**/*.css");

	// Watch images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");

	// Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
	// Bundle <style> content and adds a {% css %} paired shortcode
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
    // minify bundle content
		transforms: [
      async function (content) {
        // this.type returns the bundle name.
				// Same as Eleventy transforms, this.page is available here.
        if (process.env.ELEVENTY_RUN_MODE !== "build") return content;

				let result = await postCSS([cssNano]).process(content, { from: this.page.inputPath, to: null });
				return result.css;
      }
    ],
		// Add all <style> content to `css` bundle (use <style eleventy:ignore> to opt-out)
		// Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		bundleHtmlContentFromSelector: "style",
	});

	// Bundle <script> content and adds a {% js %} paired shortcode
	eleventyConfig.addBundle("js", {
		toFileDirectory: "dist",
		// Add all <script> content to the `js` bundle (use <script eleventy:ignore> to opt-out)
		// Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		bundleHtmlContentFromSelector: "script",
	});

  // Create a custom collection of feed-friendly posts.
  // They exclude posts that have the key 'pageSpecificRobotsDirective'
  // (which, when I apply it, I set to "noindex, nofollow").
  // These are pretty personal (and sometimes trivial) notes that I don’t
  // need indexed on google, and I can use that same flag to not share with my RSS subscribers.
  // Ref: https://www.11ty.dev/docs/collections-api/
  eleventyConfig.addCollection("feedPosts", async (collectionsApi) => {
 		return collectionsApi.getFilteredByTag("posts").filter(function (item) {
			return ("pageSpecificRobotsDirective" in item.data === false);
		});
	});

	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		// Optional, default is "---"
		excerpt_separator: "<!-- excerpt -->",
	});

  // Official plugins
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed/feed.xml",
		stylesheet: "pretty-atom-feed.xsl",
		templateData: {
			eleventyNavigation: {
				key: "RSS",
				order: 2
			}
		},
		collection: {
			name: "feedPosts",
			limit: 10,
		},
		metadata: {
			language: "en",
			title: "Fuzzy Logic",
			subtitle: "Fuzzy Logic is the personal website of Laurence Hughes, a web developer based in Glasgow, Scotland.",
			base: "https://fuzzylogic.me/",
			author: {
				name: "Laurence Hughes"
			}
		}
	});

	// Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// Output formats for each image.
		formats: ["avif", "webp"],
		widths: [800, "auto"],
		// failOnError: false,
		htmlOptions: {
			imgAttributes: {
				// Note that these are defaults, and are overridable on a per-image basis
        // So, <img loading decoding> assigned on the HTML tag will override these values.
				loading: "lazy",
				decoding: "async",

        // My guidance to the browser is:
        // On viewports that are up to 860px wide, my layout and CSS will employ (roughly) full-width images.
        // On wider viewports, my layout and CSS will be setting images to a max-width of 840px.
        // So armed with that knowledge, select the most appropriate image file.
        sizes: "(max-width: 860px) 100vw, 840px",
			}
		},

		sharpOptions: {
			animated: true,
		},
	});

	// Filters
	eleventyConfig.addPlugin(pluginFilters);

	eleventyConfig.addPlugin(IdAttributePlugin, {
		// by default we use Eleventy’s built-in `slugify` filter:
		// slugify: eleventyConfig.getFilter("slugify"),
		// selector: "h1,h2,h3,h4,h5,h6", // default
	});

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return (new Date()).toISOString();
	});

  eleventyConfig.addShortcode("currentYear", () => {
		return (new Date()).getFullYear();
	});

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");




  // DELETE THE FOLLOWING ASAP:
  // Responsive image shortcode V2
  // (currently using Cloudinary both as image host and for its image transformation features)
  eleventyConfig.cloudinaryCloudName = 'fuzzylogic';
  eleventyConfig.cloudinaryImgURLStart = `https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/image/upload/`;
  eleventyConfig.cloudinaryImgQuality = '55';

  // width: based on my current layout where content col is 646 wide, this is 2x as wide as needed
  eleventyConfig.cloudinaryImgWidth = '1292';

  // I removed the following two attrs because of https://cloudfour.com/thinks/stop-lazy-loading-product-and-hero-images/
  // loading="lazy"
  // decoding="async"
  // TODO: if poss, make them optional parameters.
  eleventyConfig.addShortcode('respimgV2', function(
    cloudinaryImgUniquePath,
    alt,
    aspectRatioWidth,
    aspectRatioHeight
    ) {
      return `<picture>
        <source type="image/avif" srcset="${eleventyConfig.cloudinaryImgURLStart}f_avif,q_${eleventyConfig.cloudinaryImgQuality},w_${eleventyConfig.cloudinaryImgWidth}/${cloudinaryImgUniquePath}" />
        <source type="image/webp" srcset="${eleventyConfig.cloudinaryImgURLStart}f_webp,q_${eleventyConfig.cloudinaryImgQuality},w_${eleventyConfig.cloudinaryImgWidth}/${cloudinaryImgUniquePath}" />
        <img
          eleventy:ignore
          class="u-full-parent-width"
          src="${eleventyConfig.cloudinaryImgURLStart}f_jpg,q_${eleventyConfig.cloudinaryImgQuality},w_${eleventyConfig.cloudinaryImgWidth}/${cloudinaryImgUniquePath}"
          width="${aspectRatioWidth}"
          height="${aspectRatioHeight}"
          alt="${alt}" />
      </picture>`;
    }
  );

  // Responsive image shortcode V1
  eleventyConfig.srcsetWidths = [320, 640, 960, 1280, 1600, 1920, 2240, 2560];
  eleventyConfig.fallbackWidth = 640;
  eleventyConfig.aspectRatioWidth = 320;
  eleventyConfig.aspectRatioHeight = 240;

  eleventyConfig.addShortcode('respimg', function(
    src,
    alt,
    sizes,
    aspectRatioWidth = eleventyConfig.aspectRatioWidth,
    aspectRatioHeight = eleventyConfig.aspectRatioHeight,
    srcsetWidthRange = eleventyConfig.srcsetWidths
  ) {
    const cloudinaryBase = `https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/image/upload/`;
    var cloudinaryImgPath = src.replace(cloudinaryBase, '');
    return `<img
    eleventy:ignore
    class="u-full-parent-width"
    srcset="${srcsetWidthRange
      .map(w => {
        return `${cloudinaryBase}q_auto,f_auto,w_${w}/${cloudinaryImgPath} ${w}w`;
      })
      .join(', ')}"
    sizes="${sizes ? sizes : '100vw'}"
    src="${cloudinaryBase}q_auto,f_auto,w_${
      eleventyConfig.fallbackWidth
    }/${cloudinaryImgPath}"
    width="${aspectRatioWidth}" height="${aspectRatioHeight}"
    ${alt ? `alt="${alt}"` : ''}
    loading="lazy"
    decoding="async" />`;
  });
  // End DELETE ASAP
};



export const config = {
	// Control which files Eleventy will process
	// e.g.: *.md, *.njk, *.html, *.liquid
	templateFormats: [
		"md",
		"njk",
		"html",
		"liquid",
		"11ty.js",
	],

	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: "njk",

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: "njk",

	// These are all optional:
	dir: {
		input: "content",          // default: "."
		includes: "../_includes",  // default: "_includes" (`input` relative)
		data: "../_data",          // default: "_data" (`input` relative)
		output: "_site"
	},

	// -----------------------------------------------------------------
	// Optional items:
	// -----------------------------------------------------------------

	// If your site deploys to a subdirectory, change `pathPrefix`.
	// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

	// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
	// it will transform any absolute URLs in your HTML to include this
	// folder name and does **not** affect where things go in the output folder.

	// pathPrefix: "/",
};
