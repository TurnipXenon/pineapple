<script lang="ts">
	import {
		type EntryGroup,
		GetAllEntryFromGlobal,
		GetEntryFromGlobal,
		type SeaweedTemplateData,
		seaweedTemplateData
	} from "$pkg/template/seaweed/SeaweedTemplateData";
	import type { ComponentType } from "svelte";
	import { removeProxyWrapperOnString } from "./EntryOrderConfig";
	import ComboBoxWithButton from "$pkg/components/combo_box/ComboBoxWithButton.svelte";

	export let seaweedEntries: EntryGroup[];
	export let orderUrl: string;
	export let updateUrl: (data: SeaweedTemplateData) => void;

	const updateOrderQuery = () => {
		orderUrl = "order=" + seaweedEntries.map(g => {
			const groupUrl = g.items.map(
				e => removeProxyWrapperOnString(e.name)
			).join("|");
			return `${g.name}:${groupUrl}:${g.gridClass}`;
		}).join(",");
		updateUrl(seaweedTemplateData);
	};

	const addEntry = (group: EntryGroup): ((selected: string) => void) => {
		return (selected: string) => {
			const c = GetEntryFromGlobal(selected);
			console.log(selected, c);
			if (c) {
				group.items.push(c);
				seaweedEntries = seaweedEntries;
				updateOrderQuery();
			}
		};
	};
	const swapEntry = (index: number, group: EntryGroup, shouldDecrement: boolean): (() => void) => {
		return () => {
			let newIndex = index;
			if (shouldDecrement && index >= 1) {
				newIndex--;
			} else if (!shouldDecrement && index <= group.items.length - 2) {
				newIndex++;
			} else {
				return;
			}
			console.log(index, newIndex);

			const tempVar = group.items[newIndex];
			group.items[newIndex] = group.items[index];
			group.items[index] = tempVar;
			seaweedEntries = seaweedEntries;
			updateOrderQuery();
		};
	};
	const swapGroups = (index: number, shouldDecrement: boolean): (() => void) => {
		return () => {
			let newIndex = index;
			if (shouldDecrement && index >= 1) {
				newIndex--;
			} else if (!shouldDecrement && index <= seaweedEntries.length - 2) {
				newIndex++;
			} else {
				return;
			}

			const tempVar = seaweedEntries[newIndex];
			seaweedEntries[newIndex] = seaweedEntries[index];
			seaweedEntries[index] = tempVar;
			seaweedEntries = seaweedEntries;
			updateOrderQuery();
		};
	};

	// todo: add group; we might not need it now
	// const addGroup = (group: EntryGroup): (() => void) => {
	// 	return () => {
	// 		seaweedEntries.push({
	// 			name: "",
	// 			items: [],
	// 			gridClass: GroupGridClass.Projects.toString()
	// 		});
	// 		updateOrderQuery();
	// 	};
	// };

	const removeGroup = (group: EntryGroup): (() => void) => {
		return () => {
			const index = seaweedEntries.indexOf(group);
			if (index === -1) {
				return;
			}

			seaweedEntries.splice(index, 1);
			seaweedEntries = seaweedEntries;
			updateOrderQuery();
		};
	};
	const removeEntry = (entry: ComponentType, group: EntryGroup): (() => void) => {
		return () => {
			console.log("Clicked!");
			for (let i = group.items.length - 1; i >= 0; i--) {
				if (group.items[i].name === entry.name) {
					console.log("Reduce");
					group.items.splice(i, 1);
					seaweedEntries = seaweedEntries;
					updateOrderQuery();
					break;
				}
			}
		};
	};

	const allDefaultEntries = Array.from(GetAllEntryFromGlobal().keys());
	console.log("Test", Array.from(GetAllEntryFromGlobal().keys()));
</script>

<h3>Site ordering</h3>
<blockquote>Sorry! This part of the website is still WIP, but here it is anyway. As long as it functions</blockquote>

<!-- formatting: group1:entry1|entry2,group2:entry3
 : <= separates the group header, the entries, and the class
 | <= separates each entries
 , <= separates each group
 -->
<div class="advanced-setting-list">
	<!-- todo: we might have to extract this into it's own component -->
	<!-- todo: NOW!!! -->
	{#each seaweedEntries as group, groupIndex}
		<div>
			<div>
				<button class="editable-button" on:click={removeGroup(group)}>X</button>
				<!-- todo: move group up or down -->
				<button class="editable-button" on:click={swapGroups(groupIndex, true)}>^</button>
				<button class="editable-button" on:click={swapGroups(groupIndex, false)}>v</button>
				{group.name}
			</div>
			<div class="advanced-setting-list card">
				{#each group.items as entry, entryIndex}
					<div class="editable-entry">
						<button on:click={removeEntry(entry, group)}>-</button>
						<button on:click={swapEntry(entryIndex, group, true)}>^</button>
						<button on:click={swapEntry(entryIndex, group, false)}>v</button>
						{entry.name}
					</div>
				{/each}
			</div>

			<ComboBoxWithButton stringItems={allDefaultEntries}
			                    onClick={addEntry(group)}></ComboBoxWithButton>

		</div>
	{/each}
</div>

<style lang="postcss">
    .advanced-setting-list {
        display: flex;
        flex-direction: column;
    }

    .editable-entry > button, .editable-button {
        @apply btn variant-filled-primary;
    }
</style>
