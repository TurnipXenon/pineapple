import type { HTMLButtonAttributes } from 'svelte/elements';
import type { GeneralUIProps } from '$pkg/ui/elements/GeneralUIProps';
import type { WrapperProps } from '$pkg/ui/elements/WrapperProps';

export enum ButtonVariant {
	Default,
	Image
}

export type PinyaButtonProps = WrapperProps
	& HTMLButtonAttributes
	& GeneralUIProps
	& {
	paddingClass?: string;
	buttonVariant?: ButtonVariant;
	colorClass?: string;
};