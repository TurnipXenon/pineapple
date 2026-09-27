import { parsnipCacheHeaders } from "$pkg/modules/parsnip/route-util/parsnipCache";
import { slugPageServerLoad } from "$pkg/modules/parsnip/route-util/slugPageServerLoad";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	const data = await slugPageServerLoad(event);
	event.setHeaders(parsnipCacheHeaders());
	return data;
};
