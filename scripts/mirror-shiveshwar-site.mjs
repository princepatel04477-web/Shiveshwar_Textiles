#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, extname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");

const BASE_ORIGIN = "https://shiveshwartextiles.com";
const SITEMAP_URL = `${BASE_ORIGIN}/sitemap.xml`;

const mirrorPagesDir = join(repoRoot, "public", "mirror-pages");
const mirrorAssetsDir = join(repoRoot, "public", "mirror-assets");
const researchDir = join(repoRoot, "docs", "research", "shiveshwartextiles.com");

const USER_AGENT =
  "Mozilla/5.0 (compatible; ai-website-cloner-template/0.3.1; +https://github.com/JCodesMore/ai-website-cloner-template)";

const downloadedAssets = new Set();
const pendingAssets = new Set();
const pageRoutes = new Set();

function stripTrailingSlash(pathname) {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function routeFromUrl(url) {
  const parsed = new URL(url);
  return stripTrailingSlash(parsed.pathname || "/");
}

function pagePathFromRoute(route) {
  if (route === "/") {
    return join(mirrorPagesDir, "index.html");
  }
  return join(mirrorPagesDir, `${route.slice(1)}.html`);
}

function safeSuffixFromQuery(search) {
  if (!search || search === "?") return "";
  const hash = createHash("sha1").update(search).digest("hex").slice(0, 8);
  return `__q_${hash}`;
}

function assetPublicPathFromUrl(absoluteUrl) {
  const parsed = new URL(absoluteUrl);
  const hostPart = parsed.hostname.replace(/[^a-zA-Z0-9.-]/g, "_");
  const suffix = safeSuffixFromQuery(parsed.search);
  let pathname = parsed.pathname || "/";
  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    // Keep original encoded path if decode fails.
  }
  const extension = extname(pathname);
  const normalizedPath = pathname.endsWith("/")
    ? `${pathname}index`
    : extension
      ? pathname
      : `${pathname}.bin`;
  if (!extension && suffix) {
    return `/mirror-assets/${hostPart}${normalizedPath}${suffix}`;
  }
  if (extension) {
    return `/mirror-assets/${hostPart}${normalizedPath.replace(
      extension,
      `${suffix}${extension}`,
    )}`;
  }
  return `/mirror-assets/${hostPart}${normalizedPath}`;
}

function localAssetPath(publicPath) {
  return join(repoRoot, "public", publicPath.replace(/^\//, ""));
}

function shouldIgnoreUrl(raw) {
  if (!raw) return true;
  const trimmed = raw.trim();
  if (!trimmed) return true;
  return (
    trimmed.startsWith("#") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    trimmed.startsWith("javascript:") ||
    trimmed.startsWith("data:")
  );
}

function normalizeAbsoluteUrl(raw, pageUrl) {
  if (shouldIgnoreUrl(raw)) return null;
  try {
    const parsed = new URL(raw, pageUrl);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

function queueAsset(absoluteUrl) {
  if (!absoluteUrl) return;
  if (downloadedAssets.has(absoluteUrl) || pendingAssets.has(absoluteUrl)) return;
  pendingAssets.add(absoluteUrl);
}

function isKnownPageUrl(absoluteUrl) {
  const parsed = new URL(absoluteUrl);
  if (parsed.origin !== BASE_ORIGIN) return false;
  return pageRoutes.has(routeFromUrl(absoluteUrl));
}

function rewriteHrefValue(rawHref, pageUrl) {
  const absolute = normalizeAbsoluteUrl(rawHref, pageUrl);
  if (!absolute) return rawHref;
  if (isKnownPageUrl(absolute)) {
    const parsed = new URL(absolute);
    const route = routeFromUrl(absolute);
    return route === "/" ? `/${parsed.hash}`.replace("/#", "#") || "/" : `${route}${parsed.hash}`;
  }
  return rawHref;
}

function rewriteAssetValue(rawUrl, pageUrl) {
  const absolute = normalizeAbsoluteUrl(rawUrl, pageUrl);
  if (!absolute) return rawUrl;
  queueAsset(absolute);
  return encodeURI(assetPublicPathFromUrl(absolute));
}

function rewriteSrcsetValue(rawSrcset, pageUrl) {
  const parts = rawSrcset
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((candidate) => {
      const [urlPart, descriptor] = candidate.split(/\s+/, 2);
      const rewritten = rewriteAssetValue(urlPart, pageUrl);
      return descriptor ? `${rewritten} ${descriptor}` : rewritten;
    });
  return parts.join(", ");
}

function rewriteCssUrls(cssContent, cssUrl) {
  const urlPattern = /url\((['"]?)([^'")]+)\1\)/gi;
  const importPattern = /@import\s+(?:url\()?['"]?([^'")\s]+)['"]?\)?/gi;

  let nextCss = cssContent.replace(urlPattern, (full, quote, value) => {
    const rewritten = rewriteAssetValue(value, cssUrl);
    return `url(${quote}${rewritten}${quote})`;
  });

  nextCss = nextCss.replace(importPattern, (full, value) => {
    const rewritten = rewriteAssetValue(value, cssUrl);
    return full.replace(value, rewritten);
  });

  return nextCss;
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

async function fetchBytes(url) {
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) {
    throw new Error(`Failed to fetch asset ${url}: ${response.status} ${response.statusText}`);
  }
  const contentType = response.headers.get("content-type") ?? "";
  const bytes = Buffer.from(await response.arrayBuffer());
  return { bytes, contentType };
}

async function writeFileEnsured(targetPath, content, isBinary = true) {
  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, content, isBinary ? undefined : "utf8");
}

async function parseSitemapUrls() {
  const xml = await fetchText(SITEMAP_URL);
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)];
  return matches.map((item) => item[1].trim());
}

function rewriteDocumentHtml(html, pageUrl) {
  let rewritten = html;

  rewritten = rewritten.replace(/<a([^>]*?)href=(['"])([^'"]+)\2([^>]*)>/gi, (full, pre, quote, value, post) => {
    const nextHref = rewriteHrefValue(value, pageUrl);
    return `<a${pre}href=${quote}${nextHref}${quote}${post}>`;
  });

  rewritten = rewritten.replace(
    /<(img|script|source|video)([^>]*?)\s(src|poster)=(['"])([^'"]+)\4([^>]*)>/gi,
    (full, tag, before, attr, quote, value, after) => {
      const nextValue = rewriteAssetValue(value, pageUrl);
      return `<${tag}${before} ${attr}=${quote}${nextValue}${quote}${after}>`;
    },
  );

  rewritten = rewritten.replace(/<link([^>]*?)href=(['"])([^'"]+)\2([^>]*)>/gi, (full, before, quote, value, after) => {
    const relMatch = `${before} ${after}`.match(/\brel=(['"])([^'"]+)\1/i);
    const rel = (relMatch?.[2] ?? "").toLowerCase();
    if (
      rel.includes("stylesheet") ||
      rel.includes("icon") ||
      rel.includes("manifest") ||
      rel.includes("preload") ||
      rel.includes("prefetch")
    ) {
      const nextValue = rewriteAssetValue(value, pageUrl);
      return `<link${before}href=${quote}${nextValue}${quote}${after}>`;
    }
    if (value.startsWith(BASE_ORIGIN)) {
      const nextValue = rewriteHrefValue(value, pageUrl);
      return `<link${before}href=${quote}${nextValue}${quote}${after}>`;
    }
    return full;
  });

  rewritten = rewritten.replace(
    /\s(srcset)=(['"])([^'"]+)\2/gi,
    (full, attr, quote, value) => ` ${attr}=${quote}${rewriteSrcsetValue(value, pageUrl)}${quote}`,
  );

  rewritten = rewritten.replace(/url\((['"]?)([^'")]+)\1\)/gi, (full, quote, value) => {
    const nextValue = rewriteAssetValue(value, pageUrl);
    return `url(${quote}${nextValue}${quote})`;
  });

  // Rewritten local assets can invalidate original SRI hashes.
  rewritten = rewritten.replace(/\sintegrity=(['"])[^'"]+\1/gi, "");
  // Remove analytics beacon script that posts back to unavailable local endpoints.
  rewritten = rewritten.replace(
    /<script[^>]*src=(['"])[^'"]*\/wvxwa3jtwetc[^'"]*\1[^>]*>\s*<\/script>/gi,
    "",
  );

  return rewritten;
}

async function downloadQueuedAssets() {
  while (pendingAssets.size > 0) {
    const batch = [...pendingAssets].slice(0, 4);
    await Promise.all(
      batch.map(async (assetUrl) => {
        pendingAssets.delete(assetUrl);
        if (downloadedAssets.has(assetUrl)) return;

        const publicPath = assetPublicPathFromUrl(assetUrl);
        const diskPath = localAssetPath(publicPath);
        const { bytes, contentType } = await fetchBytes(assetUrl);

        if (contentType.includes("text/css")) {
          const cssText = bytes.toString("utf8");
          const rewrittenCss = rewriteCssUrls(cssText, assetUrl);
          await writeFileEnsured(diskPath, rewrittenCss, false);
        } else {
          await writeFileEnsured(diskPath, bytes);
        }

        downloadedAssets.add(assetUrl);
      }),
    );
  }
}

async function writeResearchDocs(urls) {
  await mkdir(researchDir, { recursive: true });

  const topology = [
    "# PAGE_TOPOLOGY",
    "",
    "## Routes cloned",
    ...urls.map((url) => `- ${routeFromUrl(url)} (${url})`),
    "",
    "## Page flow",
    "1. Home page with hero, about, product links, infrastructure, quality, contact form, and footer links.",
    "2. Product detail pages under `/products/:slug` with product-specific content and related imagery.",
    "",
    "## Overlay and layering notes",
    "- Webflow-based pages with CDN-backed layered image blocks and interaction attributes (`data-w-id`).",
    "- Shared global CSS and JS power animations and menu behaviors across all routes.",
  ].join("\n");

  const stack = [
    "# TECH_STACK_ANALYSIS",
    "",
    "- **Site platform:** Webflow (detected from `webflow` CSS/JS and `data-wf-*` attributes).",
    "- **Styles:** external minified Webflow shared stylesheet.",
    "- **Interactions:** Webflow runtime script with `data-w-id` animation hooks.",
    "- **Assets:** CDN-hosted images and icons from `cdn.prod.website-files.com`.",
  ].join("\n");

  const behaviors = [
    "# BEHAVIORS",
    "",
    "- Mobile menu toggle behavior driven by Webflow menu button.",
    "- Scroll/entrance animations wired via Webflow interaction IDs (`data-w-id`).",
    "- Hover/transition behavior inherited from Webflow stylesheet classes.",
    "- Anchor links on home page jump to in-page sections and contact form.",
  ].join("\n");

  const tokens = [
    "# DESIGN_TOKENS",
    "",
    "Design tokens are sourced from the mirrored Webflow stylesheet and preserved exactly in local mirrored CSS.",
    "",
    "## Source files",
    `- ${posix.join("/mirror-assets", "cdn.prod.website-files.com", "699c95622d9783a33a533b90", "css")}`,
    "",
    "## Notes",
    "- Colors, spacing, typography, and animation timings are kept in the mirrored stylesheet to preserve fidelity.",
  ].join("\n");

  const inventory = [
    "# COMPONENT_INVENTORY",
    "",
    "## Global",
    "- Header / nav",
    "- Hero block",
    "- Product list links",
    "- Contact form",
    "- Footer with social and anchor links",
    "",
    "## Product pages",
    "- Product hero and detail body",
    "- Product imagery blocks",
    "- Product navigation/return links",
  ].join("\n");

  await Promise.all([
    writeFile(join(researchDir, "PAGE_TOPOLOGY.md"), topology, "utf8"),
    writeFile(join(researchDir, "TECH_STACK_ANALYSIS.md"), stack, "utf8"),
    writeFile(join(researchDir, "BEHAVIORS.md"), behaviors, "utf8"),
    writeFile(join(researchDir, "DESIGN_TOKENS.md"), tokens, "utf8"),
    writeFile(join(researchDir, "COMPONENT_INVENTORY.md"), inventory, "utf8"),
  ]);
}

async function run() {
  const urls = await parseSitemapUrls();
  urls.forEach((url) => pageRoutes.add(routeFromUrl(url)));

  await mkdir(mirrorPagesDir, { recursive: true });
  await mkdir(mirrorAssetsDir, { recursive: true });

  for (const url of urls) {
    const route = routeFromUrl(url);
    const originalHtml = await fetchText(url);
    const rewrittenHtml = rewriteDocumentHtml(originalHtml, url);
    await writeFileEnsured(pagePathFromRoute(route), rewrittenHtml, false);
  }

  await downloadQueuedAssets();
  await writeResearchDocs(urls);

  const report = {
    pages: urls.map((url) => routeFromUrl(url)),
    totalPages: urls.length,
    totalAssets: downloadedAssets.size,
  };

  const reportPath = join(researchDir, "mirror-report.json");
  await writeFile(reportPath, JSON.stringify(report, null, 2), "utf8");

  console.log(
    `Mirrored ${report.totalPages} pages and ${report.totalAssets} assets into /public/mirror-pages and /public/mirror-assets`,
  );
}

run().catch(async (error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(message);
  try {
    const logsPath = join(researchDir, "mirror-error.log");
    await mkdir(dirname(logsPath), { recursive: true });
    await writeFile(logsPath, message, "utf8");
  } catch {
    // Ignore logging failures.
  }
  process.exit(1);
});
