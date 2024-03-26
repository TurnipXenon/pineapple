<script lang="ts">
	export let title: string | undefined = undefined;
	export let fileList: Record<string, unknown>;
	export let parentSubpath: string;

	import { Card, createGoToFunction } from "$pkg";
	import type { PageMeta } from "$pkg/components/navigation_component/PageMeta";
	import type { RawGlob } from "$pkg";
	import { findPageMetaParent } from "$pkg/components/navigation_component/PageMeta";

	const pageFlatList: PageMeta[] = [];
	for (const path in fileList) {
		const pathParts = path.split("/");
		pathParts.pop();

		// get title
		let title = pathParts[pathParts.length - 1].replaceAll("-", " ");
		const body = (fileList[path] as RawGlob).default as string;
		if (body.startsWith("<!--")) {
			title = JSON.parse(body.slice("<!--".length, body.indexOf("-->")))["title"];
		}

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
		};
		pageFlatList.push(meta);
	}

	pageFlatList.sort((a, b) => a.relativeLink.localeCompare(b.relativeLink));

	const pageGroupedList: PageMeta[] = [];
	pageFlatList.forEach(p => {
		if (!findPageMetaParent(pageGroupedList, p)) {
			pageGroupedList.push(p);
		}
	});
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
	{#each pageFlatList as page}
		<button class="navigation-element" on:click={createGoToFunction(`${parentSubpath}${page.relativeLink}`)}>
			<h3>{page.title}</h3>
		</button>
	{/each}
</div>

<style lang="postcss">
    .navigation-component {
        display: flex;
        flex-direction: column;
        gap: 2em;
    }

    .navigation-element {
        @apply btn card card-hover bg-surface-100 dark:bg-surface-900;
    }

    .navigation-title {
        text-align: center;
    }
</style>