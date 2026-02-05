import type { ParsnipOverall } from "$pkg/modules/parsnip/ParsnipOverall";
import { getCmsBaseUrl } from "$pkg/util/env-getter";

export const menuPageServerLoad = async () => {
	const baseUrl = getCmsBaseUrl();
	if (import.meta.env.VITE_OFFLINE_MODE) {
		return {
			parsnipOverall: {
				files: [],
				tags: [],
				baseUrl,
			}
		}
	}

	const fullUrl = `${baseUrl}/main.meta.json`;
	const post = await fetch(fullUrl)
		.then(res => res)
		.catch(err => {
			console.warn(err);
			console.warn(`Cannot reach cms base url at ${fullUrl}. Attempting to obtain local cache...`);
			return {
				ok: true,
				json: () => ({
					files: [],
					tags: [],
					baseUrl,
				})
			};
		});

	// todo: check if local exists
	// todo: maybe during startup in dev mode, check if src/lib/external exists, then grab
	// see to statically obtain file path at src/routes/(pineapple)/pineapple/(pineapple)/+page.svelte
	// figure out how to dynamically or lazily obtain the path

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
