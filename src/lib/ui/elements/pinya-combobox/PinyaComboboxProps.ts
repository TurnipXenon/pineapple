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
	defaultValue: T | undefined;
	/* selected option value */
	value: T | undefined;
	label: string;
	placeholder: string;
	onValueChange?: (selectedList: ValueChangeDetails<T>) => void;
	// override this if you want to override the behavior of settings value automatically
	// useful if you arent using basic strings
	onValueChangeBase?: (e: T | undefined) => void;
	disabled?: boolean;
	multiple?: boolean;
} & HTMLAttributes<HTMLDivElement>;
