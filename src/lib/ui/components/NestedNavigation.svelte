<script lang="ts">
	import { page } from "$app/state";
	import type { PageMeta } from "$pkg";
	import { deLocalizeUrl, localizeHref } from "$pkg/external/paraglide/runtime";
	import { PinyaAccordion, PinyaAccordionItem } from "$pkg/ui/components/accordion/index";
	import { PinyaCard, TextLink } from "$pkg/ui/elements/index";
	import Placeholder from "$pkg/ui/elements/Placeholder.svelte";
	import Self from "./NestedNavigation.svelte";

	let {
		layout,
		depth,
		close = () => {
		},
		openBehavior
	}: {
		layout: PageMeta[],
		depth: number,
		close?: () => void,
		openBehavior?: "open-all" | "open-active"
	} = $props();

	let openItems = $state<string[]>([]);

	let currentPath = $state("");

	$effect(() => {
		currentPath = deLocalizeUrl(page.url).pathname.replace(/^\/|\/$/g, "");

		switch (openBehavior) {
			case "open-all":
				openItems = layout.map(site => site.relativeLink);
				break;

			case "open-active":
				// find the biggest match
				// for example if our current link is documentation/test/test2
				// if the relativeLink are documentation-test, documentation, doc
				// we return [documentation]
			{
				let bestMatch: string | null = null;

				layout.forEach(site => {
					console.log(`Current path (${currentPath}) vs layout path (${site.relativeLink})`);
					const link = site.relativeLink;
					if (!link) {
						return;
					}

					const isMatch = currentPath === link || currentPath.startsWith(`${link}/`);
					if (isMatch && (!bestMatch || link.length > bestMatch.length)) {
						bestMatch = link;
					}
				});

				if (bestMatch) {
					openItems = [bestMatch];
				}
				break;
			}

			default:
				break;
		}
	});
</script>

{#if layout.length > 0}
	<PinyaAccordion bind:openItems={openItems}>
		{#each layout as site (site.relativeLink)}
			<!-- todo: add highlighted class when relativeLink === page.url -->
			<PinyaAccordionItem
				class={currentPath === site.relativeLink ? "highlighted" : ""}
				hasNoChild={site.nestedPages.length === 0}
				pinyaValue={site.relativeLink}>
				{#snippet control()}
					<TextLink href={localizeHref(site.relativeLink)} onclick={() => close()}>
						{site.title}
					</TextLink>
				{/snippet}
				{#snippet panel()}
					{#if site.nestedPages.length > 0 && depth < 5}
						<div class="wrapper">
							<Self layout={site.nestedPages} depth={depth + 1} {close} {openBehavior}></Self>
						</div>
					{/if}
				{/snippet}
			</PinyaAccordionItem>
		{/each}
	</PinyaAccordion>
{:else }
	<PinyaCard class="nested-navigation-placeholder" colorClass="bg-primary-100 dark:bg-tertiary-900">
		{#each { length: 10 } as _, idx (idx)}
			<Placeholder class="mb-2 placeholder" />
		{/each}
	</PinyaCard>
{/if}

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: start;
        text-align: start;
        gap: 0.4lh;
    }

    :global {
        .pinya-accordion-item.highlighted > .accordion-heading {
            & > .like-button, & > button {
                font-weight: bolder;
                background-color: var(--color-secondary-400-600);
                color: var(--color-secondary-950-0);
            }
        }

        .nested-navigation-placeholder.pinya-card {
            width: 10em;
            padding: 1em;
            gap: 0.5lh
        }
    }

</style>
