<script lang="ts">

	import { Switch } from "@skeletonlabs/skeleton-svelte";
	interface Props {
		checked?: boolean;
		name: string;
		onChange?: undefined | (() => void);
		children?: import('svelte').Snippet;
	}

	let {
		checked = $bindable(false),
		name,
		onChange = undefined,
		children
	}: Props = $props();
</script>

<Switch name={name}
             background="bg-surface-700 dark:bg-surface-700"
             bind:checked={checked}
             on:change={onChange}>
	{@render children?.()}
</Switch>
