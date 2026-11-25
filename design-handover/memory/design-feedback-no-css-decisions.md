---
name: design-feedback-no-css-decisions
description: "Don't log design \"decisions\" or findings that are artefacts of Claude's own prototype CSS; that CSS is throwaway"
metadata:
  node_type: memory
  type: feedback
  originSessionId: bc0790d5-f190-4b27-84e0-d766205f9859
  modified: 2026-11-21T15:31:34.826Z
---

Don't record design decisions, bugs or fixes in memory when they come from Claude's own mockup/branch CSS (e.g. spacing quirks, rem values, selector gotchas). The user regards that CSS as throwaway and writes the real layout code themselves.

**Why:** on 2026-11-21 Claude logged a title-spacing issue it had spotted in its own mockup as if it were a user decision; the user hadn't given that feedback and corrected it.
**How to apply:** only log things the user actually said or chose (preferences, rejected directions, image rules, content facts). Label anything else as Claude's observation or leave it out. Related: [[image-rail-layout]].
