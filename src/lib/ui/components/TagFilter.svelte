<script lang="ts">
	import { TextChip } from "$pkg/ui/elements/TextChip";

	interface TagFilterProps {
		allTags: string[];           // All available tags
		selectedTags: string[];      // Currently selected tags (bindable)
		label?: string;              // Optional label
	}

	let {
		allTags,
		selectedTags = $bindable([]),
		label = "Filter by tags"
	}: TagFilterProps = $props();

	function toggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter(t => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	}

	function clearAll() {
		selectedTags = [];
	}

	const hasSelection = $derived(selectedTags.length > 0);
</script>

<div class="tag-filter">
	<div class="filter-header">
		<span class="filter-label">{label}</span>
		{#if hasSelection}
			<button class="clear-btn" onclick={clearAll}>Clear all</button>
		{/if}
	</div>
	<div class="tag-list">
		{#each allTags as tag (tag)}
			<button
				class="tag-button bg-transparent hover:brightness-110"
				onclick={() => toggleTag(tag)}
			>
				<TextChip queryClass={selectedTags.includes(tag) ? 'highlight-chip' : ''}>
					<span style={`font-weight: ${selectedTags.includes(tag) ? "bold" : "normal"}`}>
						{#if selectedTags.includes(tag)}✓{/if}
						{tag}
					</span>
				</TextChip>
			</button>
		{/each}
	</div>
</div>

<style>
	.tag-filter {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.filter-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.filter-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-secondary);
	}

	.clear-btn {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-primary-500);
		background: transparent;
		color: var(--color-primary-500);
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.clear-btn:hover {
		background: var(--color-primary-100);
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.tag-button {
		padding: 0;
		border: none;
		cursor: pointer;
	}
</style>
