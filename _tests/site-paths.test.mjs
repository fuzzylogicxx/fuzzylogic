import assert from 'node:assert/strict'
import path from 'node:path'
import test from 'node:test'
import { siteDir } from './helpers/site-paths.mjs'

test('siteDir helper returns an absolute path', () => {
	assert.equal(typeof siteDir, 'string')
	assert.ok(siteDir.length > 0)
	assert.ok(path.isAbsolute(siteDir), 'siteDir should be absolute')
})
