import { parseArgs } from "node:util";
import sharp from "sharp";

/**
 * Crop tool — extracts a rectangular region from an image.
 *
 * Usage:
 *   bun run crop.ts -i input.png -o output.png --left 0 --top 0 --width 800 --height 600
 */

const { values } = parseArgs({
  options: {
    input: { type: "string", short: "i" },
    output: { type: "string", short: "o" },
    left: { type: "string" },
    top: { type: "string" },
    width: { type: "string" },
    height: { type: "string" },
  },
});

if (!values.input || !values.width || !values.height) {
  console.error(
    "Usage: bun run crop.ts -i <input> -o <output> --left 0 --top 0 --width 800 --height 600"
  );
  process.exit(1);
}

const left = values.left ? parseInt(values.left, 10) : 0;
const top = values.top ? parseInt(values.top, 10) : 0;
const width = parseInt(values.width, 10);
const height = parseInt(values.height, 10);
const output = values.output ?? values.input;

if ([left, top, width, height].some((v) => isNaN(v))) {
  console.error("Error: all dimension values must be integers");
  process.exit(1);
}

if (width <= 0 || height <= 0) {
  console.error("Error: width and height must be positive");
  process.exit(1);
}

try {
  const metadata = await sharp(values.input).metadata();
  const imgW = metadata.width!;
  const imgH = metadata.height!;

  if (left + width > imgW || top + height > imgH) {
    throw new Error(
      `Crop region (${left},${top} ${width}x${height}) exceeds image bounds (${imgW}x${imgH})`
    );
  }

  await sharp(values.input)
    .extract({ left, top, width, height })
    .toFile(output);

  console.log(output);
} catch (err: any) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
