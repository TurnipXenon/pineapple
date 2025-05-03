import type { ParsnipOverall } from "$pkg/modules/parsnip/ParsnipOverall";

// https://svelte.dev/docs/kit/page-options#entries
import { getCmsBaseUrl } from "$pkg/util/env-getter";

export const getSlugEntries = async () => {
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

	return parsnipOverall.files.map(f => ({
		slug: f.slug
	}));
};
