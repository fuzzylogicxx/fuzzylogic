# Quick post capture

`POST /api/post` (Netlify Function, `netlify/functions/post.mjs`) turns a small JSON payload into a post and commits it to `main`. Post-building logic lives in `_lib/build-post.mjs` (pure, unit-tested in `_tests/build-post.test.mjs`).

## Setup (Netlify env vars)

| Var | Value |
| --- | --- |
| `POST_SECRET` | Long random string; sent by clients in the `x-post-secret` header |
| `GITHUB_TOKEN` | Fine-grained PAT, this repo only, `Contents: read & write` |
| `GITHUB_REPO` | `fuzzylogicxx/fuzzylogic` |
| `GITHUB_BRANCH` | Optional, defaults to `main` |

## Payload

```json
{
  "type": "link",
  "url": "https://example.com/article",
  "title": "optional – fetched from the page if omitted",
  "description": "optional – fetched from the page if omitted",
  "quote": "optional selected text; becomes the opening blockquote (else the page description is used)",
  "comment": "your commentary",
  "tags": ["css", "design systems"],
  "location": "optional",
  "image": { "data": "<base64>", "ext": "jpg", "alt": "", "caption": "" },
  "date": "2025-07-05T17:41",
  "draft": false,
  "dryRun": true
}
```

`type: "note"` needs no `url`, its title is optional, and it needs a `comment`, `quote` or `image`. `date` is London wall-clock time in the same format as the frontmatter; leave it out on the dry run. Tags are matched to your existing ones (see Tags); unknown ones come back in `newTags`.

## Tags

At least one tag besides `link`/`note` is required (the layout links to the first one as the post's category). Tag names that are post types are ignored.

The site publishes its own tag list at `/known-tags.json` (`content/known-tags.json.njk`, built from the same collections as the Tags page). The function fetches it from `$URL` (set by Netlify; override with `KNOWN_TAGS_URL`, e.g. `http://localhost:8080/known-tags.json` in dev). Requested tags are matched ignoring case, spaces and hyphens and reuse your most-used existing spelling. Unmatched tags are added as lowercase-hyphenated and listed in `newTags`. If the list can't be fetched the response has `tagsChecked: false` and `newTags` is empty (not meaningful).

## Preview then publish

1. Send with `"dryRun": true`. The response contains `path`, `title`, `description`, `date`, `markdown`, `newTags`, `tagsChecked` and `url`.
2. Show `markdown` to the user, flagging any `newTags` (tags not already used on the site). On confirmation, send the same payload with `"dryRun": false` **and the returned `date`** (so the committed post is exactly the one previewed) (or `"draft": true` to save unpublished).

## iOS Shortcut (Share Sheet) outline

1. Accept URLs, Text and Images from the Share Sheet.
2. *Choose from Menu*: Link / Note.
3. *Ask for Input*: comment, then tags (comma separated).
4. *Dictionary* → build payload with `dryRun: true`; *Get Contents of URL* (POST, JSON, header `x-post-secret`).
5. *Get Dictionary Value* `markdown` (and `newTags`). To edit the fetched title or description, take them from this first response, ask for input pre-filled with them, then send the final request with your edited values and the returned `date`.
6. Show `markdown` → *Choose from Menu*: Publish / Save as draft / Cancel (show the markdown as the prompt).
7. Publish → repeat the request with `dryRun: false`. Draft → also `draft: true`.

## Notes

- Link posts are named `<slug>.md` (as Decap does); notes are `YYYY-MM-DD-HH-mm.md`. An existing file with the same name makes the request fail rather than overwrite.
- A photo goes in as its own commit before the post, so it can briefly deploy ahead of the post. Netlify Functions accept roughly 6 MB per request, so resize/convert photos in the Shortcut first.
