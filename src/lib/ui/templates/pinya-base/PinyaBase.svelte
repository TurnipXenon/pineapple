<!-- TODO: Migration: review and migrate this component -->

<script lang="ts">
	import { page } from "$app/state";
	import WebThumbnailImage from "$pkg/assets/placeholder/placeholder_circle.png";
	import { locales, localizeHref } from "$pkg/external/paraglide/runtime";
	import "$pkg/styles/global.css";
	import type { PinyaHead } from "$pkg/ui/templates/pinya-base/pinyaBaseRunes.svelte.js";
	import PineappleBaseContext from "$pkg/util/context/PineappleBaseContext.svelte";
	// import { ToastProvider } from "@skeletonlabs/skeleton-svelte";
	import { ModeWatcher } from "mode-watcher";
	import "$pkg/styles/app.css";
	import { Modals } from "svelte-modals";

	let { children } = $props();

	// https://github.com/sveltejs/kit/issues/1540#issuecomment-2029016082
	const meta: PinyaHead = ({
		rootUrl: "http://localhost:5173",
		title: "Welcome to my portfolio",
		ogTitle: "Turnip time!",
		ogDescription: "Welcome to Turnip's test portfolio",
		ogImage: [WebThumbnailImage],
		...(page.data?.meta ?? []) // override
	});

	const ogUrl = $derived(`${meta?.rootUrl}${page.url.pathname}`);

	const imageList = $derived.by(() => meta?.ogImage?.map(img => {
		if (img.startsWith("/")) {
			return `${meta?.rootUrl}${img}`;
		}

		return img;
	}) ?? []);
</script>

<Modals>
	<!-- shown when any modal is opened -->
	{#snippet backdrop({ close })}
		<div
			aria-hidden="true"
			class="backdrop"
			onclick={() => close()}
		></div>
	{/snippet}
</Modals>
<ModeWatcher defaultTheme="turnip" />

<!-- todo: toast -->
<!--<ToastProvider>-->
<!--	{@render children()}-->
<!--</ToastProvider>-->

<PineappleBaseContext>
	{@render children()}
</PineappleBaseContext>

<!--invisible ink-->
<div style="display:none">
	{#each locales as locale (locale)}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>

<svelte:head>
	<meta charset="utf-8" />
	<title>{meta?.title ?? page.url.hostname}</title>
	<meta property="og:url" content={ogUrl} />
	<meta property="og:site_name" content={meta?.ogTitle ?? 'Home'} />
	<meta property="og:title" content={meta?.ogTitle ?? 'Home'} />
	<meta property="twitter:title" content={meta?.ogTitle ?? 'Home'} />
	<meta property="description" content={meta?.ogDescription ?? ''} />
	<meta property="og:description" content={meta?.ogDescription ?? ''} />
	<meta property="twitter:description" content={meta?.ogDescription ?? ''} />
	<meta property="twitter:card" content="summary">
	{#each imageList as imgUrl, idx (`${idx}_${imgUrl}`)}
		<meta property="og:image" content={imgUrl} />
		<meta property="twitter:image" content={imgUrl} />
	{/each}
</svelte:head>

<style>
    .backdrop {
        position: fixed;
        z-index: 19;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.50);
        backdrop-filter: blur(4px);
    }
</style>
