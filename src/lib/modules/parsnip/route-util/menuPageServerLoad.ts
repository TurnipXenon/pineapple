import type { ParsnipOverall } from "$pkg/modules/parsnip/ParsnipOverall";
import { getCmsBaseUrl } from "$pkg/util/env-getter";

export const menuPageServerLoad = async () => {
	const baseUrl = getCmsBaseUrl();
	const post = await fetch(`${baseUrl}/main.meta.json`);

	if (post.ok) {
		return {
			parsnipOverall: {
				...(await post.json()),
				baseUrl
			} as ParsnipOverall
		};
	}

	return {};
};
