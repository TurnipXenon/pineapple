import type { OverridableMetaProps } from "$pkg/components/overrideable_meta/OverridableMetaProps";

export const load = async (): Promise<OverridableMetaProps> => {
	return {
		title: "Niko",
		ogTitle: "Niko"
	};
};
