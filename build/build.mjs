// build.mjs parses /data, renders markdown bodies, and emits a static
// site into public/. The data is inlined into public/site.bundle.js so the
// frontend has no runtime fetch (pure static, works on GitLab Pages).
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { readDataFiles, ROOT, DATA_DIR } from "./io.mjs";
import {
  ENTRY_CATEGORIES,
  STATUSES,
  validateEntry,
  validateNews,
  validateSpecs,
  validateSdks,
  COMMIT_HASH_RE,
  RAW_FILE_RE,
} from "./schema.mjs";

const PUBLIC_DIR = path.join(ROOT, "public");
const SRC_DIR = path.join(ROOT, "src");

marked.setOptions({ gfm: true, breaks: false });

const ALERT_LABELS = {
  NOTE: "Note",
  TIP: "Tip",
  IMPORTANT: "Important",
  WARNING: "Warning",
  CAUTION: "Caution",
};

function preprocessAlerts(md) {
  const lines = (md || "").split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const m = lines[i].match(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*)$/i);
    if (m) {
      const label = ALERT_LABELS[m[1].toUpperCase()] || "Note";
      const firstLine = m[2].trim();
      out.push(`> **${label}:** ${firstLine}`.trim());
      i++;
      while (i < lines.length && /^>/.test(lines[i])) {
        out.push(lines[i]);
        i++;
      }
      continue;
    }
    out.push(lines[i]);
    i++;
  }
  return out.join("\n");
}

function rawToBlob(url) {
  if (url.includes("/-/raw/")) return url.replace("/-/raw/", "/-/blob/");
  if (url.includes("raw.githubusercontent.com")) {
    return url
      .replace("https://raw.githubusercontent.com/", "https://github.com/")
      .replace(/^(https:\/\/github\.com\/[^/]+\/[^/]+)\//, "$1/blob/");
  }
  if (url.includes("/raw/")) return url.replace("/raw/", "/blob/");
  return url;
}

function resolveRelativeLink(href, readmeUrl) {
  try {
    var cleanBase = readmeUrl.split("?")[0];
    var resolved = new URL(href, cleanBase).href;
    return rawToBlob(resolved);
  } catch {
    return href;
  }
}

function postProcessLinks(html, readmeUrl) {
  return html.replace(/<a\s+href="([^"]*)"([^>]*)>/g, function (match, href, rest) {
    if (rest.includes("target=")) return match;
    var newHref = href;
    var extra = "";
    if (readmeUrl && !/^(https?:|mailto:|#|\/)/.test(href)) {
      newHref = resolveRelativeLink(href, readmeUrl);
      extra = ' target="_blank" rel="noopener"';
    } else if (/^https?:/.test(href)) {
      extra = ' target="_blank" rel="noopener"';
    }
    return '<a href="' + newHref + '"' + rest + extra + '>';
  });
}

function renderMarkdown(md, readmeUrl) {
  var html = marked.parse(preprocessAlerts(md || ""));
  return postProcessLinks(html, readmeUrl);
}

async function fetchReadme(url, file) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    const text = await res.text();
    return text.trim();
  } catch (e) {
    throw new Error(`${file}: failed to fetch readme_url "${url}": ${e.message}`);
  }
}

function parseCompatSpec(body) {
  var m = (body || "").match(/```json\s+compat[\s\S]*?\n([\s\S]*?)```/);
  if (!m) return null;
  try {
    return JSON.parse(m[1].trim());
  } catch (e) {
    return null;
  }
}

function parseTableRow(line) {
  var s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|")) s = s.slice(0, -1);
  return s.split("|");
}

function parseCompatTable(md, spec) {
  var lines = (md || "").split("\n");
  var header = (spec.table_header || "").trim();
  var startIdx = -1;
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].trim() === header) { startIdx = i; break; }
  }
  if (startIdx === -1) return [];

  var rowIdx = startIdx + 1;
  if (rowIdx < lines.length && /^\|[\s\-:]+\|/.test(lines[rowIdx].trim())) {
    rowIdx++;
  }

  var columns = spec.columns || [];
  var rows = [];
  while (rowIdx < lines.length) {
    var line = lines[rowIdx].trim();
    if (!line.startsWith("|") || line === "|") break;
    var cells = parseTableRow(line);
    if (cells.length === 0) break;
    var row = {};
    for (var c = 0; c < columns.length && c < cells.length; c++) {
      row[columns[c].key] = cells[c].trim();
    }
    rows.push(row);
    rowIdx++;
  }
  return rows;
}

async function fetchCompat(url, file) {
  try {
    var res = await fetch(url, { redirect: "follow" });
    if (!res.ok) {
      throw new Error("HTTP " + res.status + " " + res.statusText);
    }
    return (await res.text()).trim();
  } catch (e) {
    throw new Error(file + ': failed to fetch compatibility_url "' + url + '": ' + e.message);
  }
}

// Build the entries index (shims/streaming/decomp/projects).
async function buildEntries(files) {
  const byCategory = {};
  for (const cat of ENTRY_CATEGORIES) byCategory[cat] = [];

  for (const f of files) {
    if (!ENTRY_CATEGORIES.includes(f.category)) continue;
    validateEntry(f.rel, f.fm, f.category, f.baseName);
    const readmeMd = await fetchReadme(f.fm.readme_url, f.rel);
    const entry = {
      name: f.fm.name,
      humanname: f.fm.humanname,
      category: f.fm.category,
      status: f.fm.status,
      updated: f.fm.updated,
      author: f.fm.author,
      license: f.fm.license,
      readmeUrl: f.fm.readme_url,
      sourceUrl: f.fm.sourceurl,
      tags: Array.isArray(f.fm.tags) ? f.fm.tags : [],
      notes: f.fm.notes,
      downloads: f.fm.downloads === true,
      deprecated: f.fm.deprecated === true,
      downloadList: [],
      bodyHtml: renderMarkdown(readmeMd, f.fm.readme_url),
    };

    if (f.fm.compatibility === true) {
      var spec = parseCompatSpec(f.body);
      if (!spec) {
        throw new Error(f.rel + ': compatibility is true but no ```json compat block found in body');
      }
      var compatMd = await fetchCompat(f.fm.compatibility_url, f.rel);
      var compatRows = parseCompatTable(compatMd, spec);
      entry.compatibility = {
        columns: spec.columns,
        rows: compatRows,
      };
    } else {
      entry.compatibility = null;
    }

    if (f.fm.downloads === true && Array.isArray(f.fm.download_list)) {
      const sourceUrl = f.fm.sourceurl.replace(/\/$/, "");
      const isGitLab = sourceUrl.includes("gitlab.com");
      const commitPath = isGitLab ? "/-/commit/" : "/commit/";
      entry.downloadList = f.fm.download_list.map((d) => {
        const hasCommit = d.commit && COMMIT_HASH_RE.test(d.commit);
        let commitUrl = d.commit || "";
        if (hasCommit) {
          commitUrl = sourceUrl + commitPath + d.commit;
        } else if (d.commit && d.commit.startsWith("http")) {
          commitUrl = d.commit;
        }
        return {
          version: d.version,
          url: d.url || "",
          date: d.date,
          notes: d.notes || "",
          commit: d.commit || "",
          commitUrl,
          isRawFile: d.url ? RAW_FILE_RE.test(d.url) : false,
          isTrackingOnly: !d.url && !d.commit,
        };
      }).sort((a, b) => b.date.localeCompare(a.date));
    }

    byCategory[f.category].push(entry);
  }

  for (const cat of ENTRY_CATEGORIES) {
    byCategory[cat].sort((a, b) => a.name.localeCompare(b.name));
  }
  return byCategory;
}

function buildNews(files) {
  const posts = [];
  for (const f of files) {
    if (f.category !== "news") continue;
    validateNews(f.rel, f.fm, f.baseName);
    posts.push({
      id: f.baseName,
      date: f.fm.date,
      title: f.fm.title,
      author: f.fm.author,
      tags: Array.isArray(f.fm.tags) ? f.fm.tags : [],
      summary: f.fm.summary,
      bodyHtml: renderMarkdown(f.body),
    });
  }
  posts.sort((a, b) => b.date.localeCompare(a.date));
  return posts;
}

function buildSpecs(files) {
  const sections = [];
  for (const f of files) {
    if (f.category !== "specs") continue;
    validateSpecs(f.rel, f.fm);
    const section = {
      section: f.fm.section,
      order: typeof f.fm.order === "number" ? f.fm.order : 0,
      type: f.fm.type,
    };
    if (f.fm.type === "table") {
      section.rows = f.fm.rows;
    } else if (f.fm.type === "quirks") {
      section.quirks = f.fm.quirks;
    } else {
      section.bodyHtml = renderMarkdown(f.body);
    }
    sections.push(section);
  }
  sections.sort(
    (a, b) => a.order - b.order || a.section.localeCompare(b.section)
  );
  return sections;
}

function buildSdks(files) {
  const sections = [];
  for (const f of files) {
    if (f.category !== "sdks") continue;
    validateSdks(f.rel, f.fm);
    const section = {
      section: f.fm.section,
      order: typeof f.fm.order === "number" ? f.fm.order : 0,
      type: f.fm.type,
    };
    if (f.fm.type === "table") {
      section.rows = f.fm.rows;
    }
    if (f.body) {
      section.bodyHtml = renderMarkdown(f.body);
    }
    sections.push(section);
  }
  sections.sort(
    (a, b) => a.order - b.order || a.section.localeCompare(b.section)
  );
  return sections;
}

function safeJson(obj) {
  // Inline as JSON, not a JS literal, so contributor content can't break out
  // of the script context via string interpolation.
  return JSON.stringify(obj);
}

function copyStatic() {
  for (const name of fs.readdirSync(SRC_DIR)) {
    fs.copyFileSync(path.join(SRC_DIR, name), path.join(PUBLIC_DIR, name));
  }
}

async function main() {
  if (!fs.existsSync(DATA_DIR)) {
    console.error("build: /data directory missing");
    process.exit(1);
  }

  const files = readDataFiles();
  const entries = await buildEntries(files);
  const news = buildNews(files);
  const specs = buildSpecs(files);
  const sdks = buildSdks(files);

  // Sanity check: every status used in data is a known status.
  for (const cat of ENTRY_CATEGORIES) {
    for (const e of entries[cat]) {
      if (!STATUSES.includes(e.status)) {
        console.error(`build: ${cat}/${e.name} has unknown status "${e.status}"`);
        process.exit(1);
      }
    }
  }

  fs.rmSync(PUBLIC_DIR, { recursive: true, force: true });
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  const bundle = `// Generated by build/build.mjs do not edit by hand.
window.SITE_DATA = ${safeJson({ entries, news, specs, sdks })};
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, "site.bundle.js"), bundle);

  copyStatic();

  const counts = ENTRY_CATEGORIES.map(
    (c) => `${c}=${entries[c].length}`
  ).join(" ");
  console.log(`build: wrote public/ ${counts} news=${news.length} specs=${specs.length} sdks=${sdks.length}`);
}

main();
