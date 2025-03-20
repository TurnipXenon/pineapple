<script lang="ts">
	import type { SeaweedLayoutProps } from "./props";
	import ChumBucket from "$pkg/ui/modules/seaweed/ChumBucket.svelte";
	import { PinyaPageLayout } from "$pkg/ui/templates/index";
	import { SocialSection } from "$pkg/ui/components/index";
	import EntryGroup from "$pkg/ui/templates/seaweed-layout/EntryGroup.svelte";
	import { Chip, seaweedTemplateData } from "$pkg";
	import UrlShortenerForm from "$pkg/template/seaweed/CreateUrlForm.svelte";
	import PineappleSlideToggle from "../../../components/PineappleSlideToggle.svelte";
	import EntryOrderConfig from "$pkg/template/seaweed/entry_order_config/EntryOrderConfig.svelte";


	let {
		children,
		sideSection,
		entryList, // todo
		layout // todo
	}: SeaweedLayoutProps = $props();

	let isAdvanceSettingOn = $state(false);
	let orderUrl = $state('');


	const toggleTerm = (term: string) => {
		// todo: see seaweedtemplate #migration
	}
</script>


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

				<PineappleSlideToggle name="advanced-setting-slider"
				                      bind:checked={isAdvanceSettingOn}>
					Advanced settings: {isAdvanceSettingOn ? "On" : "Off"}
				</PineappleSlideToggle>

				{#if (isAdvanceSettingOn)}
					<PineappleSlideToggle name="game-section-slider"
					                      bind:checked={seaweedTemplateData.gameSectionFirst}>
						Should game section appear first over projects: {seaweedTemplateData.gameSectionFirst ? "On" : "Off"}
					</PineappleSlideToggle>
					<p>Note: the above configuration was made before the dynamic entry list and to support links sent with that params, we will act like it only swaps the two groups, and nothing more dynamic if order query param does not exist. The configuration only happens during page load with query param, and it does not apply when changed here.</p>
					<PineappleSlideToggle name="fun-note-slider"
					                      bind:checked={seaweedTemplateData.shouldAddFunNote}>
						Should add fun note in description: {seaweedTemplateData.shouldAddFunNote ? "On" : "Off"}
					</PineappleSlideToggle>

					<h3>Query terms to bold</h3>
					<div class="query-term-grid">
						{#each seaweedTemplateData.queryTermMap.entries() as [term, shouldBold]}
							<!--{@const shouldBold = false}-->
							<Chip onClick={() => {toggleTerm(term)}}
							      checked={shouldBold}>
								<!-- todo: change shouldBold -->
								<span style={`font-weight: ${shouldBold ? "bold" : "normal"}`}>
										{#if (shouldBold)}✓{/if}
									{term}
									</span>
							</Chip>
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
</style>