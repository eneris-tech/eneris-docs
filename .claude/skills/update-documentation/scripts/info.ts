import { parseArgs } from "node:util";
import sharp from "sharp";

/**
 * Image info tool — prints dimensions and format of an image.
 *
 * Usage:
 *   bun run info.ts -i input.png
 */

const { values } = parseArgs({
  options: {
    input: { type: "string", short: "i" },
  },
});

if (!values.input) {
  console.error("Usage: bun run info.ts -i <input>");
  process.exit(1);
}

try {
  const metadata = await sharp(values.input).metadata();
  console.log(`File: ${values.input}`);
  console.log(`Format: ${metadata.format}`);
  console.log(`Width: ${metadata.width}`);
  console.log(`Height: ${metadata.height}`);
  console.log(`Channels: ${metadata.channels}`);
  if (metadata.density) console.log(`Density: ${metadata.density} DPI`);
  if (metadata.size) console.log(`Size: ${metadata.size} bytes`);
} catch (err: any) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
