import { localizeHref } from "$pkg/external/paraglide/runtime";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	throw redirect(308, localizeHref("documentation/guides/getting-started"));
};
