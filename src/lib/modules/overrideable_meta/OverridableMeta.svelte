<!--
OverridableMeta is convenient Svelte component allowing each page to override the head meta values
based on their +page.ts.

For example:
<code>
// +page.ts

import type { OverridableMetaProps } from "$pkg";

export const load = async (): Promise<OverridableMetaProps> => {
	return {
		title: "CustomTitle",
	};
};
</code>
-->

<script lang="ts">
	import WebThumbnailImage from "$pkg/assets/placeholder/placeholder_circle.png";


	import { page } from "$app/stores";
	import type { OverridableMetaProps } from "./OverridableMetaProps";
	interface Props {
		rootUrl?: string;
		title?: string;
		ogTitle?: string;
		ogDescription?: string;
		ogImage?: any;
	}

	let {
		rootUrl = "http://localhost:5173",
		title = "Welcome to my portfolio",
		ogTitle = "Turnip time!",
		ogDescription = "Welcome to Turnip's test portfolio",
		ogImage = WebThumbnailImage
	}: Props = $props();

	const data: OverridableMetaProps = $state({
		title: "Welcome to my portfolio",
		ogUrl: "https://www.crouton.net/",
		ogTitle: "Turnip time!",
		ogDescription: "Welcome to Turnip's test portfolio",
		ogImage: WebThumbnailImage
	});
	page.subscribe(p => {
		const pageData: OverridableMetaProps = p.data;
		data.title = pageData.title ?? title;
		data.ogUrl = `${rootUrl}${p.url.pathname}`;
		data.ogTitle = pageData.ogTitle ?? ogTitle;
		data.ogDescription = pageData.ogDescription ?? ogDescription;
		data.ogImage = pageData.ogImage ?? ogImage;
	});
</script>

<svelte:head>
	<meta charset="utf-8" />
	<title>{data.title}</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:url" content={data.ogUrl} />
	<meta property="og:title" content={data.ogTitle} />
	<meta property="og:description" content={data.ogDescription} />
	<meta property="og:image" content={data.ogImage} />
</svelte:head>
