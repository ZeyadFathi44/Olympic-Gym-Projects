# Olympic Gym Projects — Structural Separation & Vercel Deployment Spec

## 1. Overview & Goal
Refactor the monolithic 4.75 MB `Olympic_Gym_Projects.html` into a clean, maintainable, zero-build static web architecture with strict separation of HTML, CSS, and JavaScript across the Shell, Training Program Builder (`programs/`), and Nutrition Plan Maker (`nutrition/`), ready for immediate deployment on Vercel without any functional or visual modifications.

## 2. Target Architecture & File Layout
- `index.html` — Main application shell (topbar, ambient background blobs, splash screen, and same-origin iframes for `programs/index.html` and `nutrition/index.html`).
- `manifest.json` — Web App Manifest for PWA installation.
- `vercel.json` — Vercel static routing configuration (rewriting `/Olympic_Gym_Projects.html` to `/index.html` for backward compatibility and setting immutable caching headers on `/vendor/*` and `/assets/*`).
- `assets/`
  - `shield.png` — Extracted Olympic Gym shield PNG icon.
  - `gym-bg.jpg` — Extracted 195 KB gym background JPEG (previously base64-encoded twice in `OG_LIQUID_CSS` and Nutrition `Style #2`).
  - `js/storage-shim.js` — Shared iOS Safari `localStorage` fallback shim.
  - `js/logos.js` — Shared `OG_SHIELD_B64` and `LOGO_B64` constants used by client-side `.docx` and `.xlsx` generators.
- `vendor/`
  - `docx.iife.js` — Shared 836 KB `docx` library bundle (previously duplicated in both `APP_PROGRAMS` and `APP_NUTRITION`).
  - `exceljs.min.js` — Extracted 947 KB ExcelJS bundle for `.xlsx` export.
- `css/`
  - `shell.css` — Shell styles (`#bg`, `.blob`, `#topbar`, `.frame`, `#og-nboot`, `#og-loading`).
  - `liquid-programs.css` — Liquid-glass theme injected into Programs frame (`OG_LIQUID_CSS`).
  - `liquid-nutrition.css` — Liquid-glass mobile bottom bar injected into Nutrition frame (`OG_NUTRI_CSS`).
- `js/`
  - `shell.js` — Shell runtime logic (frame loading, `ogInjectIntoFrame`, focus keeper, mobile drawer/sidebar switcher, date display, and dynamic PWA icon generation).
- `programs/`
  - `index.html` — Pure HTML markup for Training Program Builder V2 (zero inline `<style>` or `<script>` blocks).
  - `css/main.css`, `css/gif-modal.css`, `css/db-page.css` — Extracted style sheets from `APP_PROGRAMS`.
  - `js/app.js`, `js/docx-export.js`, `js/ui-helpers.js`, `js/v2-upgrade.js`, `js/exercise-data.js`, `js/gif-layer.js`, `js/dataset-layer.js`, `js/db-page.js`, `js/export-themes.js`, `js/xlsx-export.js`, `js/clients.js` — Extracted scripts in exact original execution order.
- `nutrition/`
  - `index.html` — Pure HTML markup for Nutrition Plan Maker (zero inline `<style>` or `<script>` blocks).
  - `css/splash.css`, `css/main.css`, `css/assistant.css` — Extracted style sheets from `APP_NUTRITION`.
  - `js/logo-b64.js`, `js/boot.js`, `js/app.js`, `js/enhancements.js`, `js/assistant.js`, `js/clients.js`, `js/docx-import.js`, `js/branding.js`, `js/motion.js` — Extracted scripts in exact original execution order.

## 3. Invariants & Verification Criteria
1. **Zero inline `<style>` or `<script>` blocks** in `index.html`, `programs/index.html`, and `nutrition/index.html`.
2. **100% Behavioral & Visual Equivalence**: All global functions, `onclick` / `oninput` handlers, `.docx` / `.xlsx` exports, AI assistant, Exercise DB, and cross-frame navigation (`parent.ogShowApp`) work identically.
3. **Vercel Readiness**: Root `index.html` and `vercel.json` present, verified via local HTTP server and headless browser verification with zero console/page errors.
