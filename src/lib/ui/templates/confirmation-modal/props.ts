import type { ModalProps } from 'svelte-modals';
import type { Snippet } from 'svelte';

export interface ConfirmationModalProps extends ModalProps {
	children: Snippet;
	confirm: {
		onclick: () => void,
		hoverOver?: string,
		text?: string
	}
}
