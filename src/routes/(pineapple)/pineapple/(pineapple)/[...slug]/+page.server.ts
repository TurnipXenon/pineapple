import { slugPageServerLoad } from "$pkg/modules/parsnip/route-util/slugPageServerLoad";
import type { PageServerLoad } from "./$types";

export const prerender = true;
export const load: PageServerLoad = slugPageServerLoad;
