import { getQueryTerms } from "$pkg";

export const prerender = true;

import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = () => {
	const modules = import.meta.glob(
		"$pkg/ui/modules/projects/*.svelte",
		{ query: "?raw", import: "default", eager: true }
	);

	const queryTerms = getQueryTerms(modules);

	return {
		queryTerms
	};
};