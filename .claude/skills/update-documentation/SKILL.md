---
name: update-documentation
description: This skill should be used when updating, creating, or modifying Eneris product documentation. It gathers requirements, verifies behavior against the main codebase, captures screenshots across web/iOS/Android, processes images with spotlight annotations, writes documentation in the established style, and verifies rendered output via Chrome DevTools MCP.
---

# Update Documentation

Update or create Eneris product documentation by verifying feature behavior against the main codebase, capturing multi-platform screenshots, and writing documentation that matches the established style and conventions.

## Phase 0: Gather Requirements

### 0.1 Clarify the Change

Collect the following from the user:

- **What feature or page** needs documentation (new page, update to existing, or deletion)
- **Which sections** of the docs are affected
- **What changed** in the product (new feature, UI change, behavior change, bug fix)

### 0.2 Verify Against the Main Codebase

Access the main codebase at `../eneris/` to verify how the feature actually works:

1. Search for relevant components in `packages/website/pages/` and `packages/website/components/`
2. Read the source code to understand the feature's behavior, props, and edge cases
3. Check the API layer in `packages/api/` if the feature involves backend calls
4. Review any relevant types or models in `packages/commons/`

### 0.3 User Gate — Confirm Understanding

**STOP and confirm with the user before proceeding.** Present:

- A summary of what the feature does based on code review
- Any uncertainties about behavior, intended audience, or scope
- Questions about edge cases or platform-specific differences
- Clarification on whether screenshots are needed and which screens to capture

Do NOT proceed until the user confirms the understanding is correct.

## Phase 1: Explore Current Documentation

### 1.1 Understand Existing Content

1. Read the target documentation file(s) if updating existing content
2. Read adjacent documentation pages to understand the narrative flow
3. Check cross-references — which other pages link to or from the target
4. Review the sidebar structure in `docs/` to understand placement

### 1.2 Review Writing Style

Reference `references/writing-style-guide.md` for the complete style guide. Key points:

- Professional yet approachable tone
- Bold for UI elements and feature names
- Numbered lists for sequential steps, bullets for non-sequential info
- Explanatory paragraphs before step-by-step instructions
- Admonitions (:::info, :::tip, :::warning) for callouts
- MDX image imports at file top, rendered with consistent inline styling

## Phase 2: Plan Documentation Changes

### 2.1 Create a Documentation Plan

Draft a structured plan including:

- **Files to create or modify** (with full paths)
- **Content outline** for each file (headings, sections)
- **Screenshots needed** — list each screenshot with:
  - Description of what it shows
  - Which platform(s): web, iOS, Android
  - Whether spotlight annotation is needed and what to highlight
- **Image naming convention** following existing patterns
- **Cross-references** to add or update

### 2.2 User Gate — Approve Plan

**STOP and present the plan to the user for review.** Wait for approval before writing any content or capturing screenshots.

## Phase 3: Capture Screenshots

Follow the complete capture workflow in `references/screenshot-capture-guide.md`.

Before starting, verify MCP tool availability (see the Prerequisites section in the capture guide) and inform the user if any prerequisites are missing.

**User Gate**: If any prerequisite is missing, stop and inform the user what needs to be started.

## Phase 4: Process Screenshots

Follow the processing pipeline in `references/screenshot-capture-guide.md`.

## Phase 5: Write Documentation

### 5.1 Create or Update MDX Files

Follow these patterns from the existing documentation:

**File header with image imports:**
```jsx
import FeatureScreenshot from './img/feature-name.webp';
```

**Image rendering:**
```jsx
<img src={FeatureScreenshot} style={{ maxWidth: '250px', width: '100%' }} alt="Descriptive alt text" />
```

For web screenshots, use `maxWidth: '800px'`.

**Page structure:**
1. Opening paragraph explaining the concept/feature
2. Key capabilities or what's new
3. Step-by-step instructions with screenshots interspersed
4. Cross-references to related pages

### 5.2 Place Images

Save processed WebP images to the appropriate `img/` directory within the docs section:
- Concept docs: `docs/04-concepts/img/`
- Other sections: create or use the section's `img/` subdirectory

Follow the existing naming convention: `feature-name-action.webp` (lowercase, hyphenated).

### 5.3 Update Cross-References

If the new content affects other pages:
- Update any pages that should link to the new content
- Verify existing links still work after changes

## Phase 6: Verify Documentation

### 6.1 Start Dev Server

Ensure the documentation dev server is running:
```bash
yarn start
```

The server runs at `http://localhost:3000`.

### 6.2 Visual Verification with Chrome DevTools MCP

Use the Chrome DevTools MCP to verify the rendered documentation:

1. Navigate to the documentation page:
   ```
   mcp__chrome-devtools__navigate_page → http://localhost:3000/<page-path>
   ```

2. Take a screenshot to verify layout and images:
   ```
   mcp__chrome-devtools__take_screenshot
   ```

3. Verify key elements:
   - Images render correctly (no broken images)
   - Image sizing matches standards (250px mobile, 800px web)
   - Text formatting is correct (bold, lists, headings)
   - Admonitions render properly
   - Links work correctly

4. Check mobile responsiveness by resizing:
   ```
   mcp__chrome-devtools__resize_page → width: 375, height: 812
   mcp__chrome-devtools__take_screenshot
   ```

5. If issues are found, fix them and re-verify.

### 6.3 Build Check

Run a production build to catch any broken links or build errors:
```bash
yarn build
```

The build is configured to throw on broken links, so any link issues will surface here.

## Resources

### scripts/
- **spotlight.ts** — Sharp-based image spotlight tool that highlights one or more rectangular regions with colored borders and dims everything else. Supports multiple `--region` flags for highlighting several areas in a single pass. Replicates Shottr's spotlight feature programmatically. Run with `bun run`.
- **verify-spotlight.ts** — Pre-spotlight verification tool that extracts each region as a standalone cropped sub-image with padding. Used to confirm spotlight coordinates target the correct UI element before applying the spotlight effect. Run with `bun run`.

### references/
- **writing-style-guide.md** — Complete writing style guide covering tone, formatting, image standards, MDX patterns, and content structure conventions.
- **screenshot-capture-guide.md** — Detailed guide for capturing screenshots across web, iOS, and Android using Chrome DevTools and Maestro MCPs, plus the processing pipeline.
