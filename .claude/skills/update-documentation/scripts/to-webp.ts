import { parseArgs } from "node:util";
import sharp from "sharp";

/**
 * WebP conversion tool — converts an image to WebP format.
 *
 * Usage:
 *   bun run to-webp.ts -i input.png -o output.webp --quality 80
 */

const { values } = parseArgs({
  options: {
    input: { type: "string", short: "i" },
    output: { type: "string", short: "o" },
    quality: { type: "string", short: "q" },
  },
});

if (!values.input) {
  console.error(
    "Usage: bun run to-webp.ts -i <input> -o <output> [--quality 80]"
  );
  process.exit(1);
}

const quality = values.quality ? parseInt(values.quality, 10) : 80;
const output = values.output ?? values.input.replace(/\.[^.]+$/, ".webp");

if (isNaN(quality) || quality < 1 || quality > 100) {
  console.error("Error: quality must be between 1 and 100");
  process.exit(1);
}

try {
  await sharp(values.input).webp({ quality }).toFile(output);

  console.log(output);
} catch (err: any) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
