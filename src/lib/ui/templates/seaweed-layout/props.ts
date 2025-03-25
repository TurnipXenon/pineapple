import type { Snippet } from "svelte";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProjectComponentProps {
	// todo: add variants here?
}

type ComponentSnippet = Snippet<[ProjectComponentProps]>;

export interface SnippetMeta {
	key: string,
	component: ComponentSnippet,
}

export interface ProjectGroup {
	key: string;
	title: string;
	entryList: SnippetMeta[];
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
}