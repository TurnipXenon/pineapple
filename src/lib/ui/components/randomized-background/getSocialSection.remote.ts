import { query } from "$app/server";
import type { RevealInfoRemoteQuery } from "$pkg/components/reveal-info/RevealInfoRemoteQuery";

export const getSocialSectionRemote: RevealInfoRemoteQuery = {
	type: "void",
	run: query(async () => {
		return "";
	}),
};
