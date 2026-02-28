<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/state";
	import { localizeHref } from "$pkg/external/paraglide/runtime.js";
	import type { ParsnipOverall } from "$pkg/modules/parsnip/ParsnipOverall";
	import { FourPartCard } from "$pkg/ui/components/index";
	import { PinyaCard } from "$pkg/ui/elements/index";
	import Placeholder from "$pkg/ui/elements/Placeholder.svelte";
	import NavigationControl from "$pkg/ui/modules/NavigationMenu/NavigationControl.svelte";
	import {
		DefaultPageMetaSorter,
		type FoodReviewJson,
		type PageMeta,
		parsePageMeta,
		type ParsePageMetaCompareFn
	} from "$pkg/ui/modules/NavigationMenu/PageMeta";
	import { renderStar } from "$pkg/util/util";
	import { untrack } from "svelte";
	import { SvelteMap } from "svelte/reactivity";

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
		if (!browser) {
			return false;
		}

		const repeatedTags = page.url.searchParams.getAll("tags");
		if (repeatedTags.length > 0) {
			return true;
		}
		const inlineTags = page.url.searchParams.get("tags") ?? "";
		return inlineTags.trim().length > 0;
	})());

	const pageFlatList = untrack(() => {
		const fileBasedList = parsePageMeta(fileList, jsonList, imageMap, compareFn);
		const parsnipBasedList = parsnipOverall?.files.map(pf => {
			let imageUrl = pf.preview;
			if (imageUrl && !imageUrl.includes("https://")) {
				imageUrl = `${parsnipOverall.baseUrl}/${pf.preview}`;
			}
			const meta: PageMeta = {
				title: pf.basename,
				nestedPages: [],
				relativeLink: `${parsnipBasePath}${pf.slug}`,
				tags: pf.tags,
				imageUrl,
				imageAlt: pf.previewAlt,
				datePublished: pf.datePublished ?? pf.stat.ctime ? new Date(pf.stat.ctime).toISOString().split("T")[0] : undefined,
				lastUpdated: pf.lastUpdated ?? pf.stat.mtime ? new Date(pf.stat.mtime).toISOString().split("T")[0] : undefined,
				description: pf.tagline,
				priority: 0
			};
			return meta;
		}) ?? [];
		const list = fileBasedList.concat(parsnipBasedList);

		if (compareFn) {
			list.sort(compareFn);
		} else {
			list.sort(DefaultPageMetaSorter);
		}

		return list;
	});

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

	let ratingCache = new SvelteMap<string, string>();

	$effect(() => {
		if (!browser || !parsnipOverall) {
			return;
		}

		visiblePages.forEach(vp => {
			if (vp.tags.includes("food-review") && !ratingCache.has(vp.relativeLink)) {
				ratingCache.set(vp.relativeLink, "");
				const parsnipMetadata = parsnipOverall.files.find(f => f.basename == vp.title);

				if (parsnipMetadata) {
					fetch(`${parsnipOverall.baseUrl}/${parsnipMetadata.path}`.replaceAll(".ast.", ".ld."))
						.then(data => data.json())
						.then((data: FoodReviewJson) => {
							ratingCache.set(vp.relativeLink, `${renderStar(data.reviewRating.ratingValue)}`);
						}).catch(err => {
						console.warn(err);
					}).finally(() => {
						console.log(`Rating fetched for ${vp.relativeLink}: ${ratingCache.get(vp.relativeLink)}`);
					});
				}
			}
		});
	});
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
			<PinyaCard widthClass="w-full" paddingClass="" flexClass="" className="navigation-element">
				<div class="blurb-text">
					<Placeholder classes="h-8 w-2/3 mb-4" />
					<Placeholder classes="h-4 w-1/2 mb-2" />
					<Placeholder classes="h-4 w-full mb-2" />
					<Placeholder classes="h-4 w-5/6 mb-2" />
				</div>
			</PinyaCard>
			<PinyaCard widthClass="w-full" className="navigation-element" paddingClass="" flexClass="">
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

				<!-- https://github.com/sveltejs/svelte/issues/11115#issuecomment-2048556800 -->
				{#snippet headerCover()}
					<img src={pageMeta.imageUrl}
					     class="pinya-card-image"
					     alt={pageMeta.imageAlt ?? "placeholder alt text please replace me or report me!"} />
				{/snippet}

				<!-- thank you so much to https://www.reddit.com/r/sveltejs/comments/yoe6in/comment/jvaj1ez -->
				<a href={localizeHref(fullPath)} class="card-anchor a-as-btn" data-sveltekit-reload>
					<FourPartCard
						widthClass="w-full"
						className="navigation-element"
						flexClass=""
						paddingClass=""
						headerCover={pageMeta.imageUrl ? headerCover : undefined}
					>
						<section class="blurb-text">
							<h2>{pageMeta.title}</h2>
							<p>Published: {pageMeta.datePublished ?? "N/A"} | Last updated: {pageMeta.lastUpdated ?? "N/A"}</p>

							{#if pageMeta.tags.includes('food-review')}
								<p>{ratingCache.get(pageMeta.relativeLink)}</p>
							{/if}
							<p class="blurb-description">{pageMeta.description ?? ""}</p>
							<div>
								Tags:
								{#if (pageMeta.tags && pageMeta.tags.length !== 0)}
									{#each pageMeta.tags as tagValue, idx (idx)}
										&nbsp;<span class="badge tag-container">{tagValue}</span>
									{/each}
								{:else}
									None
								{/if}
							</div>
						</section>
					</FourPartCard>
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

    :global {
        .navigation-element.pinya-card:not(.pinya-four-part-card), .navigation-element .flex-wrapper {
            /* todo: migration */
            /*@apply btn card card-hover bg-surface-100 dark:bg-surface-900;*/
            container-type: inline-size;
            display: flex;
            justify-content: stretch;
            align-items: stretch;
            padding: 0;
            flex-wrap: wrap;
        }

        .navigation-element.pinya-four-part-card {
            .w-full {
                width: unset;
            }

            .mb-6 {
                margin-bottom: unset;
            }

            .flex-wrapper > .card-content {
                flex: 99 1 32em;
            }

            .flex-wrapper > .card-header-cover {
                flex: 1 1 12lh;
                max-height: 12lh;
            }

            .pinya-card-image {
                border-radius: var(--radius-xl);
                max-height: unset;
                max-width: unset;
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
    }

    img {
        height: 20em;
        object-fit: cover;
        padding: var(--theme-border-base);
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
        padding-top: 1lh;
        padding-bottom: 1lh;
        white-space: initial;
        min-width: 0;
        display: flex;
        flex-direction: column;
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

    .blurb-description {
        flex-shrink: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; /* Number of lines to show */
        line-clamp: 3; /* Number of lines to show */
        overflow: hidden;
        text-overflow: ellipsis; /* Optional, but good practice */
    }
</style>
