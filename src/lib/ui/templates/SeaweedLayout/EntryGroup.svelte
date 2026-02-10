<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import SortDropdown from "$pkg/ui/components/SortDropdown.svelte";
	import TagFilter from "$pkg/ui/components/TagFilter.svelte";
	import { PinyaCard } from "$pkg/ui/elements/PinyaCard";
	import type { ProjectGroup, SnippetMeta } from "$pkg/ui/templates/SeaweedLayout";
	import { SectionType } from "$pkg/ui/templates/SeaweedLayout/props";

	let {
		title,
		entryList,
		projectComponentProps,
		// New props for Seaweed 3
		sectionType = SectionType.Projects,
		showFilter = false,
		showSort = false,
		showMoreLimit = 0
	}: ProjectGroup = $props();

	// State
	let selectedTags = $state<string[]>([]);
	let sortBy = $state<string[]>(["default"]);
	let isExpanded = $state(false);

	// Derived values
	const allTags = $derived([...new Set(entryList.flatMap(e => e.tags ?? []))]);

	const filteredList = $derived(
		selectedTags.length === 0
			? entryList
			: entryList.filter(e => e.tags?.some(t => selectedTags.includes(t)))
	);

	function sortEntries(list: SnippetMeta[], sort: string): SnippetMeta[] {
		const sorted = [...list];
		switch (sort) {
			case "date-desc":
				return sorted.sort((a, b) => {
					// Entries without dateFinished go to the bottom
					if (!a.dateFinished) return 1;
					if (!b.dateFinished) return -1;
					return new Date(b.dateFinished).getTime() - new Date(a.dateFinished).getTime();
				});
			case "date-asc":
				return sorted.sort((a, b) => {
					// Entries without dateFinished go to the bottom
					if (!a.dateFinished) return 1;
					if (!b.dateFinished) return -1;
					return new Date(a.dateFinished).getTime() - new Date(b.dateFinished).getTime();
				});
			case "duration-desc":
				return sorted.sort((a, b) => {
					const durationA = getDuration(a);
					const durationB = getDuration(b);
					// Entries without valid dates go to the bottom
					if (durationA === 0) return 1;
					if (durationB === 0) return -1;
					return durationB - durationA;
				});
			case "duration-asc":
				return sorted.sort((a, b) => {
					const durationA = getDuration(a);
					const durationB = getDuration(b);
					// Entries without valid dates go to the bottom
					if (durationA === 0) return 1;
					if (durationB === 0) return -1;
					return durationA - durationB;
				});
			default:
				return sorted;
		}
	}

	function getDuration(entry: SnippetMeta): number {
		if (!entry.dateStarted || !entry.dateFinished) return 0;
		return new Date(entry.dateFinished).getTime() - new Date(entry.dateStarted).getTime();
	}

	const sortedList = $derived(sortEntries(filteredList, sortBy.length > 0 ? sortBy[0] : "default"));

	const visibleList = $derived(
		showMoreLimit > 0 && !isExpanded
			? sortedList.slice(0, showMoreLimit)
			: sortedList
	);

	const hasMore = $derived(showMoreLimit > 0 && sortedList.length > showMoreLimit);
</script>

<div class="mt-8 flex flex-col items-center">
	<PinyaCard class="group-header">
		<div class="header-content">
			<h2>{title}</h2>
			<div class="header-controls">
				{#if showFilter && allTags.length > 0}
					<TagFilter bind:selectedTags {allTags} />
				{/if}
				{#if showSort}
					<SortDropdown bind:sortBy={sortBy} {sectionType} />
				{/if}
			</div>
		</div>
	</PinyaCard>

	{#if sortedList.length === 0}
		<div class="no-results">
			<p>No items match your filter</p>
		</div>
	{:else}
		<div class="normal-project-container">
			{#each visibleList as ui (ui.key)}
				{@render ui.component(projectComponentProps ?? {})}
			{/each}
		</div>

		{#if hasMore}
			<button class="show-more-btn" onclick={() => isExpanded = !isExpanded}>
				{isExpanded ? "Show less" : `Click to see ${sortedList.length - visibleList.length} more...`}
			</button>
		{/if}
	{/if}
</div>

<style>
    .header-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }

    @media (min-width: 768px) {
        .header-content {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }

    .header-controls {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    @media (min-width: 768px) {
        .header-controls {
            flex-direction: row;
            gap: 1rem;
        }
    }

    .normal-project-container {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin: auto;
        /* 3 containers + 2 gaps + extra rem */
        max-width: calc((28rem * 3) + 5rem);
        justify-content: center;
        margin-bottom: 2rem;
        align-items: start;
    }

    .show-more-btn {
        margin-top: 2rem;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-lg);
        border: 2px solid var(--color-primary-500);
        background: transparent;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .show-more-btn:hover {
        background: var(--color-primary-100);
    }

    .no-results {
        padding: 2rem;
        text-align: center;
        color: var(--color-text-secondary);
    }

    :global {
        .group-header.pinya-card {
            margin-bottom: calc(var(--spacing) * 8);
            max-width: unset;
        }
    }
</style>
