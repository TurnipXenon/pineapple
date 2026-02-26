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
					<a class="badge tag-link" href={getTagQueryHref(tag)}>{tag}</a>
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

    #article-tags .tag-link {
        display: inline-flex;
        align-items: center;
        border-radius: 0.5rem;
        padding: 0.2rem 0.55rem;
        border: 1px solid var(--color-surface-700-600);
        background-color: transparent;
        color: var(--color-surface-900-100);
        transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    }

    #article-tags .tag-link:hover,
    #article-tags .tag-link:focus-visible {
        background-color: transparent;
        border-color: var(--color-primary-400-600);
        color: var(--color-surface-900-100);
        outline: none;
		    filter: brightness(110%);
    }
</style>
