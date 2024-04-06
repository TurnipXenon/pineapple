<script lang="ts">
	import {
		type EntryGroup, GetAllEntryFromGlobal, GetEntryFromGlobal,
		type SeaweedTemplateData,
		seaweedTemplateData
	} from "$pkg/template/seaweed/SeaweedTemplateData";

	export let seaweedEntries: EntryGroup[];
	export let orderUrl: string;
	export let updateUrl: (data: SeaweedTemplateData) => void;

	import { ListBox } from "@skeletonlabs/skeleton";
	import type { ComponentType } from "svelte";
	import { removeProxyWrapperOnString } from "./EntryOrderConfig";

	let comboboxValue: string;

	const updateOrderQuery = () => {
		orderUrl = "order=" + seaweedEntries.map(g => {
			const groupUrl = g.items.map(
				e => removeProxyWrapperOnString(e.name)
			).join("|");
			return `${g.name}:${groupUrl}:${g.gridClass}`;
		}).join(",");
		updateUrl(seaweedTemplateData);
	};

	const addEntry = (comboboxValue: string, group: EntryGroup): (() => void) => {
		return () => {
			const c = GetEntryFromGlobal(comboboxValue);
			console.log(comboboxValue, c);
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
</script>

<h3>Site ordering</h3>
<blockquote>Sorry! This part of the website is still WIP, but here it is anyway</blockquote>

<!-- formatting: group1:entry1|entry2,group2:entry3
 : <= separates the group header, the entries, and the class
 | <= separates each entries
 , <= separates each group
 -->
<div class="advanced-setting-list">
	<!-- todo: we might have to extract this into it's own component -->
	<!-- todo: NOW!!! -->
	{#each seaweedEntries as group}
		<div>
			<button class="editable-button" on:click={removeGroup(group)}>X</button>  {group.name}
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

			<select bind:value={comboboxValue} class="select">
				{#each GetAllEntryFromGlobal() as [key]}
					<option value={key}>{key}</option>
				{/each}
			</select>
			<button class="editable-button" on:click={addEntry(comboboxValue, group)}>+</button>
			<div>
				<!-- todo: fix -->

				<div class="card w-48 shadow-xl py-2" data-popup="popupCombobox">
					<ListBox rounded="rounded-none">

					</ListBox>
					<div class="arrow bg-surface-100-800-token" />
				</div>
			</div>

			<select class="select">
				<option value="1">Option 1</option>
				<option value="2">Option 2</option>
				<option value="3">Option 3</option>
				<option value="4">Option 4</option>
				<option value="5">Option 5</option>
			</select>
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
