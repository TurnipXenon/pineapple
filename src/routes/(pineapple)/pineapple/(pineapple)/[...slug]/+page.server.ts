import type { ParsnipOverall } from "$pkg/modules/parsnip/ParsnipOverall";
import { slugPageServerLoad } from "$pkg/modules/parsnip/route-util/slugPageServerLoad";
import { getCmsBaseUrl } from "$pkg/util/env-getter";
import type { EntryGenerator, PageServerLoad } from "./$types";

// https://svelte.dev/docs/kit/page-options#entries
const getEntries = async () => {
	const baseUrl = getCmsBaseUrl();
	const mainMeta = await fetch(`${baseUrl}/main.meta.json`);

	if (!mainMeta.ok) {
		console.error("Failed to get entries");
		return [];
	}

	const parsnipOverall = {
		...(await mainMeta.json()),
		baseUrl
	} as ParsnipOverall;

	const entries = parsnipOverall.files.map(f => ({
		slug: f.slug
	}));

	return entries;
};


export const entries: EntryGenerator = getEntries;
export const prerender = true;
export const load: PageServerLoad = slugPageServerLoad;
