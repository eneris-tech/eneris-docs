# Screenshot Capture Guide

## Table of Contents
1. [Overview](#overview)
2. [When to Use Spotlight](#when-to-use-spotlight)
3. [Prerequisites](#prerequisites)
4. [Web Screenshots (Playwright MCP)](#web-screenshots-playwright-mcp)
5. [iOS Screenshots (Maestro MCP + xcrun simctl)](#ios-screenshots-maestro-mcp--xcrun-simctl)
6. [Android Screenshots (Maestro MCP + adb)](#android-screenshots-maestro-mcp--adb)
7. [Processing Pipeline](#processing-pipeline)
8. [Image Tag Format in MDX](#image-tag-format-in-mdx)
9. [Spotlight Tool](#spotlight-tool)
10. [Blur Tool](#blur-tool)

## Overview

Documentation screenshots must be captured for all three platforms:
- **Web** — via Playwright MCP
- **iOS** — via Maestro MCP (navigation/interaction) + `xcrun simctl` (file-based capture)
- **Android** — via Maestro MCP (navigation/interaction) + `adb` (file-based capture)

All screenshots go through a processing pipeline: capture → crop bars (mobile) → spotlight (recommended) → blur PII (if needed) → convert to WebP.

## When to Use Spotlight

Spotlight should be the **default** for documentation screenshots, not an optional extra. It highlights the specific UI element being discussed and dims everything else, making screenshots far more effective at guiding the reader.

**Use spotlight when:**
- A screenshot accompanies a step-by-step instruction — highlight the specific UI element being referenced in that step
- A screenshot shows a full page but only a specific area is relevant to the surrounding text
- You need to draw the reader's eye to a button, field, toggle, menu item, or any interactive element mentioned in the docs

**Skip spotlight only when:**
- The entire screenshot is equally relevant (e.g., showing a full form that the user needs to fill out completely, or an overview of a page layout)

When in doubt, use spotlight. A screenshot with spotlight is almost always more helpful than one without.

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

## iOS Screenshots (Maestro MCP + xcrun simctl)

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
4. Visually verify you're on the correct screen:
   ```
   mcp__maestro__take_screenshot
   ```
   > **Note:** Maestro's `take_screenshot` returns image data inline (embedded in the response). This is useful for visual verification but does **not** save a file, so it cannot be used as input to the processing pipeline.
5. Capture the file-based screenshot for processing:
   ```bash
   xcrun simctl io booted screenshot /tmp/screenshot.png
   ```
   This saves directly to a file path, which is required for cropping, spotlight, blur, and WebP conversion.

### iOS-Specific Notes
- **Notch/Dynamic Island crop**: 165px from top — crops out the notch/dynamic island while preserving the navigation bar. Use this instead of the full status bar crop.
- Full status bar height: 132px (44pt × 3x scale) — do NOT use this; it leaves a visible sliver of the dynamic island on newer iPhones.
- Home indicator/nav bar height: 102px (34pt × 3x scale)
- **FullWindowOverlay limitation**: Bottom sheets cannot be interacted with in Maestro. If the target UI is in a bottom sheet, capture via web instead.

## Android Screenshots (Maestro MCP + adb)

### Prerequisites
- Android Emulator running
- App installed and available

### Capture Workflow
Same as iOS workflow using Maestro MCP tools for navigation and interaction. For file-based capture:

> **Note:** Like iOS, Maestro's `take_screenshot` returns inline data and cannot be piped into the processing scripts. Use it for visual verification, then capture the file with adb:
> ```bash
> adb exec-out screencap -p > /tmp/screenshot.png
> ```

### Android-Specific Notes
- Status bar height: 72px (24dp × 3x scale)
- Navigation bar height: 126px (42dp × 3x scale)

## Raw Screenshot Preservation

**After every screenshot capture, immediately rename or copy the raw file to `/tmp/raw-<descriptive-name>.png` before any processing.** This ensures you can re-run cropping, spotlight, or other processing steps without recapturing. Never process the raw file in-place — always use the raw copy as input to the processing pipeline.

Since `xcrun simctl` and `adb` save directly to a named file path, you can capture straight to the raw path:

```bash
# iOS — capture directly to the raw path
xcrun simctl io booted screenshot /tmp/raw-feature-settings-ios.png

# Android — capture directly to the raw path
adb exec-out screencap -p > /tmp/raw-feature-settings-android.png

# Web — Playwright saves to /tmp/screenshot.png, so copy it
cp /tmp/screenshot.png /tmp/raw-feature-settings-web.png
```

Now use the `/tmp/raw-<name>.png` file as input to the pipeline.

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

# 1. Get image dimensions, then crop out notch/dynamic island and nav bar
bun run $SCRIPTS/info.ts -i screenshot.png
# Use the reported height to compute crop bounds:
#   iOS:     --top 165 --height $((IMG_HEIGHT - 165 - 102))  (hides notch/dynamic island)
#   Android: --top 72  --height $((IMG_HEIGHT - 72 - 126))
bun run $SCRIPTS/crop.ts -i screenshot.png -o /tmp/cropped.png --top 165 --height <computed>

# 2a. Verify spotlight coordinates before applying (recommended)
bun run $SCRIPTS/verify-spotlight.ts -i /tmp/cropped.png --region "left,top,width,height"
# ⚠️ Read each /tmp/verify-region-*.png — confirm it shows the intended UI element

# 2b. Apply spotlight with verified coordinates
bun run $SCRIPTS/spotlight.ts -i /tmp/cropped.png -o /tmp/spotlight.png --region "left,top,width,height"
# For multiple highlights: --region "left,top,w,h" --region "left,top,w,h"

# 3. (Optional) Blur PII — if screenshot contains sensitive info (emails, names, etc.)
bun run $SCRIPTS/verify-blur.ts -i /tmp/spotlight.png --region "left,top,width,height"
# ⚠️ Read each /tmp/verify-blur-region-*.png — confirm it shows the PII to redact
bun run $SCRIPTS/blur.ts -i /tmp/spotlight.png -o /tmp/blurred.png --region "left,top,width,height"

# 4. Convert to WebP
bun run $SCRIPTS/to-webp.ts -i /tmp/blurred.png -o docs/04-concepts/img/feature-name.webp --quality 80
# If no blur was needed, use /tmp/spotlight.png as input instead
```

### Standard Web Screenshot Pipeline

**Crop vs. Spotlight**: Do NOT crop unless absolutely necessary — only use crop to remove unhelpful chrome (headers, sidebars, navigation bars), never to isolate a specific UI element. To draw attention to a specific element (e.g., a card, button, or form field), use spotlight on a wider screenshot instead of cropping tightly to just that element. This preserves surrounding context and helps users orient themselves in the UI.

**Spotlight verification**: Before applying spotlight, use `verify-spotlight.ts` to extract each region as a standalone cropped sub-image with padding. Read each extract to confirm it contains the intended UI element. This is more reliable than post-spotlight visual inspection because it shifts verification from pixel-coordinate judgment to content recognition. If an extract doesn't show the right element, adjust coordinates and re-verify before running spotlight.

```bash
SCRIPTS=".claude/skills/update-documentation/scripts"

# 1. Crop to relevant area (optional — only to remove chrome, not to isolate elements)
bun run $SCRIPTS/crop.ts -i screenshot.png -o /tmp/cropped.png --left 0 --top 0 --width 1200 --height 800

# 2a. Verify spotlight coordinates before applying (recommended)
bun run $SCRIPTS/verify-spotlight.ts -i /tmp/cropped.png --region "left,top,width,height"
# ⚠️ Read each /tmp/verify-region-*.png — confirm it shows the intended UI element

# 2b. Apply spotlight with verified coordinates
bun run $SCRIPTS/spotlight.ts -i /tmp/cropped.png -o /tmp/spotlight.png --region "left,top,width,height"
# For multiple highlights: --region "left,top,w,h" --region "left,top,w,h"

# 3. (Optional) Blur PII — if screenshot contains sensitive info (emails, names, etc.)
bun run $SCRIPTS/verify-blur.ts -i /tmp/spotlight.png --region "left,top,width,height"
# ⚠️ Read each /tmp/verify-blur-region-*.png — confirm it shows the PII to redact
bun run $SCRIPTS/blur.ts -i /tmp/spotlight.png -o /tmp/blurred.png --region "left,top,width,height"

# 4. Convert to WebP
bun run $SCRIPTS/to-webp.ts -i /tmp/blurred.png -o docs/04-concepts/img/feature-name-web.webp --quality 80
# If no blur was needed, use /tmp/spotlight.png as input instead
```

## Image Tag Format in MDX

Every `<img>` tag in the docs **must** include `width` and `height` attributes with the actual pixel dimensions of the image. This prevents layout shift when navigating to anchor links — without explicit dimensions, the browser can't reserve space before images load, causing the scroll position to jump past the target heading.

### Getting Dimensions

After converting to WebP (the final pipeline step), get the pixel dimensions:

```bash
sips -g pixelWidth -g pixelHeight docs/04-concepts/img/feature-name.webp
```

### Two maxWidth Patterns

| Screenshot type | `maxWidth` | When to use |
|----------------|-----------|-------------|
| Desktop / web | `'800px'` | Screenshots captured from Playwright at desktop viewport |
| Mobile / portrait | `'400px'` | Screenshots captured from iOS Simulator or Android Emulator |

### Full Examples

**Web screenshot:**
```mdx
<img src={require('./img/feature-name-web.webp').default} alt="Description of the screenshot" style={{maxWidth: '800px'}} width={1280} height={800} />
```

**Mobile screenshot:**
```mdx
<img src={require('./img/feature-name-ios.webp').default} alt="Description of the screenshot" style={{maxWidth: '400px'}} width={1170} height={2145} />
```

> **Note:** Use the actual dimensions reported by `sips`, not the examples above. The `width` and `height` values will vary based on the capture viewport and any cropping applied.

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

## Blur Tool

The blur tool (`scripts/blur.ts`) applies Gaussian blur to one or more rectangular regions of an image, making text or other sensitive content unreadable. Use this to redact PII (emails, names, phone numbers, etc.) in documentation screenshots.

### When to Use Blur

**Use blur when:**
- A screenshot contains email addresses, phone numbers, or other PII that should not be published
- User names or account details visible in the UI need to be obscured
- Any sensitive information appears in the screenshot that isn't part of the documentation's instructional content

**Blur vs. Spotlight:** These tools serve different purposes and can be used together. Spotlight draws attention to a UI element; blur hides sensitive content. A screenshot can have both spotlight highlights and blurred regions.

### Usage
```bash
# Single region
bun run blur.ts -i <input> -o <output> --region "left,top,width,height" [options]

# Multiple regions (repeat --region)
bun run blur.ts -i <input> -o <output> --region "left,top,w,h" --region "left,top,w,h" [options]
```

### Options
| Flag | Default | Description |
|------|---------|-------------|
| `--sigma` | `10` | Gaussian blur intensity (0.3–1000). Higher = more blurred. 10 is sufficient for most text at standard screenshot DPI. |

### Verification with `verify-blur.ts`
Before applying blur, verify that your coordinates target the correct sensitive content by extracting each region as a standalone sub-image:

```bash
SCRIPTS=".claude/skills/update-documentation/scripts"

# Extract regions for verification (adds 20px padding by default)
bun run $SCRIPTS/verify-blur.ts -i <input> --region "left,top,width,height" [--region ...] [--padding 20]
# → Region 1: /tmp/verify-blur-region-1.png
```

Read each `/tmp/verify-blur-region-*.png` and confirm it contains the PII that should be blurred. If the extract doesn't show the right content, adjust coordinates and re-verify. Only proceed to `blur.ts` once all regions are confirmed correct.
