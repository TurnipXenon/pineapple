import type { ParsnipEntry } from "$pkg/modules/parsnip/ParsnipEntry";
import type { ParsnipOverall } from "$pkg/modules/parsnip/ParsnipOverall";
import { getCmsBaseUrl } from "$pkg/util/env-getter";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const prerender = true;
export const load: PageServerLoad = async ({ params }) => {
	const baseUrl = getCmsBaseUrl();
	const mainMeta = await fetch(`${baseUrl}/main.meta.json`);

	if (!mainMeta.ok) {
		error(400, "Not found");
	}

	const parsnipOverall = {
		...(await mainMeta.json()),
		baseUrl
	} as ParsnipOverall;

	const entryMeta = parsnipOverall.files.find(f => f.slug === params.slug);

	if (!entryMeta) {
		error(400, "Not found");
	}

	const entryResponse = await fetch(`${baseUrl}/${entryMeta.path}`);

	if (!entryResponse.ok) {
		error(400, "Not found");
	}

	return {
		parsnipEntry: await entryResponse.json() as ParsnipEntry
	};
};
