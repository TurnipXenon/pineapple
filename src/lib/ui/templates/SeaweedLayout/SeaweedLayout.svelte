<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/state";
	import { default as SocialSection } from "$pkg/ui/components/SocialSection.svelte";
	import { CodeBlock } from "$pkg/ui/elements/CodeBlock";
	import PineappleSwitch from "$pkg/ui/elements/PineappleSwitch.svelte";
	import { default as PinyaPageLayout } from "$pkg/ui/templates/PinyaPageLayout/PinyaPageLayout.svelte";
	import ChumBucket from "$pkg/ui/templates/SeaweedLayout/ChumBucket.svelte";
	import EntryGroup from "$pkg/ui/templates/SeaweedLayout/EntryGroup.svelte";
	import EntryOrderConfig from "$pkg/ui/templates/SeaweedLayout/EntryOrderConfig.svelte";
	import { onDestroy, onMount } from "svelte";
	import { SvelteMap } from "svelte/reactivity";
	import { fly } from "svelte/transition";
	import { TextChip } from "../../elements/TextChip";
	import CreateUrlForm from "./CreateUrlForm.svelte";
	import type { ProjectGroup, SeaweedLayoutProps } from "./props";

	let {
		email,
		linkedinSlug,
		children = undefined,
		sideSection = undefined,
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

	let upperSectionWrapper: HTMLDivElement | undefined = $state();
	let resizeObserver: ResizeObserver | undefined = $state();
	let isMobile = $state(false);
	let isVeryNarrow = $state(false);

	onMount(() => {
		if (serverParams) {
			filterSearchParams(new URLSearchParams(serverParams));
		} else if (page.url.searchParams.size) {
			filterSearchParams(page.url.searchParams);
		}

		/**
		 * Get the computed font size of an element in pixels.
		 * @param {HTMLElement} element The DOM element to check.
		 * @returns {number} The font size in pixels as a number.
		 */
		function getElementFontSize(element) {
			// Use window.getComputedStyle() to get all resolved CSS properties.
			const computedStyle = window.getComputedStyle(element);
			// Get the 'font-size' property value (which will be in 'px').
			const fontSizeInPx = computedStyle.getPropertyValue("font-size");
			// Parse the pixel value string (e.g., "16px") to a floating-point number.
			return parseFloat(fontSizeInPx);
		}

		// code has to be below filterSearchParams!
		const entryWrapper = upperSectionWrapper?.querySelector(".entry-group-wrapper");
		if (browser && document.body) {
			// Create a new ResizeObserver instance
			resizeObserver = new ResizeObserver(entries => {
				for (const entry of entries) {
					// Log the new dimensions or perform other actions
					const { width } = entry.contentRect; // or entry.borderBoxSize
					const emWidth = width / getElementFontSize(document.body);

					console.log(width, emWidth);
					// 26em (about) + 50em (experience) + 2em (margin)
					isMobile = emWidth < 79;
					// magic number
					isVeryNarrow = emWidth < 44;
				}
			});

			// Start observing the target element
			resizeObserver.observe(document.body);
		}
	});

	onDestroy(() => {
		if (browser && resizeObserver) {
			resizeObserver.disconnect();
		}
	});
</script>

<svelte:head>
	{@html styleStr}
</svelte:head>


{#snippet socialSection()}
	<SocialSection />
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

	{#if sideSection || children}
		<div
			id="upper-section"
			bind:this={upperSectionWrapper}
			class:is-mobile={isMobile}
			class:is-very-narrow={isVeryNarrow}
		>
			{#if sideSection}
				<div class="upper-section-start">
					{@render sideSection(socialSection)}
				</div>
			{/if}

			{#if children}
				<div class="upper-section-end">
					{@render children()}
				</div>
			{/if}

			{#if actualLayout.length > 0}
				<EntryGroup {...actualLayout[0]} />
			{/if}
		</div>
	{/if}

	<!--todo: render list #migration-->
	{#each actualLayout as group, idx (group.title)}
		{#if idx !== 0}
			<EntryGroup
				{...group}
			/>
		{/if}
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

    :global {
        #upper-section {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 2rem;
            justify-content: center;

            &.is-mobile {
                justify-content: stretch;

                .upper-section-start, .entry-group-wrapper {
                    width: 100%;
		                max-width: 64em;
		                margin: auto;
		                flex: unset;
                }

                .normal-project-container {
                    justify-content: stretch;

                    > .pinya-card {
                        max-width: calc(60em);
                    }
                }
            }

            .upper-section-start {
                flex-basis: 26em;
            }

            .entry-group-wrapper {
                width: unset;
                max-width: 64em;
		            flex: 1;

                .group-header {
                    max-width: 64em;
                }

                .normal-project-container {
                    justify-content: stretch;
                    flex-direction: column;

                    > .pinya-card {
                        max-width: 64em;
                    }

                    > .pinya-four-part-card > section {
                        .card-header-cover {
                            max-width: 12em;

                            & > * {
                                border-radius: 0;
                                border-bottom-left-radius: var(--radius-xl);
                                border-top-left-radius: var(--radius-xl);
                            }
                        }

                        .card-content {
                            padding-bottom: 1lh;
                        }

                        display: flex;
                        flex-direction: row;
                        margin: 0;
                    }
                }
            }
        }
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
