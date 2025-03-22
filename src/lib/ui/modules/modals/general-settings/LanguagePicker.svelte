<script lang="ts">
	import { getLocale, localizeHref } from "$pkg/paraglide/runtime";
	import PinyaCombobox from "$pkg/ui/elements/pinya-combobox/PinyaCombobox.svelte";

	interface ComboxData {
		label: string;
		value: "en" | "fr" | "tl";
	}

	const comboboxData: ComboxData[] = [
		{ label: "English", value: "en" },
		{ label: "French", value: "fr" },
		{ label: "Tagalog", value: "tl" }
	];

	let selectedCountry = $state([getLocale()]);

	interface ValueDetail {
		value: string[];
	}

	const onValueChange = (e: ValueDetail) => {
		const data = comboboxData.find((d) => d.value === e.value[0]);
		if (data) {
			selectedCountry = [data.value];
			location.href = localizeHref("./", { locale: data.value });
		}
	};
</script>

<PinyaCombobox
	data={comboboxData}
	value={selectedCountry}
	defaultValue={selectedCountry}
	label="Select Language"
	placeholder="Select Language"
	{onValueChange}
/>