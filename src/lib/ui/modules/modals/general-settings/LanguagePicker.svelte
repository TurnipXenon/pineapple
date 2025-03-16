<script lang="ts">
	import { Combobox } from '@skeletonlabs/skeleton-svelte';
	import { getLocale, localizeHref } from '$pkg/paraglide/runtime';

	interface ComboxData {
		label: string;
		value: 'en' | 'fr' | 'tl';
	}

	const comboboxData: ComboxData[] = [
		{ label: 'English', value: 'en' },
		{ label: 'French', value: 'fr' },
		{ label: 'Tagalog', value: 'tl' }
	];

	let selectedCountry = $state([getLocale()]);

	interface ValueDetail {
		value: string[];
	}

	const onValueChange = (e: ValueDetail) => {
		const data = comboboxData.find((d) => d.value === e.value[0]);
		if (data) {
			selectedCountry = [data.value];
			location.href = localizeHref('./', { locale: data.value });
		}
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
	optionActive="bg-secondary-400-600"
	optionHover="hover:brightness-75 dark:hover:brightness-125"
	optionClasses='aria-selected:brightness-75 aria-selected:dark:brightness-125'
	data={comboboxData}
	defaultValue={selectedCountry}
	value={selectedCountry}
	onValueChange={onValueChange}
	label="Select Language"
	placeholder="Select Language"
/>