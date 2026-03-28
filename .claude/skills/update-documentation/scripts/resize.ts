import { parseArgs } from "node:util";
import sharp from "sharp";

/**
 * Resize tool — resizes an image to a target width (maintaining aspect ratio).
 *
 * Usage:
 *   bun run resize.ts -i input.png -o output.png --width 800
 *   bun run resize.ts -i input.png -o output.png --width 800 --height 600
 */

const { values } = parseArgs({
  options: {
    input: { type: "string", short: "i" },
    output: { type: "string", short: "o" },
    width: { type: "string" },
    height: { type: "string" },
  },
});

if (!values.input || !values.width) {
  console.error(
    "Usage: bun run resize.ts -i <input> -o <output> --width 800 [--height 600]"
  );
  process.exit(1);
}

const width = parseInt(values.width, 10);
const height = values.height ? parseInt(values.height, 10) : undefined;
const output = values.output ?? values.input;

if (isNaN(width) || width <= 0) {
  console.error("Error: width must be a positive integer");
  process.exit(1);
}

try {
  await sharp(values.input)
    .resize(width, height, { fit: "inside", withoutEnlargement: true })
    .toFile(output);

  console.log(output);
} catch (err: any) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
