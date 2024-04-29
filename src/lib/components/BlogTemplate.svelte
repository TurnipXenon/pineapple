<script lang="ts" xmlns="http://www.w3.org/1999/html">
	import { Card, type SimplePageMeta } from "$pkg";

	// grab page meta from the adjacent meta.json
	export let pageMeta: SimplePageMeta;
</script>

<Card>
	<div slot="content" class="default-card">
		<article>
			<hgroup>
				{#if pageMeta.title}
					<h1>{pageMeta.title}</h1>
				{/if}
				{#if pageMeta.datePublished}
					<p>Published: {pageMeta.datePublished}</p>
				{/if}
				{#if pageMeta.lastUpdated}
					<p>Last updated: {pageMeta.lastUpdated}</p>
				{/if}
				{#if pageMeta.tags.length > 0}
					<section id="article-tags">
						Tags:
						{#each pageMeta.tags as tag}
							<span class="badge variant-filled">{tag}</span>
						{/each}
					</section>
				{/if}
			</hgroup>

			<slot />
		</article>
	</div>
</Card>

<style>
    hgroup {
        margin-bottom: 1lh;
    }

    .badge {
        margin-inline-end: 0.5em;
    }
</style>