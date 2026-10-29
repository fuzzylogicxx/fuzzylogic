const NAMED_ENTITIES = {
	amp: '&',
	lt: '<',
	gt: '>',
	quot: '"',
	apos: "'",
	nbsp: ' ',
	lsquo: '‘',
	rsquo: '’',
	ldquo: '“',
	rdquo: '”',
	ndash: '–',
	mdash: '—',
	hellip: '…',
}

// One pass, so "&amp;lt;" correctly becomes "&lt;" rather than "<".
const decodeEntities = (text) =>
	text
		.replace(/&(?:#(\d+)|#x([0-9a-f]+)|([a-z]+));/gi, (match, dec, hex, name) => {
			if (name) return NAMED_ENTITIES[name.toLowerCase()] ?? match
			try {
				return String.fromCodePoint(dec ? Number(dec) : parseInt(hex, 16))
			} catch {
				return match
			}
		})
		.replace(/\s+/g, ' ')
		.trim()

function metaContent(html, attr, name) {
	const tags = html.match(/<meta\b[^>]*>/gi) ?? []
	for (const tag of tags) {
		const key = tag.match(new RegExp(`${attr}=["']${name}["']`, 'i'))
		const content = tag.match(/content=("([^"]*)"|'([^']*)')/i)
		if (key && content) return decodeEntities(content[2] ?? content[3])
	}
	return undefined
}

/** Pure: pull a title and description out of an HTML string. */
export function extractMetadata(html) {
	const titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
	return {
		title:
			metaContent(html, 'property', 'og:title') ??
			(titleTag ? decodeEntities(titleTag[1]) : undefined),
		description:
			metaContent(html, 'property', 'og:description') ??
			metaContent(html, 'name', 'description'),
	}
}

/** Best effort: returns {} on any failure so posting never blocks on it. */
export async function fetchMetadata(url, fetchImpl = fetch) {
	try {
		const response = await fetchImpl(url, {
			signal: AbortSignal.timeout(5000),
			headers: { 'user-agent': 'fuzzylogic-post-capture' },
		})
		if (!response.ok) return {}
		return extractMetadata((await response.text()).slice(0, 200_000))
	} catch {
		return {}
	}
}
