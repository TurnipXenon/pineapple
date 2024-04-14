import type { ComponentType } from "svelte";
import { DefaultHeader } from "$pkg/template/seaweed/entries/EntryProps";
import Pengi from "$pkg/template/seaweed/entries/Pengi.svelte";
import Hepcat from "$pkg/template/seaweed/entries/Hepcat.svelte";
import ChefWings from "$pkg/template/seaweed/entries/ChefWings.svelte";
import Soulwork from "$pkg/template/seaweed/entries/Soulwork.svelte";
import CustomizedYarnspinner from "$pkg/template/seaweed/entries/CustomizedYarnspinner.svelte";
import ThisWebpage from "$pkg/template/seaweed/entries/ThisWebpage.svelte";
import { removeProxyWrapperOnString } from "$pkg/template/seaweed/entry_order_config/EntryOrderConfig";

export enum GroupGridClass {
	Games = "games-section",
	Projects = "projects-section"
}

export interface ComponentMeta {
	name: string;
	component: ComponentType;
}

export interface EntryGroup {
	name: string;
	items: ComponentMeta[];
	gridClass: string;
}

export const GameEntries: Readonly<EntryGroup> = {
	name: DefaultHeader.Games.toString(),
	items: [
		{ name: "Pengi", component: Pengi },
		{ name: "Hepcat", component: Hepcat },
		{ name: "Chef Wings", component: ChefWings }
	],
	gridClass: GroupGridClass.Games.toString()
};

export const ProjectEntries: Readonly<EntryGroup> = {
	name: DefaultHeader.Projects.toString(),
	items: [
		{ name: "Soulwork", component: Soulwork },
		{ name: "Customized YarnSpinner", component: CustomizedYarnspinner },
		{ name: "This Webpage", component: ThisWebpage }
	],
	gridClass: GroupGridClass.Projects.toString()
};

export const EmptyRelevantProjects: Readonly<EntryGroup> = {
	name: "Relevant projects",
	items: [],
	gridClass: GroupGridClass.Games.toString()
};

export const AllGroupedEntriesGameFirst: ReadonlyArray<EntryGroup> = [
	EmptyRelevantProjects,
	GameEntries,
	ProjectEntries
];

export const AllGroupedEntriesProjectFirst: ReadonlyArray<EntryGroup> = [
	EmptyRelevantProjects,
	ProjectEntries,
	GameEntries
];

const allFlatEntries = new Map<string, ComponentMeta>();

export const lazyInitializeAllFlatEntries = () => {
	if (allFlatEntries.size === 0) {
		[...ProjectEntries.items, ...GameEntries.items].forEach(e => {
			allFlatEntries.set(removeProxyWrapperOnString(e.name), e);
		});
	}
};

export const GetAllEntryFromGlobal = () => {
	lazyInitializeAllFlatEntries();
	return allFlatEntries;
};


export const GetEntryFromGlobal = (name: string) => {
	lazyInitializeAllFlatEntries();
	return allFlatEntries.get(name);
};

export const TurnGroupEntriesMutable = (allEntries: ReadonlyArray<EntryGroup>): EntryGroup[] => {
	return allEntries.map(g => {
		return {
			name: g.name,
			gridClass: g.gridClass,
			items: g.items.map(e => e)
		};
	});
};

export interface SeaweedTemplateData {
	groupedEntries: EntryGroup[];
	shouldAddFunNote: boolean;
	queryTermMap: Map<string, boolean>;
	gameSectionFirst: boolean;
}

export const seaweedTemplateData: SeaweedTemplateData = {
	shouldAddFunNote: false,
	queryTermMap: new Map<string, boolean>(),
	// todo: gameSectionFirst currently has no functionality
	gameSectionFirst: true,
	// copy the readonly properties into mutable values
	groupedEntries: TurnGroupEntriesMutable(AllGroupedEntriesGameFirst)
};


