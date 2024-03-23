<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import "$lib/theme.postcss";
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	// import "@skeletonlabs/skeleton/styles/all.css";
	// Most of your app wide CSS should be put in this file
	import "$lib/app.postcss";

	import "$lib/styles/global.css";

	// region Skeleton Store
	// endregion Skeleton Store
	// region highlightjs
	import { initializeStores, storeHighlightJs } from "@skeletonlabs/skeleton";
	import "highlight.js/styles/github-dark.css";

	import xml from "highlight.js/lib/languages/xml"; // for HTML
	import hljs from "highlight.js/lib/core";
	import OverrideableMeta from "$pkg/components/overrideable_meta/OverridableMeta.svelte";

	initializeStores();

	hljs.registerLanguage("xml", xml);
	hljs.registerLanguage("url", xml);
	storeHighlightJs.set(hljs);
	// endregion highlightjs
</script>

<OverrideableMeta
	rootUrl={import.meta.env.PROD ? "https://pineapple-gamma-blush.vercel.app" : "http://localhost:5173"}>
</OverrideableMeta>

<slot />
