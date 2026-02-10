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

	const onValueChange = (e: ComboxData["value"][] | undefined) => {
		if (!e || e.length === 0) return;

		const data = comboboxData.filter(v => e.includes(v.value));
		if (data && data.length > 0) {
			const pathname = deLocalizeHref(location.href);
			location.href = localizeHref(pathname, { locale: data[0].value });
		}
	};

	let disabled = $derived(!appState.isLanguagePickerAvailable);
</script>

<PinyaCombobox
	data={comboboxData}
	bind:value={selectedCountry}
	label="Select Language"
	placeholder="Select Language"
	{onValueChange}
	{disabled}
/>
