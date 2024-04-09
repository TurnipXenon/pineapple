<script lang="ts">
	import "./combo-box.postcss";

	export let stringItems: string[] = ["Select item"];
	export let selectedValue = "";
	selectedValue = stringItems.length === 0 ? "" : stringItems[0];
</script>

<select bind:value={selectedValue} class="select">
	{#each stringItems as item}
		<option value={item}>{item}</option>
	{/each}
</select>
