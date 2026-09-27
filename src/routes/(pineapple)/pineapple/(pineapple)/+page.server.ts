import { menuPageServerLoad } from "$pkg/modules/parsnip/route-util/menuPageServerLoad";
import { parsnipCacheHeaders } from "$pkg/modules/parsnip/route-util/parsnipCache";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ setHeaders }) => {
	const data = await menuPageServerLoad();
	// an empty index usually means the CMS was unreachable, so don't cache it
	if (data.parsnipOverall?.files.length) {
		setHeaders(parsnipCacheHeaders());
	}
	return data;
};
