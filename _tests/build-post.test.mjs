import assert from 'node:assert/strict'
import test from 'node:test'
import { buildPost, resolveTags, slugify, tagKey } from '../_lib/build-post.mjs'
import { loadKnownTags } from '../_lib/known-tags.mjs'
import { extractMetadata } from '../_lib/page-metadata.mjs'

// 5 July 2025, 16:41 UTC = 17:41 in Europe/London (BST)
const now = new Date('2025-07-05T16:41:00Z')

const knownTags = { css: 77, designsystems: 15, customproperties: 6, 'dining-out': 16, CSS: 1, 'design-systems': 1 }

test('slugify produces clean url slugs', () => {
	assert.equal(slugify("NYC's Design System: CSS variables!"), 'nycs-design-system-css-variables')
	assert.equal(slugify('  Café — déjà vu  '), 'cafe-deja-vu')
})

test('link post is slug-only, link-tagged, with Decap field order and wall-clock date', () => {
	const { post, url, date } = buildPost(
		{
			type: 'link',
			url: 'https://designsystem.ny.gov/about/updates/css-variables/',
			title: 'NY design system and custom properties',
			description: 'How NY uses CSS variables',
			quote: 'Line one\n\nLine two',
			comment: 'Nice write-up.',
			tags: ['CSS', 'design systems'],
		},
		now,
	)
	assert.equal(post.path, 'content/posts/ny-design-system-and-custom-properties.md')
	assert.equal(url, '/posts/ny-design-system-and-custom-properties/')
	assert.equal(date, '2025-07-05T17:41')
	assert.equal(
		post.markdown,
		[
			'---',
			'title: NY design system and custom properties',
			'description: How NY uses CSS variables',
			'noteWithTitle: false',
			'linkTarget: https://designsystem.ny.gov/about/updates/css-variables/',
			'date: 2025-07-05T17:41',
			'tags:',
			'  - link',
			'  - css',
			'  - design-systems',
			'---',
			'> Line one',
			'>',
			'> Line two',
			'',
			'Nice write-up.',
			'',
		].join('\n'),
	)
})

test('draft goes after the title; awkward strings are quoted', () => {
	const { post } = buildPost(
		{ type: 'link', url: 'https://example.com/', title: 'Why: a "test"', tags: ['css'], draft: true },
		now,
	)
	assert.match(post.markdown, /^---\ntitle: "Why: a \\"test\\""\ndraft: true\n/)
})

test('link post without a url or without a category tag is rejected', () => {
	assert.throws(() => buildPost({ type: 'link', title: 'x', tags: ['css'] }, now), /url/)
	assert.throws(() => buildPost({ type: 'link', url: 'https://example.com/' }, now), /tag/)
	assert.throws(() => buildPost({ type: 'link', url: 'https://example.com/', tags: ['note', 'Link'] }, now), /tag/)
})

test('a supplied date is used for the filename and frontmatter instead of now', () => {
	const { post, date } = buildPost(
		{ type: 'note', comment: 'x', tags: ['music'], date: '2025-01-02T03:04' },
		now,
	)
	assert.equal(post.path, 'content/posts/2025-01-02-03-04.md')
	assert.equal(date, '2025-01-02T03:04')
	assert.match(post.markdown, /date: 2025-01-02T03:04\n/)
	assert.throws(() => buildPost({ type: 'note', comment: 'x', tags: ['music'], date: '2025-01-02' }, now))
})

test('note post uses time filename, noindex, optional title and image', () => {
	const { post, image } = buildPost(
		{
			type: 'note',
			title: 'Gig report',
			comment: 'Great night.',
			tags: ['music'],
			location: 'Glasgow',
			image: { data: 'QUJD', ext: 'jpg', alt: 'The stage', caption: 'Stage' },
		},
		now,
	)
	assert.equal(post.path, 'content/posts/2025-07-05-17-41.md')
	assert.match(post.markdown, /noteWithTitle: true/)
	assert.match(post.markdown, /pageSpecificRobotsDirective: noindex, nofollow/)
	assert.match(post.markdown, /tags:\n {2}- note\n {2}- music\n/)
	assert.match(post.markdown, /location: Glasgow/)
	assert.equal(image.path, 'content/img/uploads/2025-07-05-17-41.jpg')
	assert.match(post.markdown, /!\[The stage\]\(\/img\/uploads\/2025-07-05-17-41\.jpg "Stage"\)/)
})

test('untitled note says noteWithTitle: false and has no title', () => {
	const { post } = buildPost({ type: 'note', comment: 'Quick thought', tags: ['life'] }, now)
	assert.doesNotMatch(post.markdown, /title:/)
	assert.match(post.markdown, /noteWithTitle: false/)
})

test('a note with no comment, quote or image is rejected', () => {
	assert.throws(() => buildPost({ type: 'note', tags: ['life'] }, now), /comment/)
	assert.doesNotThrow(() => buildPost({ type: 'note', quote: 'q', tags: ['life'] }, now))
})

test('tagKey ignores case, spaces and punctuation', () => {
	assert.equal(tagKey('Design Systems'), 'designsystems')
	assert.equal(tagKey('custom-properties'), 'customproperties')
})

test('requested tags reuse the most-used existing spelling, drop type names and flag new ones', () => {
	const { tags, newTags } = resolveTags(
		{ type: 'link', tags: ['CSS', 'design systems', 'Custom Properties', 'Dining Out', 'note', 'Brand New Thing', 'brand-new-thing'] },
		knownTags,
	)
	assert.deepEqual(tags, ['link', 'css', 'designsystems', 'customproperties', 'dining-out', 'brand-new-thing'])
	assert.deepEqual(newTags, ['brand-new-thing'])
})

test('all-digit tags are quoted so YAML keeps them as strings', () => {
	const { post } = buildPost({ type: 'note', comment: 'x', tags: ['2020'] }, now, { 2020: 3 })
	assert.match(post.markdown, /\n {2}- "2020"\n/)
})

test('link post body opens with the description as a blockquote, unless a quote is given', () => {
	const base = { type: 'link', url: 'https://example.com/', description: 'Their summary.', tags: ['css'] }
	assert.match(buildPost(base, now).post.markdown, /---\n> Their summary\.\n$/)
	const withQuote = buildPost({ ...base, quote: 'Chosen bit', comment: 'My take' }, now).post.markdown
	assert.match(withQuote, /---\n> Chosen bit\n\nMy take\n$/)
	assert.ok(!withQuote.includes('> Their summary'))
})

test('buildPost passes newTags through', () => {
	const result = buildPost({ type: 'note', comment: 'x', tags: ['design systems', 'zzz'] }, now, knownTags)
	assert.match(result.post.markdown, /tags:\n {2}- note\n {2}- designsystems\n {2}- zzz\n/)
	assert.deepEqual(result.newTags, ['zzz'])
})

test('extractMetadata prefers og tags and decodes entities in one pass', () => {
	const html = `<title>Fallback &amp; title</title>
		<meta property="og:title" content="OG Title">
		<meta name="description" content="Plain desc">`
	assert.deepEqual(extractMetadata(html), { title: 'OG Title', description: 'Plain desc' })
	assert.equal(extractMetadata('<title>A &amp; B</title>').title, 'A & B')
	assert.equal(
		extractMetadata('<title>It&#8217;s &#x27;fine&#x27; &mdash; really&hellip; &amp;lt; &bogus;</title>').title,
		'It’s \'fine\' — really… &lt; &bogus;',
	)
})

test('loadKnownTags returns the parsed list, or null when unavailable', async () => {
	const ok = async () => ({ ok: true, json: async () => ({ css: 2 }) })
	assert.deepEqual(await loadKnownTags({ URL: 'https://example.com' }, ok), { css: 2 })
	assert.equal(await loadKnownTags({}, ok), null)
	assert.equal(await loadKnownTags({ URL: 'https://example.com' }, async () => ({ ok: false })), null)
	assert.equal(
		await loadKnownTags({ URL: 'https://example.com' }, async () => {
			throw new Error('offline')
		}),
		null,
	)
})
