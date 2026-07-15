// Shared helpers for walking the /data tree and parsing frontmatter.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

export const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
export const DATA_DIR = path.join(ROOT, "data");

// Return [{ file, rel, category, baseName, fm, body }] for every .md under
// /data/<category>/. Files directly in /data (not in a category folder) are
// rejected by the caller.
export function readDataFiles() {
  const out = [];
  if (!fs.existsSync(DATA_DIR)) return out;

  for (const category of fs.readdirSync(DATA_DIR)) {
    const catDir = path.join(DATA_DIR, category);
    if (!fs.statSync(catDir).isDirectory()) continue;

    for (const name of fs.readdirSync(catDir)) {
      if (!name.endsWith(".md")) continue;
      const abs = path.join(catDir, name);
      if (!fs.statSync(abs).isFile()) continue;

      const raw = fs.readFileSync(abs, "utf8");
      let parsed;
      try {
        parsed = matter(raw);
      } catch (e) {
        throw new Error(`${abs}: invalid frontmatter — ${e.message}`);
      }
      out.push({
        file: abs,
        rel: path.relative(ROOT, abs),
        category,
        baseName: name.slice(0, -3),
        fm: parsed.data,
        body: parsed.content.trim(),
      });
    }
  }
  return out;
}
