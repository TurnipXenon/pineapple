<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	// import "@skeletonlabs/skeleton/styles/all.css";
	// Most of your app wide CSS should be put in this file
	import "$pkg/styles/app.css";

	import "$pkg/styles/global.css";

	// region highlightjs
	import "highlight.js/styles/github-dark.css";
	import { type PageMeta, parsePageMetaNested } from "$pkg";
	import PinyaBase from "$pkg/ui/templates/pinya-base/PinyaBase.svelte";
	import { pinyaHead } from "$pkg/ui/templates/pinya-base/pinyaBaseRunes.svelte.js";
	import { appState, PinyaPageLayout } from "$pkg/ui/templates/PinyaPageLayout/index";
	import { setSiteLayout } from "$pkg/util/context/pineappleBaseContextDefinitions";
	import type { Snippet } from "svelte";
	import { getParsnipDataRemote } from "./pineapple/getParsnipData.remote";

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	appState.allowDialog = true;
	pinyaHead.rootUrl = import.meta.env.PROD ?? process.env.PROD ? "https://pineapple-gamma-blush.vercel.app" : "http://localhost:5173";

	const fileList = import.meta.glob("./**/+page.svelte", { query: "?raw" });
	const jsonList = import.meta.glob("./**/meta.json", { query: "?raw", eager: true });
	let fileBasedList = $state<PageMeta[]>([]);
	setSiteLayout(fileBasedList);
	getParsnipDataRemote().then(data => {
		fileBasedList.push(...parsePageMetaNested({
			fileList,
			jsonList,
			imageMap: new Map<string, string>(),
			parsnipOverall: data.parsnipOverall,
			parsnipBasePath: "pineapple/"
		}));
	});
</script>

<PinyaBase>
	<PinyaPageLayout>
		{@render children()}
	</PinyaPageLayout>
</PinyaBase>
