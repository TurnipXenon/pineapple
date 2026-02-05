<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import { fly } from "svelte/transition";
	import type { ProjectGroup, SeaweedLayoutProps } from "./props";
	import ChumBucket from "$pkg/ui/templates/SeaweedLayout/ChumBucket.svelte";
	import { default as PinyaPageLayout } from "$pkg/ui/templates/PinyaPageLayout/PinyaPageLayout.svelte";
	import { default as SocialSection } from "$pkg/ui/components/SocialSection.svelte";
	import EntryGroup from "$pkg/ui/templates/SeaweedLayout/EntryGroup.svelte";
	import PineappleSwitch from "$pkg/ui/elements/PineappleSwitch.svelte";
	import { CodeBlock } from "$pkg/ui/elements/CodeBlock";
	import { TextChip } from "../../elements/TextChip";
	import { SvelteMap } from "svelte/reactivity";
	import EntryOrderConfig from "$pkg/ui/templates/SeaweedLayout/EntryOrderConfig.svelte";
	import CreateUrlForm from "./CreateUrlForm.svelte";
	import { onMount } from "svelte";
	import { page } from "$app/state";

	let {
		email,
		linkedinSlug,
		children,
		sideSection,
		entryList, // todo
		layout, // todo
		domain = "http://localhost:5173/seaweed2",
		queryTerms,
		showMiniSocial = false,
		serverParams = ""
	}: SeaweedLayoutProps = $props();

	let actualLayout = $state(layout);
	let isAdvanceSettingOn = $state(false);
	let orderUrl = $state("");

	let queryStates = new SvelteMap<string, boolean>(queryTerms.map(term => [term, true]));
	let styleStr = $state("");
	let queryQt = $derived.by(() => {
		const qtArr = [...queryStates.entries()
			.filter(([, state]) => state)
			.map(([term]) => term)
		];

		if (qtArr.length === queryStates.size) {
			return "";
		}

		const qtStr = qtArr.join(",");

		if (qtStr) {
			return `qt=${qtStr}`;
		}

		return "qt=clear";
	});

	$effect(() => {
		const chipList: string[] = [];
		const termList: string[] = [];
		queryStates.entries()
			.filter(([, state]) => state)
			.forEach(([term]) => {
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
	});

	let advancedQuery = $derived.by(() => {
		const query = [orderUrl, queryQt]
			.filter(q => q)
			.join("&");
		if (query) {
			return `${query}`;
		}

		return "";
	});

	let advancedUrl = $derived.by(() => `${domain}/?${advancedQuery}`);


	/** qt values and what they mean:
	 *  undefined: set all qt terms to font-weight: bold
	 *  todo: implement clear
	 *  clear: unset all terms to font-weight: normal
	 *  <term>: only set qt-<term> to bold
	 *  <term1>,<term2>: only set qt-<term1> and qt-<term2> to bold,
	 *
	 *  ONLY CALL INSIDE onMount()
	 **/
	const filterSearchParams = (searchParams: URLSearchParams) => {
		// region Order
		const orderParam = searchParams.get("order")?.trim();
		console.log(searchParams);
		console.log(orderParam);
		if (orderParam) {
			actualLayout = [];

			orderParam.split(",").forEach((groupDefinition, idx) => {
				const pair = groupDefinition.split(":");
				if (pair.length >= 2) {
					const group: ProjectGroup = {
						title: pair[0],
						entryList: [],
						key: `${pair[0]}-${idx}`
					};

					pair[1].split("|").forEach(key => {
						const component = entryList.find(e => e.key === key);
						if (component) {
							group.entryList.push(component);
						}
					});

					actualLayout.push(group);
				}
			});

			actualLayout = [...actualLayout];
			console.log(actualLayout);
		}
		// endregion

		// region Bold terms
		const qtValue = searchParams.get("qt")?.trim();
		if (qtValue !== undefined) {
			queryStates.keys()
				.forEach(key => queryStates.set(key, false));

			if (qtValue !== "clear") {
				qtValue.split(",").forEach((term) => {
					if (queryStates.has(term)) {
						queryStates.set(term, true);
					}
				});
			}
		}
		// endregion Bold terms
	};

	onMount(() => {
		if (serverParams) {
			filterSearchParams(new URLSearchParams(serverParams));
		} else if (page.url.searchParams.size) {
			filterSearchParams(page.url.searchParams);
		}
	});
</script>

<svelte:head>
	{@html styleStr}
</svelte:head>


{#snippet socialSection()}
	<SocialSection
		email={email}
		linkedinSlug={linkedinSlug}
	/>
{/snippet}
<PinyaPageLayout appBardEndStyle="classic">
	{#snippet appBarLead()}
		{#if showMiniSocial}
			<div
				class="flex flex-row"
				transition:fly={{x:-10}}
			>
				<SocialSection
					isSmallVersion={true}
					email={email}
					linkedinSlug={linkedinSlug}
				/>
			</div>
		{/if}
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
	{#each actualLayout as group (group.title)}
		<EntryGroup
			{...group}
		/>
	{/each}

	{#snippet footer()}
		<div class="footer">
			<ChumBucket></ChumBucket>

			<div class="default-card advanced-setting mt-16 mb-32">
				<h1>Advanced settings</h1>
				<p>This one is for those curious how I customize this page.</p>

				<PineappleSwitch name="advanced-setting-slider"
				                 bind:checked={isAdvanceSettingOn}>
				</PineappleSwitch>
				Advanced settings: {isAdvanceSettingOn ? "On" : "Off"}

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

					<EntryOrderConfig
						bind:layout={actualLayout}
						bind:orderUrl={orderUrl}
						allEntries={entryList}
					></EntryOrderConfig>

					<br>
					<p>Copy the url below and open a new page with it</p>
					<CodeBlock code={advancedUrl} lang="markdown" classes="max-w-2xl" />
					<CreateUrlForm queryParams={advancedQuery}></CreateUrlForm>
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

    .advanced-setting {
		    margin-left: 1em;
		    margin-right: 1em;
    }
</style>
