import WebThumbnailImage from "$pkg/assets/placeholder/placeholder_circle.png";

export interface PinyaHead {
	rootUrl?: string;
	title?: string;
	ogTitle?: string;
	ogDescription?: string;
	ogImage?: string[];
}

const defaultData: PinyaHead = {
	rootUrl: "http://localhost:5173",
	title: "Welcome to my portfolio",
	ogTitle: "Turnip time!",
	ogDescription: "Welcome to Turnip's test portfolio",
	ogImage: [WebThumbnailImage]
};

export const pinyaHead = $state<PinyaHead>(
	{ ...defaultData }
);
