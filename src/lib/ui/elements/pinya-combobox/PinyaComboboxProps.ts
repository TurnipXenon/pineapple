export interface GenericComboboxItem<T extends string> {
	label: string;
	value: T;
}

export interface ValueChangeDetails<T extends string> {
	value: string[];
	items: T[]
}

export interface PinyaComboboxProps<T extends string> {
	data: GenericComboboxItem<T>[]
	defaultValue: T[];
	value: T[];
	label: string;
	placeholder: string;
	onValueChange?: (selectedList: ValueChangeDetails<T>) => void;
	// override this if you want to override the behavior of settings value automatically
	// useful if you arent using basic strings
	onValueChangeBase?: (selectedList: ValueChangeDetails<T>) => void;
	contentZIndex?: string;
	disabled?: boolean;
}