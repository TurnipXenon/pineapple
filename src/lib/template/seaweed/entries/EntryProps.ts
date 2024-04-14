import type { SeaweedTemplateData } from "$pkg/template/seaweed/SeaweedTemplateData";

export enum DefaultHeader {
	Games = "Games",
	Projects = "Projects"
}

export interface EntryProps {
	email: string;
	letChaos: boolean;
	linkedinSlug: string;
	name: string;
	seaweedTemplateData: SeaweedTemplateData;
}

export interface GroupedEntry {
	header: string;
	entryList: EntryProps[];
}
