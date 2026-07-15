# NeoRevived

Static, account-free tracker for the Pico Neo 2 revival effort. All content
lives in markdown under `/data/<category>/`. GitLab CI validates, builds, and
deploys to GitLab Pages. No backend, no database, no runtime fetch.

## Commands

```bash
npm install        # install build deps (gray-matter, marked)
npm run validate   # check every /data/*.md against the frontmatter schema
npm run build      # parse /data, render markdown, emit public/ (the deployable site)
npm run clean      # remove public/
```

Node >= 20 required.

## Project layout

```
build/        build + validate scripts (ES modules)
  schema.mjs    shared frontmatter rules
  io.mjs        walks /data, parses frontmatter
  validate.mjs  CI validation entrypoint
  build.mjs     emits public/ with inlined site.bundle.js
src/          static frontend (copied verbatim into public/)
  index.html, styles.css, app.js
data/         contributor content (markdown + YAML frontmatter)
  shims/ streaming/ decomp/ projects/   entry files (status-tracked)
  specs/                                reference data (not status-tracked)
  news/                                 news posts
public/       build output (gitignored), served by GitLab Pages
```

## Frontmatter schema

Entries (shims/streaming/decomp/projects): `name`, `category`, `status`
(`planned|in-progress|working|broken`), `updated` (YYYY-MM-DD), `author`,
`notes` (one-line table summary), optional `tags` list. `name` must match the
filename without `.md`.

News: `date`, `title`, `author`, `summary`, optional `tags`. No `status`.

Specs: `section`, `type` (`table|quirks|freeform`), optional `order` (number).
`table` needs a `rows` list of `{key, value}`; `quirks` needs a `quirks` list
of `{label, desc}`; `freeform` renders the markdown body as-is.

## Frontend

Vanilla JS, no framework, no client-side router library. View state is mirrored
to `location.hash` (`#/shims`, `#/entry/shims/openxr-shim`, `#/specs`,
`#/news`, `#/news/<id>`, `#/contribute`) so URLs are shareable and back/forward
works. Data is inlined into `public/site.bundle.js` at build time.

## Commits

Commit messages are in Mandarin Chinese. No AI attribution lines.
