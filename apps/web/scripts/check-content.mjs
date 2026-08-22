#!/usr/bin/env node
/**
 * Placeholder audit.
 *
 * Lists every record in src/content that is marked `placeholder: true`, plus the
 * contact and social values that still hold formatted placeholders. Run this
 * before launch — anything it prints is demo data that must be replaced with
 * real club information, or deleted.
 *
 *   npm run check:content
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const read = (file) => readFileSync(join(root, "src/content", file), "utf8");

/**
 * Every content record starts with a `slug:` line, so treat the text between one
 * slug and the next as a single record and report the ones flagged placeholder.
 */
function findPlaceholders(source) {
  const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)];
  const found = [];

  for (const [index, match] of slugs.entries()) {
    const start = match.index;
    const end = slugs[index + 1]?.index ?? source.length;
    const record = source.slice(start, end);
    if (!/placeholder:\s*true/.test(record)) continue;

    const name = record.match(/\n\s+name:\s*"([^"]+)"/)?.[1];
    const opponent = record.match(/opponent:\s*"([^"]+)"/)?.[1];
    found.push(name ?? opponent ?? match[1]);
  }

  return found;
}

const files = [
  ["people.ts", "Players & staff"],
  ["matches.ts", "Fixtures & results"],
  ["news.ts", "Articles"],
  ["partners.ts", "Partners"],
];

let total = 0;
const lines = [];

for (const [file, label] of files) {
  const placeholders = findPlaceholders(read(file));
  if (placeholders.length === 0) continue;
  total += placeholders.length;
  lines.push(`\n  ${label}  —  src/content/${file}`);
  for (const item of placeholders) lines.push(`    • ${item}`);
}

// Contact and social details are placeholders until the club's real channels
// replace them; they are not flagged per-record, so check them by value.
const siteSource = read("site.ts");
const contactPlaceholders = [...siteSource.matchAll(/(\w+):\s*"([^"]*(?:takeoverfc\.com|\+256 700 000 000)[^"]*)"/g)]
  .map((m) => `${m[1]}: ${m[2]}`);
const socialPlaceholders = [...siteSource.matchAll(/href:\s*"(https:\/\/(?:instagram|facebook|tiktok|youtube|x)\.com\/)"/g)]
  .map((m) => m[1]);

console.log("Takeover FC — content placeholder audit");
console.log("=".repeat(48));

if (lines.length) console.log(lines.join("\n"));

if (contactPlaceholders.length) {
  total += contactPlaceholders.length;
  console.log("\n  Contact details  —  src/content/site.ts");
  for (const item of contactPlaceholders) console.log(`    • ${item}`);
}

if (socialPlaceholders.length) {
  total += socialPlaceholders.length;
  console.log("\n  Social links (no profile URL set)  —  src/content/site.ts");
  for (const item of socialPlaceholders) console.log(`    • ${item}`);
}

console.log("\n" + "=".repeat(48));

if (total === 0) {
  console.log("✓ No placeholders found. Content is ready for launch.");
  process.exit(0);
}

console.log(`${total} placeholder value(s) still to replace before launch.`);
console.log("See CONTENT.md for what each one needs.");
// Exit 0 so this is a report, not a build failure.
process.exit(0);
