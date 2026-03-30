import { parseArgs } from "node:util";
import sharp from "sharp";

/**
 * Verify blur — extracts each blur region as a standalone cropped sub-image
 * with padding so Claude can confirm the region contains the intended PII
 * BEFORE running the blur tool.
 *
 * Usage:
 *   bun run verify-blur.ts -i input.png --region "100,200,400,300"
 *   bun run verify-blur.ts -i input.png --region "100,200,400,300" --region "600,50,200,150" --padding 30
 *
 * Options:
 *   --input / -i      Source image (same image you'd pass to blur)
 *   --region / -r      Region(s) to verify as "left,top,width,height" in pixels (repeatable)
 *   --padding / -p     Extra pixels around each extract for visual context (default: 20)
 */

const { values } = parseArgs({
  options: {
    input: { type: "string", short: "i" },
    region: { type: "string", short: "r", multiple: true },
    padding: { type: "string", short: "p" },
  },
});

if (!values.input || !values.region?.length) {
  console.error(
    'Usage: bun run verify-blur.ts -i <input> --region "left,top,width,height" [--region ...] [--padding 20]'
  );
  process.exit(1);
}

const regions = values.region.map((r, i) => {
  const [left, top, width, height] = r.split(",").map((v) => parseInt(v.trim(), 10));
  if ([left, top, width, height].some((v) => isNaN(v))) {
    console.error(`Error: --region #${i + 1} must be four comma-separated integers: "left,top,width,height" (got "${r}")`);
    process.exit(1);
  }
  return { left, top, width, height };
});

const padding = values.padding ? parseInt(values.padding, 10) : 20;

try {
  const metadata = await sharp(values.input).metadata();
  const imgW = metadata.width!;
  const imgH = metadata.height!;

  // Validate region bounds
  for (let i = 0; i < regions.length; i++) {
    const r = regions[i];
    if (r.left < 0 || r.top < 0 || r.width <= 0 || r.height <= 0) {
      throw new Error(`Region #${i + 1}: coordinates must be non-negative and dimensions must be positive`);
    }
    if (r.left + r.width > imgW || r.top + r.height > imgH) {
      throw new Error(
        `Region #${i + 1}: region (${r.left},${r.top} ${r.width}x${r.height}) exceeds image bounds (${imgW}x${imgH})`
      );
    }
  }

  // Extract each region with padding
  for (let i = 0; i < regions.length; i++) {
    const r = regions[i];
    const extractLeft = Math.max(0, r.left - padding);
    const extractTop = Math.max(0, r.top - padding);
    const extractWidth = Math.min(imgW, r.left + r.width + padding) - extractLeft;
    const extractHeight = Math.min(imgH, r.top + r.height + padding) - extractTop;

    const outPath = `/tmp/verify-blur-region-${i + 1}.png`;
    await sharp(values.input)
      .extract({ left: extractLeft, top: extractTop, width: extractWidth, height: extractHeight })
      .toFile(outPath);

    console.log(`Region ${i + 1}: ${outPath}`);
  }
} catch (err: any) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
