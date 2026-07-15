// validate.mjs runs in CI on every MR. Checks every .md under /data
// against the frontmatter schema. Exits non-zero on any violation.
import { readDataFiles, DATA_DIR } from "./io.mjs";
import {
  ALL_CATEGORIES,
  validateEntry,
  validateNews,
  validateSpecs,
} from "./schema.mjs";
import fs from "node:fs";

let errors = 0;

if (!fs.existsSync(DATA_DIR)) {
  console.error(`validate: ${DATA_DIR} does not exist`);
  process.exit(1);
}

const files = readDataFiles();

if (files.length === 0) {
  console.error("validate: no markdown files found under /data");
  process.exit(1);
}

for (const f of files) {
  if (!ALL_CATEGORIES.includes(f.category)) {
    console.error(`${f.rel}: unknown category folder "${f.category}"`);
    errors++;
    continue;
  }
  try {
    if (f.category === "news") {
      validateNews(f.rel, f.fm, f.baseName);
    } else if (f.category === "specs") {
      validateSpecs(f.rel, f.fm);
    } else {
      validateEntry(f.rel, f.fm, f.category, f.baseName);
    }
  } catch (e) {
    console.error(e.message);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\nvalidate: ${errors} error(s)`);
  process.exit(1);
}

console.log(`validate: ${files.length} file(s) OK`);
