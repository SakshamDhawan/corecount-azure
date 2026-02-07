const fs = require("fs");
const path = require("path");

function sanitizeRel(p) {
  p = (p || "").replace(/\\/g, "/").replace(/^[A-Za-z]:\//, "").replace(/^\/+/, "");
  p = path.posix.normalize(p);
  while (p.startsWith("../")) p = p.slice(3);
  if (p === ".." || p.startsWith("..")) p = p.replace(/\.\.(\/|$)/g, "");
  if (!p || p === ".") return null;
  return p;
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

const mapPath = process.argv[2] || "index.js.map";
const outDir = process.argv[3] || "reconstructed_src";

const m = JSON.parse(fs.readFileSync(mapPath, "utf8"));

if (!Array.isArray(m.sources) || !Array.isArray(m.sourcesContent)) {
  console.error("Unexpected sourcemap shape.");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

let written = 0, skippedNoContent = 0, skippedBadPath = 0;

for (let i = 0; i < m.sources.length; i++) {
  const srcPath = sanitizeRel(m.sources[i]);
  const content = m.sourcesContent[i];

  if (!srcPath) { skippedBadPath++; continue; }
  if (typeof content !== "string" || content.length === 0) { skippedNoContent++; continue; }

  const outPath = path.join(outDir, srcPath);

  try {
    if (fs.existsSync(outPath) && fs.readFileSync(outPath, "utf8") === content) continue;
  } catch (_) {}

  ensureDir(outPath);
  fs.writeFileSync(outPath, content, "utf8");
  written++;
}

console.log(JSON.stringify({
  sources: m.sources.length,
  sourcesWithContent: (m.sourcesContent || []).filter(Boolean).length,
  written,
  skippedNoContent,
  skippedBadPath,
  outDir
}, null, 2));
