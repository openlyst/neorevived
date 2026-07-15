// Shared schema definitions for the data layer.
// Both build/validate.mjs and build/build.mjs import from here so the
// rules stay in one place.

export const ENTRY_CATEGORIES = ["shims", "streaming", "decomp", "projects"];
export const ALL_CATEGORIES = [...ENTRY_CATEGORIES, "specs", "news"];
export const STATUSES = ["planned", "in-progress", "working", "broken"];
export const SPEC_TYPES = ["table", "quirks", "freeform"];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const NAME_RE = /^(gitlab|github)\.[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

export function fail(file, msg) {
  const err = new Error(`${file}: ${msg}`);
  err.isValidationError = true;
  return err;
}

function requireString(file, data, key) {
  const v = data[key];
  if (typeof v !== "string" || v.trim() === "") {
    throw fail(file, `field "${key}" must be a non-empty string`);
  }
}

function requireDate(file, data, key) {
  const v = data[key];
  if (v instanceof Date) {
    // YAML parses unquoted YYYY-MM-DD into a Date; normalize back to string.
    const y = v.getUTCFullYear();
    const m = String(v.getUTCMonth() + 1).padStart(2, "0");
    const d = String(v.getUTCDate()).padStart(2, "0");
    data[key] = `${y}-${m}-${d}`;
    return;
  }
  requireString(file, data, key);
  if (!DATE_RE.test(data[key])) {
    throw fail(file, `field "${key}" must be a date in YYYY-MM-DD format`);
  }
}

function requireArray(file, data, key) {
  const v = data[key];
  if (v === undefined) return;
  if (!Array.isArray(v) || v.some((x) => typeof x !== "string")) {
    throw fail(file, `field "${key}" must be a list of strings`);
  }
}

function requireOneOf(file, data, key, allowed) {
  requireString(file, data, key);
  if (!allowed.includes(data[key])) {
    throw fail(file, `field "${key}" must be one of: ${allowed.join(", ")}`);
  }
}

// Validate an entry file (shims / streaming / decomp / projects).
export function validateEntry(file, fm, expectedCategory, baseName) {
  requireString(file, fm, "name");
  requireString(file, fm, "humanname");
  requireOneOf(file, fm, "category", ENTRY_CATEGORIES);
  requireOneOf(file, fm, "status", STATUSES);
  requireDate(file, fm, "updated");
  requireString(file, fm, "author");
  requireString(file, fm, "notes");
  requireString(file, fm, "license");
  requireString(file, fm, "readme_url");
  requireArray(file, fm, "tags");

  if (fm.category !== expectedCategory) {
    throw fail(
      file,
      `category "${fm.category}" does not match folder "${expectedCategory}"`
    );
  }
  if (fm.name !== baseName) {
    throw fail(
      file,
      `name "${fm.name}" must match filename "${baseName}.md"`
    );
  }
  if (!NAME_RE.test(fm.name)) {
    throw fail(
      file,
      `name "${fm.name}" must follow the format: platform.owner.project (e.g. gitlab.HttpAnimations.neorevived)`
    );
  }
}

// Validate a news file.
export function validateNews(file, fm, baseName) {
  requireDate(file, fm, "date");
  requireString(file, fm, "title");
  requireString(file, fm, "author");
  requireString(file, fm, "summary");
  requireArray(file, fm, "tags");
  if (fm.id !== undefined && fm.id !== baseName) {
    throw fail(file, `id "${fm.id}" must match filename "${baseName}.md"`);
  }
}

// Validate a specs file.
export function validateSpecs(file, fm) {
  requireString(file, fm, "section");
  requireOneOf(file, fm, "type", SPEC_TYPES);
  if (typeof fm.order !== "number") fm.order = 0;

  if (fm.type === "table") {
    if (!Array.isArray(fm.rows)) {
      throw fail(file, 'type "table" requires a "rows" list');
    }
    for (const r of fm.rows) {
      if (typeof r !== "object" || r === null) {
        throw fail(file, "each row must be an object with key/value");
      }
      if (typeof r.key !== "string" || typeof r.value !== "string") {
        throw fail(file, "each row needs string key and value");
      }
    }
  } else if (fm.type === "quirks") {
    if (!Array.isArray(fm.quirks)) {
      throw fail(file, 'type "quirks" requires a "quirks" list');
    }
    for (const q of fm.quirks) {
      if (typeof q !== "object" || q === null) {
        throw fail(file, "each quirk must be an object with label/desc");
      }
      if (typeof q.label !== "string" || typeof q.desc !== "string") {
        throw fail(file, "each quirk needs string label and desc");
      }
    }
  }
}
