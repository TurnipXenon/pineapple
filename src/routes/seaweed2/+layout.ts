export const prerender = true;

import type { LayoutLoad } from "./$types";

const getQueryTerms = (modules: Record<string, unknown>): string[] => {
	const re = new RegExp("qt-(\\w+)+", "g");
	const queryTerms = new Set<string>();
	for (const path in modules) {
		const modStr = modules[path] as string;
		[...modStr.matchAll(re).map(i => i[1])].forEach(term => queryTerms.add(term));
	}
	return [...queryTerms].sort();
}

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