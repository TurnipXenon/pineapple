import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/lib/external/paraglide",
			strategy: ["url", "cookie", "baseLocale"],
			additionalFiles: { ".npmignore": "\n" }
		})
	],
	assetsInclude: ["**/*.yarn"],
	// Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
	resolve: process.env.VITEST
		? {
			conditions: ["browser"]
		}
		: undefined
});
