<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import { localizeHref } from "$pkg/external/paraglide/runtime.js";
	import type { SimplePageMeta } from "$pkg/ui/modules/NavigationMenu/index";
	import { getWebBaseUrl } from "$pkg/util/env-getter";
	import { renderStar } from "$pkg/util/util";
	import { SvelteURLSearchParams } from "svelte/reactivity";

	interface Props {
		pageMeta: SimplePageMeta;
		children?: import("svelte").Snippet;
	}

	let { pageMeta, children }: Props = $props();

	const getTagQueryHref = $derived((tag: string): string => {
		const query = new SvelteURLSearchParams();
		query.set("index", "0");
		query.append("tags", tag);
		return `${localizeHref(getWebBaseUrl())}?${query.toString()}`;
	});

	// todo: improve graphics lol
	let ratingsRenderer = $derived(renderStar(pageMeta.foodReviewJson?.reviewRating.ratingValue ?? 1));
</script>

<article>
	<hgroup>
		{#if pageMeta.title}
			<h1>{pageMeta.title}</h1>
		{/if}
		<div id="hgroup-wrapper">
			{#if pageMeta.datePublished}
				<p>Published: {pageMeta.datePublished}</p>
			{/if}
			{#if pageMeta.lastUpdated}
				<p>Last updated: {pageMeta.lastUpdated}</p>
			{/if}
			{#if pageMeta.foodReviewJson}
				<p>
					Ratings: {ratingsRenderer}
				</p>
			{/if}
			{#if pageMeta.foodReviewJson?.itemReviewed.url}
				<p>
					<a href={pageMeta.foodReviewJson.itemReviewed.url}
					   rel="external"
					   target="_blank">{pageMeta.foodReviewJson?.itemReviewed.url}</a>
				</p>
			{/if}
			{#if pageMeta.tags.length > 0}
				<section id="article-tags" class="w-full">
					Tags:
					{#each pageMeta.tags as tag, index (index)}
						<a class="badge tag-link" href={getTagQueryHref(tag)}>{tag}</a>
					{/each}
				</section>
			{/if}
		</div>
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

    #article-tags {
        flex-grow: 1;
        width: 100%;
        flex-basis: 100%;

        line-height: 1.3lh;
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

    #hgroup-wrapper {
        margin-top: 0.5lh;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        & > *:not(.w-full) {
            flex-basis: max(16em, 40%);
        }
    }
</style>
