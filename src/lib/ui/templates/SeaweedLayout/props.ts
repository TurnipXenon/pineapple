import type { Snippet } from "svelte";
import type { ProjectComponentProps } from "$pkg/ui/templates/SeaweedLayout";

type ComponentSnippet = Snippet<[ProjectComponentProps]>;

export enum SectionType {
	Experience = "experience",
	Projects = "projects"
}

export interface SnippetMeta {
	key: string,
	component: ComponentSnippet,
	// Metadata fields for filtering and sorting
	dateStarted?: Date | string;
	dateFinished?: Date | string;
	tags?: string[];  // Use "ongoing" tag for ongoing projects/jobs
}

export interface ProjectGroup {
	key: string;
	title: string;
	entryList: SnippetMeta[];
	projectComponentProps?: ProjectComponentProps;
	// New fields for Seaweed 3
	sectionType?: SectionType;
	showFilter?: boolean;      // Show tag filter
	showSort?: boolean;        // Show sort dropdown
	showMoreLimit?: number;    // Number of items before "show more" (0 = no limit)
}

export interface SeaweedLayoutProps {
	name: string;
	email: string;
	linkedinSlug: string;
	domain: string;
	sideSection?: Snippet<[Snippet]>;  // Optional for backward compatibility
	children?: Snippet;  // Optional for backward compatibility
	// todo: #migration
	entryList: SnippetMeta[];
	layout: ProjectGroup[];
	queryTerms: string[];
	showMiniSocial?: boolean;
	serverParams?: string;
}