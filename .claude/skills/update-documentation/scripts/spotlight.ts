import { parseArgs } from "node:util";
import sharp from "sharp";

/**
 * Spotlight tool — highlights one or more rectangular regions of an image and dims the rest.
 * Replicates the Shottr spotlight feature programmatically using Sharp.
 *
 * Usage:
 *   bun run spotlight.ts -i input.png -o output.png --region "100,200,400,300"
 *   bun run spotlight.ts -i input.png -o output.png --region "100,200,400,300" --region "600,50,200,150"
 *
 * Options:
 *   --input / -i          Input image path
 *   --output / -o         Output image path (defaults to overwriting input)
 *   --region / -r         Spotlight region as "left,top,width,height" in pixels (repeatable)
 *   --border-color        Border color (default: #F05539)
 *   --border-width        Border width in pixels (default: 4)
 *   --darkness            Darkness level 1-9, where 9 is fully opaque (default: 3)
 */

const { values } = parseArgs({
  options: {
    input: { type: "string", short: "i" },
    output: { type: "string", short: "o" },
    region: { type: "string", short: "r", multiple: true },
    "border-color": { type: "string" },
    "border-width": { type: "string" },
    darkness: { type: "string" },
  },
});

if (!values.input || !values.region?.length) {
  console.error(
    'Usage: bun run spotlight.ts -i <input> -o <output> --region "left,top,width,height" [--region ...] [--border-color #F05539] [--border-width 4] [--darkness 3]'
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

const borderColor = values["border-color"] ?? "#F05539";
const borderWidth = values["border-width"] ? parseInt(values["border-width"], 10) : 4;
const darknessLevel = values.darkness ? parseInt(values.darkness, 10) : 3;
const output = values.output ?? values.input;

if (darknessLevel < 1 || darknessLevel > 9) {
  console.error("Error: --darkness must be between 1 and 9");
  process.exit(1);
}

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
        `Region #${i + 1}: spotlight region (${r.left},${r.top} ${r.width}x${r.height}) exceeds image bounds (${imgW}x${imgH})`
      );
    }
  }

  // Calculate opacity from darkness level (1-9 scale, where Shottr default is 3)
  const opacity = darknessLevel / 9;

  // Build SVG overlay:
  // 1. A full-image semi-transparent black rectangle (the dim layer)
  // 2. Clear cutouts for each spotlight region (via mask)
  // 3. Colored borders around each spotlight region
  const halfBorder = borderWidth / 2;

  const maskCutouts = regions
    .map((r) => `<rect x="${r.left}" y="${r.top}" width="${r.width}" height="${r.height}" fill="black"/>`)
    .join("\n          ");

  const borderRects = regions
    .map(
      (r) =>
        `<rect x="${r.left - halfBorder}" y="${r.top - halfBorder}" width="${r.width + borderWidth}" height="${r.height + borderWidth}" fill="none" stroke="${borderColor}" stroke-width="${borderWidth}" rx="4" ry="4"/>`
    )
    .join("\n      ");

  const svgOverlay = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${imgW}" height="${imgH}">
      <defs>
        <mask id="spotlight-mask">
          <!-- White = visible (dim overlay shows), Black = hidden (cutout) -->
          <rect width="${imgW}" height="${imgH}" fill="white"/>
          ${maskCutouts}
        </mask>
      </defs>

      <!-- Dim overlay with cutouts -->
      <rect width="${imgW}" height="${imgH}"
            fill="black" opacity="${opacity}"
            mask="url(#spotlight-mask)"/>

      <!-- Spotlight borders -->
      ${borderRects}
    </svg>
  `;

  await sharp(values.input)
    .composite([
      {
        input: Buffer.from(svgOverlay),
        top: 0,
        left: 0,
      },
    ])
    .toFile(output);

  console.log(output);
} catch (err: any) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
