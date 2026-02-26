import type { ParsnipEntry } from "$pkg/modules/parsnip/ParsnipEntry";
import type { ParsnipOverall } from "$pkg/modules/parsnip/ParsnipOverall";
import type { PinyaHead } from "$pkg/ui/templates/pinya-base/pinyaBaseRunes.svelte.js";
import { getCmsBaseUrl } from "$pkg/util/env-getter";
import { error } from "@sveltejs/kit";
import type { Image, RootContent, RootContentMap } from "mdast";

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

	// process parsnipEntry.ast.ast.children so that paragraphs with sole images are combined into one
	type AstChildren = (RootContentMap[keyof RootContentMap] | { type: "imageCollection", children: Image[] });
	const newChildren: AstChildren[] = [];
	let imageCollection: Image[] = [];
	parsnipEntry.ast.ast.children.forEach(child => {
		if (child.type === "paragraph"
			&& child.children.length === 1
			&& child.children[0].type === "image") {
			imageCollection.push(child.children[0]);
		} else if (imageCollection.length > 0) {
			newChildren.push({
				"type": "imageCollection",
				children: imageCollection
			});
			imageCollection = [];
			newChildren.push(child as AstChildren);
		} else {
			newChildren.push(child as AstChildren);
		}
	});
	parsnipEntry.ast.ast.children = newChildren as RootContent[];

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
