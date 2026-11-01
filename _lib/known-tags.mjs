/**
 * Tag -> number of posts, as published by the site itself at /known-tags.json
 * (content/known-tags.json.njk). Returns null if it can't be fetched, so the
 * caller can say tags weren't checked instead of calling every tag new.
 */
export async function loadKnownTags(env = process.env, fetchImpl = fetch) {
	const url = env.KNOWN_TAGS_URL ?? (env.URL && `${env.URL}/known-tags.json`)
	if (!url) return null
	try {
		const response = await fetchImpl(url, { signal: AbortSignal.timeout(5000) })
		return response.ok ? await response.json() : null
	} catch {
		return null
	}
}
