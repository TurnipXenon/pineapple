import WebThumbnailImage from "$pkg/assets/placeholder/placeholder_circle.png";
import { type PinyaHead } from "$pkg/ui/templates/runes.svelte";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
	const rootUrl = import.meta.env.PROD ? "https://pineapple-gamma-blush.vercel.app" : "http://localhost:5173";

	const meta: PinyaHead = {
		rootUrl,
		title: "Test",
		ogTitle: "Turnip time!",
		ogDescription: "Welcome to Turnip's test portfolio",
		ogImage: [WebThumbnailImage]
	};

	return { meta };
};
