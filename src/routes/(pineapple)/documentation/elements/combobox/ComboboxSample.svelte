<script lang="ts">
	import PinyaSwitch from "$pkg/ui/elements/PineappleSwitch.svelte";
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

	let selectedCountry = $state<"en" | "fr" | "tl">("fr");

	const onValueChange = (e: { value: ComboxData["value"] | undefined }) => {
		if (!e.value) return;

		const data = comboboxData.find((d) => d.value === e.value);
		if (data) {
			alert(`You chose ${data.label}`);
		}
	};

	let disabled = $derived(false);
	let multiple = $derived(false);
</script>

<div class="default-flex">
	<PinyaCombobox
		data={comboboxData}
		bind:value={selectedCountry}
		defaultValue={selectedCountry}
		label="Select Language"
		placeholder="Select Language"
		{onValueChange}
		{disabled}
		{multiple}
	/>

	<h3>Props</h3>

	<div class="switch-wrapper">
		<label for="disable-element">Disable element:</label>
		<PinyaSwitch bind:checked={disabled} name="disable-element" />
	</div>

	<div class="switch-wrapper">
		<label for="allow-multiple">Allow multiple:</label>
		<PinyaSwitch bind:checked={multiple} name="allow-multiple" />
	</div>
</div>

<style>
    .switch-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.51em;
    }
</style>
