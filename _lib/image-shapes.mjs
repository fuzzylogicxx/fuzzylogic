// Tools to iterate the local original images, identify each image’s shape, and crop relevant images to our target aspect ratio.
// It’s not a replacement for our 11ty image HTML Transform. Rather, it preps images so that the 11ty image transform gets the ideal source to work on.
//
// Every image file in content/img gets its shape identified. A cropped copy is made of
// each landscape and square image, except GIFs. The cropped copy is only _used_ if the Markdown
// image ends up with the class `img-cropped`:
// - landscape images get that class automatically, unless you opt an image out by adding `{.img-uncropped}`
// - square images only get it if you manually add `{.img-cropped}` to the markdown image, thus calling it out as an exception
// - portraits and GIFs are never cropped
//
// Each image also gets one of the shape classes `img-landscape`, `img-square` or `img-portrait`, describing its shape as displayed.
// An original image that’s square but has been opted into cropping will therefore get class img-landscape.
//
// Images with img-cropped have their `src` value set at the new, cropped copy rather than the original image, so the width and height
// that end up in the HTML match what is shown. 
//
// Hand-written <img> tags and remote images are left alone.
//
import {readdir} from 'node:fs/promises';
import path from 'node:path';
import Image from '@11ty/eleventy-img';

// Width ÷ height of cropped images
export const CROP_RATIO = [3, 2];

// How far from 1:1 an image can be and still count as square
const SQUARE_TOLERANCE = 0.05;

// Generated copies, relative to the content directory. Ignored by git.
export const CROPPED_DIR = 'img/cropped';

// siteImages is a lookup.
// Give it an image URL (as written in Markdown), to get back these details: { shape, croppedUrl }
const siteImages = new Map();

export function shapeFor(width, height) {
  const ratio = width / height;
  if (ratio > 1 + SQUARE_TOLERANCE) return 'landscape';
  if (ratio < 1 - SQUARE_TOLERANCE) return 'portrait';
  return 'square';
}

// The largest area of exactly the given ratio that fits, so nothing is ever enlarged
export function cropSize(width, height, [x, y] = CROP_RATIO) {
  const unit = Math.floor(Math.min(width / x, height / y));
  return {width: unit * x, height: unit * y};
}

// Writes a centred crop of the file and returns its details
export async function cropImage(file, {width, height}, outputDir, ratio = CROP_RATIO) {
  const size = cropSize(width, height, ratio);
  const stats = await Image(file, {
    widths: ['auto'],
    formats: [null], // keep the source format
    outputDir,
    urlPath: `/${CROPPED_DIR}/`,
    // These copies are encoded again by the HTML transform, so keep quality high
    sharpJpegOptions: {quality: 95},
    sharpWebpOptions: {quality: 95},
    transform: (sharp) => {
      sharp.resize({...size, fit: 'cover', position: 'centre'});
    },
    // Eleventy Image’s cache cannot see changes to `transform`, so name the ratio here
    manualCacheKey: `crop-${ratio.join('x')}`,
  });
  return Object.values(stats)[0][0];
}

// Reading and cropping are asynchronous but Markdown rendering is not,
// so call this before the build starts.
export async function prepareImages(contentDir = 'content') {
  const imageDir = path.join(contentDir, 'img');
  const croppedDir = path.join(contentDir, CROPPED_DIR);
  const entries = await readdir(imageDir, {recursive: true, withFileTypes: true});
  const files = entries
    .filter((entry) => entry.isFile() && /\.(avif|gif|jpe?g|png|webp)$/i.test(entry.name))
    .map((entry) => path.join(entry.parentPath, entry.name))
    .filter(
      (file) => !path.resolve(file).startsWith(path.resolve(croppedDir) + path.sep),
    );

  const images = await Promise.all(
    files.map(async (file) => {
      // statsOnly reads dimensions (allowing for EXIF rotation) without writing any files
      const stats = await Image(file, {
        statsOnly: true,
        widths: ['auto'],
        formats: ['auto'],
        useCache: false,
      });
      const source = Object.values(stats)[0][0];
      const shape = shapeFor(source.width, source.height);

      // Portraits are never cropped, and GIFs are left alone as they may be animated
      const croppable = shape !== 'portrait' && !/\.gif$/i.test(file);
      const croppedUrl = croppable
        ? (await cropImage(file, source, croppedDir)).url
        : undefined;

      const url = '/' + path.relative(contentDir, file).split(path.sep).join('/');
      return [url, {shape, croppedUrl}];
    }),
  );

  siteImages.clear();
  for (const [url, image] of images) siteImages.set(url, image);
}

// markdown-it plugin
export function imageShapes(md, images = siteImages) {
  const renderImage = md.renderer.rules.image;

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    // markdown-it percent-encodes URLs, so decode before looking up
    const image = images.get(decodeURI(token.attrGet('src')));

    if (image) {
      const {shape, croppedUrl} = image;
      const classes = new Set(
        (token.attrGet('class') || '').split(/\s+/).filter(Boolean),
      );
      const crop =
        croppedUrl &&
        (classes.has('img-cropped') ||
          (shape === 'landscape' && !classes.has('img-uncropped')));

      // The shape class describes the image as displayed, and every crop is landscape
      classes.add(`img-${crop ? 'landscape' : shape}`);

      if (crop) {
        classes.add('img-cropped');
        token.attrSet('src', croppedUrl);
      } else {
        classes.delete('img-cropped');
      }
      token.attrSet('class', [...classes].join(' '));
    }

    return renderImage(tokens, idx, options, env, self);
  };
}
