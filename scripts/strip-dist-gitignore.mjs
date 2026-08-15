/**
 * Paraglide writes a `.gitignore` containing `*` into its outdir, and
 * svelte-package copies it into `dist/`. npm honours nested `.gitignore`
 * files when packing (the `files` array in package.json does not override
 * it), so every generated paraglide file silently drops out of the tarball
 * and consumers get unresolvable `../../../external/paraglide/runtime`
 * imports. See the 5.3.16 regression.
 *
 * Strip any `.gitignore` from dist/ after packaging.
 */
import { readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const removed = [];

function walk(dir) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) {
			walk(full);
		} else if (entry.name === ".gitignore") {
			rmSync(full);
			removed.push(full);
		}
	}
}

walk("dist");

if (removed.length > 0) {
	console.log(`stripped ${removed.length} .gitignore file(s) from dist:`);
	for (const path of removed) console.log(`  ${path}`);
}
