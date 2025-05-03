import type { PinyaHeadMetaWrap } from "$pkg/ui/templates/runes.svelte";

export const load = async (): Promise<PinyaHeadMetaWrap> => {
	return {
		meta: {
			title: "Niko",
			ogTitle: "Niko"
		}
	};
};
