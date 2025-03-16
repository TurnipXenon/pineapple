<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	// import "@skeletonlabs/skeleton/styles/all.css";
	// Most of your app wide CSS should be put in this file
	import "$pkg/styles/app.css";

	import "$lib/styles/global.css";

	// region Skeleton Store
	// endregion Skeleton Store
	// region highlightjs
	import "highlight.js/styles/github-dark.css";
	import OverrideableMeta from "$pkg/components/overrideable_meta/OverridableMeta.svelte";
	import { PinyaBase, PinyaPageLayout } from "$pkg/ui/templates/index";
	import type { Snippet } from "svelte";
	import { DialogOverlay } from "$pkg";

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	// todo: migrate codeblock #migration
	// initializeStores();
	//
	// hljs.registerLanguage("xml", xml);
	// hljs.registerLanguage("url", xml);
	// storeHighlightJs.set(hljs);
	// endregion highlightjs
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
