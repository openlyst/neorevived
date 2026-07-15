import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";
import { ROOT, DATA_DIR } from "./io.mjs";

const PUBLIC_DIR = path.join(ROOT, "public");
const SRC_DIR = path.join(ROOT, "src");
const PORT = 3000;

let building = false;

function rebuild() {
  if (building) return;
  building = true;
  console.log("dev: rebuilding...");
  const child = spawn(process.execPath, ["build/build.mjs"], {
    stdio: "inherit",
    cwd: ROOT,
  });
  child.on("close", (code) => {
    building = false;
    if (code === 0) {
      console.log("dev: rebuild complete");
    } else {
      console.error("dev: build failed, serving previous output");
    }
  });
}

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split("?")[0];
  if (urlPath === "/") urlPath = "/index.html";

  const filePath = path.join(PUBLIC_DIR, urlPath);
  if (!filePath.startsWith(PUBLIC_DIR) || !fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not Found");
    return;
  }

  const ext = path.extname(filePath);
  res.writeHead(200, {
    "Content-Type": MIME[ext] || "application/octet-stream",
    "Cache-Control": "no-cache, no-store, must-revalidate",
  });
  fs.createReadStream(filePath).pipe(res);
});

let debounceTimer = null;
function scheduleRebuild() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(rebuild, 300);
}

fs.watch(DATA_DIR, { recursive: true }, scheduleRebuild);
fs.watch(SRC_DIR, { recursive: true }, scheduleRebuild);

rebuild();
server.listen(PORT, () => {
  console.log(`dev: serving at http://localhost:${PORT}`);
  console.log("dev: press Ctrl+C to stop");
});

process.on("SIGINT", () => {
  console.log("\ndev: shutting down...");
  server.close();
  process.exit(0);
});
