<script lang="ts">
	// should import from "@turnipxenon/pinaepple/elements" instead if used as external library
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

	let selectedCountry = $state<string[]>(["fr"]);

	const onValueChange = (e: ComboxData["value"][] | undefined) => {
		if (!e || e.length === 0) return;

		console.log("chosen", e);
		const data = comboboxData.filter(v => e.includes(v.value));
		if (data) {
			alert(`You chose ${JSON.stringify(data)}`);
		}
	};

	let disabled = $derived(false);
	let multiple = $derived(false);
</script>

<div class="default-flex">
	<div>Chosen values:
		{#each selectedCountry as country, idx (country)}
			{#if (idx > 0)}
				,
			{/if}
			{country}
		{/each}
	</div>

	<PinyaCombobox
		data={comboboxData}
		bind:value={selectedCountry}
		label="Select Language"
		placeholder="Select Language"
		{disabled}
		{multiple}
		{onValueChange}
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
