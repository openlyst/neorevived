---
name: gitlab.your-group.your-project
humanname: Your Project Name
category: shims
status: planned
updated: 2026-01-01
author: your-name
license: AGPL-3.0
readme_url: https://gitlab.com/your-group/your-project/-/raw/main/README.md
sourceurl: https://gitlab.com/your-group/your-project
downloads: false
compatibility: false
compatibility_url: https://gitlab.com/your-group/your-project/-/raw/main/COMPATIBILITY.md
notes: This is an example entry. Copy this file, rename it, and fill in your own content.
tags:
  - example
---

## Overview

Describe what this shim does.

## Current Blocker

Describe any current blockers.

## Compatibility (optional)

If your project has a compatibility list (e.g. tested games/apps), set
`compatibility: true` in the frontmatter and provide a `compatibility_url`
pointing to the raw markdown file. Then add a ```json compat block in the
body describing how to parse the table:

```json compat
{
  "table_header": "| Game | Status | Notes |",
  "columns": [
    { "key": "game", "label": "Game", "type": "text" },
    { "key": "status", "label": "Status", "type": "status" },
    { "key": "notes", "label": "Notes", "type": "text" }
  ]
}
```

The `table_header` must match the exact markdown table header line in the
remote file. Each column entry maps a table cell to a key in the output.
Supported types: `text`, `link`, `status`.
