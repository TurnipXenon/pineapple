import type { ParsnipEntry } from "$pkg/modules/parsnip/ParsnipEntry";
import type { ParsnipOverall } from "$pkg/modules/parsnip/ParsnipOverall";
import type { PinyaHead } from "$pkg/ui/templates/runes.svelte";
import { getCmsBaseUrl } from "$pkg/util/env-getter";
import { error } from "@sveltejs/kit";

export const slugPageServerLoad = async ({ params }: { params: { slug: string } }) => {
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

	const parsnipEntry = await entryResponse.json() as ParsnipEntry;
	const meta: PinyaHead = {
		title: parsnipEntry.basename,
		ogTitle: parsnipEntry.basename,
		ogDescription: parsnipEntry.tagline,
		ogImage: parsnipEntry.preview ? [`${baseUrl}/${parsnipEntry.preview}`] : undefined
	};

	return {
		parsnipEntry,
		meta
	};
};
