import type { OverridableMetaProps } from "$pkg/modules/overrideable_meta/OverridableMetaProps";

export const load = async (): Promise<OverridableMetaProps> => {
	return {
		title: "Niko",
		ogTitle: "Niko"
	};
};
