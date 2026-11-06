# Quick post capture

Share a link (or, soon, a note and photo) from iPhone or Mac and it becomes a correctly formatted post on `main`, after a preview.

```
iOS Share Sheet Shortcut ──POST /api/post──► Netlify Function ──GitHub Contents API──► commit to main ──► Netlify build
```

- **Function**: `netlify/functions/post.mjs`, served at `/api/post`.
- **Post-building logic** (pure, unit-tested): `_lib/build-post.mjs`; tests in `_tests/`.
- **Helpers**: `_lib/page-metadata.mjs` (title/description from the linked page), `_lib/known-tags.mjs` (fetches the tag list), `_lib/github-target.mjs` (repo/branch/token and the GitHub edit link).
- **Tag list**: `content/known-tags.json.njk` publishes `/known-tags.json`.
- No AI and no extra dependencies. Everything is deterministic.

## 1. Setup from scratch

### GitHub token
GitHub → Settings → Developer settings → Fine-grained personal access tokens → Generate. Repository access: **only** `fuzzylogicxx/fuzzylogic`. Permissions: **Contents: Read and write**. Set an expiry and diarise it; when it expires, posting fails with a GitHub 401.

### Netlify environment variables
Site configuration → Environment variables. After changing any, trigger a new deploy.

| Var | Value |
| --- | --- |
| `POST_SECRET` | Long random string (`openssl rand -base64 32`). Sent by clients in the `x-post-secret` header |
| `GITHUB_TOKEN` | The token above |
| `GITHUB_REPO` | `fuzzylogicxx/fuzzylogic` |
| `KNOWN_TAGS_URL` | `https://fuzzylogic.me/known-tags.json` (optional; defaults to `$URL/known-tags.json`) |
| `GITHUB_BRANCH` | Leave **unset**. Defaults to `main`. A blank value is treated as unset |

To rotate `POST_SECRET`: change it in Netlify, redeploy, then update the `Secret` Text action in the Shortcut. Never paste it into chats or commits.

### Test with curl
```sh
curl -s https://fuzzylogic.me/api/post \
  -H "x-post-secret: $POST_SECRET" -H "content-type: application/json" \
  -d '{"type":"link","url":"https://example.com/","tags":"css","dryRun":true}'
```
No header → `401`. Bad payload → `400` with the reason. `dryRun: true` never commits.

## 2. API

### Payload

```json
{
  "type": "link",
  "url": "https://example.com/article",
  "title": "optional – fetched from the page if omitted",
  "description": "optional – fetched from the page if omitted",
  "quote": "optional selected text; becomes the opening blockquote (else the page description is used)",
  "comment": "your commentary",
  "tags": "css, design systems",
  "location": "optional",
  "image": { "data": "<base64>", "ext": "jpg", "alt": "", "caption": "" },
  "date": "2025-07-05T17:41",
  "draft": false,
  "dryRun": true
}
```

- `type: "note"` needs no `url`, its title is optional, and it needs a `comment`, `quote` or `image`. A note's `description` defaults to "A short note" (as in Decap) unless you send one.
- Shortcuts can't put a variable inside a nested dictionary, so a photo may instead be sent as flat Text fields `imageData` (base64), `imageExt` (defaults to `jpg`), `imageAlt` and `imageCaption`. Same result as `image`.
- Image base64 is tidied first (line breaks, a `data:` prefix, URL-safe characters, missing padding). If it still isn't valid base64 the request fails with "Image data is not valid base64" (also on a dry run) rather than a GitHub 422.
- Blank strings and `null` count as absent (Shortcuts can't skip a field); an `image` with empty `data` means no image.
- `tags` is a list or one comma-separated string. At least one tag besides `link`/`note` is required (the layout links to the first one as the post's category). Post-type tags are ignored.
- `date` is London wall-clock time, `yyyy-MM-ddTHH:mm`, no offset. Leave it out on the dry run and send back the one returned.

### Tags
The function fetches the site's `/known-tags.json` and matches requested tags ignoring case, spaces and hyphens, reusing the most-used existing spelling. Unmatched tags are added as lowercase-hyphenated and listed in `newTags`. If the list can't be fetched, `tagsChecked` is `false` and `newTags` is empty (not meaningful).

### Response
Dry run: `path`, `title`, `description`, `markdown`, `image`, `date`, `tagsChecked`, `newTags`, `url`.
Real publish: the same, plus `editUrl` (file in the GitHub web editor) and `decapUrl` (entry in Decap: `/admin/#/collections/blog/entries/<slug>` for links, `/note/` for notes).
Errors: `{ "error": "..." }` with `400`, `401` or `500`. The Shortcut checks for `error`.

### Behaviour worth knowing
- Link posts are `content/posts/<slug>.md` (as Decap does); notes are `YYYY-MM-DD-HH-mm.md`. If the file already exists the request fails (`... already exists`) rather than overwriting.
- A link body opens with a blockquote of the selected text, else the page description.
- `draft: true` posts are committed but not built into the site.
- Frontmatter follows Decap's field order, so a later Decap save produces no noisy diff.
- A photo is committed first, as its own commit, so it can briefly deploy ahead of the post. Netlify Functions accept ~6 MB per request, so resize in the Shortcut.

## 3. Link Shortcut: "Post to Fuzzy Logic" (iOS 26)

Items marked **[verify]** are reconstructed from memory of the build; check them against the real shortcut, then delete the marker.

**Shortcut details (ⓘ):** Show in Share Sheet on. Accepts **URLs** (and **Articles**, **Safari web pages**) **[verify]**.

**Setup**
1. **Text** `https://fuzzylogic.me/api/post` → **Set Variable** `Endpoint`
2. **Text** *(the POST_SECRET value)* → **Set Variable** `Secret`

**Gather input**
3. **Get URLs from** *Shortcut Input* (clear the default pill and choose Shortcut Input)
4. **Get Item from List** *First Item* → **Set Variable** `Link`
5. **Ask for Input** (Text), prompt "Comment" → **Set Variable** `Comment` (may be left blank)
6. **Ask for Input** (Text), prompt "Tags" → **Set Variable** `Tags` (comma separated)

**Preview request**
7. **Get Contents of URL** `Endpoint`
   - Method: **POST**
   - Headers: `x-post-secret` = `Secret`
   - Request Body: **JSON**: `type` Text `link`; `url` Text `Link`; `comment` Text `Comment`; `tags` Text `Tags`; `dryRun` Boolean **on**
8. **Set Variable** `Preview`
9. Five times, **Get Dictionary Value** for *Value* with key `date`, `title`, `description`, `markdown`, `newTags` in `Preview`, each followed by **Set Variable** `Date`, `Title`, `Description`, `Markdown`, `NewTags`

**Flag new tags**
10. **If** `NewTags` *has any value* → **Show Alert** (message mentions `NewTags`; its Cancel stops the shortcut) → **End If**. Delete any blank condition rows that appear under the If; they cause "Please choose a value for each parameter".

**Review and choose**
11. **Show Content** `Markdown` **[verify]**
12. **Choose from Menu**, three options:
    - **Publish** → **Get Contents of URL**: same as step 7 but `dryRun` **off**, plus `title` `Title`, `description` `Description`, `date` `Date` → **Set Variable** `Result`
    - **Save as draft** → the same, plus `draft` Boolean **on** → **Set Variable** `Result`
    - **Cancel** → **Stop This Shortcut**
    - **End Menu**

**Report the outcome** (after End Menu, shared by Publish and Draft)
13. **Get Dictionary Value** *Value* for `error` in `Result` → **Set Variable** `Error`
14. **If** `Error` *has any value*
    - **Show Alert** `Error`
    - **Otherwise**:
      - **Get Dictionary Value** `decapUrl` in `Result` → **Set Variable** `DecapURL`
      - **Get Dictionary Value** `editUrl` in `Result` → **Set Variable** `GitHubURL`
      - **Choose from Menu** prompt "Posted. Edit?"
        - **Edit in Decap** → **Open URLs** `DecapURL`
        - **Edit in GitHub** → **Open URLs** `GitHubURL`
        - **Done** → (nothing)
      - **End Menu**
    - **End If**

### iOS 26 Shortcuts quirks
- There's no "Rename action": name results with **Set Variable**. "Show Result" is **Show Content**.
- **Get URLs from Input** defaults to the previous variable; clear it and pick **Shortcut Input**.
- After a **Choose from Menu**, "Contents of URL" is ambiguous, so always use the `Result` variable.
- "Please choose a value for each parameter" means an action has an empty parameter (often a hidden blank row in an If).
- ⓘ / Details is disabled until the shortcut has at least one action.
- An earlier shortcut failed every request with "The network connection was lost" while a fresh one worked; if that recurs, rebuild in a fresh shortcut.

### Testing the Shortcut
Use **Save as draft** on a throwaway page and delete the draft afterwards. To test the Publish error path safely, publish a page whose slug already exists (expect an "already exists" alert).

## 4. Unpicking it
1. Delete the Shortcut(s).
2. Delete `netlify/functions/post.mjs`, `_lib/{build-post,page-metadata,known-tags,github-target}.mjs`, their tests in `_tests/`, and `docs/capture.md`.
3. Delete `content/known-tags.json.njk` (or keep it; it's harmless) and the `[functions]` block in `netlify.toml`.
4. Delete the Netlify env vars and revoke the GitHub token.
