<script lang="ts">
	import ComboBox from "./ComboBox.svelte";
	import "./combo-box.postcss";

	export let selectedValue = "";
	export let stringItems: string[] = [];
	export let onClick: undefined | ((selected: string) => void) = undefined;

	let onClickInternal = () => {
		onClick?.(selectedValue);
	};
</script>

<div class="combo-box-wrapper">
	<button class="combo-box-side-button btn variant-filled-primary" on:click={onClickInternal}>+ Add entry</button>
	<ComboBox bind:selectedValue={selectedValue}
	          bind:stringItems={stringItems}></ComboBox>
</div>
