import type { Snippet } from 'svelte';

interface AppStore {
	title: string;
	lead?: Snippet;
	isLanguagePickerAvailable: boolean;
}

export const appState = $state<AppStore>({
	title: '',
	isLanguagePickerAvailable: true,
});
