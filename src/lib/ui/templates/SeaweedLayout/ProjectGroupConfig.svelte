<script lang="ts">
	import UpwardIcon from "$pkg/assets/icons/arrow-upward.svg";
	import CloseIcon from "$pkg/assets/icons/close.svg";
	import PinyaCombobox from "$pkg/ui/elements/pinya-combobox/PinyaCombobox.svelte";
	import { PinyaButton } from "$pkg/ui/elements/PinyaButton";
	import { PinyaCard } from "$pkg/ui/elements/PinyaCard";
	import type { ProjectGroup, SnippetMeta } from "$pkg/ui/templates/SeaweedLayout";
	import { addToast } from "$pkg/ui/components/MeltToaster/MeltToaster.svelte";

	interface Props {
		layout: ProjectGroup[];
		orderUrl: string;
		allEntries: SnippetMeta[];
		group: ProjectGroup;
		groupIndex: number;
	}

	let {
		layout = $bindable(),
		orderUrl = $bindable(),
		allEntries,
		group,
		groupIndex
	}: Props = $props();

	const updateOrderQuery = () => {
		orderUrl = "order=" + layout.map(g => {
			const groupUrl = g.entryList.map(e => e.key).join("|");
			// the last item after : is a grid class but we're keeping it here for legacy reason
			return `${g.title}:${groupUrl}:`;
		}).join(",");
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

	const comboboxData = allEntries.map(entry => {
		return {
			label: entry.key,
			value: entry.key
		};
	});

	let comboboxValue = $state(comboboxData[0].value);

	const addEntry = () => {
		const c = allEntries.find(e => e.key === comboboxValue[0]);

		if (!c) {
			console.warn(`Unknown key: ${comboboxValue}`);
			return;
		}

		if (group.entryList.includes(c)) {
			addToast({
				data: {
					title: "Duplicate entry",
					description: `The entry ${comboboxValue} is already in ${group.title}`,
					type: "error"
				}
			});
			return;
		}

		group.entryList.push(c);
		layout = layout;
		updateOrderQuery();
	};
</script>

<PinyaCard
	class="project-group-config-card"
	borderClass="border-[2px] border-primary-500"
	marginClass="mt-4 mb-4"
>

	<div class="m-4 flex flex-row gap-2">
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

		<div class="fake-h3 ml-2">Group title: {group.title}</div>
	</div>

	<hr class="border-primary-500 border-1">

	<table class="table">
		<thead>
		<tr>
			<th class="fake-h4">Entries</th>
		</tr>
		</thead>
		<tbody>
		{#each group.entryList as entry, entryIndex (entry)}
			<tr class="entry-row">
				<td class="entry-data">

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
			<td class="combobox-container">
				<PinyaButton onclick={addEntry}>Add Entry
				</PinyaButton>
				<PinyaCombobox
					class="project-group-config"
					data={comboboxData}
					defaultValue={comboboxValue}
					bind:value={comboboxValue}
					label="New entry"
					placeholder="Add new entry"
					contentZIndex="10"
				/>
			</td>
		</tr>
		</tfoot>
	</table>


</PinyaCard>


<style>
    .flipped-vertically {
        transform: rotate(180deg);
    }

    .entry-name {
        flex-grow: 1;
    }

    tr, td, th, table {
        width: 100%;
    }

    table {
        margin-bottom: 1lh;
    }

    tfoot > tr {
        display: flex;
    }

    tbody tr:nth-child(odd) {
        background-color: var(--color-surface-100-900);
    }

    tbody tr:nth-child(even), thead {
        background-color: var(--color-surface-300-700);
    }

    .entry-data {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
    }

    .combobox-container {
        display: flex;
        flex-direction: row;
        gap: 1em;
    }

    :global {
        .project-group-config-card.pinya-card {
            max-width:var(--container-2xl);
		        padding: 0;
        }

        .project-group-config.pinya-combobox-wrapper {
		        flex-grow: 1;
        }
    }
</style>
