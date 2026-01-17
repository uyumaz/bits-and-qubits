#!/usr/bin/env node

/**
 * Link Checker Script
 * Validates all external links in blog posts and pages.
 * Exits with code 1 if any broken links are found.
 */

import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// Directories to scan for content
const CONTENT_DIRS = [
  'src/content',
  'src/pages'
];

// File extensions to check
const EXTENSIONS = ['.md', '.mdx', '.astro'];

// Regex to match URLs in markdown links and href attributes
const URL_PATTERNS = [
  /\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g,  // Markdown links: [text](url)
  /href=["'](https?:\/\/[^"']+)["']/g,     // HTML href attributes
  /href=\{["'](https?:\/\/[^"']+)["']\}/g  // JSX href attributes
];

// URLs to skip (known to block automated requests)
const SKIP_DOMAINS = [
  'linkedin.com',
  'twitter.com',
  'x.com'
];

/**
 * Recursively get all files in a directory
 */
async function getFiles(dir) {
  const files = [];

  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        files.push(...await getFiles(fullPath));
      } else if (EXTENSIONS.includes(extname(entry.name))) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    // Directory doesn't exist, skip
  }

  return files;
}

/**
 * Extract all URLs from file content
 */
function extractUrls(content, filePath) {
  const urls = [];

  for (const pattern of URL_PATTERNS) {
    let match;
    const regex = new RegExp(pattern.source, pattern.flags);

    while ((match = regex.exec(content)) !== null) {
      // URL is in the last capture group or the first one depending on pattern
      const url = match[2] || match[1];
      urls.push({ url, file: filePath });
    }
  }

  return urls;
}

/**
 * Check if a URL should be skipped
 */
function shouldSkip(url) {
  try {
    const hostname = new URL(url).hostname;
    return SKIP_DOMAINS.some(domain => hostname.includes(domain));
  } catch {
    return true;
  }
}

/**
 * Check if a URL is accessible
 */
async function checkUrl(url, timeout = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)'
      }
    });

    clearTimeout(timeoutId);

    // Some servers don't support HEAD, try GET
    if (response.status === 405) {
      const getResponse = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)'
        }
      });
      return { ok: getResponse.ok, status: getResponse.status };
    }

    return { ok: response.ok, status: response.status };
  } catch (err) {
    clearTimeout(timeoutId);
    return { ok: false, status: err.name === 'AbortError' ? 'TIMEOUT' : err.message };
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🔗 Checking external links...\n');

  // Collect all files
  const files = [];
  for (const dir of CONTENT_DIRS) {
    files.push(...await getFiles(join(ROOT_DIR, dir)));
  }

  console.log(`Found ${files.length} files to scan\n`);

  // Extract all URLs
  const allUrls = [];
  for (const file of files) {
    const content = await readFile(file, 'utf-8');
    const urls = extractUrls(content, file.replace(ROOT_DIR + '/', ''));
    allUrls.push(...urls);
  }

  // Deduplicate URLs
  const uniqueUrls = [...new Map(allUrls.map(item => [item.url, item])).values()];
  console.log(`Found ${uniqueUrls.length} unique external links\n`);

  // Check each URL
  const results = { passed: [], failed: [], skipped: [], warnings: [] };

  for (const { url, file } of uniqueUrls) {
    if (shouldSkip(url)) {
      results.skipped.push({ url, file, reason: 'Domain blocks automated requests' });
      process.stdout.write('⏭️');
      continue;
    }

    const { ok, status } = await checkUrl(url);

    if (ok) {
      results.passed.push({ url, file, status });
      process.stdout.write('✅');
    } else if (status === 403) {
      // 403 often means the site blocks bots but link is valid
      results.warnings.push({ url, file, status });
      process.stdout.write('⚠️');
    } else {
      results.failed.push({ url, file, status });
      process.stdout.write('❌');
    }
  }

  console.log('\n');

  // Report results
  if (results.skipped.length > 0) {
    console.log(`⏭️  Skipped: ${results.skipped.length} links`);
    for (const { url } of results.skipped) {
      console.log(`   ${url}`);
    }
    console.log('');
  }

  console.log(`✅ Passed: ${results.passed.length} links`);

  if (results.warnings.length > 0) {
    console.log(`\n⚠️  Warnings: ${results.warnings.length} links (403 - may block bots)\n`);
    for (const { url, file } of results.warnings) {
      console.log(`   ${url}`);
      console.log(`   └─ File: ${file}\n`);
    }
  }

  if (results.failed.length > 0) {
    console.log(`\n❌ Failed: ${results.failed.length} links\n`);
    for (const { url, file, status } of results.failed) {
      console.log(`   ${url}`);
      console.log(`   └─ File: ${file}`);
      console.log(`   └─ Status: ${status}\n`);
    }

    process.exit(1);
  }

  console.log('\n✨ All links are valid!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
