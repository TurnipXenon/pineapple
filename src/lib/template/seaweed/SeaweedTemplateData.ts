import type { ComponentType } from "svelte";
import { DefaultHeader } from "$pkg/template/seaweed/entries/EntryProps";
import Pengi from "$pkg/template/seaweed/entries/Pengi.svelte";
import Hepcat from "$pkg/template/seaweed/entries/Hepcat.svelte";
import ChefWings from "$pkg/template/seaweed/entries/ChefWings.svelte";
import Soulwork from "$pkg/template/seaweed/entries/Soulwork.svelte";
import ItchPromo from "$pkg/template/seaweed/entries/ItchPromo.svelte";
import MigranteAlberta from "$pkg/template/seaweed/entries/MigranteAlberta.svelte";
import DecentralizedSocialMedia from "$pkg/template/seaweed/entries/DecentralizedSocialMedia.svelte";
import CustomizedYarnspinner from "$pkg/template/seaweed/entries/CustomizedYarnspinner.svelte";
import FullStackC from "$pkg/template/seaweed/entries/FullStackC.svelte";
import Workset from "$pkg/template/seaweed/entries/Workset.svelte";
import ThisWebpage from "$pkg/template/seaweed/entries/ThisWebpage.svelte";
import MockUberApp from "$pkg/template/seaweed/entries/MockUberApp.svelte";
import { removeProxyWrapperOnString } from "$pkg/template/seaweed/entry_order_config/EntryOrderConfig";

export enum GroupGridClass {
	Games = "games-section",
	Projects = "projects-section"
}

export interface EntryGroup {
	name: string;
	items: ComponentType[];
	gridClass: string;
}

export const GameEntries: Readonly<EntryGroup> = {
	name: DefaultHeader.Games.toString(),
	items: [Pengi, Hepcat, ChefWings, Soulwork, ItchPromo],
	gridClass: GroupGridClass.Games.toString()
};

export const ProjectEntries: Readonly<EntryGroup> = {
	name: DefaultHeader.Projects.toString(),
	items: [MigranteAlberta, DecentralizedSocialMedia, CustomizedYarnspinner, FullStackC, Workset, ThisWebpage, MockUberApp],
	gridClass: GroupGridClass.Projects.toString()
};

export const AllGroupedEntries: ReadonlyArray<EntryGroup> = [
	GameEntries,
	ProjectEntries
];

const allFlatEntries: Map<string, ComponentType> = new Map<string, ComponentType>();

export const lazyInitializeAllFlatEntries = () => {
	if (allFlatEntries.size === 0) {
		[...ProjectEntries.items, ...GameEntries.items].forEach(e => {
			allFlatEntries.set(removeProxyWrapperOnString(e.name), e);
		});
	}
}

export const GetAllEntryFromGlobal = () => {
	lazyInitializeAllFlatEntries();
	return allFlatEntries;
}


export const GetEntryFromGlobal = (name: string) => {
	lazyInitializeAllFlatEntries()
	return allFlatEntries.get(name);
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
	gameSectionFirst: false,
	// copy the readonly properties into mutable values
	groupedEntries: AllGroupedEntries.map(g => {
		return {
			name: g.name,
			gridClass: g.gridClass,
			items: g.items.map(e => e)
		};
	})
};


