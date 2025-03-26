import type { Snippet } from 'svelte';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProjectComponentProps {
	// todo: add variants here?
}

export type ComponentSnippet = Snippet<[ProjectComponentProps]>;
