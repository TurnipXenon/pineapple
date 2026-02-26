import { query } from "$app/server";
import * as v from "valibot";

const UrlSchema = v.pipe(v.string(), v.url());

export const getPhotoMeta = query(UrlSchema, async (url) => {
	if (!url.includes("rabiole") && !url.includes("photos")) {
		return '';
	}

	const apiUrl = url
		.replace(/^(https?:\/\/)(rabiole|photos)\./, '$1photo-gallery.')
		.replace('/photos/', '/api/photos/')
		.replace(/\.(jpeg|png)$/, '');

	try {
		const resp = await fetch(apiUrl);
		const data = await resp.json();
		return data?.photo?.altText ?? '';
	} catch {
		return '';
	}
});
