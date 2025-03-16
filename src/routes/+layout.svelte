<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import "$pkg/theme.css";
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	// import "@skeletonlabs/skeleton/styles/all.css";
	// Most of your app wide CSS should be put in this file
	import "../app.css";

	import "$lib/styles/global.css";

	// region Skeleton Store
	// endregion Skeleton Store
	// region highlightjs
	import "highlight.js/styles/github-dark.css";

	import xml from "highlight.js/lib/languages/xml"; // for HTML
	import hljs from "highlight.js/lib/core";
	import OverrideableMeta from "$pkg/components/overrideable_meta/OverridableMeta.svelte";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	initializeStores();

	hljs.registerLanguage("xml", xml);
	hljs.registerLanguage("url", xml);
	storeHighlightJs.set(hljs);
	// endregion highlightjs
</script>

<OverrideableMeta
	rootUrl={import.meta.env.PROD ? "https://pineapple-gamma-blush.vercel.app" : "http://localhost:5173"}>
</OverrideableMeta>

{@render children?.()}
