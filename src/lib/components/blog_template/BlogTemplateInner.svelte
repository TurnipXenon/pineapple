<script lang="ts">
	import type { SimplePageMeta } from "$pkg";

	export let pageMeta: SimplePageMeta;
</script>

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

	<div class="article-content">
		<slot />
	</div>
</article>

<style>
    hgroup {
        margin-bottom: 1lh;
    }

    .badge {
        margin-inline-end: 0.5em;
    }
</style>