import type { ParsnipOverall } from "$pkg/modules/parsnip/ParsnipOverall";
import { getCmsBaseUrl } from "$pkg/util/env-getter";
import type { PageServerLoad } from "./$types";

export const prerender = true;
export const load: PageServerLoad = async () => {
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
