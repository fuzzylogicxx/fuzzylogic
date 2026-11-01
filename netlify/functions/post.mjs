import { timingSafeEqual } from 'node:crypto'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { buildPost, payloadSchema } from '../../_lib/build-post.mjs'
import { loadKnownTags } from '../../_lib/known-tags.mjs'
import { fetchMetadata } from '../../_lib/page-metadata.mjs'

export const config = { path: '/api/post' }

const json = (body, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'content-type': 'application/json' },
	})

function isAuthorised(request, secret) {
	const given = Buffer.from(request.headers.get('x-post-secret') ?? '')
	const expected = Buffer.from(secret ?? '')
	return (
		expected.length > 0 &&
		given.length === expected.length &&
		timingSafeEqual(given, expected)
	)
}

async function commitFile({ repo, branch, token, path, content, message }) {
	const url = `https://api.github.com/repos/${repo}/contents/${path}`
	const headers = {
		authorization: `Bearer ${token}`,
		accept: 'application/vnd.github+json',
		'user-agent': 'fuzzylogic-post-capture',
	}
	const existing = await fetch(`${url}?ref=${branch}`, { headers })
	if (existing.ok) throw new Error(`${path} already exists`)

	const response = await fetch(url, {
		method: 'PUT',
		headers,
		body: JSON.stringify({ message, content, branch }),
	})
	if (!response.ok) {
		throw new Error(`GitHub ${response.status}: ${await response.text()}`)
	}
}

export default async function handler(request) {
	if (request.method !== 'POST') return json({ error: 'POST only' }, 405)
	if (!isAuthorised(request, process.env.POST_SECRET)) {
		return json({ error: 'Unauthorised' }, 401)
	}

	try {
		const payload = payloadSchema.parse(await request.json())

		// Fill in blanks deterministically from the linked page.
		if (payload.type === 'link' && (!payload.title || !payload.description)) {
			const meta = await fetchMetadata(payload.url)
			payload.title ??= meta.title
			payload.description ??= meta.description
		}

		const knownTags = await loadKnownTags()
		const { post, image, newTags, date, url } = buildPost(payload, new Date(), knownTags ?? {})
		const preview = {
			path: post.path,
			title: payload.title,
			description: payload.description,
			markdown: post.markdown,
			image: image?.path,
			date,
			tagsChecked: knownTags !== null,
			newTags: knownTags ? newTags : [],
			url,
		}
		if (payload.dryRun) return json({ dryRun: true, ...preview })

		const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH = 'main' } = process.env
		const target = { repo: GITHUB_REPO, branch: GITHUB_BRANCH, token: GITHUB_TOKEN }
		if (image) {
			await commitFile({
				...target,
				path: image.path,
				content: image.base64,
				message: `Add image for ${post.path}`,
			})
		}
		await commitFile({
			...target,
			path: post.path,
			content: Buffer.from(post.markdown).toString('base64'),
			message: `Add ${payload.type} post via capture: ${post.path}`,
		})
		return json({ dryRun: false, ...preview })
	} catch (error) {
		if (error instanceof ZodError) {
			return json({ error: fromZodError(error).message }, 400)
		}
		console.error(error)
		return json({ error: error.message }, 500)
	}
}
