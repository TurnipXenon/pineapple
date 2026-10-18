import type { ParsnipOverall } from "$pkg/modules/parsnip/ParsnipOverall";
import { type FoodReviewJson, LdSchemaUtil } from "$pkg/ui/modules/NavigationMenu/LdSchema";
import { getCmsBaseUrl } from "$pkg/util/env-getter";

// Per-worker cache so a menu page asking for several ratings fetches main.meta.json once
// Caches the parsed data rather than the promise
// a promise must not be shared across requests
const META_TTL = 60 * 1000;
let metaCache: { baseUrl: string; files: ParsnipOverall["files"]; expiresAt: number } | undefined;

const getEntries = async (baseUrl: string) => {
	if (metaCache && metaCache.baseUrl === baseUrl && Date.now() < metaCache.expiresAt) {
		return metaCache.files;
	}

	const resp = await fetch(`${baseUrl}/main.meta.json`);
	if (!resp.ok) {
		throw new Error(`main.meta.json responded with ${resp.status}`);
	}
	const files = ((await resp.json()) as ParsnipOverall).files ?? [];
	metaCache = { baseUrl, files, expiresAt: Date.now() + META_TTL };
	return files;
};

export const getFoodReviewRating = async (slug: string): Promise<number | null> => {
	if (import.meta.env.VITE_OFFLINE_MODE) {
		return null;
	}

	const baseUrl = getCmsBaseUrl();
	try {
		const entry = (await getEntries(baseUrl)).find((f) => f.slug === slug);
		if (!entry || !entry.tags?.includes("food-review")) {
			return null;
		}

		const ldPath = entry.path.replace(".ast.", ".ld.");
		if (!ldPath.endsWith(".ld.json") || ldPath.split(/[\\/]/).includes("..")) {
			console.warn(`Refusing to fetch review data for ${slug}: unexpected path ${entry.path}`);
			return null;
		}

		const resp = await fetch(`${baseUrl}/${ldPath}`);
		if (!resp.ok) {
			throw new Error(`${ldPath} responded with ${resp.status}`);
		}
		const rating = LdSchemaUtil.getReviewRating((await resp.json()) as FoodReviewJson);
		return typeof rating === "number" ? rating : null;
	} catch (err) {
		console.warn(`Failed to fetch review rating for ${slug}: ${err}`);
		return null;
	}
};
