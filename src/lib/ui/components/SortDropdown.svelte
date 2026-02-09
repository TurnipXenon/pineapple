<script lang="ts">
	import PinyaCombobox from "$pkg/ui/elements/pinya-combobox/PinyaCombobox.svelte";
	import type { GenericComboboxItem } from "$pkg/ui/elements/pinya-combobox/PinyaComboboxProps";
	import { SectionType } from "$pkg/ui/templates/SeaweedLayout/props";

	interface SortDropdownProps {
		sortBy: string;              // Current sort value (bindable)
		sectionType: SectionType;    // Determines available sort options
	}

	let {
		sortBy = $bindable("default"),
		sectionType = SectionType.Projects
	}: SortDropdownProps = $props();

	const projectSortOptions: GenericComboboxItem<string>[] = [
		{ label: "Default order", value: "default" },
		{ label: "Most recently finished", value: "date-desc" },
		{ label: "Oldest finished", value: "date-asc" },
		{ label: "Longest projects", value: "duration-desc" },
		{ label: "Shortest projects", value: "duration-asc" }
	];

	const experienceSortOptions: GenericComboboxItem<string>[] = [
		{ label: "Default order", value: "default" },
		{ label: "Most recent first", value: "date-desc" },
		{ label: "Oldest first", value: "date-asc" }
	];

	const sortOptions = $derived(
		sectionType === SectionType.Experience
			? experienceSortOptions
			: projectSortOptions
	);
</script>

<div class="sort-dropdown">
	<PinyaCombobox
		data={sortOptions}
		bind:value={sortBy}
		defaultValue="default"
		label="Sort by"
		placeholder="Select sort order"
		class="sort-combobox"
	/>
</div>

<style>
	.sort-dropdown {
		min-width: 200px;
	}

	:global(.sort-combobox) {
		width: 100%;
	}
</style>
