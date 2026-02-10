import type { HTMLAttributes } from "svelte/elements";

export interface GenericComboboxItem<T extends string> {
	label: string;
	value: T;
}

export interface ValueChangeDetails<T extends string> {
	value: T | undefined;
	items: GenericComboboxItem<T>[]
}

export type PinyaComboboxProps<T extends string> = {
	/* list of options */
	data: GenericComboboxItem<T>[]
	/* selected option value */
	value?: T[];
	label?: string;
	placeholder?: string;
	onValueChange?: (selectedList: T[]) => void;
	disabled?: boolean;
	multiple?: boolean;
} & HTMLAttributes<HTMLDivElement>;
