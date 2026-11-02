# Project Structure Separation & Vercel Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Separate the monolithic `Olympic_Gym_Projects.html` into modular HTML, CSS, JS, vendor, and asset files and configure the repository for Vercel deployment on branch `refactor/project-structure`.

**Architecture:** Zero-build multi-page static site (`index.html`, `programs/index.html`, `nutrition/index.html`) with shared `vendor/` (`docx.iife.js`, `exceljs.min.js`), `assets/`, `css/`, and `js/` directories, plus `vercel.json` for routing and caching.

**Tech Stack:** Vanilla HTML5, CSS3, ES5/ES6 JavaScript, Vercel Static Hosting.

## Global Constraints
- Preserve 100% of existing functionality, DOM structure, global variables, and visual styling without modification.
- Eliminate all inline `<style>` and inline `<script>` blocks from `index.html`, `programs/index.html`, and `nutrition/index.html`.
- Work on git branch `refactor/project-structure`.

---

### Task 1: Extract Shared Assets, Vendor Bundles, and Sub-Application CSS/JS/HTML
- [x] **Step 1: Run deterministic extraction script to split `Olympic_Gym_Projects.html` into `index.html`, `css/`, `js/`, `assets/`, `vendor/`, `programs/`, and `nutrition/`**
- [x] **Step 2: Verify zero inline `<style>` or inline `<script>` tags remain in `index.html`, `programs/index.html`, and `nutrition/index.html`**

### Task 2: Add Vercel Configuration (`vercel.json`) and PWA Manifest (`manifest.json`)
- [x] **Step 1: Create `vercel.json` with `/Olympic_Gym_Projects.html` rewrite to `/index.html` and cache headers**
- [x] **Step 2: Create `manifest.json` and remove obsolete monolithic `Olympic_Gym_Projects.html` (or keep it routed via `vercel.json`)**

### Task 3: End-to-End Verification & Git Branch Push
- [x] **Step 1: Serve project over local HTTP server and verify `index.html`, `programs/index.html`, and `nutrition/index.html` load with HTTP 200 and zero console/runtime errors**
- [ ] **Step 2: Commit all changes to `refactor/project-structure` and push branch to remote for Vercel preview deployment**
