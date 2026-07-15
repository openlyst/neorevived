import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { execSync } from "node:child_process";
import { ROOT, DATA_DIR } from "./io.mjs";

const PUBLIC_DIR = path.join(ROOT, "public");
const PORT = 3000;

function rebuild() {
  try {
    execSync("node build/build.mjs", { stdio: "inherit", cwd: ROOT });
  } catch {
    console.error("dev: build failed, serving previous output");
  }
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
    res.end("Not found");
    return;
  }

  const ext = path.extname(filePath);
  res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
});

let debounceTimer = null;
fs.watch(DATA_DIR, { recursive: true }, () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log("dev: data changed, rebuilding...");
    rebuild();
  }, 300);
});

rebuild();
server.listen(PORT, () => {
  console.log(`dev: serving at http://localhost:${PORT}`);
});
