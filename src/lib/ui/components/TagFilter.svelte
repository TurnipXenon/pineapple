<script lang="ts">
	import PinyaCombobox from "$pkg/ui/elements/pinya-combobox/PinyaCombobox.svelte";

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
</script>

<div class="tag-filter">
	<PinyaCombobox
		bind:value={selectedTags}
		data={allTags.map(t => ({value: t, label: t}))}
		multiple={true}
		{label}
	/>
</div>

<style>
    .tag-filter {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>
