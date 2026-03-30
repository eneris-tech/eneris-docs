import { parseArgs } from "node:util";
import sharp from "sharp";

/**
 * Blur tool — applies Gaussian blur to one or more rectangular regions of an image.
 * Useful for redacting sensitive information (emails, names, etc.) in screenshots.
 *
 * Usage:
 *   bun run blur.ts -i input.png -o output.png --region "100,200,400,300"
 *   bun run blur.ts -i input.png -o output.png --region "100,200,400,50" --region "100,300,400,50"
 *   bun run blur.ts -i input.png -o output.png --region "100,200,400,300" --sigma 20
 *
 * Options:
 *   --input / -i          Input image path
 *   --output / -o         Output image path (defaults to overwriting input)
 *   --region / -r         Region to blur as "left,top,width,height" in pixels (repeatable)
 *   --sigma               Gaussian blur sigma value (default: 10)
 */

const { values } = parseArgs({
  options: {
    input: { type: "string", short: "i" },
    output: { type: "string", short: "o" },
    region: { type: "string", short: "r", multiple: true },
    sigma: { type: "string" },
  },
});

if (!values.input || !values.region?.length) {
  console.error(
    'Usage: bun run blur.ts -i <input> -o <output> --region "left,top,width,height" [--region ...] [--sigma 10]'
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

const sigma = values.sigma ? parseFloat(values.sigma) : 10;
const output = values.output ?? values.input;

if (isNaN(sigma) || sigma < 0.3 || sigma > 1000) {
  console.error("Error: --sigma must be a number between 0.3 and 1000");
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
        `Region #${i + 1}: blur region (${r.left},${r.top} ${r.width}x${r.height}) exceeds image bounds (${imgW}x${imgH})`
      );
    }
  }

  // Extract each region, apply blur, prepare for compositing
  const blurredRegions = await Promise.all(
    regions.map(async (r) => {
      const blurred = await sharp(values.input)
        .extract({ left: r.left, top: r.top, width: r.width, height: r.height })
        .blur(sigma)
        .toBuffer();
      return {
        input: blurred,
        left: r.left,
        top: r.top,
      };
    })
  );

  await sharp(values.input)
    .composite(blurredRegions)
    .toFile(output);

  console.log(output);
} catch (err: any) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
