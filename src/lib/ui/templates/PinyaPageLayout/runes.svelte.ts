import type { Snippet } from 'svelte';

interface AppStore {
	title: string;
	lead?: Snippet;
	isLanguagePickerAvailable: boolean;
	allowDialog?: boolean;
	enableDialogOnByDefault?: boolean;
}

export const appState = $state<AppStore>({
	title: '',
	isLanguagePickerAvailable: true,
});
