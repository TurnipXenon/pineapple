import WebThumbnailImage from "$pkg/assets/placeholder/placeholder_circle.png";
import { type PinyaHead } from "$pkg/ui/templates/pinya-base/pinyaBaseRunes.svelte.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
	const rootUrl = import.meta.env.PROD ?? process.env.PROD ? "https://pineapple-gamma-blush.vercel.app" : "http://localhost:5173";

	const meta: PinyaHead = {
		rootUrl,
		title: "Pineapple Home Directory",
		ogTitle: "Pineapple Home Directory",
		ogDescription: "Welcome to Pineapple's Home Directory",
		ogImage: [WebThumbnailImage]
	};

	return { meta };
};
