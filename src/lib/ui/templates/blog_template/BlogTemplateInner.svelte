<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import type { SimplePageMeta } from "$pkg/ui/modules/NavigationMenu/index";
	import { localizeHref } from "$pkg/external/paraglide/runtime.js";

	interface Props {
		pageMeta: SimplePageMeta;
		children?: import('svelte').Snippet;
	}

	let { pageMeta, children }: Props = $props();

	const getTagQueryHref = (tag: string): string => {
		const query = new URLSearchParams();
		query.set("index", "0");
		query.append("tags", tag);
		return `${localizeHref("/pineapple/")}?${query.toString()}`;
	};
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
				{#each pageMeta.tags as tag, index (index)}
					<a class="badge preset-filled" href={getTagQueryHref(tag)}>{tag}</a>
				{/each}
			</section>
		{/if}
	</hgroup>

	<div class="article-content">
		{@render children?.()}
	</div>
</article>

<style>
    hgroup {
        margin-bottom: 1lh;
    }

    .badge {
        margin-inline-end: 0.5em;
    }

    #article-tags a.badge {
        text-decoration: none;
    }
</style>
