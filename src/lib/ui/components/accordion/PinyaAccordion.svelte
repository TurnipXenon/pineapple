<!-- TODO: Migration: review and migrate this component -->

<script lang="ts">
	import { Accordion, type AccordionItem } from "melt/builders";
	import type { Snippet } from "svelte";

	// import { Accordion } from "@skeletonlabs/skeleton-svelte";

	type PinyaAccordionItemProps = AccordionItem<{
		snippet: Snippet;
		title: string;
		description: string;
	}>;

	let {
		childrenMeta
	}: {
		childrenMeta: PinyaAccordionItemProps[],
	} = $props();

	const accordion = new Accordion();
</script>

<!-- todo: move to melt -->
<!--<div>-->
<!--	TODO: Accordion-->
<!--	{@render children()}-->
<!--</div>-->

<div {...accordion.root}>
	{#each childrenMeta as ch (ch.heading)}
		{@const item = accordion.getItem(ch)}
		<h2 {...item.heading}>
			<button {...item.trigger}>
				{item.item.title}
			</button>
		</h2>

		<div {...item.content}>
			{item.item.description}
		</div>
	{/each}
</div>

<!--<Accordion-->
<!--	classes="bg-primary-100 dark:bg-tertiary-900 dark:saturate-75"-->
<!--	{value}-->
<!--	onValueChange={(e) => (value = e.value)}-->
<!--	collapsible-->
<!--&gt;-->
<!--	{@render children()}-->
<!--</Accordion>-->
