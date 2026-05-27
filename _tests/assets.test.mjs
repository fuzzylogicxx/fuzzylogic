// Idea from Kitty Giraudel – thanks!:
// https://kittygiraudel.com/2026/03/12/adding-tests-to-an-eleventy-site/

import assert from 'node:assert/strict'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import { siteDir } from './helpers/site-paths.mjs'

async function expectFile(relativePath) {
	const full = path.join(siteDir, relativePath)
	const s = await stat(full)
	assert.ok(s.isFile(), `${relativePath} should exist as a file`)
}

async function expectDirectoryWithFiles(relativePath) {
	const full = path.join(siteDir, relativePath)
	const s = await stat(full)
	assert.ok(s.isDirectory(), `${relativePath} should exist as a directory`)
	const files = await readdir(full)
	assert.ok(files.length > 0, `${relativePath} should not be empty`)
}

test('Core assets exist in built site', async () => {
	await Promise.all([
		expectFile('robots.txt'),
    expectFile('favicon.ico'),
		expectFile('404.html'),
    expectFile('sitemap.xml'),
    expectFile('feed/feed.xml'),
		expectDirectoryWithFiles('img'),
		expectDirectoryWithFiles('pagefind'),
	])
})
