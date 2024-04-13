<script lang="ts">
	import {
		type ComponentMeta,
		type EntryGroup,
		GetAllEntryFromGlobal,
		GetEntryFromGlobal,
		type SeaweedTemplateData,
	} from "$pkg/template/seaweed/SeaweedTemplateData";
	import { removeProxyWrapperOnString } from "./EntryOrderConfig";
	import ComboBoxWithButton from "$pkg/components/combo_box/ComboBoxWithButton.svelte";
	import CloseIcon from "$pkg/assets/icons/close.svg";
	import UpwardIcon from "$pkg/assets/icons/arrow-upward.svg";
	import "./entry-order-config.postcss";

	export let seaweedTemplateData: SeaweedTemplateData;
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
	const removeEntry = (entry: ComponentMeta, group: EntryGroup): (() => void) => {
		return () => {
			for (let i = group.items.length - 1; i >= 0; i--) {
				if (group.items[i].name === entry.name) {
					group.items.splice(i, 1);
					seaweedEntries = seaweedEntries;
					updateOrderQuery();
					break;
				}
			}
		};
	};

	const allDefaultEntries = Array.from(GetAllEntryFromGlobal().keys());
</script>

<br>
<h2>Site ordering</h2>
<blockquote>Sorry! This part of the website is still WIP, but here it is anyway. As long as it functions</blockquote>

<!-- formatting: group1:entry1|entry2,group2:entry3
 : <= separates the group header, the entries, and the class
 | <= separates each entries
 , <= separates each group
 -->
<div class="advanced-setting-list">
	{#each seaweedEntries as group, groupIndex}
		<div class="entry-group card">

			<div class="btn-group-header">
				<button title={`Remove ${group.name}`}
				        on:click={removeGroup(group)}>
					<img class="img-icon" src={CloseIcon} alt={`Remove ${group.name}`}>
				</button>

				<button title={`Move group ${group.name} upwards`}
				        on:click={swapGroups(groupIndex, true)}
				        disabled="{groupIndex === 0}">
					<img class="img-icon" src={UpwardIcon} alt={`Move group ${group.name} upwards`}>
				</button>

				<button title={`Move group ${group.name} downwards`}
				        disabled={groupIndex === seaweedEntries.length - 1}
				        on:click={swapGroups(groupIndex, false)}>
					<img class="img-icon flipped-vertically" src={UpwardIcon} alt={`Move group ${group.name} downwards`}>
				</button>

				<h2>{group.name}</h2>
			</div>

			<table class="advanced-setting-list table">
				<thead>
				<tr>
					<th>Entries</th>
				</tr>
				</thead>
				<tbody>
				{#each group.items as entry, entryIndex}
					<tr class="entry-row">
						<td class="btn-group-entry">

							<button title={`Remove ${entry.name}`}
							        on:click={removeEntry(entry, group)}>
								<img class="img-icon" src={CloseIcon} alt={`Remove ${entry.name}`}>
							</button>

							<button title={`Move ${entry.name} upwards`}
							        on:click={swapEntry(entryIndex, group, true)}
							        disabled="{entryIndex === 0}">
								<img class="img-icon" src={UpwardIcon} alt={`Move ${entry.name} upwards`}>
							</button>

							<button title={`Move ${entry.name} downwards`}
							        disabled={entryIndex === group.items.length - 1}
							        on:click={swapEntry(entryIndex, group, false)}>
								<img class="img-icon flipped-vertically" src={UpwardIcon} alt={`Move ${entry.name} downwards`}>
							</button>
							<div class="entry-name">
								{entry.name}
							</div>
						</td>
					</tr>
				{/each}
				</tbody>

				<tfoot>
				<tr>
					<td>
						<ComboBoxWithButton stringItems={allDefaultEntries}
						                    onClick={addEntry(group)}></ComboBoxWithButton>
					</td>
				</tr>
				</tfoot>
			</table>


		</div>
	{/each}
</div>

<style lang="postcss">
    .advanced-setting-list {
        display: flex;
        flex-direction: column;
    }

    .btn-group-header {
        @apply btn-group variant-filled-tertiary;
        display: flex;
        align-items: center;
        margin-bottom: 0.5lh;
    }

    .btn-group-entry {
        @apply btn-group;
        display: flex;
        padding: 0;
    }

    .btn-group-entry > div {
        padding: 1em;
    }

    .flipped-vertically {
        transform: rotate(180deg);
    }

    .entry-group {
        border-radius: var(--theme-rounded-container);
        background-color: rgb(var(--color-surface-600));
        margin-top: 1.5lh;
        margin-bottom: 0.5lh;
        padding: 0.5lh 0.5em;
    }

    .entry-row {
        display: flex;
        align-items: center;
    }

    .entry-name {
        flex-grow: 1;
    }

    tr, td, th {
        width: 100%;
    }

    tfoot > tr {
        display: flex;
    }

</style>
