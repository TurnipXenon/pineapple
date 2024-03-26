<script lang="ts">
	export let title: string | undefined = undefined;
	export let fileList: Record<string, unknown>;
	/**
	 * Should include a slash before and after the path
	 */
	export let parentSubpath: string;

	import { Card, createGoToFunction } from "$pkg";
	import type { PageMeta } from "$pkg/components/navigation_component/PageMeta";
	import type { RawGlob } from "$pkg";
	import { findPageMetaParent } from "$pkg/components/navigation_component/PageMeta";

	let pageFlatList: PageMeta[] = [];
	let pageGroupedList: PageMeta[] = [];
	const parseFileList = async () => {
		for (const path in fileList) {
			const pathParts = path.split("/");
			pathParts.pop();

			// get title
			let title = pathParts[pathParts.length - 1].replaceAll("-", " ");

			// get url path
			const subPath = pathParts.filter(s => {
				return s !== "." && s.indexOf("(") !== 0;
			});


			// todo: consider
			// subPath.unshift("/misc");
			const meta: PageMeta = {
				relativeLink: subPath.join("/"),
				title,
				tags: [],
				nestedPages: []
				// todo: transform the data in server.ts?
			};


			const body = (fileList[path] as RawGlob).default as string;
			// let metadata : undefined | Map<string, string | string[]>;
			if (body.startsWith("<!--")) {
				// todo: absorb more metadata
				const metadata = JSON.parse(body.slice("<!--".length, body.indexOf("-->")));
				meta.title = metadata["title"] ?? meta.title;
				meta.tags = metadata["tags"];
				meta.description = metadata["description"];
				meta.datePublished = metadata["datePublished"];
				meta.lastUpdated = metadata["lastUpdated"];


				meta.image = metadata["image"];
				if (meta.image) {
					meta.imageAlt = metadata["imageAlt"];
					if (!meta.imageAlt) {
						console.warn(`Accessibility issues: image alt missing for image ${meta.image}`);
					}
				}
			}

			pageFlatList.push(meta);
		}

		pageFlatList.sort((a, b) => a.relativeLink.localeCompare(b.relativeLink));

		pageFlatList.forEach(p => {
			if (!findPageMetaParent(pageGroupedList, p)) {
				pageGroupedList.push(p);
			}
		});

		pageFlatList = pageFlatList;
	};
	parseFileList();
</script>

<div class="navigation-component">
	{#if (title)}
		<Card>
			<h1 slot="content" class="default-card navigation-title">
				{title}
			</h1>
		</Card>
	{/if}
	<!-- all the misc routes-->
	{#each pageFlatList as pageMeta}
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
</style>