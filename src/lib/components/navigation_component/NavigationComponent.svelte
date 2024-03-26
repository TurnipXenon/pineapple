<script lang="ts">
	export let title: string | undefined = undefined;
	export let fileList: Record<string, unknown>;
	/**
	 * Should include a slash before and after the path
	 */
	export let parentSubpath: string;
	export let compareFn: undefined | ParsePageMetaCompareFn;
	export let maxPageSize = 5;
	export let currentIndex = 0;

	import { Card, createGoToFunction } from "$pkg";
	import { parsePageMeta, type ParsePageMetaCompareFn } from "$pkg/components/navigation_component/PageMeta";

	const pageFlatList = parsePageMeta(fileList, compareFn);

	$: visiblePages = pageFlatList.slice(currentIndex * maxPageSize, (currentIndex * maxPageSize) + maxPageSize);
	$: maxIndex = Math.floor(pageFlatList.length / maxPageSize);

	const movePage = (isNext: boolean) => {
		if (isNext) {
			currentIndex = currentIndex + 1;
		} else {
			currentIndex = currentIndex - 1;
		}
	};
</script>

<div class="navigation-wrapper">

	<div class="navigation-control-container">
		<button class="navigation-control-button"
		        disabled={currentIndex <= 0}
		        on:click={() => {movePage(false)}}>{"<"}</button>
		<Card marginBottom="0"><p slot="content" style="margin: 1em">Page {currentIndex + 1}</p></Card>
		<button class="navigation-control-button"
		        disabled={currentIndex >= maxIndex}
		        on:click={() => {movePage(true)}}>{">"}</button>
	</div>

	<div class="navigation-component">
		{#if (title)}
			<Card>
				<h1 slot="content" class="default-card navigation-title">
					{title}
				</h1>
			</Card>
		{/if}
		<!-- all the misc routes-->
		{#each visiblePages as pageMeta}
			{@const fullPath=`${parentSubpath}${pageMeta.relativeLink}`}
			<button class="navigation-element"
			        title={fullPath}
			        on:click={createGoToFunction(fullPath)}>
				{#if pageMeta.image}
					<img src={pageMeta.image} alt={pageMeta.imageAlt ?? "placeholder alt text please replace me or report me!"} />
				{/if}
				<section class="blurb-text">
					<h2>{pageMeta.title}</h2>
					<p>Published: {pageMeta.datePublished ?? "N/A"} | Last updated: {pageMeta.lastUpdated ?? "N/A"}</p>
					<p>{pageMeta.description ?? ""}</p>
					Tags:
					{#if (pageMeta.tags && pageMeta.tags.length !== 0)}
						{#each pageMeta.tags as tagValue}
							&nbsp;<span class="badge variant-filled">{tagValue}</span>
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

	<div class="navigation-control-container">
		<button class="navigation-control-button">{"<"}</button>
		<button class="navigation-control-button">{">"}</button>
	</div>

</div>

<style lang="postcss">
    img {
        height: 20em;
        width: 20em;
        object-fit: cover;
        padding: var(--theme-border-base);
        border-radius: var(--theme-rounded-container) 0 0 var(--theme-rounded-container);
    }

    @media (max-width: 50rem) {
        img {
            max-height: 20rem;
            width: 100%;
            flex-basis: 100%;
            border-radius: var(--theme-rounded-container) var(--theme-rounded-container) 0 0;
        }
    }

    .navigation-component {
        display: flex;
        flex-direction: column;
        gap: 2em;
    }

    .navigation-element {
        @apply btn card card-hover bg-surface-100 dark:bg-surface-900;
        display: flex;
        flex-wrap: wrap;
        text-align: start;
        padding: 0;
    }

    .navigation-title {
        text-align: center;
    }

    .blurb-text {
        flex: 1;
        padding: 2em;
    }

    .navigation-wrapper {
        display: flex;
        flex-direction: column;
    }

    .navigation-control-container {
        display: flex;
        justify-content: space-between;
        margin: 1lh 0;
    }

    .navigation-control-button {
        @apply btn variant-filled-secondary;
    }
</style>