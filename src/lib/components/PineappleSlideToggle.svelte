<script lang="ts">
	export let checked = false;
	export let name: string;

	import { SlideToggle } from "@skeletonlabs/skeleton";
</script>

<SlideToggle name={name}
             background="bg-surface-700 dark:bg-surface-700"
             bind:checked={checked}>
	<slot />
</SlideToggle>
