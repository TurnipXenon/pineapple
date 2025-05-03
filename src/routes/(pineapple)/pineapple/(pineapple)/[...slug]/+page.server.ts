import { getSlugEntries } from "$pkg/modules/parsnip/route-util/getSlugEntries";
import { slugPageServerLoad } from "$pkg/modules/parsnip/route-util/slugPageServerLoad";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = getSlugEntries;
export const prerender = true;
export const load: PageServerLoad = slugPageServerLoad;
