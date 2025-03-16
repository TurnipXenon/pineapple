<script lang="ts">
	import Card from "$pkg/components/Card.svelte";
	import { type PageMeta } from "$pkg";
	import { onMount } from "svelte";

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

<Card>
	{#snippet content()}
		<div  class="chum-bucket">
			<h2>More about me...</h2>
			<p>Check out the latest things I've been rambling about at
				<a href="https://turnipxenon.com" target="_blank">turnipxenon.com</a> or at
				<a href="https://turnipxenon.com/blogs/coding-chagrin" target="_blank">turnipxenon.com/blogs/coding-chagrin.</a>
			</p>

			{#if pageMetaList.length > 0}
				<h3><b>My latest blogs (sounds too fancy)</b></h3>
			{/if}

			<div class="chum-bucket-grid">
				{#if hasTriedGettingChumBucket}
					{#each pageMetaList as pageMeta}
						<div class="chum-bucket-item">
							{#if pageMeta.imageUrl}
								<img src={`https://turnipxenon.com${pageMeta.imageUrl}`}
								     class="chum-bucket-image"
								     alt={pageMeta.imageAlt}>
							{/if}
							<div>
								<h3><a href={`https://turnipxenon.com/${pageMeta.relativeLink}`}>{pageMeta.title}</a></h3>
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
					{#each { length: 10 } as _}
						<div class="placeholder"></div>
					{/each}
				{/if}
			</div>
		</div>
	{/snippet}
</Card>

<style lang="postcss">
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
        padding: 1.5lh 2em;
        max-width: 600px;
    }

    .chum-bucket-grid {
        display: flex;
        flex-direction: column;
        margin-top: 0.5lh;
        gap: 0.5lh;
    }
</style>
