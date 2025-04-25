import { menuPageServerLoad } from "$pkg/modules/parsnip/route-util/menuPageServerLoad";
import type { PageServerLoad } from "./$types";

export const prerender = true;
export const load: PageServerLoad = menuPageServerLoad;
