<script lang="ts">
	import { type PageMeta } from "$pkg/ui/modules/NavigationMenu/index";
	import { onMount } from "svelte";
	import Placeholder from "$pkg/ui/elements/Placeholder.svelte";

	let hasTriedGettingChumBucket = $state(false);
	let pageMetaList: PageMeta[] = $state([]);
	const loadPageMeta = async () => {
		fetch("/api/get-latest-blogs").then(resp => resp.json()).then(json => {
			pageMetaList = json as PageMeta[];
			hasTriedGettingChumBucket = true;
		}).catch(_ => {
			hasTriedGettingChumBucket = true;
		});
	};

	onMount(() => {
		loadPageMeta();
	});
</script>

<div class="chum-bucket">
	<h2 class="text-start">More about me...</h2>
	<p>Check out the latest things I've been rambling about at
		<a href="https://turnipxenon.com" target="_blank">turnipxenon.com</a> or at
		<a href="https://turnipxenon.com/blogs/coding-chagrin" target="_blank">turnipxenon.com/blogs/coding-chagrin.</a>
	</p>

	<div class="chum-bucket-grid">
		{#if hasTriedGettingChumBucket}
			{#each pageMetaList as pageMeta (pageMeta.title)}
				<div class="chum-bucket-item">
					{#if pageMeta.imageUrl}
						<img src={`https://turnipxenon.com${pageMeta.imageUrl}`}
						     class="chum-bucket-image"
						     alt={pageMeta.imageAlt}>
					{/if}
					<div>
						<h3 class="text-start">
							<a href={`https://turnipxenon.com/${pageMeta.relativeLink}`}>{pageMeta.title}</a>
						</h3>
						<p>Published: {pageMeta.datePublished}
							{#if pageMeta.lastUpdated}
								| Last updated: {pageMeta.lastUpdated}
							{/if}
						</p>
						<p>{pageMeta.description}</p>
					</div>
				</div>
			{/each}
		{:else}
			{#each { length: 10 } as _, idx (idx)}
				<Placeholder classes="mb-2" />
			{/each}
		{/if}
	</div>
</div>

<style>
    .chum-bucket-item {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
    }

    .chum-bucket-image {
        max-width: 10em;
        height: auto;
        margin-top: 0.5em;
        margin-inline-end: 1em;
    }

    .chum-bucket {
		    margin-top: 2lh;
        padding: 1.5lh 0;
        width: 100%;
        max-width: var(--container-3xl);
    }

    .chum-bucket-grid {
        display: flex;
        flex-direction: column;
        margin-top: 0.5lh;
        gap: 0.5lh;
    }
</style>
