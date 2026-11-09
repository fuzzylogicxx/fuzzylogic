# Quick post capture

Share a link, or write a note with an optional photo, from iPhone or Mac and it becomes a correctly formatted post on `main`, after a preview.

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

To rotate `POST_SECRET`: change it in Netlify, redeploy, then update the `Secret` Text action in **both** Shortcuts. Never paste it into chats or commits. The `Secret` Text action shows the value in plain text, so never screenshot or share that action (or the Shortcut itself).

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
  "public": false,
  "dryRun": true
}
```

- `type: "note"` needs no `url`, its title is optional, and it needs a `comment`, `quote` or `image`. A note's `description` defaults to "A short note" (as in Decap) unless you send one.
- Notes are private by default: they get `pageSpecificRobotsDirective: noindex, nofollow`, which also keeps them out of the RSS feed (the feed collection excludes any post that has that key). `"public": true` (or the text `true`/`yes`) omits the key, so the note is indexed and in the feed. Links are unaffected.
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
- **JPEGs are stripped of private metadata by the function** (`_lib/strip-jpeg-metadata.mjs`, applied in `buildPost`, so on dry runs too): GPS location, camera details, timestamps, XMP, IPTC, comments and any embedded extra images (iPhone HDR/depth) are removed. Kept: the pixels untouched (no re-encode, no quality loss), colour profile and the EXIF Orientation tag (without it phone photos would display sideways). So the Shortcut does not need to re-encode a JPEG to protect location. Other formats (PNG, WebP, GIF) pass through unchanged, so the Shortcut must still convert HEIC to JPEG. A file that starts like a JPEG but can't be parsed is rejected ("Image is not a valid JPEG") rather than published unstripped.
- A photo is committed first, as its own commit, so it can briefly deploy ahead of the post. Netlify Functions accept ~6 MB per request, so resize in the Shortcut.

## 3. Link Shortcut: "Bookmark on FL.me" (iOS 26)

Items marked **[verify]** could not be checked against the real shortcut; check them, then delete the marker.

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
   - Headers: `x-post-secret` = `Secret` (and no other row; a blank header row makes the request fail with "The network connection was lost")
   - Request Body: **JSON**: `type` Text `link`; `url` Text `Link`; `comment` Text `Comment`; `tags` Text `Tags`; `dryRun` Boolean **on**
8. **Set Variable** `Preview`
9. Five times, **Get Dictionary Value** for *Value* with key `date`, `title`, `description`, `markdown`, `newTags` in `Preview`, each followed by **Set Variable** `Date`, `Title`, `Description`, `Markdown`, `NewTags`

**Flag new tags**
10. **If** `NewTags` *has any value* → **Show Alert** `New tags: ` `NewTags` ` – continue?` (its Cancel stops the shortcut) → **End If**. Delete any blank condition rows that appear under the If; they cause "Please choose a value for each parameter".

**Review and choose**
11. **Show Content** `Markdown`
12. **Choose from Menu** (prompt: same as the Note Shortcut, "Publish this post?" **[verify]**), three options:
    - **Publish** → **Get Contents of URL**: same as step 7 but `dryRun` **off**, plus `title` `Title`, `description` `Description`, `date` `Date` → **Set Variable** `Result`
    - **Save as draft** → the same, plus `draft` Boolean **on** → **Set Variable** `Result`
    - **Cancel** → **Stop This Shortcut**
    - **End Menu**

**Report the outcome**: steps 13–14 as in the Note Shortcut below (identical).

## 4. Note Shortcut: "Add Note To FL.me" (iOS 26)

Built by duplicating the Link Shortcut. Differences from the Link Shortcut: it takes a photo (not a URL), shrinks and (if needed) converts it, asks for Title, Description, Alt text and Caption as well as Comment and Tags, asks whether the note is public, and sends `type` `note`.

**Shortcut details (ⓘ):** Show in Share Sheet on. Receive **Images** and **Media** (the list reads "Apps and 2 more"). If there's no input: **Continue**.

**Setup**
1. **Text** `https://fuzzylogic.me/api/post` → **Set Variable** `Endpoint`
2. **Text** *(the POST_SECRET value)* → **Set Variable** `Secret`

**Photo**
3. **Get Images from** *Shortcut Input*
4. **Get** *First Item* **from** `Images` → **Set Variable** `Photo` to *Item from List*

**Shrink if wider than 1700px**
5. **Get** *Width* **from** `Photo` (the *Get Details of Images* action)
6. **If** *Width* **is greater than** `1700`
   - **Resize** `Photo` **to** *Size* `1700` × *Auto Height*
   - **Set Variable** `Photo` to *Resized Image*
   - **End If** (no Otherwise: `Photo` stays as it was)

**Convert to JPEG only if it isn't one already**
7. **Get** *File Extension* **from** `Photo` → **Set Variable** `Extension` to *File Extension*
8. **Change** `Extension` **to** *lowercase* → **Set Variable** `Extension` to *Updated Text*
9. **If** `Extension` **does not contain** `jp`
   - **Convert** `Photo` **to** *JPEG* (options under the chevron: quality about 90% suggested; *Preserve Metadata* no longer matters, because the function strips JPEG metadata)
   - **Set Variable** `Photo` to *Converted Image*
   - **Otherwise**: empty
   - **End If**
10. **Encode** `Photo` **with** *base64* (Line Breaks: *every 76 characters*, the default; the function removes them) → **Set Variable** `PhotoData` to *Base64 Encoded*

**Ask for the details** (each **Ask for Input** is type Text, and each is followed by a **Set Variable** whose input is *that* Ask for Input)
11. Prompt "Title (optional)" → `Title`
12. Prompt "Description (optional)" → `Description`
13. Prompt "Comment (optional)" → `Comment`
14. Prompt "Alt text" → `Alt`
15. Prompt "FigCaption (optional)" → `Caption`
16. Prompt "Tags (comma separated)" → `Tags`
17. **Choose from Menu** prompt "Make public? (indexed, in RSS)":
    - **No** → **Text** `false` → **Set Variable** `Public` to *Text*
    - **Yes** → **Text** `true` → **Set Variable** `Public` to *Text*
    - **End Menu**

**Preview request**
18. **Get Contents of URL** `Endpoint`
    - Method: **POST**
    - Headers: `x-post-secret` = `Secret` (no other row)
    - Request Body: **JSON**, with `type` Text `note`; `title` `Title`; `description` `Description`; `comment` `Comment`; `public` `Public`; `tags` `Tags`; `imageData` `PhotoData`; `imageAlt` `Alt`; `imageCaption` `Caption`; `dryRun` Boolean **True**. Every value except `type` and `dryRun` is the named variable of that name (pick it from *Variables*). There is no `date` (the server returns one) and no `imageExt` (it defaults to `jpg`, which is right because the photo is a JPEG by now).
19. **Set Variable** `Preview` to *Contents of URL*
20. **Get Dictionary Value** *Value* for key in `Preview`, each followed by **Set Variable**: `markdown` → `Markdown`; `date` → `Date`; `title` → `Title`; `description` → `Description`; `newTags` → `NewTags`. (`Title` and `Description` are overwritten with the server's values.)

**Flag new tags**
21. **If** `NewTags` *has any value* → **Show Alert** `New tags: ` `NewTags` ` – continue?` (Cancel stops the shortcut) → **End If**

**Review and choose**
22. **Show Content** `Markdown`
23. **Choose from Menu** prompt "Publish this post?":
    - **Publish** → **Get Contents of URL** `Endpoint` (POST; header `x-post-secret` = `Secret`; body **JSON**: `type` `note`; `title`; `description`; `comment`; `date` `Date`; `tags`; `imageData` `PhotoData`; `imageAlt`; `imageCaption`; `public`; `dryRun` Boolean **False**, all variables as in step 18) → **Set Variable** `Result` to *Contents of URL*
    - **Save as draft** → the same request plus `draft` Boolean **True** → **Set Variable** `Result`
    - **Cancel** → **Stop This Shortcut**
    - **End Menu**

**Report the outcome** (after End Menu, shared by Publish and Draft; identical in the Link Shortcut)
24. **Get Dictionary Value** *Value* for `error` in `Result` → **Set Variable** `Error` to *Dictionary Value*
25. **If** `Error` *has any value*
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

## 5. Troubleshooting and iOS 26 Shortcuts quirks

### The Shortcut fails
- **"The network connection was lost" on a request, even on Wi-Fi, is almost always a blank row in the request's Headers.** If there is an empty header slot underneath `x-post-secret` (no name, no value), iOS drops the connection before the server sees anything. Delete the empty row so `x-post-secret` is the only header. This has happened twice (the original "Foo" shortcut, and the Note Shortcut's first request), and duplicating an action or shortcut can carry the blank row into the copy. Check Headers first, before suspecting the network, image size or server. If it still fails, rebuild the request in a fresh shortcut.
- **Several fields end up with the same text (e.g. comment, description and image alt all repeat the title).** The server copies each field exactly as received, so check the **Set Variable** actions after each **Ask for Input**. When Set Variable actions are duplicated or prompts are inserted later, a Set Variable can keep pointing at an earlier Ask for Input (every one is labelled *Provided Input*). Tap each Set Variable's input pill and make sure it comes from the Ask for Input directly above it. To isolate it, run a **Show Content** of the variable: if it shows the wrong text, the Set Variable is wrong; if it's right, check the request body pills.
- **The JPEG check converts a JPEG anyway.** The If's text comparisons appear to be case-sensitive and the extension can arrive as `JPG`. That is why step 8 lowercases it first. To debug, run a **Show Content** of `Extension` just before the If.
- **A "Photo" variable that must work whether or not a step ran:** set the variable *inside* the If after the action that changes it (steps 6 and 9) and give the next action the **named variable** (`Photo`), never the magic output (*Converted Image*, *If Result*), which doesn't exist when the If is skipped.

### Shortcuts editor quirks
- There's no "Rename action": name results with **Set Variable**. "Show Result" is **Show Content**.
- **Get URLs from Input** defaults to the previous variable; clear it and pick **Shortcut Input**.
- After a **Choose from Menu**, "Contents of URL" is ambiguous, so always use the `Result` variable.
- "Please choose a value for each parameter" means an action has an empty parameter (often a hidden blank row in an If).
- It is easy to drag an action out of place by accident while scrolling or taking screenshots. If a shortcut that worked starts failing after you've only been looking at it, check the order of the actions.
- ⓘ / Details is disabled until the shortcut has at least one action.

### Testing the Shortcuts
Use **Save as draft** on a throwaway page and delete the draft afterwards (and, for a note, its image in `content/img/uploads/`). To test the Publish error path safely, publish a page whose slug already exists (expect an "already exists" alert). To test metadata stripping, send a camera JPEG with Location on and check the committed image has no EXIF GPS.

## 6. Unpicking it
1. Delete the Shortcut(s).
2. Delete `netlify/functions/post.mjs`, `_lib/{build-post,page-metadata,known-tags,github-target,strip-jpeg-metadata}.mjs`, their tests in `_tests/`, and `docs/capture.md`.
3. Delete `content/known-tags.json.njk` (or keep it; it's harmless) and the `[functions]` block in `netlify.toml`.
4. Delete the Netlify env vars and revoke the GitHub token.
