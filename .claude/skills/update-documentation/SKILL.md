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

Reference `references/screenshot-capture-guide.md` for detailed capture and processing instructions.

### 3.1 Prerequisites Check

Verify MCP tool availability before proceeding:

**Web (Chrome DevTools MCP):**
```
mcp__chrome-devtools__take_snapshot
```
If unavailable, instruct user to ensure the Chrome DevTools MCP server is running.

**Mobile (Maestro MCP):**
```
mcp__maestro__list_devices
```
If unavailable, instruct user to start iOS Simulator and/or Android Emulator.

**User Gate**: If any prerequisite is missing, stop and inform the user what needs to be started.

### 3.2 Raw Screenshot Preservation

**After every screenshot capture, immediately copy the raw file to `/tmp/raw-<descriptive-name>.png` before any processing.** This ensures you can re-run cropping, spotlight, or other processing steps without recapturing. Never process the raw file in-place — always use the raw copy as input to the processing pipeline.

### 3.3 Web Screenshots

1. Navigate to the target page via `mcp__chrome-devtools__navigate_page`
2. Set viewport via `mcp__chrome-devtools__resize_page` — **default to 1280×800 desktop viewport** unless the user specifies otherwise (use 390×844 for mobile-web)
3. Interact with the page to reach the desired state (use `mcp__chrome-devtools__click`, `mcp__chrome-devtools__fill_form`, etc.)
4. Capture via `mcp__chrome-devtools__take_screenshot`
5. Save to a temporary location for processing

### 3.4 iOS Screenshots

1. Verify device availability: `mcp__maestro__list_devices`
2. Launch the app: `mcp__maestro__launch_app`
3. Navigate to the target screen using `mcp__maestro__tap_on` and other interaction tools
4. Inspect the view hierarchy if needed: `mcp__maestro__inspect_view_hierarchy`
5. Capture: `mcp__maestro__take_screenshot`

**Known limitation**: Bottom sheets (FullWindowOverlay) cannot be interacted with in Maestro. If the target UI is in a bottom sheet, capture via web with mobile viewport instead.

### 3.5 Android Screenshots

Same workflow as iOS using Maestro MCP tools. Ensure an Android emulator is running and the app is installed.

## Phase 4: Process Screenshots

Use the screenshot processing scripts in the `scripts/` directory of this skill.

**IMPORTANT**: All `bun run` commands must be executed from the `eneris-docs` project root so that sharp resolves correctly from `node_modules/`.

**IMPORTANT**: Always use the raw copy (`/tmp/raw-<name>.png`) as input to the pipeline — never process the original capture in-place. If processing needs to be re-done, start again from the raw copy.

```bash
SCRIPTS=".claude/skills/update-documentation/scripts"
```

### 4.1 Standard Mobile Pipeline

```bash
# 1. Get image info
bun run $SCRIPTS/info.ts -i <captured-screenshot>

# 2. Strip status/nav bars (manual crop)
bun run $SCRIPTS/crop.ts -i <captured-screenshot> -o /tmp/stripped.png --left 0 --top <status-bar-height> --width <img-width> --height <content-height>

# 3. Apply spotlight (if highlighting a specific area — supports multiple regions)
bun run $SCRIPTS/spotlight.ts -i /tmp/stripped.png -o /tmp/spotlight.png --region "left,top,width,height"
# For multiple highlights: --region "left,top,w,h" --region "left,top,w,h"

# 4. Resize (750px width for retina → renders at ~250px in docs with maxWidth)
bun run $SCRIPTS/resize.ts -i /tmp/spotlight.png -o /tmp/resized.png --width 750

# 5. Convert to WebP
bun run $SCRIPTS/to-webp.ts -i /tmp/resized.png -o <final-output-path>.webp --quality 80
```

### 4.2 Standard Web Pipeline

**Crop vs. Spotlight**: Do NOT crop unless absolutely necessary — only use crop to remove unhelpful chrome (headers, sidebars, navigation bars), never to isolate a specific UI element. To draw attention to a specific element (e.g., a card, button, or form field), use spotlight on a wider screenshot instead of cropping tightly to just that element. This preserves surrounding context and helps users orient themselves in the UI.

**Spotlight verification**: Before applying spotlight, use `verify-spotlight.ts` to extract each region as a standalone cropped sub-image with padding. Read each extract to confirm it contains the intended UI element. This is more reliable than post-spotlight visual inspection because it shifts verification from pixel-coordinate judgment to content recognition. If an extract doesn't show the right element, adjust coordinates and re-verify before running spotlight.

```bash
# 1. Crop to remove irrelevant chrome (ONLY if absolutely necessary — do NOT crop to isolate an element)
bun run $SCRIPTS/crop.ts -i <captured-screenshot> -o /tmp/cropped.png --left 0 --top 0 --width 1200 --height 800

# 2a. Verify spotlight coordinates before applying
bun run $SCRIPTS/verify-spotlight.ts -i /tmp/cropped.png --region "left,top,width,height"
# ⚠️ Read each /tmp/verify-region-*.png — confirm it shows the intended UI element
#    If NO → adjust coordinates, re-verify
#    If YES → proceed to spotlight

# 2b. Apply spotlight with verified coordinates
bun run $SCRIPTS/spotlight.ts -i /tmp/cropped.png -o /tmp/spotlight.png --region "left,top,width,height"
# For multiple highlights: --region "left,top,w,h" --region "left,top,w,h"

# 3. Resize
bun run $SCRIPTS/resize.ts -i /tmp/spotlight.png -o /tmp/resized.png --width 800

# 4. Convert to WebP
bun run $SCRIPTS/to-webp.ts -i /tmp/resized.png -o <final-output-path>.webp --quality 80
```

### 4.3 Spotlight Tool

The spotlight script (`scripts/spotlight.ts`) highlights one or more rectangular regions and dims everything else:

```bash
# Single region
bun run spotlight.ts -i <input> -o <output> --region "left,top,width,height" [--border-color '#F05539'] [--border-width 4] [--darkness 3]

# Multiple regions
bun run spotlight.ts -i <input> -o <output> --region "left,top,w,h" --region "left,top,w,h" [--border-color '#F05539'] [--border-width 4] [--darkness 3]
```

Defaults match Shottr standards: border color `#F05539`, darkness level 3/9, border width 4px. The `--region` flag can be repeated to highlight multiple areas in a single pass.

**Prefer spotlight over tight cropping**: When the goal is to show a specific UI element (e.g., a card, button, form field), spotlight it within a wider screenshot rather than cropping the image down to just that element. Keeping surrounding context helps users understand where the element lives in the UI.

**Verification with `verify-spotlight.ts`**: Before applying spotlight, verify that your coordinates target the correct UI element by extracting each region as a standalone sub-image:

```bash
# Extract regions for verification (adds 20px padding by default)
bun run $SCRIPTS/verify-spotlight.ts -i <input> --region "left,top,width,height" [--region ...] [--padding 20]
# → Region 1: /tmp/verify-region-1.png
# → Region 2: /tmp/verify-region-2.png
```

Read each `/tmp/verify-region-*.png` and confirm it contains the intended UI element. If the extract doesn't show the right content, adjust coordinates and re-verify. Only proceed to `spotlight.ts` once all regions are confirmed correct.

To determine spotlight coordinates:
- Use `bun run info.ts` to get image dimensions
- Inspect element bounds via MCP tools (Chrome DevTools snapshot or Maestro view hierarchy)
- Estimate coordinates based on the UI element position relative to image dimensions

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
