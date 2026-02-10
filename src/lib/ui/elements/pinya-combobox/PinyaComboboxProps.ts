import type { HTMLAttributes } from "svelte/elements";

export interface GenericComboboxItem<T extends string> {
	label: string;
	value: T;
}

export interface ValueChangeDetails<T extends string> {
	value: T | undefined;
	items: GenericComboboxItem<T>[]
}

export type PinyaComboboxProps = {
	/* list of options */
	data: GenericComboboxItem<string>[]
	/* selected option value */
	value?: string[];
	label?: string;
	placeholder?: string;
	onValueChange?: any; // todo: fix
	// onValueChange?: (selectedList: ValueChangeDetails<string>) => void;
	// override this if you want to override the behavior of settings value automatically
	// useful if you arent using basic strings
	onValueChangeBase?: (e: string[] | undefined) => void;
	disabled?: boolean;
	multiple?: boolean;
} & HTMLAttributes<HTMLDivElement>;
