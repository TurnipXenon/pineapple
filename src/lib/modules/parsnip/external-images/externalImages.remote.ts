import { query } from "$app/server";
import * as v from "valibot";

const UrlSchema = v.pipe(v.string(), v.url());

// todo: test this one itself
// todo: test with a fake parsed obsidian
const _getPhotoDetails = async (url: string) => {
	if (!url.includes("rabiole") && !url.includes("photos") && !url.includes("photo-gallery"))
		return null;

	const apiUrl = url
		.replace(/[?#].*$/, "")
		.replace(/^(https?:\/\/)(rabiole|photos)\./, "$1photo-gallery.")
		.replace("/photos/", "/api/photos/")
		.replace(/\.(jpeg|png|jpg)$/, "");

	try {
		const resp = await fetch(apiUrl);
		const data = await resp.json();
		const photo = data?.photo;
		if (!photo) return null;
		return {
			altText: photo.altText ?? "",
			description: photo.description ?? "",
			tags: (photo.tags ?? []) as string[],
			createdAt: photo.createdAt ?? ""
		};
	} catch {
		return null;
	}
};

export const getPhotoDetails = query(UrlSchema, _getPhotoDetails);

export const getPhotoCollectionMeta = query(UrlSchema, async (url) => {
	if (!url.includes("photo-gallery")) {
		return "";
	}

	const apiUrl = url.replace("/photos/", "/api/photos/");

	try {
		const resp = await fetch(apiUrl);
		return await resp.json();
	} catch {
		return "";
	}
});
