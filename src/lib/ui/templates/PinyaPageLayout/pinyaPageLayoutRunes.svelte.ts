import type { Snippet } from 'svelte';

interface AppStore {
	title: string;
	lead?: Snippet;
	isLanguagePickerAvailable: boolean;
	// todo: document that allowDialog = false to start state without dialog
	// todo:
	// set allowDialog on the component initialization scope
	allowDialog?: boolean;
	enableDialogOnByDefault?: boolean;
	bgOpacity: number;
}

export const appState = $state<AppStore>({
	title: '',
	isLanguagePickerAvailable: true,
	bgOpacity: 1,
});
