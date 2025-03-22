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
	onValueChange: (selectedList: ValueChangeDetails<T>) => void;
}