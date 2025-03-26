import type { Snippet } from 'svelte';

interface AppStore {
	title: string;
	lead?: Snippet;
}

export const appState = $state<AppStore>({
	title: ''
});
