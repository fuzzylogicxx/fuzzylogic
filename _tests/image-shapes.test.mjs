import assert from 'node:assert/strict';
import {mkdtemp, readdir, readFile, rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import sharp from 'sharp';
import pluginFilters from '../_config/filters.js';
import {
  cropImage,
  cropSize,
  imageShapes,
  prepareImages,
  shapeFor,
} from '../_lib/image-shapes.mjs';
import {siteDir} from './helpers/site-paths.mjs';

const images = new Map([
  ['/img/wide.jpg', {shape: 'landscape', croppedUrl: '/img/cropped/wide.jpg'}],
  ['/img/square.jpg', {shape: 'square', croppedUrl: '/img/cropped/square.jpg'}],
  ['/img/tall.jpg', {shape: 'portrait'}],
  ['/img/café.jpg', {shape: 'square', croppedUrl: '/img/cropped/cafe.jpg'}],
]);
const md = markdownIt().use(markdownItAttrs).use(imageShapes, images);
const srcOf = (markdown) => md.render(markdown).match(/src="([^"]*)"/)[1];
const classOf = (markdown) => md.render(markdown).match(/class="([^"]*)"/)?.[1];

test('images within 5% of 1:1 are square', () => {
  assert.equal(shapeFor(1060, 1000), 'landscape');
  assert.equal(shapeFor(1050, 1000), 'square');
  assert.equal(shapeFor(950, 1000), 'square');
  assert.equal(shapeFor(940, 1000), 'portrait');
});

test('only landscape images are cropped automatically', () => {
  assert.equal(classOf('![a](/img/wide.jpg)'), 'img-landscape img-cropped');
  assert.equal(classOf('![a](/img/square.jpg)'), 'img-square');
  assert.equal(classOf('![a](/img/tall.jpg)'), 'img-portrait');
  assert.equal(classOf('![a](/img/café.jpg)'), 'img-square');
});

test('img-cropped and img-uncropped override the default', () => {
  assert.equal(
    classOf('![a](/img/wide.jpg){.img-uncropped}'),
    'img-uncropped img-landscape',
  );
  assert.equal(
    classOf('![a](/img/square.jpg){.img-cropped}'),
    'img-cropped img-landscape',
  );
});

test('cropped images point at the cropped copy', () => {
  assert.equal(srcOf('![a](/img/wide.jpg)'), '/img/cropped/wide.jpg');
  assert.equal(srcOf('![a](/img/wide.jpg){.img-uncropped}'), '/img/wide.jpg');
  assert.equal(srcOf('![a](/img/square.jpg)'), '/img/square.jpg');
  assert.equal(srcOf('![a](/img/square.jpg){.img-cropped}'), '/img/cropped/square.jpg');
  // no cropped copy, so don’t claim to be cropped
  assert.equal(classOf('![a](/img/tall.jpg){.img-cropped}'), 'img-portrait');
});

test('crops are exactly 3:2 and never larger than the source', () => {
  assert.deepEqual(cropSize(1600, 1200), {width: 1599, height: 1066});
  assert.deepEqual(cropSize(1700, 956), {width: 1434, height: 956});
  assert.deepEqual(cropSize(1512, 1512), {width: 1512, height: 1008});
});

test('crop files: size, rotation, and a new file when the ratio changes', async (t) => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'crop-test-'));
  t.after(() => rm(dir, {recursive: true, force: true}));
  // stored as 800×600, flagged as rotated, so it displays as 600×800
  const source = path.join(dir, 'rotated.jpg');
  await sharp({create: {width: 800, height: 600, channels: 3, background: '#888'}})
    .jpeg()
    .withMetadata({orientation: 6})
    .toFile(source);
  const out = path.join(dir, 'out');
  const sizeOf = async (stat) => {
    const {width, height} = await sharp(stat.outputPath).metadata();
    return {width, height};
  };

  const threeByTwo = await cropImage(source, {width: 600, height: 800}, out);
  assert.deepEqual(await sizeOf(threeByTwo), {width: 600, height: 400});

  const fourByThree = await cropImage(source, {width: 600, height: 800}, out, [4, 3]);
  assert.notEqual(fourByThree.url, threeByTwo.url);
  assert.deepEqual(await sizeOf(fourByThree), {width: 600, height: 450});
});

test('unknown and remote images get no class', () => {
  assert.equal(classOf('![a](/img/missing.jpg)'), undefined);
  assert.equal(classOf('![a](https://example.com/wide.jpg)'), undefined);
});

test('the md filter used for excerpts adds shape classes', async () => {
  const filters = {};
  pluginFilters({
    addFilter: (name, fn) => {
      filters[name] = fn;
    },
  });
  await prepareImages();

  const html = filters.md('![a](/img/uploads/happyweddingtim.jpg "Caption")');
  assert.match(html, /<figure><img [^>]*class="img-portrait"/);
});

test('built post pages and lists carry the shape classes', async () => {
  const read = (file) => readFile(path.join(siteDir, file), 'utf8');
  const files = await readdir(path.join(siteDir, 'posts'), {recursive: true});
  const posts = (
    await Promise.all(
      files.filter((f) => f.endsWith('.html')).map((f) => read(path.join('posts', f))),
    )
  ).join('');

  for (const name of ['img-landscape', 'img-square', 'img-portrait', 'img-cropped']) {
    assert.match(
      posts,
      new RegExp(`<img [^>]*class="[^"]*${name}`),
      `no ${name} image in built posts`,
    );
  }
  assert.match(await read('posts/index.html'), /<img [^>]*class="[^"]*img-/);

  // the width and height in the HTML match the crop
  const cropped = [...posts.matchAll(/<img [^>]*class="[^"]*img-cropped[^>]*>/g)].map(
    (match) => match[0],
  );
  for (const img of cropped) {
    const width = Number(img.match(/ width="(\d+)"/)[1]);
    const height = Number(img.match(/ height="(\d+)"/)[1]);
    assert.equal(width / height, 3 / 2, img);
  }
});
