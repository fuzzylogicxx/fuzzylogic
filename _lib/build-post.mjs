import { DateTime } from 'luxon'
import { z } from 'zod'

const ZONE = 'Europe/London'
const DATE_FORMAT = "yyyy-MM-dd'T'HH:mm"
const UPLOADS_DIR = 'content/img/uploads'
const POSTS_DIR = 'content/posts'
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif']
// Same list as the filterTagList filter in _config/filters.js: these aren't categories.
const TYPE_TAGS = ['all', 'entry', 'link', 'note', 'posts']

// Case-, space- and punctuation-insensitive, so "Design Systems", "design-systems"
// and "designsystems" all find the same existing tag.
export const tagKey = (tag) => tag.toLowerCase().replace(/[^a-z0-9]/g, '')

const categoryTags = (tags = []) =>
	tags.filter((tag) => !TYPE_TAGS.includes(tagKey(tag)))

export const payloadSchema = z
	.object({
		type: z.enum(['link', 'note']),
		url: z.string().url().optional(),
		title: z.string().trim().min(1).optional(),
		description: z.string().trim().min(1).optional(),
		quote: z.string().trim().min(1).optional(),
		comment: z.string().trim().min(1).optional(),
		tags: z.array(z.string().trim().min(1)).optional(),
		location: z.string().trim().min(1).optional(),
		image: z
			.object({
				data: z.string().min(1), // base64
				ext: z.enum(IMAGE_EXTENSIONS),
				alt: z.string().optional(),
				caption: z.string().optional(),
			})
			.optional(),
		// Local (London) wall-clock time, e.g. 2025-07-05T17:41. Sent back from a
		// dry run so that publishing commits exactly what was previewed.
		date: z
			.string()
			.refine((d) => DateTime.fromFormat(d, DATE_FORMAT, { zone: ZONE }).isValid, {
				message: `Date must look like ${DATE_FORMAT}`,
			})
			.optional(),
		draft: z.boolean().optional(),
		dryRun: z.boolean().optional(),
	})
	.refine((p) => p.type !== 'link' || p.url, {
		message: 'A link post needs a url',
		path: ['url'],
	})
	// The layout links to /tags/<first tag after the type>, so one is always needed.
	.refine((p) => categoryTags(p.tags).length > 0, {
		message: 'At least one tag (other than link/note) is needed',
		path: ['tags'],
	})
	.refine((p) => p.type !== 'note' || p.comment || p.quote || p.image, {
		message: 'A note needs a comment, quote or image',
		path: ['comment'],
	})

export function slugify(text) {
	return text
		.normalize('NFKD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.replace(/['’]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 80)
		.replace(/-+$/, '')
}

// Plain scalar when it's safe (as Decap writes), otherwise a quoted JSON string.
const yamlString = (value) =>
	/^[\p{L}][\p{L}\p{N} ,.'’()/&–—-]*$/u.test(value) &&
	!/^(true|false|null|yes|no|on|off)$/i.test(value) &&
	!value.endsWith(' ')
		? value
		: JSON.stringify(value)

const yamlUrl = (url) => (/^https?:\/\/[^\s#'"]+$/.test(url) ? url : JSON.stringify(url))

const yamlTag = (tag) => (/^[\p{L}\p{N}_-]+$/u.test(tag) && !/^\d+$/.test(tag) ? tag : JSON.stringify(tag))

export function buildFilename(payload, when) {
	if (payload.type === 'note') return `${when.toFormat('yyyy-MM-dd-HH-mm')}.md`
	const slug = slugify(payload.title ?? new URL(payload.url).hostname) || 'link'
	return `${slug}.md`
}

/** Map tagKey -> the most-used existing spelling of that tag. */
export function indexKnownTags(knownTags) {
	const index = new Map()
	for (const [tag, count] of Object.entries(knownTags)) {
		const key = tagKey(tag)
		const current = index.get(key)
		if (key && (!current || count > knownTags[current])) index.set(key, tag)
	}
	return index
}

/**
 * The first tag must be the post type: posts.11tydata.js derives postType from tags[1].
 * Requested tags reuse your existing spelling where one exists; anything else is
 * returned in `newTags` so the preview can flag it.
 */
export function resolveTags(payload, knownTags = {}) {
	const index = indexKnownTags(knownTags)
	const tags = [payload.type]
	const newTags = []
	for (const requested of categoryTags(payload.tags)) {
		const key = tagKey(requested)
		if (!key) continue
		const existing = index.get(key)
		const tag = existing ?? slugify(requested)
		if (!existing && !newTags.includes(tag)) newTags.push(tag)
		if (!tags.includes(tag)) tags.push(tag)
	}
	return { tags, newTags }
}

// Field order follows what Decap writes (public/admin/config.yml).
export function buildFrontmatter(payload, when, tags) {
	const lines = []
	if (payload.title) lines.push(`title: ${yamlString(payload.title)}`)
	if (payload.draft) lines.push('draft: true')
	if (payload.description) {
		lines.push(`description: ${yamlString(payload.description)}`)
	}
	lines.push(`noteWithTitle: ${payload.type === 'note' && Boolean(payload.title)}`)
	if (payload.type === 'link') lines.push(`linkTarget: ${yamlUrl(payload.url)}`)
	if (payload.type === 'note') {
		lines.push('pageSpecificRobotsDirective: noindex, nofollow')
	}
	lines.push(`date: ${when.toFormat(DATE_FORMAT)}`)
	lines.push('tags:', ...tags.map((tag) => `  - ${yamlTag(tag)}`))
	if (payload.location) lines.push(`location: ${yamlString(payload.location)}`)
	return `---\n${lines.join('\n')}\n---\n`
}

export function buildBody(payload, imageWebPath) {
	const parts = []
	// A link post opens with a blockquote: your selected text, else the page's description.
	const quote = payload.quote ?? (payload.type === 'link' ? payload.description : undefined)
	if (quote) {
		parts.push(
			quote
				.split(/\r?\n/)
				.map((line) => (line ? `> ${line}` : '>'))
				.join('\n'),
		)
	}
	if (payload.comment) parts.push(payload.comment)
	if (imageWebPath) {
		const alt = payload.image.alt ?? ''
		const caption = payload.image.caption
			? ` ${JSON.stringify(payload.image.caption)}`
			: ''
		parts.push(`![${alt}](${imageWebPath}${caption})`)
	}
	return parts.join('\n\n')
}

/**
 * Pure: payload in, files out. `post.markdown` is exactly what gets committed and
 * previewed; `date` should be sent back with the publish request so the two match.
 */
export function buildPost(rawPayload, now = new Date(), knownTags = {}) {
	const payload = payloadSchema.parse(rawPayload)
	const when = payload.date
		? DateTime.fromFormat(payload.date, DATE_FORMAT, { zone: ZONE })
		: DateTime.fromJSDate(now, { zone: ZONE })
	const filename = buildFilename(payload, when)
	const base = filename.replace(/\.md$/, '')

	let image = null
	if (payload.image) {
		const imageName = `${base}.${payload.image.ext}`
		image = {
			path: `${UPLOADS_DIR}/${imageName}`,
			webPath: `/img/uploads/${imageName}`,
			base64: payload.image.data,
		}
	}

	const { tags, newTags } = resolveTags(payload, knownTags)
	const markdown = `${buildFrontmatter(payload, when, tags)}${buildBody(payload, image?.webPath)}\n`
	const post = { path: `${POSTS_DIR}/${filename}`, markdown }
	return { post, image, newTags, date: when.toFormat(DATE_FORMAT), url: `/posts/${base}/` }
}
