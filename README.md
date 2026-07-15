# NeoRevived

[English](README.md) | [简体中文](README.zh-CN.md)

A static, account-free tracker for the Pico Neo 2 headset revival effort. All content is community-contributed via merge requests — no coding required.

## What this tracks

- **Specs** — hardware and software reference docs, verified via adb
- **Shims** — compatibility layers for running modern apps
- **Streaming** — PC and cloud streaming solutions
- **Decomp** — reverse engineering of the system and runtime
- **Projects** — community projects and research
- **News** — updates and announcements

## How it works

Content lives in `/data/` as markdown files with YAML frontmatter. The build script (`build/build.mjs`) parses everything and inlines it into a single static site deployed to GitLab Pages.

## Contributing

1. Pick a folder under `/data/` (e.g. `shims`, `streaming`, `specs`)
2. Copy the `example.md` in that folder, rename it to your entry name
3. Fill in the frontmatter and body
4. Open a merge request — CI validates and builds automatically

The `example.md` files are templates and are skipped by the build.

## Local development

```bash
npm install
npm run build      # builds static site into public/
npm run validate   # validates frontmatter without building
npm run clean      # removes public/
```

Requires Node 20+.

## Project structure

```
data/          markdown content (the actual site data)
build/         build scripts, schema validation, IO helpers
src/           static frontend (HTML, CSS, JS)
public/        build output (generated, don't edit)
```

## License

See [LICENSE](LICENSE).
