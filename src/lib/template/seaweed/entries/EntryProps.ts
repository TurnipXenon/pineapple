export enum DefaultHeader {
	Games = "Games",
	Projects = "Projects"
}

export interface EntryProps {
	email: string;
}

export interface GroupedEntry {
	header: string;
	entryList: EntryProps[];
}
