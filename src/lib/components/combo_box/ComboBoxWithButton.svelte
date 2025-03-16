<script lang="ts">
	import ComboBox from "./ComboBox.svelte";
	import "./combo-box.postcss";

	interface Props {
		selectedValue?: string;
		stringItems?: string[];
		onClick?: undefined | ((selected: string) => void);
	}

	let { selectedValue = $bindable(""), stringItems = $bindable([]), onClick = undefined }: Props = $props();

	let onClickInternal = () => {
		onClick?.(selectedValue);
	};
</script>

<div class="combo-box-wrapper">
	<button class="combo-box-side-button btn variant-filled-primary" onclick={onClickInternal}>+ Add entry</button>
	<ComboBox bind:selectedValue={selectedValue}
	          bind:stringItems={stringItems}></ComboBox>
</div>

<style>
    .combo-box-wrapper {
        display: flex;
        gap: 1em;
    }
</style>
