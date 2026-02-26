import { query } from "$app/server";
import * as v from "valibot";

const UrlSchema = v.pipe(v.string(), v.url());

export const getPhotoDetails = query(UrlSchema, async (url) => {
	if (!url.includes("rabiole") && !url.includes("photos")) return null;

	const apiUrl = url
		.replace(/[?#].*$/, '')
		.replace(/^(https?:\/\/)(rabiole|photos)\./, '$1photo-gallery.')
		.replace('/photos/', '/api/photos/')
		.replace(/\.(jpeg|png)$/, '');

	try {
		const resp = await fetch(apiUrl);
		const data = await resp.json();
		const photo = data?.photo;
		if (!photo) return null;
		return {
			altText: photo.altText ?? '',
			description: photo.description ?? '',
			tags: (photo.tags ?? []) as string[],
			createdAt: photo.createdAt ?? ''
		};
	} catch {
		return null;
	}
});

export const getPhotoCollectionMeta = query(UrlSchema, async (url) => {
	if (!url.includes("photo-gallery")) {
		return '';
	}

	try {
		const resp = await fetch(url);
		return await resp.json();
	} catch {
		return '';
	}
});
