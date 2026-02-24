/**
 * Renders the YoYoTestVideo composition to an MP4 file via a headless browser.
 *
 * Usage:
 *   npm run render
 *
 * Output: out/YoYoTestVideo.mp4
 */

import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const compositionId = "YoYoTestVideo";
const outputLocation = path.join(__dirname, "out", `${compositionId}.mp4`);

console.log("Bundling composition…");
const bundleLocation = await bundle({
	entryPoint: path.join(__dirname, "src", "index.ts"),
	// Pass through the webpack config from remotion.config.ts (jpeg frames, overwrite enabled)
	webpackOverride: (config) => config,
});

console.log("Selecting composition…");
const composition = await selectComposition({
	serveUrl: bundleLocation,
	id: compositionId,
});

console.log(`Rendering ${composition.durationInFrames} frames to ${outputLocation} …`);
await renderMedia({
	composition,
	serveUrl: bundleLocation,
	codec: "h264",
	outputLocation,
	onProgress: ({ progress }) => {
		process.stdout.write(`\r  ${Math.round(progress * 100)}%`);
	},
});

console.log(`\nDone! Video saved to: ${outputLocation}`);
