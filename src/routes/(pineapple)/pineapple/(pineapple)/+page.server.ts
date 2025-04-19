import type { ParsnipOverall } from "$pkg/modules/parsnip/ParsnipOverall";
import type { PageServerLoad } from "./$types";

export const prerender = true;
export const load: PageServerLoad = async () => {
	const baseUrl = "https://gitlab.com/turnipxenon-personal/test-obdisian/-/raw/main";
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
