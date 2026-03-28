# Screenshot Capture Guide

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Web Screenshots (Playwright MCP)](#web-screenshots-playwright-mcp)
4. [iOS Screenshots (Maestro MCP)](#ios-screenshots-maestro-mcp)
5. [Android Screenshots (Maestro MCP)](#android-screenshots-maestro-mcp)
6. [Processing Pipeline](#processing-pipeline)
7. [Spotlight Tool](#spotlight-tool)

## Overview

Documentation screenshots must be captured for all three platforms:
- **Web** — via Playwright MCP
- **iOS** — via Maestro MCP (iOS Simulator)
- **Android** — via Maestro MCP (Android Emulator)

All screenshots go through a processing pipeline: capture → crop bars (mobile) → spotlight (optional) → convert to WebP.

## Prerequisites

Verify MCP tool availability before starting any capture work.

**Web (Playwright MCP):**
```
mcp__playwright__browser_take_screenshot
```
If unavailable, instruct the user to ensure the Playwright MCP server is running.

**Mobile (Maestro MCP):**
```
mcp__maestro__list_devices
```
If unavailable, instruct the user to start iOS Simulator and/or Android Emulator.

**User Gate**: If any prerequisite is missing, stop and inform the user what needs to be started.

### Additional Prerequisites
- Documentation dev server running: `yarn start` (from eneris-docs)
- OR app dev server running: `cd packages/website && pdk start` (from main codebase)

## Web Screenshots (Playwright MCP)

### Capture Workflow
1. Navigate to the target page:
   ```
   mcp__playwright__browser_navigate → URL
   ```
2. Set viewport via `mcp__playwright__browser_resize` — **default to 1280×800 desktop viewport** unless the user specifies otherwise (use 390×844 for mobile-web)
3. Take a snapshot to verify the page state:
   ```
   mcp__playwright__browser_snapshot
   ```
4. Interact with the page to reach the desired state (click, fill forms, etc.)
5. Capture screenshot:
   ```
   mcp__playwright__browser_take_screenshot
   ```

## iOS Screenshots (Maestro MCP)

### Prerequisites
- iOS Simulator running
- App installed and available

### Capture Workflow
1. List available devices:
   ```
   mcp__maestro__list_devices
   ```
2. Launch the app:
   ```
   mcp__maestro__launch_app → bundle ID
   ```
3. Navigate to the desired screen using taps and interactions:
   ```
   mcp__maestro__tap_on → element text or ID
   ```
4. Capture screenshot:
   ```
   mcp__maestro__take_screenshot
   ```

### iOS-Specific Notes
- Status bar height: 132px (44pt × 3x scale)
- Home indicator/nav bar height: 102px (34pt × 3x scale)
- **FullWindowOverlay limitation**: Bottom sheets cannot be interacted with in Maestro. If the target UI is in a bottom sheet, capture via web instead.

## Android Screenshots (Maestro MCP)

### Prerequisites
- Android Emulator running
- App installed and available

### Capture Workflow
Same as iOS workflow using Maestro MCP tools.

### Android-Specific Notes
- Status bar height: 72px (24dp × 3x scale)
- Navigation bar height: 126px (42dp × 3x scale)

## Raw Screenshot Preservation

**After every screenshot capture, immediately copy the raw file to `/tmp/raw-<descriptive-name>.png` before any processing.** This ensures you can re-run cropping, spotlight, or other processing steps without recapturing. Never process the raw file in-place — always use the raw copy as input to the processing pipeline.

```bash
# Example: after capturing a web screenshot saved to /tmp/screenshot.png
cp /tmp/screenshot.png /tmp/raw-feature-settings-web.png
# Now use /tmp/raw-feature-settings-web.png as input to the pipeline
```

## Processing Pipeline

All scripts are in the docs codebase at:
```
.claude/skills/update-documentation/scripts/
```

**IMPORTANT**: All `bun run` commands must be executed from the `eneris-docs` project root so that sharp resolves correctly from `node_modules/`.

**IMPORTANT**: Always use the raw copy (`/tmp/raw-<name>.png`) as input to the pipeline — never process the original capture in-place. If processing needs to be re-done, start again from the raw copy.

### Standard Mobile Screenshot Pipeline
```bash
SCRIPTS=".claude/skills/update-documentation/scripts"

# 1. Get image dimensions, then crop out status/nav bars
bun run $SCRIPTS/info.ts -i screenshot.png
# Use the reported height to compute crop bounds:
#   iOS:     --top 132 --height $((IMG_HEIGHT - 132 - 102))
#   Android: --top 72  --height $((IMG_HEIGHT - 72 - 126))
bun run $SCRIPTS/crop.ts -i screenshot.png -o /tmp/cropped.png --top 132 --height <computed>

# 2a. Verify spotlight coordinates before applying (optional — only if using spotlight)
bun run $SCRIPTS/verify-spotlight.ts -i /tmp/cropped.png --region "left,top,width,height"
# ⚠️ Read each /tmp/verify-region-*.png — confirm it shows the intended UI element

# 2b. Apply spotlight with verified coordinates
bun run $SCRIPTS/spotlight.ts -i /tmp/cropped.png -o /tmp/spotlight.png --region "left,top,width,height"
# For multiple highlights: --region "left,top,w,h" --region "left,top,w,h"

# 3. Convert to WebP
bun run $SCRIPTS/to-webp.ts -i /tmp/spotlight.png -o docs/04-concepts/img/feature-name.webp --quality 80
```

### Standard Web Screenshot Pipeline

**Crop vs. Spotlight**: Do NOT crop unless absolutely necessary — only use crop to remove unhelpful chrome (headers, sidebars, navigation bars), never to isolate a specific UI element. To draw attention to a specific element (e.g., a card, button, or form field), use spotlight on a wider screenshot instead of cropping tightly to just that element. This preserves surrounding context and helps users orient themselves in the UI.

**Spotlight verification**: Before applying spotlight, use `verify-spotlight.ts` to extract each region as a standalone cropped sub-image with padding. Read each extract to confirm it contains the intended UI element. This is more reliable than post-spotlight visual inspection because it shifts verification from pixel-coordinate judgment to content recognition. If an extract doesn't show the right element, adjust coordinates and re-verify before running spotlight.

```bash
SCRIPTS=".claude/skills/update-documentation/scripts"

# 1. Crop to relevant area (optional — only to remove chrome, not to isolate elements)
bun run $SCRIPTS/crop.ts -i screenshot.png -o /tmp/cropped.png --left 0 --top 0 --width 1200 --height 800

# 2a. Verify spotlight coordinates before applying (optional — only if using spotlight)
bun run $SCRIPTS/verify-spotlight.ts -i /tmp/cropped.png --region "left,top,width,height"
# ⚠️ Read each /tmp/verify-region-*.png — confirm it shows the intended UI element

# 2b. Apply spotlight with verified coordinates
bun run $SCRIPTS/spotlight.ts -i /tmp/cropped.png -o /tmp/spotlight.png --region "left,top,width,height"
# For multiple highlights: --region "left,top,w,h" --region "left,top,w,h"

# 3. Convert to WebP
bun run $SCRIPTS/to-webp.ts -i /tmp/spotlight.png -o docs/04-concepts/img/feature-name-web.webp --quality 80
```

## Spotlight Tool

The spotlight tool (`scripts/spotlight.ts`) highlights a specific rectangular region and dims everything else, replicating Shottr's spotlight feature programmatically.

### Usage
```bash
# Single region
bun run spotlight.ts -i <input> -o <output> --region "left,top,width,height" [options]

# Multiple regions (repeat --region)
bun run spotlight.ts -i <input> -o <output> --region "left,top,w,h" --region "left,top,w,h" [options]
```

### Options
| Flag | Default | Description |
|------|---------|-------------|
| `--border-color` | `#F05539` | Spotlight border color |
| `--border-width` | `6` | Border width in pixels |
| `--darkness` | `3` | Dim level 1-9 (9 = fully opaque) |

### Determining Spotlight Region
To find the correct region coordinates:
1. Use `bun run info.ts -i <image>` to get image dimensions
2. Open the image and identify the area of interest
3. Estimate or measure the region as `left,top,width,height` in pixels
4. Apply and verify — adjust coordinates as needed

Alternatively, use the Playwright/Maestro MCP to inspect element bounds and derive pixel coordinates from the element's position in the viewport.

### Verification with `verify-spotlight.ts`
Before applying spotlight, verify that your coordinates target the correct UI element by extracting each region as a standalone sub-image:

```bash
SCRIPTS=".claude/skills/update-documentation/scripts"

# Extract regions for verification (adds 20px padding by default)
bun run $SCRIPTS/verify-spotlight.ts -i <input> --region "left,top,width,height" [--region ...] [--padding 20]
# → Region 1: /tmp/verify-region-1.png
```

Read each `/tmp/verify-region-*.png` and confirm it contains the intended UI element. If the extract doesn't show the right content, adjust coordinates and re-verify. Only proceed to `spotlight.ts` once all regions are confirmed correct. This is more reliable than post-spotlight visual inspection because it shifts verification from pixel-coordinate judgment to content recognition.
