<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	// import "@skeletonlabs/skeleton/styles/all.css";
	// Most of your app wide CSS should be put in this file
	import "$pkg/styles/app.css";

	import "$pkg/styles/global.css";

	// region Skeleton Store
	// endregion Skeleton Store
	// region highlightjs
	import "highlight.js/styles/github-dark.css";
	import PinyaBase from "$pkg/ui/templates/PinyaBase.svelte";
	import { appState, PinyaPageLayout } from "$pkg/ui/templates/PinyaPageLayout/index";
	import { pinyaHead } from "$pkg/ui/templates/runes.svelte";
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	appState.allowDialog = true;
	pinyaHead.rootUrl = import.meta.env.PROD ? "https://pineapple-gamma-blush.vercel.app" : "http://localhost:5173";
</script>

<PinyaBase>
	<PinyaPageLayout>
		{@render children()}
	</PinyaPageLayout>
</PinyaBase>
