import assert from 'node:assert/strict'
import test from 'node:test'
import { githubEditUrl, githubTarget } from '../_lib/github-target.mjs'

const env = { GITHUB_REPO: 'owner/repo', GITHUB_TOKEN: 'tok' }

test('branch defaults to main when GITHUB_BRANCH is unset or blank', () => {
	assert.equal(githubTarget(env).branch, 'main')
	assert.equal(githubTarget({ ...env, GITHUB_BRANCH: '' }).branch, 'main')
	assert.equal(githubTarget({ ...env, GITHUB_BRANCH: '  ' }).branch, 'main')
})

test('a set branch is used, and values are trimmed', () => {
	const target = githubTarget({
		GITHUB_REPO: ' owner/repo\n',
		GITHUB_TOKEN: ' tok ',
		GITHUB_BRANCH: ' scratch ',
	})
	assert.deepEqual(target, { repo: 'owner/repo', branch: 'scratch', token: 'tok' })
})

test('missing or blank repo/token is a clear error that does not leak values', () => {
	assert.throws(() => githubTarget({}), /GITHUB_REPO, GITHUB_TOKEN/)
	assert.throws(() => githubTarget({ ...env, GITHUB_REPO: '' }), /GITHUB_REPO/)
	assert.throws(() => githubTarget({ ...env, GITHUB_TOKEN: ' ' }), /GITHUB_TOKEN/)
})

test('a malformed repo is rejected', () => {
	assert.throws(() => githubTarget({ ...env, GITHUB_REPO: 'just-a-name' }), /owner\/name/)
})

test('edit URL points at the file on the target branch', () => {
	assert.equal(
		githubEditUrl({ repo: 'owner/repo', branch: 'main' }, 'content/posts/a-b.md'),
		'https://github.com/owner/repo/edit/main/content/posts/a-b.md',
	)
})
