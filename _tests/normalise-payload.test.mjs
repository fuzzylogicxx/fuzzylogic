import assert from 'node:assert/strict'
import test from 'node:test'
import { buildPost, normalisePayload } from '../_lib/build-post.mjs'

const now = new Date('2025-07-05T16:41:00Z')

test('blank and null fields are treated as absent', () => {
	assert.deepEqual(
		normalisePayload({ type: 'link', url: 'https://example.com/', comment: '', title: '  ', location: null }),
		{ type: 'link', url: 'https://example.com/' },
	)
})

test('tags may be a comma-separated string; blanks and trailing commas are dropped', () => {
	assert.deepEqual(normalisePayload({ tags: 'css, design systems,' }).tags, ['css', 'design systems'])
	assert.deepEqual(normalisePayload({ tags: ['css', ' ', 'a11y '] }).tags, ['css', 'a11y'])
})

test('an image with no data is dropped, a real one is kept', () => {
	assert.equal('image' in normalisePayload({ image: { data: '', ext: 'jpg' } }), false)
	assert.deepEqual(normalisePayload({ image: { data: 'QUJD', ext: 'jpg' } }).image, { data: 'QUJD', ext: 'jpg' })
})

test('non-object input is passed through for the schema to reject', () => {
	assert.equal(normalisePayload(undefined), undefined)
	assert.equal(normalisePayload('x'), 'x')
})

test('a Shortcut-style link payload with blanks builds a valid post', () => {
	const { post } = buildPost(
		{
			type: 'link',
			url: 'https://example.com/a',
			title: 'A page',
			comment: '',
			tags: 'css, design systems,',
			location: '',
			image: { data: '', ext: 'jpg', alt: '', caption: '' },
		},
		now,
		{ designsystems: 15, css: 77 },
	)
	assert.match(post.markdown, /tags:\n {2}- link\n {2}- css\n {2}- designsystems\n/)
	assert.doesNotMatch(post.markdown, /location|!\[/)
})

test('a note with only a blank comment is still rejected', () => {
	assert.throws(() => buildPost({ type: 'note', comment: ' ', tags: 'life' }, now), /comment/)
})
