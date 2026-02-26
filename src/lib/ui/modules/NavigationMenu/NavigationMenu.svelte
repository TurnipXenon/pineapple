<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import { page } from "$app/state";
	import type { ParsnipOverall } from "$pkg/modules/parsnip/ParsnipOverall";
	import NavigationControl from "$pkg/ui/modules/NavigationMenu/NavigationControl.svelte";
	import {
		DefaultPageMetaSorter,
		type PageMeta,
		parsePageMeta,
		type ParsePageMetaCompareFn
	} from "$pkg/ui/modules/NavigationMenu/PageMeta";
	import { PinyaCard } from "$pkg/ui/elements/index";
	import Placeholder from "$pkg/ui/elements/Placeholder.svelte";
	import { localizeHref } from "$pkg/external/paraglide/runtime.js";

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
		selectedTags?: string[];
		queryReady?: boolean;
		parsnipOverall?: ParsnipOverall;
		parsnipBasePath?: string;
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
		currentIndex = $bindable(0),
		selectedTags = $bindable([]),
		queryReady = $bindable(false),
		parsnipOverall = undefined,
		parsnipBasePath = ""
	}: Props = $props();

	$effect(() => {
		if (!shouldAllowControl) {
			queryReady = true;
		}
	});
	const hasTagQuery = $derived((() => {
		const repeatedTags = page.url.searchParams.getAll("tags");
		if (repeatedTags.length > 0) {
			return true;
		}
		const inlineTags = page.url.searchParams.get("tags") ?? "";
		return inlineTags.trim().length > 0;
	})());

	const fileBasedList = parsePageMeta(fileList, jsonList, imageMap, compareFn);
	const parsnipBasedList = parsnipOverall?.files.map(pf => {
		let imageUrl = pf.preview;
		if (imageUrl && !imageUrl.includes('https://')) {
			imageUrl = `${parsnipOverall.baseUrl}/${pf.preview}`;
		}
		const meta: PageMeta = {
			title: pf.basename,
			nestedPages: [],
			relativeLink: `${parsnipBasePath}${pf.slug}`,
			tags: pf.tags,
			imageUrl,
			imageAlt: pf.previewAlt,
			datePublished: pf.stat.ctime ? new Date(pf.stat.ctime).toISOString().split("T")[0] : undefined,
			lastUpdated: pf.stat.mtime ? new Date(pf.stat.mtime).toISOString().split("T")[0] : undefined,
			description: pf.tagline,
			priority: 0
		};
		return meta;
	}) ?? [];
	const pageFlatList = fileBasedList.concat(parsnipBasedList);

	if (compareFn) {
		pageFlatList.sort(compareFn);
	} else {
		pageFlatList.sort(DefaultPageMetaSorter);
	}

	const selectedTagsSet = $derived(new Set(selectedTags.map(tag => tag.toLocaleLowerCase())));
	const filteredPageFlatList = $derived(
		selectedTagsSet.size === 0
			? pageFlatList
			: pageFlatList.filter(pageMeta => {
				if (!pageMeta.tags || pageMeta.tags.length === 0) {
					return false;
				}
				const pageTags = new Set(pageMeta.tags.map(tag => tag.toLocaleLowerCase()));
				for (const selectedTag of selectedTagsSet) {
					if (!pageTags.has(selectedTag)) {
						return false;
					}
				}
				return true;
			})
	);
	const maxIndex = $derived(Math.max(Math.ceil(filteredPageFlatList.length / pageSize) - 1, 0));
	$effect(() => {
		if (currentIndex > maxIndex) {
			currentIndex = maxIndex;
		}
		if (currentIndex < 0) {
			currentIndex = 0;
		}
	});
	let visiblePages = $derived(filteredPageFlatList.slice(currentIndex * pageSize, (currentIndex * pageSize) + pageSize));
</script>

<div class="navigation-wrapper">
	{#if (title)}
		<div>
			<PinyaCard widthClass="w-full">
				<h1 class="navigation-title">
					{title}
				</h1>
			</PinyaCard>
		</div>
	{/if}

	{#if allowUpperControl && shouldAllowControl}
		<NavigationControl
			bind:currentIndex={currentIndex}
			contentLength={filteredPageFlatList.length}
			bind:pageSize={pageSize}
			bind:selectedTags={selectedTags}
			bind:queryReady={queryReady}></NavigationControl
		>
	{/if}

	<div class="navigation-component">
		{#if hasTagQuery && !queryReady}
			<PinyaCard widthClass="w-full" className="navigation-element">
				<div class="blurb-text">
					<Placeholder classes="h-8 w-2/3 mb-4" />
					<Placeholder classes="h-4 w-1/2 mb-2" />
					<Placeholder classes="h-4 w-full mb-2" />
					<Placeholder classes="h-4 w-5/6 mb-2" />
				</div>
			</PinyaCard>
			<PinyaCard widthClass="w-full" className="navigation-element">
				<div class="blurb-text">
					<Placeholder classes="h-8 w-2/3 mb-4" />
					<Placeholder classes="h-4 w-1/2 mb-2" />
					<Placeholder classes="h-4 w-full mb-2" />
					<Placeholder classes="h-4 w-5/6 mb-2" />
				</div>
			</PinyaCard>
		{:else}
			<!-- all the misc routes-->
			{#each visiblePages as pageMeta (pageMeta.title)}
				{@const fullPath = `${parentSubpath}${pageMeta.relativeLink}`}
				<!-- thank you so much to https://www.reddit.com/r/sveltejs/comments/yoe6in/comment/jvaj1ez -->
				<a href={localizeHref(fullPath)} class="card-anchor a-as-btn" data-sveltekit-reload>
					<PinyaCard
						widthClass="w-full"
						className="navigation-element"
					>
						{#if pageMeta.imageUrl}
							<img src={pageMeta.imageUrl}
							     class="pinya-card-image"
							     alt={pageMeta.imageAlt ?? "placeholder alt text please replace me or report me!"} />
						{/if}
						<section class="blurb-text">
							<h2>{pageMeta.title}</h2>
							<p>Published: {pageMeta.datePublished ?? "N/A"} | Last updated: {pageMeta.lastUpdated ?? "N/A"}</p>
							<p>{pageMeta.description ?? ""}</p>
							Tags:
							{#if (pageMeta.tags && pageMeta.tags.length !== 0)}
								{#each pageMeta.tags as tagValue, idx (idx)}
									&nbsp;<span class="badge tag-container">{tagValue}</span>
								{/each}
							{:else}
								None
							{/if}
						</section>
					</PinyaCard>
				</a>
			{/each}

			{#if visiblePages.length === 0}
				<PinyaCard>
					<p class="default-card">Sorry, no content was found</p>
				</PinyaCard>
			{/if}
		{/if}
	</div>

	{#if shouldAllowControl}
		<NavigationControl bind:currentIndex={currentIndex}
		                   contentLength={filteredPageFlatList.length}
		                   bind:pageSize={pageSize}
		                   bind:selectedTags={selectedTags}
		                   bind:queryReady={queryReady}></NavigationControl>
	{/if}

</div>

<style>
    @container (max-width: 800px) {
        img {
            max-height: 20rem;
            width: 100%;
            flex-basis: 100%;
            border-radius: var(--theme-rounded-container) var(--theme-rounded-container) 0 0;
        }

        :global(.navigation-element.pinya-card) {
            flex-direction: column;
        }
    }

    @container (min-width: 801px) {
        :global(.navigation-element.pinya-card) {
            flex-direction: row;
        }

        img {
            width: 20em;
        }
    }

    :global(.navigation-element.pinya-card) {
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
        display: inline-flex;
        align-items: center;
        border-radius: 0.5rem;
        padding: 0.2rem 0.55rem;
        border: 1px solid var(--color-surface-700-600);
        background-color: transparent;
        color: var(--color-surface-900-100);
        transition: border-color 0.15s ease;
    }

    :global(.navigation-element:hover) .tag-container {
        border-color: var(--color-primary-400-600);
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

    .navigation-wrapper .pinya-card-image {
		    border-radius: var(--radius-xl);
    }
</style>
