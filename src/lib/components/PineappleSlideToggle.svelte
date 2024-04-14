<script lang="ts">
	export let checked = false;
	export let name: string;
	export let onChange: undefined | (() => void) = undefined;

	import { SlideToggle } from "@skeletonlabs/skeleton";
</script>

<SlideToggle name={name}
             background="bg-surface-700 dark:bg-surface-700"
             bind:checked={checked}
             on:change={onChange}>
	<slot />
</SlideToggle>
