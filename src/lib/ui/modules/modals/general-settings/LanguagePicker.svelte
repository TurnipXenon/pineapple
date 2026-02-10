<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import { deLocalizeHref, getLocale, localizeHref } from "$pkg/external/paraglide/runtime";
	import PinyaCombobox from "$pkg/ui/elements/pinya-combobox/PinyaCombobox.svelte";
	import { appState } from "$pkg/ui/templates/PinyaPageLayout/pinyaPageLayoutRunes.svelte.js";

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

	const onValueChange = (e: { value: ComboxData["value"] | undefined }) => {
		if (!e.value) return;

		const data = comboboxData.find((d) => d.value === e.value);
		if (data) {
			selectedCountry = [data.value];
			const pathname = deLocalizeHref(location.href);
			location.href = localizeHref(pathname, { locale: data.value });
		}
	};

	let disabled = $derived(!appState.isLanguagePickerAvailable);
</script>

<PinyaCombobox
	data={comboboxData}
	value={selectedCountry}
	label="Select Language"
	placeholder="Select Language"
	{onValueChange}
	{disabled}
/>
