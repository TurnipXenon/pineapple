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
			&& (
				child.children[0].type === "image"
				|| (child.children[0].type === "link" &&
					(child.children[0].url.startsWith("https://photos.")
						|| child.children[0].url.startsWith("https://rabiole."))
				)
			)) {
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

	if (imageCollection.length > 0) {
		newChildren.push({
			"type": "imageCollection",
			children: imageCollection
		});
	}

	parsnipEntry.ast.ast.children = newChildren as RootContent[];

	let imageUrl = parsnipEntry.preview ? parsnipEntry.preview : undefined;
	if (imageUrl && !imageUrl.includes("https://")) {
		imageUrl = `${parsnipOverall.baseUrl}/${parsnipEntry.preview}`;
	}

	const meta: PinyaHead = {
		title: parsnipEntry.basename,
		ogTitle: parsnipEntry.basename,
		ogDescription: parsnipEntry.tagline,
		ogImage: imageUrl ? [imageUrl] : undefined
	};

	// process review metadata
	if (parsnipEntry.tags?.includes('food-review')) {
		// parsnipEntry.foodReviewJson =
		try {
			const foodReviewResp = await fetch(`${baseUrl}/${entryMeta.path.replace('.ast.', '.ld.')}`);
			parsnipEntry.foodReviewJson = await foodReviewResp.json();
			parsnipEntry.datePublished = parsnipEntry.foodReviewJson.datePublished;
		} catch (err) {
			console.error(`Failed to fetch review data for ${entryMeta.path}: ${err}`);
		}
	}

	return {
		parsnipEntry,
		meta
	};
};
