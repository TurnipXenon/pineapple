<script lang="ts" generics="T extends string">
	import { Combobox } from '@skeletonlabs/skeleton-svelte';
	import { getLocale, localizeHref } from '$pkg/paraglide/runtime';
	import type { PinyaComboboxProps, ValueChangeDetails } from "$pkg/ui/elements/pinya-combobox/PinyaComboboxProps";

	let {
		contentZIndex = 'auto',
		value = $bindable(),
		onValueChange = () => {},
		onValueChangeBase = undefined,
		...props
	}: PinyaComboboxProps<T> = $props();

	const onValueChangeBaseImpl = (e: ValueChangeDetails<T>) => {
		value = e.value as T[];
		onValueChange(e);
	};
</script>

<Combobox
	width="w-full"
	labelText="text-md"
	inputGroupBase="w-full flex items-center border-primary-500 border-2 rounded-xl"
	inputGroupInput="grow bg-transparent border-0 dark:placeholder-surface-50 pl-4"
	inputGroupButton="size-[3rem]"
	inputGroupArrow="size-[2rem] m-auto"
	contentBackground="bg-surface-100-900 border-primary-500 border-2"
	zIndex={contentZIndex}
	optionActive="bg-secondary-400-600"
	optionHover="hover:brightness-75 dark:hover:brightness-125"
	optionClasses='aria-selected:brightness-75 aria-selected:dark:brightness-125'
	onValueChange={onValueChangeBase ?? onValueChangeBaseImpl}
	{value}
	{...props}
/>