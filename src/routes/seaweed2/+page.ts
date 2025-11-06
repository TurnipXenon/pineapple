import type { PinyaHeadMetaWrap } from "$pkg/ui/templates/pinya-base/pinyaBaseRunes.svelte.js";

export const load = async (): Promise<PinyaHeadMetaWrap> => {
	return {
		meta: {
			title: "Niko",
			ogTitle: "Niko"
		}
	};
};
