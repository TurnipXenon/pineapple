<script lang="ts">
	import NavigationControl from "$pkg/ui/modules/NavigationMenu/NavigationControl.svelte";
	import { parsePageMeta, type ParsePageMetaCompareFn } from "$pkg/ui/modules/NavigationMenu/PageMeta";
	import { Card } from "$pkg/components/index";
	import { PinyaCard } from "$pkg/ui/elements/index";
	import { localizeHref } from "$pkg/paraglide/runtime.js";

	interface Props {
		fileList: Record<string, unknown>;
		jsonList: Record<string, unknown>;
		title?: string | undefined;
		imageMap?: Map<string, string>;
		shouldAllowControl?: boolean;
		/**
		 * Should include a slash before and after the path
		 */
		parentSubpath: string;
		allowUpperControl?: boolean;
		compareFn?: undefined | ParsePageMetaCompareFn;
		pageSize?: number;
		currentIndex?: number;
	}

	let {
		fileList,
		jsonList,
		title = undefined,
		imageMap = new Map<string, string>(),
		shouldAllowControl = true,
		parentSubpath,
		allowUpperControl = true,
		compareFn = undefined,
		pageSize = $bindable(5),
		currentIndex = $bindable(0)
	}: Props = $props();

	const pageFlatList = $state(parsePageMeta(fileList, jsonList, imageMap, compareFn));

	let visiblePages = $derived(pageFlatList.slice(currentIndex * pageSize, (currentIndex * pageSize) + pageSize));
</script>

<div class="navigation-wrapper">
	{#if (title)}
		<div>
			<PinyaCard widthClass="">
				<h1 class="navigation-title">
					{title}
				</h1>
			</PinyaCard>
		</div>
	{/if}

	{#if allowUpperControl && shouldAllowControl}
		<NavigationControl
			bind:currentIndex={currentIndex}
			contentLength={pageFlatList.length}
			bind:pageSize={pageSize}></NavigationControl
		>
	{/if}

	<div class="navigation-component">
		<!-- all the misc routes-->
		{#each visiblePages as pageMeta (pageMeta.title)}
			{@const fullPath=`${parentSubpath}${pageMeta.relativeLink}`}
			<a href={localizeHref(fullPath)} class="card-anchor">
				<PinyaCard
					widthClass="w-full"
					className="navigation-element"
				>
					{#if pageMeta.imageUrl}
						<img src={pageMeta.imageUrl}
						     alt={pageMeta.imageAlt ?? "placeholder alt text please replace me or report me!"} />
					{/if}
					<section class="blurb-text">
						<h2>{pageMeta.title}</h2>
						<p>Published: {pageMeta.datePublished ?? "N/A"} | Last updated: {pageMeta.lastUpdated ?? "N/A"}</p>
						<p>{pageMeta.description ?? ""}</p>
						Tags:
						{#if (pageMeta.tags && pageMeta.tags.length !== 0)}
							{#each pageMeta.tags as tagValue, idx (idx)}
								&nbsp;<span class="badge variant-filled tag-container">{tagValue}</span>
							{/each}
						{:else}
							None
						{/if}
					</section>
				</PinyaCard>
			</a>
		{/each}

		{#if visiblePages.length === 0}
			<Card>
				{#snippet content()}
					<p class="default-card">Sorry, no content was found</p>
				{/snippet}
			</Card>
		{/if}
	</div>

	{#if shouldAllowControl}
		<NavigationControl bind:currentIndex={currentIndex}
		                   contentLength={pageFlatList.length}
		                   bind:pageSize={pageSize}></NavigationControl>
	{/if}

</div>

<style lang="postcss">
    @container (max-width: 800px) {
        img {
            max-height: 20rem;
            width: 100%;
            flex-basis: 100%;
            border-radius: var(--theme-rounded-container) var(--theme-rounded-container) 0 0;
        }

        :global(.navigation-element) {
            flex-direction: column;
        }
    }

    @container (min-width: 801px) {
        :global(.navigation-element) {
            flex-direction: row;
        }

        img {
            width: 20em;
        }
    }

    :global(.navigation-element) {
        /* todo: migration */
        /*@apply btn card card-hover bg-surface-100 dark:bg-surface-900;*/
        container-type: inline-size;
        display: flex;
        text-align: start;
        align-items: flex-start;
        padding: 0;
    }

    img {
        height: 20em;
        object-fit: cover;
        padding: var(--theme-border-base);
        border-radius: var(--theme-rounded-container) 0 0 var(--theme-rounded-container);
    }

    .navigation-component {
        container-type: inline-size;
        display: flex;
        flex-direction: column;
        gap: 2em;
    }

    .navigation-title {
        text-align: center;
        max-width: initial;
    }

    .blurb-text {
        padding: 2em;
        grow: 1;
        white-space: initial;
        min-width: 0;
    }

    .navigation-wrapper {
        display: flex;
        flex-direction: column;
        max-width: 1000px;
        width: 100%;
		    gap: 1lh;
    }

    .tag-container {
        margin: 0.25lh 0;
    }

    a.card-anchor {
		    filter: none;
    }

    :global(.navigation-element) {
		    transition: 0.3s;
    }

    :global(.navigation-element:hover) {
        transform: scale(1.02);
		    box-shadow: 10px 5px 5px rgba(49, 8, 0, 0.25);
    }

    :global(.dark .navigation-element:hover) {
		    box-shadow: 10px 5px 5px rgba(16, 0, 0, 0.35);
    }

    h2 {
		    text-align: start;
    }
</style>