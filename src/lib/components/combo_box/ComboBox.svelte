<script lang="ts">
	import "./combo-box.postcss";

	interface Props {
		stringItems?: string[];
		selectedValue?: string;
	}

	let { stringItems = ["Select item"], selectedValue = $bindable("") }: Props = $props();
	selectedValue = stringItems.length === 0 ? "" : stringItems[0];
</script>

<select bind:value={selectedValue} class="select">
	{#each stringItems as item}
		<option value={item}>{item}</option>
	{/each}
</select>
