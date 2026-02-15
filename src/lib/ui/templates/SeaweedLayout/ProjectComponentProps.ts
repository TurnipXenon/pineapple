import type { SnippetMeta } from "$pkg/ui/templates/index";
import type { Snippet } from 'svelte';

export interface ProjectComponentProps {
	isPineapple?: boolean;
	snippetMeta?: SnippetMeta;
}

export type ComponentSnippet = Snippet<[ProjectComponentProps]>;
