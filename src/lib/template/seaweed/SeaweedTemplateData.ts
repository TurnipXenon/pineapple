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

export enum GroupGridClass {
	Games = "games-section",
	Projects = "projects-section"
}

export interface EntryGroup {
	name: string;
	items: ComponentType[];
	gridClass: string;
}

export const SeaweedTemplateData: ReadonlyArray<EntryGroup> = [
	{
		name: DefaultHeader.Games.toString(),
		items: [Pengi, Hepcat, ChefWings, Soulwork, ItchPromo],
		gridClass: GroupGridClass.Games.toString()
	},
	{
		name: DefaultHeader.Projects.toString(),
		items: [MigranteAlberta, DecentralizedSocialMedia, CustomizedYarnspinner, FullStackC, Workset, ThisWebpage, MockUberApp],
		gridClass: GroupGridClass.Projects.toString()
	}
];
