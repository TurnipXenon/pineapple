#!/usr/bin/env -S node --experimental-transform-types

import fs from "node:fs/promises";
import path from "node:path";

const MARKER = "<!-- TODO: Migration: review and migrate this component -->";

async function getAllSvelteFiles(dir: string, out: string[] = []): Promise<string[]> {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await getAllSvelteFiles(full, out);
		} else if (entry.isFile() && full.endsWith(".svelte")) {
			out.push(full);
		}
	}
	return out;
}

const markForMigration = async () => {
	// go through every svelte file in src/lib/ui
	const uiRoot = path.resolve(process.cwd(), "src", "lib", "ui");
	let files: string[] = [];
	try {
		files = await getAllSvelteFiles(uiRoot);
	} catch (err) {
		console.error("Failed to read UI directory", uiRoot, err);
		return;
	}

	let updated = 0;
	for (const file of files) {
		try {
			const content = await fs.readFile(file, "utf8");
			if (content.includes(MARKER)) {
				continue; // already marked
			}
			const newContent = `${MARKER}\n\n${content}`;
			await fs.writeFile(file, newContent, "utf8");
			updated++;
			console.log("Marked for migration:", path.relative(process.cwd(), file));
		} catch (err) {
			console.error("Failed to process", file, err);
		}
	}

	console.log(`Done. Updated ${updated} file(s). Total scanned: ${files.length}.`);
};

markForMigration().catch((e) => {
	console.error(e);
	process.exitCode = 1;
});
