<!-- TODO: Migration: review and migrate this component -->

<script lang="ts">
	import { Accordion } from "@skeletonlabs/skeleton-svelte";
	import type { Snippet } from "svelte";

	let {
		value = $bindable(),
		children,
	}: {
		value: string[],
		children: Snippet,
	} = $props();
</script>

<Accordion
	classes="bg-primary-100 dark:bg-tertiary-900 dark:saturate-75"
	{value}
	onValueChange={(e) => (value = e.value)}
	collapsible
>
	{@render children()}
</Accordion>
