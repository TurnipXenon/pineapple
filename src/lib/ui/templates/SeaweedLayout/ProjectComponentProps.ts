import type { Snippet } from 'svelte';

export interface ProjectComponentProps {
	isPineapple?: boolean;
}

export type ComponentSnippet = Snippet<[ProjectComponentProps]>;
