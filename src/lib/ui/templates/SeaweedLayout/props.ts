import type { Snippet } from "svelte";
import type { ProjectComponentProps } from "$pkg/ui/templates/SeaweedLayout";

type ComponentSnippet = Snippet<[ProjectComponentProps]>;

export interface SnippetMeta {
	key: string,
	component: ComponentSnippet,
}

export interface ProjectGroup {
	key: string;
	title: string;
	entryList: SnippetMeta[];
	projectComponentProps?: ProjectComponentProps;
}

export interface SeaweedLayoutProps {
	name: string;
	email: string;
	linkedinSlug: string;
	domain: string;
	sideSection: Snippet<[Snippet]>;
	children: Snippet;
	// todo: #migration
	entryList: SnippetMeta[];
	layout: ProjectGroup[];
	queryTerms: string[];
	showMiniSocial?: boolean;
	serverParams?: string;
}