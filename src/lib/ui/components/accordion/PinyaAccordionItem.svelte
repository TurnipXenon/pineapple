<!-- TODO: Migration: review and migrate this component -->

<script lang="ts">
	// noinspection ES6UnusedImports
	import { Accordion } from "@skeletonlabs/skeleton-svelte";
	import type { Snippet } from "svelte";

	let {
		value,
		control: controlSnippet,
		panel: panelSnippet,
	}: {
		value: string,
		control: Snippet;
		panel: Snippet;
	} = $props();
</script>

<Accordion.Item
	{value}
	controlHover="hover:bg-primary-500 dark:hover:bg-secondary-600"
>
	<!-- Control -->
	{#snippet control()}
		{@render controlSnippet()}
	{/snippet}
	<!-- Panel -->
	{#snippet panel()}
		{@render panelSnippet()}
	{/snippet}
</Accordion.Item>
