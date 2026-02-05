<script lang="ts">
	import { page } from "$app/state";
	import { menuPageServerLoad, type PageMeta, parsePageMetaNested } from "$pkg";
	import WebThumbnailImage from "$pkg/assets/placeholder/placeholder_circle.png";
	import { locales, localizeHref } from "$pkg/external/paraglide/runtime";
	import "$pkg/styles/global.css";
	import MeltToaster from "$pkg/ui/components/MeltToaster/MeltToaster.svelte";
	import type { PinyaHead } from "$pkg/ui/templates/pinya-base/pinyaBaseRunes.svelte.js";
	import PineappleBaseContext from "$pkg/util/context/PineappleBaseContext.svelte";
	import { setSiteLayout } from "$pkg/util/context/pineappleBaseContextDefinitions.svelte";
	import { ModeWatcher } from "mode-watcher";
	import "$pkg/styles/app.css";
	import { onMount, type Snippet } from "svelte";
	import { Modals } from "svelte-modals";
	import { getParsnipDataRemote } from "../../../../routes/(pineapple)/pineapple/getParsnipData.remote";

	let { children, fileList = {}, jsonList = {}, parsnipBasePath = "/pineapple" }
		: {
		children: Snippet,
		fileList?: Record<string, () => Promise<unknown>>,
		jsonList?: Record<string, unknown>,
		parsnipBasePath?: string
	} = $props();

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


	let fileBasedList = $state<PageMeta[]>([]);
	setSiteLayout(fileBasedList);

	onMount(() => {
		getParsnipDataRemote().then(data => {
			fileBasedList.push(...parsePageMetaNested({
				fileList,
				jsonList,
				imageMap: new Map<string, string>(),
				parsnipOverall: data.parsnipOverall,
				parsnipBasePath
			}));
		});
	});
</script>

<PineappleBaseContext>

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

	<MeltToaster />

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

<style lang="scss">
    @use "$styles/surface-colors" as *;

    body {
        @extend %surface-body;
    }

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
