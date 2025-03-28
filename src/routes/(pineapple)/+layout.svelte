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
	import OverrideableMeta from "../../lib/components/overrideable_meta/OverridableMeta.svelte";
	import type { Snippet } from "svelte";
	import { DialogOverlay } from "$pkg/components/index";
	import PinyaBase from "$pkg/ui/templates/PinyaBase.svelte";
	import { appState, PinyaPageLayout } from "$pkg/ui/templates/PinyaPageLayout/index";

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	appState.allowDialog = true;
</script>

<OverrideableMeta
	rootUrl={import.meta.env.PROD ? "https://pineapple-gamma-blush.vercel.app" : "http://localhost:5173"}>
</OverrideableMeta>

<DialogOverlay></DialogOverlay>

<PinyaBase>
	<PinyaPageLayout>
		{@render children()}
	</PinyaPageLayout>
</PinyaBase>
