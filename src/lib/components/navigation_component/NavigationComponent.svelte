<script lang="ts">
	import NavigationControl from "$pkg/components/navigation_component/NavigationControl.svelte";
	import { Card, createGoToFunction } from "$pkg";
	import { parsePageMeta, type ParsePageMetaCompareFn } from "$pkg/components/navigation_component/PageMeta";

	export let fileList: Record<string, unknown>;
	export let jsonList: Record<string, unknown>;
	export let title: string | undefined = undefined;
	export let imageMap = new Map<string, string>();
	export let shouldAllowControl = true;

	/**
	 * Should include a slash before and after the path
	 */
	export let parentSubpath: string;
	export let allowUpperControl: boolean;
	export let compareFn: undefined | ParsePageMetaCompareFn = undefined;
	export let pageSize = 5;
	export let currentIndex = 0;

	const pageFlatList = parsePageMeta(fileList, jsonList, imageMap, compareFn);

	$: visiblePages = pageFlatList.slice(currentIndex * pageSize, (currentIndex * pageSize) + pageSize);
</script>

<div class="navigation-wrapper">
	{#if (title)}
		<Card>
			<h1 slot="content" class="default-card navigation-title">
				{title}
			</h1>
		</Card>
	{/if}

	{#if allowUpperControl && shouldAllowControl}
		<NavigationControl bind:currentIndex={currentIndex}
		                   bind:contentLength={pageFlatList.length}
		                   bind:pageSize={pageSize}></NavigationControl>
	{/if}

	<div class="navigation-component">
		<!-- all the misc routes-->
		{#each visiblePages as pageMeta}
			{@const fullPath=`${parentSubpath}${pageMeta.relativeLink}`}
			<button class="navigation-element"
			        title={fullPath}
			        on:click={createGoToFunction(fullPath)}>
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
						{#each pageMeta.tags as tagValue}
							&nbsp;<span class="badge variant-filled tag-container">{tagValue}</span>
						{/each}
					{:else}
						None
					{/if}
				</section>
			</button>
		{/each}

		{#if visiblePages.length === 0}
			<Card>
				<p class="default-card" slot="content">Sorry, no content was found</p>
			</Card>
		{/if}
	</div>

	{#if shouldAllowControl}
		<NavigationControl bind:currentIndex={currentIndex}
		                   bind:contentLength={pageFlatList.length}
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

        .navigation-element {
            flex-direction: column;
        }
    }

    @container (min-width: 801px) {
        .navigation-element {
            flex-direction: row;
        }

        img {
            width: 20em;
        }
    }

    .navigation-element {
        @apply btn card card-hover bg-surface-100 dark:bg-surface-900;
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
        flex-grow: 1;
        white-space: initial;
        min-width: 0;
    }

    .navigation-wrapper {
        display: flex;
        flex-direction: column;
        max-width: 1000px;
        width: 100%;
    }

    .tag-container {
        margin: 0.25lh 0;
    }
</style>