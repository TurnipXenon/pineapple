<script lang="ts">
	import type { SeaweedLayoutProps } from "./props";
	import ChumBucket from "$pkg/ui/modules/seaweed/ChumBucket.svelte";
	import { PinyaPageLayout } from "$pkg/ui/templates/index";
	import { SocialSection } from "$pkg/ui/components/index";
	import EntryGroup from "$pkg/ui/templates/seaweed-layout/EntryGroup.svelte";
	import PineappleSwitch from "$pkg/ui/elements/PineappleSwitch.svelte";
	import { TextChip } from "$pkg/ui/elements/index";
	import { SvelteMap } from "svelte/reactivity";


	let {
		children,
		sideSection,
		entryList, // todo
		layout, // todo
		queryTerms
	}: SeaweedLayoutProps = $props();

	let isAdvanceSettingOn = $state(true);
	let orderUrl = $state("");

	let queryStates = new SvelteMap<string, boolean>(queryTerms.map(term => [term, true]));
	let styleStr = $state("");

	$effect(() => {
		const chipList: string[] = [];
		const termList: string[] = [];
		queryStates.entries()
			.filter(([_, state]) => state)
			.forEach(([term, state], idx) => {
				const qtTerm = `.qt-${term}`;
				termList.push(qtTerm);
				chipList.push(`.text-chip${qtTerm}`);
			});
		styleStr = `<style>
			${termList.join(", ")} {
				font-weight: bolder;
				color: var(--color-secondary-400);
			}

			${chipList.join(", ")} {
				background-color: var(--color-secondary-500) /* oklch(55.6% 0 0deg) = #737373 */;
				color: var(--color-secondary-contrast-500) /* var(--color-secondary-contrast-light) */;
			}
			</style>`;
		console.log(styleStr);
	});
</script>

<svelte:head>
	<title>Hello world!</title>
	{@html styleStr}
</svelte:head>


{#snippet socialSection()}
	<SocialSection></SocialSection>
{/snippet}
<PinyaPageLayout>
	{#snippet appBarLead()}
		<div></div>
	{/snippet}

	<div id="upper-section">

		<div class="upper-section-start">
			{@render sideSection(socialSection)}
		</div>

		<div class="upper-section-end">
			{@render children()}
		</div>
	</div>

	<!--todo: render list #migration-->
	{#each layout as group (group.title)}
		<EntryGroup {...group}></EntryGroup>
	{/each}

	{#snippet footer()}
		<div class="footer">
			<ChumBucket></ChumBucket>

			<div class="default-card advanced-setting mt-16 mb-32">
				<h1>Advanced settings</h1>
				<p>This one is for those curious how I customize this page.</p>

				Advanced settings: {isAdvanceSettingOn ? "On" : "Off"}
				<PineappleSwitch name="advanced-setting-slider"
				                 bind:checked={isAdvanceSettingOn}>
				</PineappleSwitch>

				{#if (isAdvanceSettingOn)}

					<h3 class="mt-6">Query terms to bold</h3>
					<div class="query-term-grid max-w-2xl">
						{#each queryStates as [term, shouldBold] (term)}
							<button
								class="bg-transparent hover:brightness-110"
								onclick={() => { queryStates.set(term, !shouldBold); }}
							>
								<TextChip queryClass={shouldBold ? 'highlight-chip' : ''}>
									<!-- todo: change shouldBold -->
									<span style={`font-weight: ${shouldBold ? "bold" : "normal"}`}>
										{#if (shouldBold)}✓{/if}
										{term}
									</span>
								</TextChip>
							</button>
						{/each}
					</div>

					<!--					todo: #migration -->
					<!--					<EntryOrderConfig bind:seaweedEntries={seaweedTemplateData.groupedEntries}-->
					<!--					                  seaweedTemplateData={seaweedTemplateData}-->
					<!--					                  bind:orderUrl={orderUrl}-->
					<!--					                  getAllEntryFromGlobal={getAllEntryFromGlobal}-->
					<!--					                  getEntryFromGlobal={getEntryFromGlobal}-->
					<!--					                  updateUrl={updateUrl}>-->
					<!--						-->
					<!--					</EntryOrderConfig>-->

					<br>
					<p>Copy the url below and open a new page with it</p>
					<!--					# todo: migration-->
					<!--					<CodeBlock language="url" code={advancedUrl}></CodeBlock>-->

					<!--					todo: #migration-->
					<!--					<UrlShortenerForm queryParams={advancedQuery}></UrlShortenerForm>-->
				{/if}
			</div>
		</div>
	{/snippet}
</PinyaPageLayout>

<style>
    :global(html) {
        --color-bg-footer: var(--color-surface-200);
        --color-footer-border: var(--color-primary-500);
    }

    :global(html.dark) {
        --color-bg-footer: var(--color-surface-900);
        --color-footer-border: var(--color-primary-950);
    }

    .footer {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 3lh;
        background-color: var(--color-bg-footer);
        border-top: 2px solid var(--color-footer-border);
    }

    #upper-section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: center;
    }

    .query-term-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25em;
        margin-top: 1lh;
    }
</style>