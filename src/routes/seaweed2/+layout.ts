import { getQueryTerms } from "$pkg/util/util";

export const prerender = true;

import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = () => {
	const modules = import.meta.glob(
		"$pkg/ui/modules/**/*.svelte",
		{ query: "?raw", import: "default", eager: true }
	);

	const queryTerms = getQueryTerms(modules);

	return {
		queryTerms
	};
};
