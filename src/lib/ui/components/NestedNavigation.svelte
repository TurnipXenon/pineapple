<script lang="ts">
	import type { PageMeta } from "$pkg";
	import { localizeHref } from "$pkg/external/paraglide/runtime";
	import { PinyaAccordion, PinyaAccordionItem } from "$pkg/ui/components/accordion/index";
	import { TextLink } from "$pkg/ui/elements/index";
	import Self from "./NestedNavigation.svelte";

	let {
		layout,
		depth,
		close = () => {},
		openBehavior,
	}: {
		layout: PageMeta[],
		depth: number,
		close?: () => void,
		// todo: implement open-active
		openBehavior?: 'open-all' | 'open-active'
	} = $props();
</script>
<PinyaAccordion openItems={layout.map(site => site.relativeLink)}>
	{#each layout as site (site.relativeLink)}
		<PinyaAccordionItem hasNoChild={site.nestedPages.length === 0} pinyaValue={site.relativeLink}>
			{#snippet control()}
				<TextLink href={localizeHref(site.relativeLink)} onclick={() => close()}>
					{site.title}
				</TextLink>
			{/snippet}
			{#snippet panel()}
				{#if site.nestedPages.length > 0 && depth < 5}
					<div class="wrapper">
						<Self layout={site.nestedPages} depth={depth + 1} {close}></Self>
					</div>
				{/if}
			{/snippet}
		</PinyaAccordionItem>
	{/each}
</PinyaAccordion>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: start;
        text-align: start;
        gap: 0.4lh;
    }
</style>
