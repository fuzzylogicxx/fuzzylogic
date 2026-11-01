/**
 * Where to commit posts, from environment variables. Blank values (easy to
 * create in the Netlify UI) count as unset, so the branch falls back to main.
 */
export function githubTarget(env = process.env) {
	const repo = env.GITHUB_REPO?.trim()
	const token = env.GITHUB_TOKEN?.trim()
	const branch = env.GITHUB_BRANCH?.trim() || 'main'

	const missing = [
		['GITHUB_REPO', repo],
		['GITHUB_TOKEN', token],
	]
		.filter(([, value]) => !value)
		.map(([name]) => name)
	if (missing.length) {
		throw new Error(`Missing environment variable(s): ${missing.join(', ')}`)
	}
	if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) {
		throw new Error('GITHUB_REPO should look like owner/name')
	}
	return { repo, branch, token }
}
