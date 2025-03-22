<script lang="ts">
	import CloseIcon from "$pkg/assets/icons/close.svg";
	import UpwardIcon from "$pkg/assets/icons/arrow-upward.svg";
	import type { ProjectGroup, SnippetMeta } from "$pkg/ui/templates/index";
	import { onMount } from "svelte";

	interface Props {
		layout: ProjectGroup[];
		orderUrl: string;
		allEntries: SnippetMeta[];
	}

	let {
		layout = $bindable(),
		orderUrl = $bindable(),
		allEntries
	}: Props = $props();

	const updateOrderQuery = () => {
		orderUrl = "order=" + layout.map(g => {
			const groupUrl = g.entryList.map(e => e.key).join("|");
			// the last item after : is a grid class but we're keeping it here for legacy reason
			return `${g.key}:${groupUrl}:`;
		}).join(",");
	};

	const addEntry = (group: ProjectGroup): ((selected: string) => void) => {
		return (selected: string) => {
			const c = allEntries.find(e => e.key === selected);
			if (c) {
				group.entryList.push(c);
				layout = layout;
				updateOrderQuery();
			}
		};
	};
	const swapEntry = (index: number, group: ProjectGroup, shouldDecrement: boolean): (() => void) => {
		return () => {
			let newIndex = index;
			if (shouldDecrement && index >= 1) {
				newIndex--;
			} else if (!shouldDecrement && index <= group.entryList.length - 2) {
				newIndex++;
			} else {
				return;
			}

			const tempVar = group.entryList[newIndex];
			group.entryList[newIndex] = group.entryList[index];
			group.entryList[index] = tempVar;
			layout = layout;
			updateOrderQuery();
		};
	};
	const swapGroups = (index: number, shouldDecrement: boolean): (() => void) => {
		return () => {
			let newIndex = index;
			if (shouldDecrement && index >= 1) {
				newIndex--;
			} else if (!shouldDecrement && index <= layout.length - 2) {
				newIndex++;
			} else {
				return;
			}

			const tempVar = layout[newIndex];
			layout[newIndex] = layout[index];
			layout[index] = tempVar;
			layout = layout;
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

	const removeGroup = (group: ProjectGroup): (() => void) => {
		return () => {
			const index = layout.indexOf(group);
			if (index === -1) {
				return;
			}

			layout.splice(index, 1);
			layout = layout;
			updateOrderQuery();
		};
	};
	const removeEntry = (entry: SnippetMeta, group: ProjectGroup): (() => void) => {
		return () => {
			for (let i = group.entryList.length - 1; i >= 0; i--) {
				if (group.entryList[i].key === entry.key) {
					group.entryList.splice(i, 1);
					layout = layout;
					updateOrderQuery();
					break;
				}
			}
		};
	};

	onMount(() => {
		updateOrderQuery();
	});
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
	{#each layout as group, groupIndex (group.key)}
		<div class="entry-group card">

			<div class="-header">
				<button title={`Remove ${group.title}`}
				        onclick={removeGroup(group)}>
					<img class="img-icon" src={CloseIcon} alt={`Remove ${group.title}`}>
				</button>

				<button title={`Move group ${group.title} upwards`}
				        onclick={swapGroups(groupIndex, true)}
				        disabled="{groupIndex === 0}">
					<img class="img-icon" src={UpwardIcon} alt={`Move group ${group.title} upwards`}>
				</button>

				<button title={`Move group ${group.title} downwards`}
				        disabled={groupIndex === layout.length - 1}
				        onclick={swapGroups(groupIndex, false)}>
					<img
						class="img-icon flipped-vertically"
						src={UpwardIcon}
						alt={`Move group ${group.title} downwards`}
					>
				</button>

				<h2>{group.title}</h2>
			</div>

			<table class="advanced-setting-list table">
				<thead>
				<tr>
					<th>Entries</th>
				</tr>
				</thead>
				<tbody>
				{#each group.entryList as entry, entryIndex (entry)}
					<tr class="entry-row">
						<td class="-entry">

							<button title={`Remove ${entry.key}`}
							        onclick={removeEntry(entry, group)}>
								<img class="img-icon" src={CloseIcon} alt={`Remove ${entry.key}`}>
							</button>

							<button title={`Move ${entry.key} upwards`}
							        onclick={swapEntry(entryIndex, group, true)}
							        disabled="{entryIndex === 0}">
								<img class="img-icon" src={UpwardIcon} alt={`Move ${entry.key} upwards`}>
							</button>

							<button title={`Move ${entry.key} downwards`}
							        disabled={entryIndex === group.key.length - 1}
							        onclick={swapEntry(entryIndex, group, false)}>
								<img class="img-icon flipped-vertically" src={UpwardIcon} alt={`Move ${entry.key} downwards`}>
							</button>
							<div class="entry-name">
								{entry.key}
							</div>
						</td>
					</tr>
				{/each}
				</tbody>

				<tfoot>
				<tr>
					<td>
						Add data here
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
        @apply preset-filled-tertiary-500;
        display: flex;
        align-items: center;
        margin-bottom: 0.5lh;
    }

    .btn-group-entry {
        @apply ;
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
        grow: 1;
    }

    tr, td, th {
        width: 100%;
    }

    tfoot > tr {
        display: flex;
    }

    .btn-group > button {
        padding: 0.3em 0.75em;
    }

    .btn-group-header > h2 {
        font-weight: bolder;
        padding-top: 1lh;
        padding-bottom: 1lh;
        margin-bottom: 0;
        padding-inline-start: 1em;
    }

    .dark .btn-group-header > h2 {
        color: rgb(var(--theme-font-color-dark));
    }

    .dark .entry-group {
        background-color: rgb(var(--color-surface-800));
    }

    tbody tr:nth-child(odd) {
        background-color: rgb(var(--color-surface-500));
    }

    .dark tbody tr:nth-child(odd) {
        background-color: rgb(var(--color-surface-900));
    }

    tbody tr:nth-child(even) {
        background-color: rgb(var(--color-surface-200));
    }

    .dark tbody tr:nth-child(even) {
        background-color: rgb(var(--color-surface-800));
    }
</style>
